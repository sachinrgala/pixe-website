import Link from "next/link";
import { Metadata } from 'next';
import { getCityConfig, isValidLocation } from "@/config/cityConfig";
import { notFound } from "next/navigation";
import CityLandingTemplate from "@/components/templates/CityLandingTemplate";

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
        title: `Digital Marketing Course in ${city} with AI (Agency-Based Training)`,
        description: `Join Pixe Education's ${city} cohort. Master SEO, PPC & AI Marketing with live projects. 100% Placement Support in ${city}.`,
        keywords: [
            `Digital Marketing Course in ${city}`,
            `Digital Marketing Institute ${city}`,
            `SEO Course ${city}`,
            `PPC Training ${city}`,
            `Pixe Education ${city}`
        ],
        openGraph: {
            title: `Best Digital Marketing Institute in ${city} | Pixe Education`,
            description: `Don't just learn. Experience the Agency Life in ${city}.`,
            images: ['/images/classroom_indian.png'],
        },
        alternates: {
            canonical: `https://pixe.education/india/${config.slug}`
        }
    };
}

export default async function LocalHomePage({ params }: Props) {
    const { city: citySlug } = await params;
    if (!isValidLocation(citySlug)) {
        notFound();
    }
    const config = getCityConfig(citySlug);

    // JSON-LD for Local Business
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": `Pixe Education ${config.name}`,
        "url": `https://pixe.education/india/${config.slug}`,
        "logo": "https://pixe.education/logo.png",
        "description": `Pixe Education's ${config.name} center offering AI-Integrated Digital Marketing Courses.`,
        "address": config.address ? {
            "@type": "PostalAddress",
            "streetAddress": config.address,
            "addressLocality": config.name,
            "addressCountry": "IN"
        } : undefined,
        "areaServed": {
            "@type": "City",
            "name": config.name
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CityLandingTemplate city={config.slug} />
        </>
    );
}
