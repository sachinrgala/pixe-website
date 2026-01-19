import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:8080/api/v1/events";

export async function GET() {
    try {
        const res = await fetch(BACKEND_URL, {
            cache: 'no-store',
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const res = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errorText = await res.text();
            let errorMessage = "Failed to create event";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error || errorMessage;
            } catch (e) {
                errorMessage = errorText || errorMessage;
            }
            return NextResponse.json({ error: errorMessage }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
