import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import fs from "fs";
import path from "path";

const SEO_FILE = path.join(process.cwd(), "content", "seo.json");

// Ensure file exists
if (!fs.existsSync(SEO_FILE)) {
    fs.writeFileSync(SEO_FILE, JSON.stringify({}, null, 2));
}

function isDbAvailable(): boolean {
    return getPool() !== null;
}

// GET - Get SEO data for a page
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    try {
        if (isDbAvailable()) {
            if (slug) {
                const result = await query(
                    'SELECT seo_title, seo_description, seo_keywords, og_image FROM pages WHERE slug = $1',
                    [slug]
                );
                if (result.rows.length > 0) {
                    return NextResponse.json(result.rows[0]);
                }
                return NextResponse.json({});
            }
            // Get all SEO data
            const result = await query(
                'SELECT slug, seo_title, seo_description, seo_keywords, og_image FROM pages'
            );
            return NextResponse.json(result.rows);
        }

        // Fallback to file
        const data = JSON.parse(fs.readFileSync(SEO_FILE, "utf-8"));
        if (slug) {
            return NextResponse.json(data[slug] || {});
        }
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Update SEO data for a page
export async function POST(request: NextRequest) {
    try {
        const { slug, seoTitle, seoDescription, seoKeywords, ogImage } = await request.json();

        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        if (isDbAvailable()) {
            // First check if columns exist, if not add them
            try {
                await query(`
          ALTER TABLE pages 
          ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255),
          ADD COLUMN IF NOT EXISTS seo_description TEXT,
          ADD COLUMN IF NOT EXISTS seo_keywords TEXT,
          ADD COLUMN IF NOT EXISTS og_image TEXT
        `);
            } catch (e) {
                // Columns might already exist
            }

            await query(
                `UPDATE pages 
         SET seo_title = $1, seo_description = $2, seo_keywords = $3, og_image = $4, updated_at = NOW()
         WHERE slug = $5`,
                [seoTitle || '', seoDescription || '', seoKeywords || '', ogImage || '', slug]
            );

            return NextResponse.json({ success: true });
        }

        // Fallback to file
        const data = JSON.parse(fs.readFileSync(SEO_FILE, "utf-8"));
        data[slug] = { seoTitle, seoDescription, seoKeywords, ogImage };
        fs.writeFileSync(SEO_FILE, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
