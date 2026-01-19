import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const res = await fetch(`http://localhost:8080/api/v1/courses/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const err = await res.text();
            return NextResponse.json({ error: err }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const res = await fetch(`http://localhost:8080/api/v1/courses/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed" }, { status: res.status });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
    }
}
