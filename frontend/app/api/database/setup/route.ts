import { NextRequest, NextResponse } from "next/server";
import { testConnection, initializeSchema, getPool } from "@/lib/db";
import { cookies } from "next/headers";
import crypto from "crypto";

// Helper to verify admin token (duplicated from auth to avoid circular deps for now)
async function isAdmin(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return false;

    const [b64Payload, sig] = token.split('.');
    if (!b64Payload || !sig) return false;

    // Verify signature
    const secret = process.env.COOKIE_SECRET || 'default-dev-secret';
    const checkSig = crypto.createHmac('sha256', secret).update(Buffer.from(b64Payload, 'base64').toString()).digest('hex');

    if (sig !== checkSig) return false;

    const payload = JSON.parse(Buffer.from(b64Payload, 'base64').toString());

    // Check role
    return payload.role === 'admin';
}

// GET - Test connection (Protected status check)
export async function GET() {
    try {
        // We allow simple ping, but let's hide details if not admin? 
        // Actually, dashboard uses this. Dashboard is protected by middleware mostly, 
        // but let's add a check if we want to be strict.
        // For now, returning status "connected"/"disconnected" is low risk.

        const isConnected = await testConnection();

        if (isConnected) {
            return NextResponse.json({
                status: "connected",
                message: "Successfully connected to database"
            });
        } else {
            return NextResponse.json({
                status: "disconnected",
                message: "Database not configured or connection failed"
            }, { status: 503 });
        }
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message
        }, { status: 500 });
    }
}

// POST - Initialize schema (Strictly Admin Only)
export async function POST(request: NextRequest) {
    try {
        // 1. Security Check
        const authorized = await isAdmin();
        if (!authorized) {
            // Allow bypassing auth ONLY if the DB is completely empty (first run)?
            // OR if a special deploy key is present.
            // For simplicity in this Free Tier template:
            // We'll allow it if a special header 'X-Setup-Key' matches COOKIE_SECRET
            // This is useful for CI/CD or curl scripts.

            const setupKey = request.headers.get("X-Setup-Key");
            const secret = process.env.COOKIE_SECRET;

            if (!secret || setupKey !== secret) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }

        const pool = getPool();
        if (!pool) {
            return NextResponse.json({
                success: false,
                error: "Database not configured. Please configure Nile or Aiven first."
            }, { status: 400 });
        }

        await initializeSchema();

        return NextResponse.json({
            success: true,
            message: "Database schema initialized successfully"
        });
    } catch (error: any) {
        console.error("[DB Setup] Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
