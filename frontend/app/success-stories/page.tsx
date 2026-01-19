"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";

interface Story {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    image: string;
}

export default function SuccessStoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        fetch("/api/stories").then(res => res.json()).then(setStories).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-foreground">

            <section className="pt-24 pb-10 px-4 lg:pt-32 lg:pb-20 bg-gradient-to-b from-primary/10 to-transparent text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tech Hall of Fame</h1>
                <p className="text-xl text-text-muted">See how Pixe education has transformed careers.</p>
            </section>

            <section className="py-10 lg:py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto snap-x no-scrollbar pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                        {stories.map(story => (
                            <div key={story.id} className="min-w-[85vw] md:min-w-0 snap-center bg-white dark:bg-surface p-6 md:p-8 rounded-xl border border-border-color dark:border-gray-800 flex flex-col h-full hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center font-bold text-lg text-white">
                                        {story.image || story.name.substring(0, 2)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{story.name}</h3>
                                        <p className="text-sm text-primary">{story.role} at {story.company}</p>
                                    </div>
                                </div>
                                <div className="mb-6 flex-grow">
                                    <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 text-xl mb-2 block">format_quote</span>
                                    <p className="text-text-muted italic">{story.quote}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
