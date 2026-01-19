import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2024-12-18.acacia" as any, // Bypass strict version check due to bleeding edge SDK
});

export async function POST(request: NextRequest) {
    try {
        const { action, ...data } = await request.json();

        switch (action) {
            case "create-checkout": {
                const { productName, amount, currency, successUrl, cancelUrl } = data;

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            // SECURITY: Server-side pricing to prevent tampering
                            // Ignoring client 'amount' and 'currency'
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: productName || "Course Enrollment",
                                },
                                unit_amount: 99900, // SECURITY: Fixed price $999.00 (Prevent tampering)
                            },
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    success_url: successUrl || `${process.env.NEXT_PUBLIC_URL || "http://localhost:7000"}/payment/success`,
                    cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_URL || "http://localhost:7000"}/payment/cancel`,
                });

                return NextResponse.json({ sessionId: session.id, url: session.url });
            }

            case "create-subscription": {
                const { priceId, customerEmail } = data;

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    customer_email: customerEmail,
                    line_items: [
                        {
                            price: priceId,
                            quantity: 1,
                        },
                    ],
                    mode: "subscription",
                    success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:7000"}/subscription/success`,
                    cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:7000"}/subscription/cancel`,
                });

                return NextResponse.json({ sessionId: session.id, url: session.url });
            }

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: error.message || "Payment failed" }, { status: 500 });
    }
}
