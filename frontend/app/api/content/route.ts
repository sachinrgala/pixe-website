import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DYNAMIC_DIR = path.join(process.cwd(), "content", "dynamic");

function ensureDir() {
    if (!fs.existsSync(DYNAMIC_DIR)) {
        fs.mkdirSync(DYNAMIC_DIR, { recursive: true });
    }
}

function getCollectionPath(collection: string) {
    return path.join(DYNAMIC_DIR, `${collection}.json`);
}

function ensureCollection(collection: string) {
    ensureDir();
    const filepath = getCollectionPath(collection);
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, JSON.stringify([], null, 2));
    }
    return filepath;
}

// CRUD operations for dynamic content
export async function POST(request: NextRequest) {
    try {
        const { collection, data } = await request.json();

        if (!collection || !data) {
            return NextResponse.json({ error: "Collection and data are required" }, { status: 400 });
        }

        const filepath = ensureCollection(collection);
        const items = JSON.parse(fs.readFileSync(filepath, "utf-8"));

        const newItem = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        items.push(newItem);
        fs.writeFileSync(filepath, JSON.stringify(items, null, 2));

        return NextResponse.json({ success: true, item: newItem });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const collection = url.searchParams.get("collection");
        const id = url.searchParams.get("id");
        const limit = parseInt(url.searchParams.get("limit") || "100");
        const offset = parseInt(url.searchParams.get("offset") || "0");

        if (!collection) {
            // List all collections
            ensureDir();
            const files = fs.readdirSync(DYNAMIC_DIR).filter((f) => f.endsWith(".json"));
            const collections = files.map((f) => f.replace(".json", ""));
            return NextResponse.json({ collections });
        }

        const filepath = ensureCollection(collection);
        const items = JSON.parse(fs.readFileSync(filepath, "utf-8"));

        if (id) {
            const item = items.find((i: any) => i.id === id);
            if (!item) {
                return NextResponse.json({ error: "Item not found" }, { status: 404 });
            }
            return NextResponse.json(item);
        }

        // Return paginated items
        const paginatedItems = items.slice(offset, offset + limit);
        return NextResponse.json({
            items: paginatedItems,
            total: items.length,
            limit,
            offset,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { collection, id, data } = await request.json();

        if (!collection || !id || !data) {
            return NextResponse.json({ error: "Collection, id, and data are required" }, { status: 400 });
        }

        const filepath = ensureCollection(collection);
        const items = JSON.parse(fs.readFileSync(filepath, "utf-8"));
        const index = items.findIndex((i: any) => i.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        items[index] = {
            ...items[index],
            ...data,
            id, // Preserve original ID
            updatedAt: new Date().toISOString(),
        };

        fs.writeFileSync(filepath, JSON.stringify(items, null, 2));
        return NextResponse.json({ success: true, item: items[index] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { collection, id } = await request.json();

        if (!collection || !id) {
            return NextResponse.json({ error: "Collection and id are required" }, { status: 400 });
        }

        const filepath = ensureCollection(collection);
        const items = JSON.parse(fs.readFileSync(filepath, "utf-8"));
        const filtered = items.filter((i: any) => i.id !== id);

        if (items.length === filtered.length) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        fs.writeFileSync(filepath, JSON.stringify(filtered, null, 2));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
