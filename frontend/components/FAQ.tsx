"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
    className?: string;
}

const defaultFAQs: FAQItem[] = [
    {
        question: "What is the course duration?",
        answer: "Our courses range from 3 to 6 months depending on the program. Each course includes live classes, recorded sessions, assignments, and real-world projects."
    },
    {
        question: "Do you provide placement assistance?",
        answer: "Yes! We provide 100% placement assistance including resume building, mock interviews, and direct referrals to our 50+ hiring partners like Google, Amazon, Microsoft, and top startups."
    },
    {
        question: "What are the payment options?",
        answer: "We offer flexible payment options including EMI starting at ₹4,999/month, one-time payment with 10% discount, and income share agreements for select courses."
    },
    {
        question: "Can I attend classes while working?",
        answer: "Absolutely! Our classes are scheduled on weekends and evenings to accommodate working professionals. You also get lifetime access to recorded sessions."
    },
    {
        question: "What if I'm not satisfied with the course?",
        answer: "We offer a 7-day money-back guarantee. If you're not satisfied with the course within the first week, we'll refund your complete fee, no questions asked."
    },
    {
        question: "Do I get a certificate?",
        answer: "Yes, upon successful completion you'll receive an industry-recognized certificate that you can add to your LinkedIn profile and resume."
    }
];

export default function FAQ({ items = defaultFAQs, title = "Frequently Asked Questions", className = "" }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className={className}>
            {title && (
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{title}</h2>
            )}

            <div className="space-y-4 max-w-3xl mx-auto">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                            <svg
                                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                }`}
                        >
                            <div className="p-5 pt-0 text-gray-600 leading-relaxed">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
