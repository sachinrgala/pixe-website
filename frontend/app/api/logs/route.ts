import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:8080/admin/logs"; // It's under /admin group in main.go? No, it was `admin.Get("/logs")` which maps to `/api/v1/admin/logs` ... wait.
// In main.go: `admin := api.Group("/admin", authMiddleware)` where `api` is `/api/v1`.
// So route is `/api/v1/admin/logs`.

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const res = await fetch("http://localhost:8080/api/v1/admin/logs", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            // Pass through error
            return NextResponse.json({ error: "Failed to fetch logs" }, { status: res.status });
        }

        const text = await res.text();
        return new NextResponse(text, { status: 200 }); // Return text directly
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
