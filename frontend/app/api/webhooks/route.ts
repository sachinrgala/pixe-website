import { NextRequest, NextResponse } from "next/server";
import { getPool, query } from "@/lib/db";
import Stripe from "stripe";

// Helper to log webhook event to DB
async function logEventToDB(source: string, event: any) {
    if (!getPool()) return;

    try {
        await query(`
        CREATE TABLE IF NOT EXISTS webhook_logs (
          id SERIAL PRIMARY KEY,
          source VARCHAR(50) NOT NULL,
          event_type VARCHAR(255),
          payload JSONB,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

        await query(
            'INSERT INTO webhook_logs (source, event_type, payload) VALUES ($1, $2, $3)',
            [source, event.type || event.event_type || 'unknown', JSON.stringify(event)]
        );
    } catch (error) {
        console.error("Failed to log webhook to DB:", error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const source = url.searchParams.get("source") || "unknown";
        const body = await request.text();

        // 1. Stripe Logic
        if (source === "stripe") {
            const stripeKey = process.env.STRIPE_SECRET_KEY;
            // If Stripe is not configured, just log and exit
            if (!stripeKey) {
                console.warn("Stripe Webhook received but STRIPE_SECRET_KEY not set.");
                // Return 200 to Stripe so it doesn't retry
                return NextResponse.json({ received: true });
            }

            const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" as any });
            const sig = request.headers.get("stripe-signature") || "";
            const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

            let event;
            try {
                event = webhookSecret
                    ? stripe.webhooks.constructEvent(body, sig, webhookSecret)
                    : JSON.parse(body); // Unsafe for production without secret, but okay for dev
            } catch (err) {
                console.error("Webhook signature verification failed");
                return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
            }

            // Log to DB (Stateless)
            await logEventToDB("stripe", event);

            // Handle specific events
            // In a real app, update orders table here
            switch (event.type) {
                case "checkout.session.completed":
                    // const session = event.data.object;
                    // await updateOrderStatus(session.client_reference_id, 'paid');
                    break;
            }

            return NextResponse.json({ received: true });
        }

        // 2. Generic/PayPal Logic
        const event = JSON.parse(body);
        await logEventToDB(source, event);

        return NextResponse.json({ received: true });

    } catch (error: any) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        // Fetch logs from DB (for Admin Dashboard)
        if (getPool()) {
            // Ensure table exists just in case GET is called before POST
            await query(`CREATE TABLE IF NOT EXISTS webhook_logs (
                  id SERIAL PRIMARY KEY,
                  source VARCHAR(50) NOT NULL,
                  event_type VARCHAR(255),
                  payload JSONB,
                  created_at TIMESTAMP DEFAULT NOW()
             )`);

            const result = await query('SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 20');
            return NextResponse.json(result.rows);
        }

        return NextResponse.json([]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}
