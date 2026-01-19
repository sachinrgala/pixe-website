import { Metadata } from 'next';
import { CourseLandingTemplate } from "@/components/templates/CourseLandingTemplate";
import { getCityConfig, isValidLocation } from "@/config/cityConfig";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city: citySlug } = await params;
    if (!isValidLocation(citySlug)) {
        return notFound();
    }
    const config = getCityConfig(citySlug);
    const city = config.name;

    return {
        title: `Advanced AI Digital Marketing Course in ${city} | Pixe`,
        description: config.description_override || `Master AI-Agentic Marketing in ${city}. Learn Python for SEO, AutoGPT, and SGE Optimization. 100% Practical Training with Live Projects.`,
        keywords: [
            `Digital Marketing Course in ${city}`,
            `AI Marketing Course ${city}`,
            `Digital Marketing Institute ${city}`,
            `Agentic AI Marketing Training`,
            `Advanced SEO Course ${city}`
        ],
        openGraph: {
            title: `AI Digital Marketing Course in ${city} | Pixe`,
            description: `Future-proof your career with Pixe's Advanced Agentic Marketing Course in ${city}.`,
            images: ['/images/tools_banner.png'],
        }
    };
}

export default async function CityCoursePage({ params }: Props) {
    const { city: citySlug } = await params;
    if (!isValidLocation(citySlug)) {
        notFound();
    }
    const config = getCityConfig(citySlug);
    const city = config.name;

    // JSON-LD for Local SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `Advanced Agentic Digital Marketing Course in ${city}`,
        "description": `Master AI-driven marketing with Python, AutoGPT, and SGE optimization in ${city}.`,
        "provider": {
            "@type": "Organization",
            "name": "Pixe",
            "sameAs": "https://pixe.com"
        },
        "offers": {
            "@type": "Offer",
            "category": "Education",
            "priceCurrency": "INR",
            "price": "45000",
            "availability": "https://schema.org/InStock",
            "url": `https://www.pixe.com/india/${citySlug.toLowerCase()}/advance-digital-marketing-course`
        },
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "Blended",
            "location": `${city} & Online`
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CourseLandingTemplate city={city} />
        </>
    );
}
