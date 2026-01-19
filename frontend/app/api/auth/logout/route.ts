import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
    try {
        await clearAuthCookie();
        return NextResponse.json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
        console.error("[Auth Logout] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
