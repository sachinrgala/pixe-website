import { NextRequest, NextResponse } from "next/server";

// Mailchimp API integration
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || "";
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER || "us1"; // e.g., us1, us2
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || "";

export async function POST(request: NextRequest) {
    try {
        const { email, firstName, lastName, tags } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if Mailchimp is configured
        if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
            // Mock response for development
            console.log("Mailchimp not configured. Mock subscription.");
            return NextResponse.json({
                success: true,
                message: "Subscription recorded (Mailchimp not configured)",
                email,
            });
        }

        // Make request to Mailchimp API
        const response = await fetch(
            `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
            {
                method: "POST",
                headers: {
                    Authorization: `apikey ${MAILCHIMP_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName || "",
                        LNAME: lastName || "",
                    },
                    tags: tags || [],
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            // Handle already subscribed
            if (data.title === "Member Exists") {
                return NextResponse.json({ success: true, message: "Already subscribed" });
            }
            throw new Error(data.detail || "Subscription failed");
        }

        return NextResponse.json({ success: true, message: "Successfully subscribed" });
    } catch (error: any) {
        console.error("Mailchimp error:", error);
        return NextResponse.json({ error: error.message || "Subscription failed" }, { status: 500 });
    }
}
