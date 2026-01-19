import { NextRequest, NextResponse } from "next/server";
import { query, getPool } from "@/lib/db";
import { verifyPassword, generateToken, setAuthCookie, hashPassword } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
        const { success } = await rateLimit(ip.toString());
        if (!success) {
            return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
        }

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if database is available
        if (!getPool()) {
            return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
        }

        // Query user from database
        const result = await query(
            'SELECT id, email, password_hash, name, role FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const user = result.rows[0];

        // Verify password
        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Update last login
        await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

        // Generate token
        const token = await generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        // Set cookie
        await setAuthCookie(token);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error: any) {
        console.error("[Auth Login] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
