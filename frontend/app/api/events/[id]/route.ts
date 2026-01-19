import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:8080/api/v1/events";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        console.log(`DEBUG Check: Deleting event ${id}...`);
        console.log(`DEBUG Check: Backend URL: ${BACKEND_URL}/${id}`);

        const res = await fetch(`${BACKEND_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorText = await res.text();
            let errorMessage = "Failed to delete event";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error || errorMessage;
            } catch (e) {
                errorMessage = errorText || errorMessage;
            }
            return NextResponse.json({
                error: `${errorMessage} (Debug: TokenLen=${token?.length}, URL=${BACKEND_URL}/${id})`
            }, { status: res.status });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
