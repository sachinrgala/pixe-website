import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

// GET - List Corporate Leads
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
            let sql = "SELECT * FROM leads WHERE source LIKE 'corporate_%'";
            const params: any[] = [];

            if (status) {
                sql += ' AND status = $1';
                params.push(status);
            }

            sql += ' ORDER BY created_at DESC LIMIT 500';

            const result = await query(sql, params);

            // Map to CorporateLead interface
            const corporateLeads = result.rows.map((row: any) => {
                let companyName = "Unknown Company";
                let requirements = row.notes || "No requirements specified";

                // Attempt to parse notes if JSON, or extract from string
                try {
                    const parsed = JSON.parse(row.notes);
                    if (parsed.companyName) companyName = parsed.companyName;
                    if (parsed.requirements) requirements = parsed.requirements;
                } catch (e) {
                    // Not JSON, try regex or simple text
                    if (row.notes && row.notes.startsWith("Company:")) {
                        const parts = row.notes.split('\n');
                        companyName = parts[0].replace("Company: ", "");
                        requirements = parts.slice(1).join('\n').replace("Requirements: ", "");
                    }
                }

                return {
                    id: row.id,
                    companyName: companyName,
                    contactName: row.name,
                    email: row.email,
                    phone: row.phone,
                    requirements: requirements,
                    status: row.status,
                    date: new Date(row.created_at).toLocaleDateString()
                };
            });

            return NextResponse.json(corporateLeads);
        }

        return NextResponse.json([]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Create Corporate Lead (Proxy to Lead table)
export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
        const { success } = await rateLimit(ip.toString());
        if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

        const body = await request.json();
        const { source, company_name, name, contact_person, email, phone, requirements, employees } = body;

        // Construct Notes with structured data
        const notesObj = {
            companyName: company_name || "Unknown",
            requirements: requirements || employees || "",
            raw_source: source
        };
        const notes = JSON.stringify(notesObj);

        // Map to standard Lead fields
        const leadData = {
            name: name || contact_person || "Corporate Contact",
            email: email,
            phone: phone,
            course: source === 'corporate_training' ? 'Corporate Training' : 'Hiring Request',
            source: source || 'corporate_hiring',
            notes: notes
        };

        if (getPool()) {
            const result = await query(
                `INSERT INTO leads (name, email, phone, course, source, notes)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                [leadData.name, leadData.email, leadData.phone, leadData.course, leadData.source, leadData.notes]
            );
            return NextResponse.json({ success: true, id: result.rows[0].id });
        }

        return NextResponse.json({ success: true, message: "Mock success (no DB)" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT - Update Status
export async function PUT(request: NextRequest) {
    // Reuse logic from leads/route.ts but scoped to corporate access? 
    // Actually just update the status in leads table.

    // Extract ID from URL is tricky in Next.js App Router if not [id]/route.ts
    // Use body or params.
    // Wait, the client sends PUT to /api/corporate-leads/[id] usually.
    // I need to create the [id] directory for PUT?
    // Dashboard code: `fetch(/api/corporate-leads/${id}, { method: "PUT" ... })`

    // So I need /api/corporate-leads/[id]/route.ts for PUT.
    return NextResponse.json({ error: "Method not allowed on collection" }, { status: 405 });
}
