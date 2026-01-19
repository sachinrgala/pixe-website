import { NextResponse } from 'next/server';
import { logError } from '@/lib/logger';

export async function POST(request: Request) {
    try {
        const errorData = await request.json();

        // Use our server-side logger to write to file
        logError("Client Side Error", {
            clientError: errorData.message,
            clientStack: errorData.stack,
            clientDigest: errorData.digest,
            pageUrl: errorData.path,
            source: "client-boundary"
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Failed to process log request", e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
