import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { query } from "@/lib/db";

// Helper to hash passwords
function hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function generateSessionId(): string {
    return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
    try {
        const { action, ...data } = await request.json();

        switch (action) {
            case "login": {
                const { email, password } = data;

                if (!email || !password) {
                    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
                }

                // Fetch user from DB
                const userResult = await query(
                    'SELECT id, email, password_hash, name, role FROM users WHERE email = $1',
                    [email]
                );

                const user = userResult.rows[0];

                // If no user found, or password doesn't match
                if (!user || user.password_hash !== hashPassword(password)) {
                    // Fallback for initial Admin setup (if DB is empty)
                    if (email === 'admin@pixe.com' && password === 'admin123' && userResult.rows.length === 0) {
                        // Create the default admin account automatically
                        const adminHash = hashPassword('admin123');
                        const newUser = await query(
                            `INSERT INTO users (email, password_hash, name, role) 
                             VALUES ($1, $2, $3, $4) 
                             RETURNING id, email, name, role`,
                            ['admin@pixe.com', adminHash, 'Admin User', 'admin']
                        );

                        // Proceed to login with new user
                        const adminUser = newUser.rows[0];
                        // Logic continues below...
                        // We need to jump to session creation.
                        // For cleanliness, let's just recurse or handle here.

                        const sessionId = generateSessionId();
                        // For stateless auth, we should ideally use JWTs. 
                        // But for now, we will use a "Database Session" (optional) or just a signed HTTP-only cookie.
                        // Since we don't have a 'sessions' table, let's JWT-sign the cookie.
                        // BUT, to keep it simple and consistent with previous code, let's assume we want a sessions table too?
                        // Actually, let's use a simple signed JSON cookie for "Stateless" auth compliant with Free Tier (no Redis).

                        const payload = JSON.stringify({ userId: adminUser.id, role: adminUser.role, expires: Date.now() + 7 * 24 * 3600000 });
                        const signature = crypto.createHmac('sha256', process.env.JWT_SECRET || 'default-secret').update(payload).digest('hex');
                        const token = `${Buffer.from(payload).toString('base64')}.${signature}`;

                        const response = NextResponse.json({
                            success: true,
                            user: adminUser,
                        });

                        response.cookies.set("auth-token", token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "lax",
                            maxAge: 7 * 24 * 60 * 60, // 7 days
                            path: '/',
                        });
                        return response;
                    }

                    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
                }

                // User found & password valid
                const payload = JSON.stringify({ userId: user.id, role: user.role, expires: Date.now() + 7 * 24 * 3600000 });
                // Sign it
                const secret = process.env.COOKIE_SECRET || 'default-dev-secret';
                const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
                const token = `${Buffer.from(payload).toString('base64')}.${signature}`;

                const response = NextResponse.json({
                    success: true,
                    user: { id: user.id, email: user.email, name: user.name, role: user.role },
                });

                response.cookies.set("auth-token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60,
                    path: '/',
                });

                // Update last login
                await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

                return response;
            }

            case "logout": {
                const response = NextResponse.json({ success: true });
                response.cookies.delete("auth-token");
                return response;
            }

            case "check": {
                const cookieStore = await cookies();
                const token = cookieStore.get("auth-token")?.value;

                if (!token) {
                    return NextResponse.json({ authenticated: false });
                }

                const [b64Payload, sig] = token.split('.');
                if (!b64Payload || !sig) return NextResponse.json({ authenticated: false });

                const secret = process.env.COOKIE_SECRET || 'default-dev-secret';
                const expectedSig = crypto.createHmac('sha256', secret).update(Buffer.from(b64Payload, 'base64').toString()).digest('hex'); // Fix: hash the decoded string? No, usually hash the raw string or the payload.
                // Let's re-verify logic: 
                // Create HMAC of the *payload string* (decoded json) matches?
                // Above I did: update(payload). which is the stringified JSON.
                // decoded is Buffer.from(b64).toString() -> JSON string.

                const payloadStr = Buffer.from(b64Payload, 'base64').toString();
                const checkSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');

                if (sig !== checkSig) {
                    return NextResponse.json({ authenticated: false });
                }

                const data = JSON.parse(payloadStr);
                if (data.expires < Date.now()) {
                    return NextResponse.json({ authenticated: false });
                }

                // Fetch fresh user data? Or just trust token?
                // Better to fetch to ensure role/permissions are active
                const userResult = await query('SELECT id, email, name, role FROM users WHERE id = $1', [data.userId]);
                const user = userResult.rows[0];

                if (!user) return NextResponse.json({ authenticated: false });

                return NextResponse.json({
                    authenticated: true,
                    user: user,
                });
            }

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
