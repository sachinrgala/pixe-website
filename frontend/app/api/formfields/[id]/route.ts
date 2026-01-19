import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const formKey = searchParams.get('form');
        const query = formKey ? `?form=${formKey}` : '';

        const body = await request.json();
        const res = await fetch(`${BACKEND_URL}/api/v1/formfields/${id}${query}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update field' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const formKey = searchParams.get('form');
        const query = formKey ? `?form=${formKey}` : '';

        const res = await fetch(`${BACKEND_URL}/api/v1/formfields/${id}${query}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete field' }, { status: 500 });
    }
}
