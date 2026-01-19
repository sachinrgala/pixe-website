import { Footer } from "@/components/layout/Footer";
import HomeLanding from "@/components/landing/HomeLanding";

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "EducationalOrganization",
            "name": "Pixe Education",
            "url": "https://pixe.education",
            "logo": "https://pixe.education/logo.png",
            "sameAs": [
                "https://www.linkedin.com/company/pixe-education",
                "https://www.instagram.com/pixe.education"
            ],
            "description": "India's First AI-Integrated Digital Marketing Institute offering Agency-Simulation Learning."
        },
        {
            "@type": "Course",
            "name": "Advance Digital Marketing & AI Agency Simulation",
            "description": "Master SEO, PPC, Social Media, and AI tools with real agency budgets and live projects. 100% Placement Support.",
            "provider": {
                "@type": "EducationalOrganization",
                "name": "Pixe Education"
            },
            "educationalCredentialAwarded": "Dual Certification (ISO + Google/Meta)",
            "occupationalCategory": "Digital Marketer",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1250"
            },
            "offers": {
                "@type": "Offer",
                "category": "EducationalCourse",
                "priceCurrency": "INR",
                "price": "45000",
                "availability": "https://schema.org/InStock"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Why is Pixe Education the best digital marketing institute in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Pixe Education is the only institute offering an Agency-Simulation model where students manage real ad budgets and use AI tools like ChatGPT and Midjourney, ensuring practical, job-ready skills."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you offer placement support?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, we provide 100% placement support with resume building, mock interviews, and direct connections to our network of 350+ hiring partners."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is this course suitable for beginners?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely. Our curriculum starts from the basics of marketing and advances to expert-level AI strategies, making it perfect for students, freshers, and career switchers."
                    }
                }
            ]
        }
    ]
};

export const metadata = {
    title: "Best Digital Marketing Course with AI Agency-Simulation | Pixe Education",
    description: "Rank #1 with India's only Agency-Simulation Digital Marketing Course. Master SEO, PPC, & AI. 100% Placement Support. Book a Free Demo.",
    keywords: ["Digital Marketing Course", "AI Digital Marketing", "Agency Simulation", "SEO Course India", "PPC Training", "Social Media Marketing", "Pixe Education"],
    openGraph: {
        title: "Master Digital Marketing with AI | Pixe Education",
        description: "Don't just learn. Experience the Agency Life. Manage real budgets and graduate with a portfolio.",
        type: "website",
        locale: "en_IN",
        siteName: "Pixe Education",
    },
    alternates: {
        canonical: "https://pixe.education",
    }
};

export default function Home() {
    return (
        <main className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomeLanding />
            <Footer />
        </main>
    );
}
