"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";

interface StickyHeaderProps {
    phoneNumber?: string;
    ctaText?: string;
    showCountdown?: boolean;
}

export default function StickyHeader({
    phoneNumber = "91XXXXXXXXXX",
    ctaText = "Enroll Now",
    showCountdown = true,
}: StickyHeaderProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 400px
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Desktop Sticky Header */}
            <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm z-50 py-3 hidden md:block animate-slideDown">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="font-bold text-gray-900 dark:text-white">Pixe Education</span>
                        {showCountdown && (
                            <CountdownTimer
                                label="🔥 30% OFF ends in:"
                                className="text-sm"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href={`tel:+${phoneNumber}`}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Us
                        </a>

                        <a
                            href="#enroll-form"
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {ctaText}
                        </a>
                    </div>
                </div>
            </div>

            {/* MOBILE: Sticky Bottom CTA Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 shadow-2xl z-50 p-3 md:hidden safe-area-inset-bottom">
                <a
                    href="#enroll-form"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors min-h-[52px]"
                >
                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                    {ctaText}
                </a>
            </div>

            <style jsx>{`
                @keyframes slideDown {
                  from { transform: translateY(-100%); }
                  to { transform: translateY(0); }
                }
                .animate-slideDown { animation: slideDown 0.3s ease-out; }
                .safe-area-inset-bottom { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }
            `}</style>
        </>
    );
}
