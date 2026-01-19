import React from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

export const FAQAccordion: React.FC<{ items: FAQItemProps[] }> = ({ items }) => {
    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <details
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 open:border-primary dark:open:border-primary/50 transition-colors duration-200"
                >
                    <summary className="flex justify-between items-center cursor-pointer p-4 font-bold text-[#111318] dark:text-white select-none">
                        <span className="pr-4">{item.question}</span>
                        <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 shrink-0">
                            expand_more
                        </span>
                    </summary>
                    <div className="p-4 pt-0 text-sm text-[#616f89] dark:text-gray-300 border-t border-transparent group-open:border-gray-100 dark:group-open:border-gray-700 mt-0 transition-all duration-300 animate-in fade-in slide-in-from-top-1">
                        <div className="pt-2">
                            {item.answer}
                        </div>
                    </div>
                </details>
            ))}
        </div>
    );
};
