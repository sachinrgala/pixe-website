import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FONTS_DIR = path.join(process.cwd(), "public", "fonts", "custom");

// Ensure fonts directory exists
function ensureDir() {
    if (!fs.existsSync(FONTS_DIR)) {
        fs.mkdirSync(FONTS_DIR, { recursive: true });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("font") as File;

        if (!file) {
            return NextResponse.json({ error: "No font file provided" }, { status: 400 });
        }

        // Validate file type
        const validTypes = [".woff", ".woff2", ".ttf", ".otf", ".eot"];
        const ext = path.extname(file.name).toLowerCase();
        if (!validTypes.includes(ext)) {
            return NextResponse.json(
                { error: `Invalid file type. Allowed: ${validTypes.join(", ")}` },
                { status: 400 }
            );
        }

        ensureDir();

        // Generate unique filename
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${timestamp}-${safeName}`;
        const filepath = path.join(FONTS_DIR, filename);

        // Write file
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filepath, buffer);

        // Generate CSS @font-face rule
        const fontFamily = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, "");
        const fontUrl = `/fonts/custom/${filename}`;
        const cssRule = `
@font-face {
  font-family: '${fontFamily}';
  src: url('${fontUrl}') format('${ext.slice(1)}');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`;

        return NextResponse.json({
            success: true,
            filename,
            url: fontUrl,
            fontFamily,
            cssRule,
        });
    } catch (error: any) {
        console.error("Font upload error:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}

export async function GET() {
    try {
        ensureDir();
        const files = fs.readdirSync(FONTS_DIR);

        const fonts = files.map((file) => {
            const ext = path.extname(file).toLowerCase();
            const fontFamily = file.split("-").slice(1).join("-").replace(ext, "").replace(/_/g, " ");

            return {
                filename: file,
                url: `/fonts/custom/${file}`,
                fontFamily,
            };
        });

        return NextResponse.json(fonts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to list fonts" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { filename } = await request.json();

        if (!filename) {
            return NextResponse.json({ error: "Filename required" }, { status: 400 });
        }

        const filepath = path.join(FONTS_DIR, filename);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "File not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
