import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import fs from "fs";
import path from "path";

const FORMS_FILE = path.join(process.cwd(), "content", "forms.json");

interface FormField {
    id: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
    label: string;
    required?: boolean;
    options?: string[]; // For select
}

interface Form {
    id: string;
    name: string;
    fields: FormField[];
    successMessage: string;
    createdAt: string;
}

// Ensure file exists
if (!fs.existsSync(FORMS_FILE)) {
    fs.writeFileSync(FORMS_FILE, JSON.stringify([], null, 2));
}

function isDbAvailable(): boolean {
    return getPool() !== null;
}

// GET - List forms or get specific form
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("id");

    try {
        if (isDbAvailable()) {
            await query(`
        CREATE TABLE IF NOT EXISTS forms (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          fields JSONB DEFAULT '[]',
          success_message TEXT DEFAULT 'Thank you for your submission!',
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

            if (formId) {
                const result = await query('SELECT * FROM forms WHERE id = $1', [formId]);
                if (result.rows.length > 0) {
                    const row = result.rows[0];
                    return NextResponse.json({
                        id: row.id,
                        name: row.name,
                        fields: row.fields,
                        successMessage: row.success_message,
                        createdAt: row.created_at
                    });
                }
                return NextResponse.json({ error: "Form not found" }, { status: 404 });
            }

            const result = await query('SELECT id, name, created_at FROM forms ORDER BY created_at DESC');
            return NextResponse.json(result.rows);
        }

        // Fallback to filesystem
        const forms: Form[] = JSON.parse(fs.readFileSync(FORMS_FILE, "utf-8"));
        if (formId) {
            const form = forms.find(f => f.id === formId);
            return form ? NextResponse.json(form) : NextResponse.json({ error: "Form not found" }, { status: 404 });
        }
        return NextResponse.json(forms.map(f => ({ id: f.id, name: f.name, createdAt: f.createdAt })));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Create or update form
export async function POST(request: NextRequest) {
    try {
        const { id, name, fields, successMessage } = await request.json();

        if (!name) {
            return NextResponse.json({ error: "Form name is required" }, { status: 400 });
        }

        const formId = id || `form_${Date.now()}`;

        if (isDbAvailable()) {
            await query(`
        CREATE TABLE IF NOT EXISTS forms (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          fields JSONB DEFAULT '[]',
          success_message TEXT DEFAULT 'Thank you for your submission!',
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

            const existing = await query('SELECT id FROM forms WHERE id = $1', [formId]);
            if (existing.rows.length > 0) {
                await query(
                    'UPDATE forms SET name = $1, fields = $2, success_message = $3 WHERE id = $4',
                    [name, JSON.stringify(fields || []), successMessage || 'Thank you!', formId]
                );
            } else {
                await query(
                    'INSERT INTO forms (id, name, fields, success_message) VALUES ($1, $2, $3, $4)',
                    [formId, name, JSON.stringify(fields || []), successMessage || 'Thank you!']
                );
            }

            return NextResponse.json({ success: true, id: formId });
        }

        // Fallback to filesystem
        const forms: Form[] = JSON.parse(fs.readFileSync(FORMS_FILE, "utf-8"));
        const existingIndex = forms.findIndex(f => f.id === formId);

        const formData: Form = {
            id: formId,
            name,
            fields: fields || [],
            successMessage: successMessage || 'Thank you for your submission!',
            createdAt: existingIndex >= 0 ? forms[existingIndex].createdAt : new Date().toISOString()
        };

        if (existingIndex >= 0) {
            forms[existingIndex] = formData;
        } else {
            forms.push(formData);
        }

        fs.writeFileSync(FORMS_FILE, JSON.stringify(forms, null, 2));
        return NextResponse.json({ success: true, id: formId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Delete form
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("id");

    if (!formId) {
        return NextResponse.json({ error: "Form ID is required" }, { status: 400 });
    }

    try {
        if (isDbAvailable()) {
            await query('DELETE FROM forms WHERE id = $1', [formId]);
            return NextResponse.json({ success: true });
        }

        const forms: Form[] = JSON.parse(fs.readFileSync(FORMS_FILE, "utf-8"));
        const filtered = forms.filter(f => f.id !== formId);
        fs.writeFileSync(FORMS_FILE, JSON.stringify(filtered, null, 2));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
