import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// Max file size (e.g., 2MB)
const MAX_SIZE = 2 * 1024 * 1024;

// POST - Upload file (Base64 to DB for stateless simplicity)
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large (Max 2MB)" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert to Base64 Data URL
        const mimeType = file.type || 'application/octet-stream';
        const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

        // Sanitize filename
        const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();

        // Save to Database
        // We use the `url` column to store the Base64 string directly.
        // This acts as a "Data URI" so it works in <img> tags immediately.
        // Note: For production with many images, use proper Storage (S3/GCS).
        // This is a "Zero-Config" Free Tier hack.

        const result = await query(
            `INSERT INTO media (filename, original_name, mime_type, size_bytes, url) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, filename, url, created_at`,
            [filename, file.name, mimeType, file.size, base64Data]
        );

        return NextResponse.json({
            success: true,
            file: result.rows[0]
        });

    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET - List files
export async function GET() {
    try {
        const result = await query(
            'SELECT filename, url, size_bytes as size, created_at as modified FROM media ORDER BY created_at DESC LIMIT 50'
        );

        // If we have Data URIs, this payload might be huge.
        // For the *list*, we might want to strip the actual data if it's too big?
        // But the frontend grid needs the image.
        // Optimization: For the list, maybe just return metadata? 
        // But the dashboard shows thumbnails. 
        // We will return it as is. Pagination is recommended later.

        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error("Media list error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
