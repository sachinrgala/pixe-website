// Email Service Abstraction
// In production, swap this with Resend, SendGrid, or AWS SES.

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<boolean> {
    const SMTP_HOST = process.env.SMTP_HOST;

    // 1. Production Mode with SMTP Configured
    if (SMTP_HOST) {
        try {
            const nodemailer = (await import("nodemailer"));
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: Boolean(process.env.SMTP_SECURE) || false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.SMTP_FROM || '"Pixe Education" <noreply@pixe.com>',
                to,
                subject,
                text,
                html: html || text, // Fallback to text if HTML not provided
            });

            console.log(`[EMAIL] 📧 Sent via SMTP to ${to}`);
            return true;
        } catch (error) {
            console.error("[EMAIL] ❌ Failed to send:", error);
            return false;
        }
    }

    // 2. Development / Cloud Run Demo Mode (Logger)
    console.log(`
    ==================================================
    📧 MOCK EMAIL NOTIFICATION
    ==================================================
    To: ${to}
    Subject: ${subject}
    --------------------------------------------------
    ${text}
    ==================================================
    `);

    return true;
}

export async function sendLeadNotification(lead: any) {
    const OWNER_EMAIL = process.env.OWNER_EMAIL || "admin@pixe.com";

    return sendEmail({
        to: OWNER_EMAIL,
        subject: `🚀 New Lead: ${lead.name}`,
        text: `
        You have a new lead from the website!
        
        Name: ${lead.name}
        Phone: ${lead.phone}
        Email: ${lead.email || 'N/A'}
        Course: ${lead.course || 'N/A'}
        Source: ${lead.source}
        
        View details in your dashboard.
        `
    });
}
