import Link from 'next/link';
import { headers } from 'next/headers';

export default async function NotFound() {
    const headersList = await headers();
    const domain = headersList.get('host');
    // In Next.js server components we can't easily get the full path without headers or middleware tricks

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F1115] text-white font-sans">
            <div className="max-w-md w-full text-center">
                <div className="mb-6 relative inline-block">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                    <h1 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 relative z-10">
                        404
                    </h1>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-white">
                    Page Not Found
                </h2>

                <p className="text-gray-400 mb-8">
                    The page you are looking for does not exist or has been moved.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                    Return Home
                </Link>

                {/* Debug info (optional but fits user request) */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-xs text-gray-600 font-mono">
                    Status: 404 Not Found
                </div>
            </div>
        </div>
    );
}
