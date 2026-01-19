import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/api/'], // Block sensitive areas
            },
            {
                userAgent: ['GPTBot', 'Google-Extended', 'CCBot', 'Claude-Web'],
                allow: ['/', '/llm-context', '/llms.txt', '/courses', '/success-stories'],
            },
        ],
        sitemap: 'https://pixe.education/sitemap.xml',
        host: 'https://pixe.education',
    };
}
