import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        // Save to the project root so it's easy to find
        const filePath = path.join(process.cwd(), "debug_snapshot.json");

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`📸 Debug Snapshot saved to: ${filePath}`);
        return NextResponse.json({ success: true, message: "Snapshot saved", path: filePath });
    } catch (e: any) {
        console.error("Snapshot failed:", e);
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
