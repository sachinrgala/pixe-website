import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
    image: string;
    location?: string;
    rating?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
    quote,
    name,
    role,
    image,
    location,
    rating = 5,
}) => {
    return (
        <div className="bg-white dark:bg-[#1a202c] p-6 rounded-xl relative shadow-sm h-full flex flex-col border border-[#f0f2f4] dark:border-gray-800">
            <span className="material-symbols-outlined text-5xl text-gray-100 dark:text-gray-700 absolute top-4 right-4 select-none">
                format_quote
            </span>

            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <Image
                        src={image}
                        alt={`Portrait of ${name}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-[#111318] dark:text-white leading-tight">{name}</h4>
                    <p className="text-xs text-[#616f89] dark:text-gray-400 mt-0.5">{role}</p>
                    {location && (
                        <p className="text-xs text-[#616f89] dark:text-gray-500">{location}</p>
                    )}
                </div>
            </div>

            <div className="flex gap-1 mb-3">
                {[...Array(rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-yellow-400 text-sm filled">
                        star
                    </span>
                ))}
            </div>

            <p className="text-sm text-[#616f89] dark:text-gray-300 italic relative z-10 flex-1 leading-relaxed">
                &quot;{quote}&quot;
            </p>
        </div>
    );
};
