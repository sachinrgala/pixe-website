import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'dev-only-insecure-secret-change-in-prod-32chars!'
);

function ensureSecureEnvironment() {
    if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
        throw new Error('FATAL: JWT_SECRET is not defined in production environment.');
    }
}

const SALT_ROUNDS = 10;

export interface TokenPayload {
    userId: number;
    email: string;
    role: string;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// JWT Token generation
export async function generateToken(payload: TokenPayload): Promise<string> {
    ensureSecureEnvironment();
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);

    return token;
}

// JWT Token verification
export async function verifyToken(token: string): Promise<TokenPayload | null> {
    ensureSecureEnvironment();
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as TokenPayload;
    } catch {
        return null;
    }
}

// Cookie management
export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export async function getAuthCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get('auth-token')?.value;
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
}

// Get current user from cookie
export async function getCurrentUser(): Promise<TokenPayload | null> {
    const token = await getAuthCookie();
    if (!token) return null;
    return verifyToken(token);
}
