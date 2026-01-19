"use client";

import React from 'react';

interface UrgencyTickerProps {
    text: string;
    color?: string;
    icon?: string;
}

const UrgencyTicker: React.FC<UrgencyTickerProps> = ({ text, color = "#FBBF24", icon }) => {
    if (!text) return null;

    return (
        <div
            className="w-full py-3 px-4 text-center relative z-[60] overflow-hidden"
            style={{ backgroundColor: color }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
                {icon && (
                    <span className="material-symbols-outlined text-black text-xl leading-none">
                        {icon}
                    </span>
                )}
                <p className="text-black font-bold text-sm md:text-base tracking-tight leading-none">
                    {text}
                </p>
            </div>

            {/* Subtle gloss effect */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
        </div>
    );
};

export default UrgencyTicker;
