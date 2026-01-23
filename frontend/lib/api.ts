// Hardcoded for production to eliminate environment variable issues
export const API_BASE = 'https://pixe-backend-p5tbezhoga-el.a.run.app/api/v1';

// For server-side calls, use the full URL.
// For client-side calls, use the relative path (through Next.js rewrites).
export const getApiUrl = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (typeof window === 'undefined') {
        return `${API_BASE}${cleanPath}`;
    }
    // Client-side can use relative path which is handled by next.config.ts rewrites
    return `/api${cleanPath.replace('/api/v1', '')}`;
};
