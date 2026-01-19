import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Social Media Marketing Course | Master Instagram & YouTube Growth | Pixe Education',
    description: 'Become a Certified Social Media Marketer in 8-12 weeks. Learn viral growth strategies for Instagram Reels, YouTube Shorts, and Facebook Ads. Creator-led training.',
    keywords: 'social media marketing course, instagram marketing course, youtube creator course, viral marketing training, content creation course, influencer marketing course',
    openGraph: {
        title: 'Master the Viral Algorithm | Social Media Marketing Course',
        description: 'Stop guessing. Start growing. Learn from creators who have scaled brands to 10k+ followers. Live projects, AI tools, and 3 global certifications.',
        url: 'https://pixe.education/courses/social-media-marketing-course',
        siteName: 'Pixe Education',
        locale: 'en_IN',
        type: 'website',
    },
};

export default function SocialMediaMarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
