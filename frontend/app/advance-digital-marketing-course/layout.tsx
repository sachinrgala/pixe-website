
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Advanced Agentic Digital Marketing Course | AI-Native Mastery | Pixe",
    description: "Master the 2026 marketing stack. Learn Generative AI, Python Agents, and Search Generative Experience (SGE). Get certified in Bangalore's top AI marketing program.",
    keywords: [
        "AI Marketing Course",
        "Agentic Workflows",
        "Generative AI Marketing",
        "SGE Optimization",
        "Digital Marketing Course Bangalore",
        "Prompt Engineering for Marketers",
        "Python for Marketing",
        "Advanced SEO Course"
    ],
    openGraph: {
        title: "Advanced Agentic Digital Marketing Course | 2026 Edition",
        description: "Don't just learn digital marketing. Master the AI agents that power the world's top growth teams. 100% Practical. Placement Support.",
        type: "website",
        images: ["/images/tools_banner.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Future-Proof Your Marketing Career with AI",
        description: "Join the elite 1% of marketers who can build agentic workflows. Learn SGE, AutoGPT, and Predictive Analytics.",
        images: ["/images/certificate_mockup.png"],
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
