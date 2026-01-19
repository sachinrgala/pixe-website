import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_CONFIG_FILE = path.join(process.cwd(), "content", "database.json");

// Define default structure
const defaultDbConfig = {
    nile: {
        username: "",
        password: "",
        connectionUrl: "",
        workspace: "",
        databaseName: "",
        defaultRegion: "",
        apiUrl: "",
        postgresUrl: ""
    },
    aiven: {
        serviceUrl: "",
        databaseName: "",
        host: "",
        port: "",
        user: "",
        password: "",
        caCertificate: "",
        connectionLimit: ""
    }
};

// Ensure config file exists
if (!fs.existsSync(DB_CONFIG_FILE)) {
    const contentDir = path.dirname(DB_CONFIG_FILE);
    if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
    }
    fs.writeFileSync(DB_CONFIG_FILE, JSON.stringify(defaultDbConfig, null, 2));
}

// GET - Retrieve DB config
export async function GET() {
    try {
        const config = fs.existsSync(DB_CONFIG_FILE)
            ? JSON.parse(fs.readFileSync(DB_CONFIG_FILE, "utf-8"))
            : defaultDbConfig;
        return NextResponse.json(config);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Update DB config
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate structure roughly
        if (!body.nile && !body.aiven) {
            return NextResponse.json({ error: "Invalid configuration structure" }, { status: 400 });
        }

        const current = fs.existsSync(DB_CONFIG_FILE)
            ? JSON.parse(fs.readFileSync(DB_CONFIG_FILE, "utf-8"))
            : defaultDbConfig;

        // Deep merge or just replacement of sections
        const newConfig = {
            nile: { ...current.nile, ...body.nile },
            aiven: { ...current.aiven, ...body.aiven }
        };

        fs.writeFileSync(DB_CONFIG_FILE, JSON.stringify(newConfig, null, 2));

        return NextResponse.json({ success: true, config: newConfig });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
