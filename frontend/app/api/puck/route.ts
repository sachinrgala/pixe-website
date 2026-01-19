import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();
    const { path: pagePath, data } = body;

    // Extract slug from path (e.g. "/advance-digital-marketing-course" -> "advance-digital-marketing-course")
    // Default to 'home' if empty or "/"
    const cleanPath = pagePath && pagePath.startsWith('/') ? pagePath.slice(1) : pagePath;
    const slug = cleanPath || 'home';

    // Get Auth Token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Call Go Backend
        const res = await fetch(`http://localhost:8080/api/v1/pages/${slug}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                puckData: data,
                // We could also sync 'sections.content' here if we wanted to generate HTML from Puck
                // But for now, we rely on the dynamic page.tsx rendering Puck Data directly.
            })
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Backend failed: ${res.status} ${err}`);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Save failed", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
