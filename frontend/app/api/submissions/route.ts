import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import fs from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "content", "submissions.json");

// Ensure file exists
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
}

function isDbAvailable(): boolean {
    return getPool() !== null;
}

// GET - List submissions for a form
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");

    try {
        if (isDbAvailable()) {
            await query(`
        CREATE TABLE IF NOT EXISTS form_submissions (
          id SERIAL PRIMARY KEY,
          form_id VARCHAR(50) NOT NULL,
          data JSONB NOT NULL,
          ip_address VARCHAR(50),
          user_agent TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

            let result;
            if (formId) {
                result = await query(
                    'SELECT * FROM form_submissions WHERE form_id = $1 ORDER BY created_at DESC',
                    [formId]
                );
            } else {
                result = await query('SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT 100');
            }
            return NextResponse.json(result.rows);
        }

        // Fallback to filesystem
        const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
        if (formId) {
            return NextResponse.json(submissions.filter((s: any) => s.formId === formId));
        }
        return NextResponse.json(submissions.slice(0, 100));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Submit form (public endpoint)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { formId, data } = body;

        if (!formId || !data) {
            return NextResponse.json({ error: "Form ID and data are required" }, { status: 400 });
        }

        // Get IP and user agent for spam protection
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const userAgent = request.headers.get('user-agent') || '';

        if (isDbAvailable()) {
            await query(`
        CREATE TABLE IF NOT EXISTS form_submissions (
          id SERIAL PRIMARY KEY,
          form_id VARCHAR(50) NOT NULL,
          data JSONB NOT NULL,
          ip_address VARCHAR(50),
          user_agent TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

            await query(
                'INSERT INTO form_submissions (form_id, data, ip_address, user_agent) VALUES ($1, $2, $3, $4)',
                [formId, JSON.stringify(data), ip, userAgent]
            );

            return NextResponse.json({ success: true, message: 'Form submitted successfully' });
        }

        // Fallback to filesystem
        const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
        submissions.unshift({
            id: Date.now(),
            formId,
            data,
            ip,
            userAgent,
            createdAt: new Date().toISOString()
        });

        // Keep only last 1000 submissions
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions.slice(0, 1000), null, 2));

        return NextResponse.json({ success: true, message: 'Form submitted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Delete submission
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get("id");

    if (!submissionId) {
        return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
    }

    try {
        if (isDbAvailable()) {
            await query('DELETE FROM form_submissions WHERE id = $1', [submissionId]);
            return NextResponse.json({ success: true });
        }

        const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
        const filtered = submissions.filter((s: any) => s.id.toString() !== submissionId);
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(filtered, null, 2));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
