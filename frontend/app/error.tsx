'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);

        // Attempt to log to our backend logging endpoint (client-side)
        fetch('/api/log-error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: error.message,
                stack: error.stack,
                digest: error.digest,
                path: window.location.pathname
            })
        }).catch(e => console.error("Failed to send log", e));

    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F1115] text-white font-sans">
            <div className="max-w-2xl w-full bg-[#1A1D21] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-opacity-90">

                {/* Background glow effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-8 h-8 text-red-500"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Application Application Error
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Something went wrong while rendering this page.
                            </p>
                        </div>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-red-400 border border-red-900/30 mb-8 overflow-auto max-h-64">
                        <p className="font-bold mb-2">Error Message:</p>
                        {error.message || "Unknown error occurred"}
                        {error.digest && (
                            <p className="mt-2 text-xs text-gray-500">Digest: {error.digest}</p>
                        )}
                        {error.stack && (
                            <div className="mt-4 pt-4 border-t border-red-900/30 text-xs opacity-70 whitespace-pre-wrap">
                                {error.stack}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => reset()}
                            className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            Try again
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2.5 bg-[#2A2D32] text-white font-semibold rounded-lg hover:bg-[#3A3D42] border border-gray-700 transition-colors duration-200"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
