import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Define protected paths
    const protectedPaths = ['/dashboard'];

    // 2. Check if current path is protected
    const isProtected = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtected) {
        // 3. Check for token in cookies OR URL query params (OAuth redirect)
        const cookieToken = request.cookies.get('auth-token')?.value;
        const urlToken = request.nextUrl.searchParams.get('token');

        const token = cookieToken || urlToken;

        if (!token) {
            // 4. Redirect to login if no token
            const loginUrl = new URL('/krishna', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // 5. If token came from URL (OAuth), set it as cookie and continue
        if (urlToken && !cookieToken) {
            const response = NextResponse.next();
            response.cookies.set('auth-token', urlToken, {
                path: '/',
                maxAge: 86400, // 24 hours
                sameSite: 'lax',
            });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/dashboard/:path*',
    ],
};
