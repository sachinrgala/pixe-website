import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // SECURITY: Admin Access Only
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'administrator' && currentUser.role !== 'admin')) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { status } = body;

        if (getPool()) {
            await query(
                'UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2',
                [status, id]
            );
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: true, message: "Mock success" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
