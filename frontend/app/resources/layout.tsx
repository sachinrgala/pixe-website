import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Digital Marketing Resources, Guides & Tutorials 2024 | Pixe Education',
    description: 'Explore our comprehensive library of digital marketing resources. Master SEO, PPC, Analytics, and Social Media with expert-led articles and career guides.',
    keywords: ['Digital Marketing Tutorials', 'SEO Guides', 'GA4 Tutorials', 'Social Media Marketing', 'Career Growth', 'Pixe Education Resources', 'Marketing Strategy 2024'],
    openGraph: {
        title: 'Digital Marketing Resources & Guides | Pixe Education',
        description: 'Free expert guides to accelerate your digital marketing career.',
        type: 'website',
        locale: 'en_IN',
        images: [
            {
                url: '/images/resources/gtm_dashboard.png', // Using our hero image
                width: 1200,
                height: 630,
                alt: 'Pixe Education Resources Library',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Resources | Pixe Education',
        description: 'Level up your marketing skills with our free guides and tutorials.',
        images: ['/images/resources/gtm_dashboard.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function ResourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
