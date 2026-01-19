"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import DOMPurify from "dompurify";

interface PageData {
    title: string;
    updated_at: string;
    sections: {
        content: string;
    };
}

export default function RefundPage() {
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        fetch("/api/pages/refund")
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white font-body">
            <section className="pt-32 pb-20 px-4 container mx-auto max-w-4xl">
                {!data ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-8"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display">{data.title}</h1>
                        <p className="text-sm text-slate-500 mb-8">Last updated: {new Date(data.updated_at).toLocaleDateString()}</p>
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.sections.content) }}
                        />
                    </>
                )}
            </section>
            <Footer />
        </div>
    );
}
