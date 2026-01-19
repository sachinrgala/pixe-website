import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Advanced PPC & Performance Marketing Course | Live Budgets | Pixe",
    description: "Master Google Ads, Meta Ads & GA4 with India's only agency-led Performance Marketing course. Live ad budgets provided. 100% placement assistance & 3 global certifications.",
    keywords: ["PPC course", "performance marketing course", "google ads training", "meta ads certification", "digital marketing course bangalore", "paid media course", "media buying training"],
    alternates: {
        canonical: "https://pixe.education/courses/ppc-course",
    },
    openGraph: {
        title: "Advanced PPC & Performance Marketing Course | Live Budgets",
        description: "Launch your career as a Performance Marketer. Learn by spending real money on live campaigns, not just theory.",
        url: "https://pixe.education/courses/ppc-course",
        siteName: "Pixe Education",
        images: [
            {
                url: "/images/ppc-course-og.jpg", // Ensure this image exists or use a generic one
                width: 1200,
                height: 630,
                alt: "Pixe PPC Course - Performance Marketing",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Advanced PPC & Performance Marketing Course",
        description: "Master Google Ads & Meta Ads with actual ad spend. No theory only results.",
        images: ["/images/ppc-course-og.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function PPCLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
