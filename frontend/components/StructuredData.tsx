"use client";

interface StructuredDataProps {
    type: "Organization" | "Course" | "FAQPage" | "WebPage";
    data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
    const structuredData: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": type,
        ...data,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

// Pre-built structured data for common use cases
export function OrganizationSchema() {
    return (
        <StructuredData
            type="Organization"
            data={{
                name: "Pixe Education",
                url: "https://yourdomain.com",
                logo: "https://yourdomain.com/logo.png",
                description: "Transform your career with industry-recognized certifications",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Mumbai",
                    addressCountry: "IN",
                },
                contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-XXXXXXXXXX",
                    contactType: "customer service",
                },
                sameAs: [
                    "https://facebook.com/pixeeducation",
                    "https://instagram.com/pixeeducation",
                    "https://linkedin.com/company/pixeeducation",
                ],
            }}
        />
    );
}

export function CourseSchema({
    name,
    description,
    provider = "Pixe Education",
    price,
    duration,
}: {
    name: string;
    description: string;
    provider?: string;
    price: number;
    duration: string;
}) {
    return (
        <StructuredData
            type="Course"
            data={{
                name,
                description,
                provider: {
                    "@type": "Organization",
                    name: provider,
                },
                offers: {
                    "@type": "Offer",
                    price,
                    priceCurrency: "INR",
                    availability: "https://schema.org/InStock",
                },
                hasCourseInstance: {
                    "@type": "CourseInstance",
                    courseMode: "online",
                    duration,
                },
            }}
        />
    );
}

export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
    return (
        <StructuredData
            type="FAQPage"
            data={{
                mainEntity: questions.map((q) => ({
                    "@type": "Question",
                    name: q.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: q.answer,
                    },
                })),
            }}
        />
    );
}
