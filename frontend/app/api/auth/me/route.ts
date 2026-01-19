import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                userId: user.userId,
                email: user.email,
                role: user.role
            }
        });
    } catch (error: any) {
        console.error("[Auth Me] Error:", error);
        return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
    }
}
