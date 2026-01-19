import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pixe Education',
        short_name: 'Pixe',
        description: 'Transform Your Career with Industry-Leading Certification Programs',
        start_url: '/',
        display: 'standalone',
        background_color: '#1a1d21',
        theme_color: '#3b82f6',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
