import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import fs from "fs";
import path from "path";

const VERSIONS_DIR = path.join(process.cwd(), "content", "versions");

// Ensure directory exists
if (!fs.existsSync(VERSIONS_DIR)) {
    fs.mkdirSync(VERSIONS_DIR, { recursive: true });
}

function isDbAvailable(): boolean {
    return getPool() !== null;
}

// GET - Get version history for a page
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const versionId = searchParams.get("version");

    if (!slug) {
        return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    try {
        if (isDbAvailable()) {
            // Ensure table exists
            await query(`
        CREATE TABLE IF NOT EXISTS page_versions (
          id SERIAL PRIMARY KEY,
          page_slug VARCHAR(255) NOT NULL,
          html TEXT,
          css TEXT,
          components JSONB,
          styles JSONB,
          created_at TIMESTAMP DEFAULT NOW(),
          created_by VARCHAR(255)
        )
      `);

            if (versionId) {
                // Get specific version
                const result = await query(
                    'SELECT * FROM page_versions WHERE id = $1 AND page_slug = $2',
                    [versionId, slug]
                );
                if (result.rows.length > 0) {
                    return NextResponse.json(result.rows[0]);
                }
                return NextResponse.json({ error: "Version not found" }, { status: 404 });
            }

            // Get all versions for page
            const result = await query(
                'SELECT id, created_at, created_by FROM page_versions WHERE page_slug = $1 ORDER BY created_at DESC LIMIT 20',
                [slug]
            );
            return NextResponse.json(result.rows);
        }

        // Fallback to filesystem
        const versionFile = path.join(VERSIONS_DIR, `${slug}.json`);
        if (!fs.existsSync(versionFile)) {
            return NextResponse.json([]);
        }
        const versions = JSON.parse(fs.readFileSync(versionFile, "utf-8"));

        if (versionId) {
            const version = versions.find((v: any) => v.id === versionId);
            return NextResponse.json(version || { error: "Version not found" });
        }

        return NextResponse.json(versions.map((v: any) => ({
            id: v.id,
            created_at: v.created_at
        })));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Create a new version (called when saving page)
export async function POST(request: NextRequest) {
    try {
        const { slug, html, css, components, styles, createdBy } = await request.json();

        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        if (isDbAvailable()) {
            await query(`
        CREATE TABLE IF NOT EXISTS page_versions (
          id SERIAL PRIMARY KEY,
          page_slug VARCHAR(255) NOT NULL,
          html TEXT,
          css TEXT,
          components JSONB,
          styles JSONB,
          created_at TIMESTAMP DEFAULT NOW(),
          created_by VARCHAR(255)
        )
      `);

            const result = await query(
                `INSERT INTO page_versions (page_slug, html, css, components, styles, created_by)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                [slug, html || '', css || '', JSON.stringify(components || []), JSON.stringify(styles || []), createdBy || 'system']
            );

            // Keep only last 20 versions
            await query(
                `DELETE FROM page_versions WHERE page_slug = $1 AND id NOT IN (
          SELECT id FROM page_versions WHERE page_slug = $1 ORDER BY created_at DESC LIMIT 20
        )`,
                [slug]
            );

            return NextResponse.json({ success: true, versionId: result.rows[0].id });
        }

        // Fallback to filesystem
        const versionFile = path.join(VERSIONS_DIR, `${slug}.json`);
        let versions = [];
        if (fs.existsSync(versionFile)) {
            versions = JSON.parse(fs.readFileSync(versionFile, "utf-8"));
        }

        const newVersion = {
            id: Date.now().toString(),
            html,
            css,
            components,
            styles,
            created_at: new Date().toISOString()
        };

        versions.unshift(newVersion);
        versions = versions.slice(0, 20); // Keep only 20 versions

        fs.writeFileSync(versionFile, JSON.stringify(versions, null, 2));

        return NextResponse.json({ success: true, versionId: newVersion.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
