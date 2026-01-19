import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import fs from "fs";
import path from "path";

const MENU_FILE = path.join(process.cwd(), "content", "menus.json");

interface MenuItem {
    id: string;
    label: string;
    url: string;
    target?: string;
    children?: MenuItem[];
}

interface MenuData {
    [menuId: string]: MenuItem[];
}

// Ensure file exists
if (!fs.existsSync(MENU_FILE)) {
    const defaultMenus: MenuData = {
        main: [
            { id: "1", label: "Home", url: "/" },
            { id: "2", label: "About", url: "/about" },
            { id: "3", label: "Contact", url: "/contact" }
        ],
        footer: [
            { id: "1", label: "Privacy Policy", url: "/privacy" },
            { id: "2", label: "Terms", url: "/terms" }
        ]
    };
    fs.writeFileSync(MENU_FILE, JSON.stringify(defaultMenus, null, 2));
}

function isDbAvailable(): boolean {
    return getPool() !== null;
}

// GET - Get menu(s)
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const menuId = searchParams.get("id");

    try {
        if (isDbAvailable()) {
            // Ensure table exists
            await query(`
        CREATE TABLE IF NOT EXISTS menus (
          id VARCHAR(50) PRIMARY KEY,
          items JSONB DEFAULT '[]',
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);

            if (menuId) {
                const result = await query('SELECT items FROM menus WHERE id = $1', [menuId]);
                if (result.rows.length > 0) {
                    return NextResponse.json(result.rows[0].items);
                }
                return NextResponse.json([]);
            }

            const result = await query('SELECT id, items FROM menus');
            const menus: MenuData = {};
            result.rows.forEach((row: any) => {
                menus[row.id] = row.items;
            });
            return NextResponse.json(menus);
        }

        // Fallback to file
        const data: MenuData = JSON.parse(fs.readFileSync(MENU_FILE, "utf-8"));
        if (menuId) {
            return NextResponse.json(data[menuId] || []);
        }
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Update menu
export async function POST(request: NextRequest) {
    try {
        const { id, items } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Menu ID is required" }, { status: 400 });
        }

        if (isDbAvailable()) {
            await query(`
        CREATE TABLE IF NOT EXISTS menus (
          id VARCHAR(50) PRIMARY KEY,
          items JSONB DEFAULT '[]',
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);

            const existing = await query('SELECT id FROM menus WHERE id = $1', [id]);
            if (existing.rows.length > 0) {
                await query(
                    'UPDATE menus SET items = $1, updated_at = NOW() WHERE id = $2',
                    [JSON.stringify(items), id]
                );
            } else {
                await query(
                    'INSERT INTO menus (id, items) VALUES ($1, $2)',
                    [id, JSON.stringify(items)]
                );
            }

            return NextResponse.json({ success: true });
        }

        // Fallback to file
        const data: MenuData = JSON.parse(fs.readFileSync(MENU_FILE, "utf-8"));
        data[id] = items;
        fs.writeFileSync(MENU_FILE, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
