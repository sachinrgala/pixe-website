import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const formKey = searchParams.get('form');
        const query = formKey ? `?form=${formKey}` : '';

        const res = await fetch(`${BACKEND_URL}/api/v1/formfields${query}`, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });

        if (!res.ok) {
            return NextResponse.json([], { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const res = await fetch(`${BACKEND_URL}/api/v1/formfields`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create field' }, { status: 500 });
    }
}
