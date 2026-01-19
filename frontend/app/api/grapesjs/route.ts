import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8080/api/v1";

// GET - Load page content from Backend
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "home";

    try {
        const res = await fetch(`${BACKEND_URL}/pages/${slug}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            if (res.status === 404) {
                return NextResponse.json({ html: "", css: "", components: null, styles: null });
            }
            return NextResponse.json({ error: "Backend error" }, { status: res.status });
        }

        const data = await res.json();

        // Return in format GrapesJS expects
        // Fallback to legacy 'sections.content' if 'html' is empty
        const legacyContent = data.sections?.content || "";
        const legacyCss = data.sections?.css || "";

        return NextResponse.json({
            html: data.html || legacyContent,
            css: data.css || legacyCss,
            components: data.components || null,
            styles: data.styles || null
        });

    } catch (error: any) {
        console.error("[API GrapesJS GET] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Save page content to Backend
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, html, css, components, styles } = body;

        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        // We use PUT because we assume the page exists (or backend handles creation logic if we changed it, but currently it's PUT for updates)
        // If the page doesn't exist, we might fail. But Editor usually edits existing pages.
        // TODO: Handle creation if 404? For now, assume edit.

        // Use PUT to update page content (auth disabled for dev mode)
        const res = await fetch(`${BACKEND_URL}/pages/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                html,
                css,
                components,
                styles
            })
        });

        if (!res.ok) {
            const err = await res.text();
            return NextResponse.json({ error: "Backend save failed: " + err }, { status: res.status });
        }

        return NextResponse.json({ success: true, message: "Content saved to backend" });
    } catch (error: any) {
        console.error("[API GrapesJS POST] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
