import { MetadataRoute } from 'next';
import { cityConfigs } from '@/config/cityConfig';

const BASE_URL = 'http://localhost:3004'; // In prod this would be your domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const routes = [
        '',
        '/about',
        '/courses',
        '/success-stories',
        '/internships',
        '/hire-talent',
        '/masterclass',
        '/resources',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Courses
    let courses = [];
    try {
        const res = await fetch('http://localhost:8080/api/v1/courses', { next: { revalidate: 60 } });
        if (res.ok) courses = await res.json();
    } catch (e) {
        console.error('Sitemap course fetch failed', e);
    }

    const courseUrls = (Array.isArray(courses) ? courses : []).map((course: any) => ({
        url: `${BASE_URL}/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 3. Dynamic Blog Posts
    let posts = [];
    try {
        const res = await fetch('http://localhost:8080/api/v1/posts', { next: { revalidate: 60 } });
        if (res.ok) posts = await res.json();
    } catch (e) {
        console.error('Sitemap posts fetch failed', e);
    }

    const postUrls = (Array.isArray(posts) ? posts : []).map((post: any) => ({
        url: `${BASE_URL}/resources/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // 4. pSEO Locations (India & International)
    const locationUrls = Object.values(cityConfigs)
        .filter(city => city.slug !== 'india') // Don't index /india/india (default)
        .flatMap(city => {
            const baseUrl = city.country === 'India'
                ? `${BASE_URL}/india/${city.slug}`
                : `${BASE_URL}/locations/${city.slug}`;

            return [
                {
                    url: baseUrl, // Home Page
                    lastModified: new Date(),
                    changeFrequency: 'daily' as const,
                    priority: 0.9,
                },
                {
                    url: `${baseUrl}/advance-digital-marketing-course`, // Course Page
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.9,
                }
            ];
        });

    return [...routes, ...courseUrls, ...postUrls, ...locationUrls];
}
