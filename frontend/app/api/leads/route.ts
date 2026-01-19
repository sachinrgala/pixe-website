import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { sendLeadNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const LEADS_FILE = path.join(process.cwd(), "content", "leads.json");
const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;
const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080/api/v1";

// Ensure file exists
if (!fs.existsSync(LEADS_FILE)) {
    const dir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

// ... (Lead Interface kept same)
interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    course?: string;
    source?: string;
    status: 'new' | 'contacted' | 'qualified' | 'enrolled' | 'lost';
    created_at: string;
    [key: string]: any;
}

// Helper to push to Go Microservice asynchronously
async function pushToMicroservice(lead: any) {
    try {
        // Fire and forget (don't await response to block UI)
        fetch(`${BACKEND_URL}/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead)
        }).catch(err => console.error("[Microservice] Failed to push lead:", err.message));
    } catch (e) {
        // Ignore setup errors
    }
}

// ... (GET Handler kept same)
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // SECURITY: Admin Access Only
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'administrator' && currentUser.role !== 'admin')) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        if (getPool()) {
            let sql = 'SELECT * FROM leads';
            const params: any[] = [];

            if (status) {
                sql += ' WHERE status = $1';
                params.push(status);
            }

            sql += ' ORDER BY created_at DESC LIMIT 500';

            const result = await query(sql, params);
            return NextResponse.json(result.rows);
        }

        // Fallback
        return NextResponse.json([]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Zod Schema
const LeadSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email format").optional().or(z.literal('')),
    phone: z.string().min(10, "Phone must be at least 10 digits").optional().or(z.literal('')),
    course: z.string().optional(),
    source: z.string().default('website'),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    page_url: z.string().optional(),
});

// POST - Create new lead
export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
        const { success } = await rateLimit(ip.toString());
        if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

        const body = await request.json();

        // Zod Validation
        const parseResult = LeadSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({
                error: "Validation Failed",
                details: parseResult.error.flatten()
            }, { status: 400 });
        }

        const { name, email, phone, course, source, utm_source, utm_medium, utm_campaign, utm_content, page_url } = parseResult.data;

        const userAgent = request.headers.get('user-agent') || '';

        const leadData = {
            name: name || '',
            email: email || '',
            phone: phone ? phone.slice(-10) : '',
            course: course || '',
            source: source || 'website',
            utm_source: utm_source || '',
            utm_medium: utm_medium || '',
            utm_campaign: utm_campaign || '',
            utm_content: utm_content || '',
            page_url: page_url || '',
            ip_address: ip,
            user_agent: userAgent,
        };

        // 1. Offload to Go Microservice (Async)
        // This demonstrates "Backend Integration" - high volume ingestion handled by Go
        pushToMicroservice(leadData);

        // 2. Send Notification (Async fire-and-forget)
        sendLeadNotification(leadData).catch(e => console.error("Failed to send notification:", e));

        let leadId: number = Date.now();

        // 2. Persist Locally (Frontend DB) for Dashboard display
        // In a real microservice arch, the dashboard might query the Go Service directly.
        // For now, we dual-write so the existing dashboard works.
        if (getPool()) {
            const result = await query(
                `INSERT INTO leads (name, email, phone, course, source, utm_source, utm_medium, utm_campaign, utm_content, page_url, ip_address, user_agent)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
                [leadData.name, leadData.email, leadData.phone, leadData.course, leadData.source, leadData.utm_source, leadData.utm_medium, leadData.utm_campaign, leadData.utm_content, leadData.page_url, leadData.ip_address, leadData.user_agent]
            );
            leadId = result.rows[0].id;
        }

        return NextResponse.json({
            success: true,
            leadId,
            message: 'Thank you! We received your request.'
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ... (PATCH/DELETE handlers kept same)
export async function PATCH(request: NextRequest) {
    try {
        // SECURITY: Admin Access Only
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'administrator') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id, status, notes } = await request.json();
        if (getPool()) {
            await query(
                'UPDATE leads SET status = $1, notes = COALESCE($2, notes), updated_at = NOW() WHERE id = $3',
                [status, notes, id]
            );
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    // SECURITY: Admin Access Only
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'administrator' && currentUser.role !== 'admin')) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { id, ids } = body;

        if (!id && (!ids || !Array.isArray(ids))) {
            return NextResponse.json({ error: "Invalid payload: 'id' or 'ids' required" }, { status: 400 });
        }

        if (getPool()) {
            if (ids && ids.length > 0) {
                // Bulk Delete
                await query('DELETE FROM leads WHERE id = ANY($1)', [ids]);
            } else if (id) {
                // Single Delete
                await query('DELETE FROM leads WHERE id = $1', [id]);
            }
            return NextResponse.json({ success: true });
        }

        // Fallback or No DB configured
        return NextResponse.json({ success: true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
