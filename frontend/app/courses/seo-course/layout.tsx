import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Best SEO Course in India 2026 | AI-Powered Search Optimization | Pixe Education",
    description: "Master AI SEO, Google SGE, and Answer Engine Optimization. Live site audits, Python automation, E-E-A-T strategies. 92% placement rate. Enroll for ₹24,999.",
    keywords: [
        "SEO course in India",
        "SEO training",
        "AI SEO course",
        "Google SGE optimization",
        "Answer Engine Optimization",
        "E-E-A-T training",
        "SEO certification India",
        "best SEO course",
        "learn SEO online",
        "SEO course with placement"
    ],
    openGraph: {
        title: "Best SEO Course in India 2026 | AI-Powered Search Optimization",
        description: "Master AI SEO, Google SGE, and Answer Engine Optimization. Live site audits, Python automation. 92% placement rate.",
        type: "website",
        locale: "en_IN",
        siteName: "Pixe Education",
        url: "https://pixe.education/courses/seo-course",
    },
    twitter: {
        card: "summary_large_image",
        title: "Best SEO Course in India 2026 | Pixe Education",
        description: "Master AI SEO, Google SGE, and Answer Engine Optimization. 92% placement rate.",
    },
    alternates: {
        canonical: "https://pixe.education/courses/seo-course",
    },
    robots: {
        index: true,
        follow: true,
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Course",
            "name": "AI-Powered SEO & Agentic Search Optimization Course",
            "description": "Master AI SEO, Google SGE, and Answer Engine Optimization. Live site audits, Python automation, and E-E-A-T strategies for 2026.",
            "provider": {
                "@type": "EducationalOrganization",
                "name": "Pixe Education",
                "url": "https://pixe.education"
            },
            "offers": {
                "@type": "Offer",
                "price": "24999",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500",
                "bestRating": "5"
            },
            "courseMode": "online",
            "educationalLevel": "Beginner to Advanced",
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "online",
                "instructor": {
                    "@type": "Person",
                    "name": "Vikram Malhotra"
                }
            },
            "teaches": [
                "Search Engine Optimization",
                "Google Search Generative Experience (SGE)",
                "Answer Engine Optimization (AEO)",
                "Technical SEO",
                "Python for SEO Automation",
                "E-E-A-T Optimization",
                "Link Building",
                "Content Strategy"
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is SEO dead because of AI?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No, SEO has evolved into AEO (Answer Engine Optimization). We teach you to rank in Google AI Overviews, ChatGPT, and Perplexity."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do I need coding knowledge for this SEO course?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No prior coding experience is needed. We teach basic Python for SEO automation as part of the curriculum."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the course fee and duration?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The course fee is ₹24,999 with EMI options starting at ₹2,100/month. Duration is 3 months with live sessions."
                    }
                }
            ]
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pixe.education" },
                { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://pixe.education/courses" },
                { "@type": "ListItem", "position": 3, "name": "SEO & Agentic Search Course", "item": "https://pixe.education/courses/seo-course" }
            ]
        }
    ]
};

export default function SEOCourseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
