"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

const cityData: Record<string, { title: string; desc: string }> = {
    "delhi": { title: "Delhi", desc: "Capital of India" },
    "mumbai": { title: "Mumbai", desc: "Financial Capital" },
    "bangalore": { title: "Bangalore", desc: "Silicon Valley of India" },
    "pune": { title: "Pune", desc: "Oxford of the East" },
    "uae": { title: "UAE", desc: "Dubai, Abu Dhabi & Sharjah" },
    "us": { title: "United States", desc: "Online Global Cohort" }
};

export default function CityPage() {
    const params = useParams();
    const citySlug = params?.city as string;
    const city = cityData[citySlug] || { title: citySlug, desc: "Online" };
    const cityName = city.title.charAt(0).toUpperCase() + city.title.slice(1);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-foreground">

            {/* Hero */}
            <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary/10 to-transparent text-center">
                <div className="container mx-auto max-w-4xl">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                        Best Digital Marketing Course in {cityName}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Master Digital Marketing in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{cityName}</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
                        Join Pixe Education's industry-leading certification program. Learn from {cityName}'s top experts and get placed in top companies.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/digital-marketing-courses" className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition-all">
                            View Courses
                        </Link>
                        <Link href="/contact" className="px-8 py-3 bg-surface dark:bg-surface-deep hover:bg-surface-deep dark:hover:bg-background-dark border border-border-color dark:border-gray-700 rounded-lg font-bold transition-all">
                            Contact {cityName} Center
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us in City */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-white dark:bg-surface rounded-xl border border-border-color dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">school</span>
                            <h3 className="font-bold text-xl mb-2">Classroom & Online</h3>
                            <p className="text-text-muted">Flexible training options available in {cityName}.</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-surface rounded-xl border border-border-color dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow">
                            <span className="material-symbols-outlined text-4xl text-purple-500 mb-4">work</span>
                            <h3 className="font-bold text-xl mb-2">{cityName} Placements</h3>
                            <p className="text-text-muted">Exclusive tie-ups with startups and agencies in {cityName}.</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-surface rounded-xl border border-border-color dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow">
                            <span className="material-symbols-outlined text-4xl text-green-500 mb-4">groups</span>
                            <h3 className="font-bold text-xl mb-2">Local Community</h3>
                            <p className="text-text-muted">Join a network of 2000+ marketers from {cityName}.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
