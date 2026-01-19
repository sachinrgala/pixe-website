"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import { getCityConfig } from "@/config/cityConfig";

// Types for CMS data
interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    status?: string;
}

interface Settings {
    promoMessage?: string;
    promoLink?: string;
    siteTitle?: string;
    homeHeroHeadline?: string;
    homeHeroSubheadline?: string;
}

interface Story {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    image: string;
}

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

interface Partner {
    id: number;
    name: string;
    logo: string;
}

interface Stat {
    id: number;
    icon: string;
    label: string;
    sublabel: string;
}

// Brochure Form Component
const BrochureForm = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                body: JSON.stringify({ email, source: "home_brochure", course: "Brochure Download" })
            });
            if (res.ok) setStatus("success");
            else setStatus("error");
        } catch { setStatus("error"); }
    };

    if (status === "success") return <div className="text-green-500 font-bold">Check your email for the brochure!</div>;

    return (
        <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3">
            <input
                className="flex-1 px-5 py-3.5 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-[#334155] rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:focus:ring-[#60A5FA]/40 focus:border-[#2563EB] dark:focus:border-[#60A5FA] transition-all font-medium"
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <button className="px-8 py-3.5 bg-[#2563EB] dark:bg-[#60A5FA] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white dark:text-slate-900 font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all whitespace-nowrap" type="submit">
                {status === "submitting" ? "Sending..." : "Download Brochure"}
            </button>
        </form>
    );
};

interface HomeTemplateProps {
    city?: string;
}

export default function HomeTemplate({ city }: HomeTemplateProps) {
    const config = getCityConfig(city || "bangalore");
    const isCityPage = !!city;
    const locationName = config.name;

    const [courses, setCourses] = useState<Course[]>([]);
    const [settings, setSettings] = useState<Settings>({});
    const [stories, setStories] = useState<Story[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [stats, setStats] = useState<Stat[]>([]);

    useEffect(() => {
        // Fetch all CMS data
        Promise.all([
            fetch("/api/courses").then(res => res.json()),
            fetch("/api/settings").then(res => res.json()),
            fetch("/api/stories").then(res => res.json()),
            fetch("/api/faqs").then(res => res.json()),
            fetch("/api/partners").then(res => res.json()),
            fetch("/api/stats").then(res => res.json())
        ]).then(([coursesData, settingsData, storiesData, faqsData, partnersData, statsData]) => {
            if (Array.isArray(coursesData)) setCourses(coursesData.filter((c: any) => c.status === "published"));
            setSettings(settingsData || {});
            setStories(Array.isArray(storiesData) ? storiesData : []);
            setFaqs(Array.isArray(faqsData) ? faqsData : []);
            setPartners(Array.isArray(partnersData) ? partnersData : []);
            setStats(Array.isArray(statsData) ? statsData : []);
        }).catch(err => console.error("Home data fetch error:", err));
    }, []);

    // Dynamic Hero Logic
    const heroHeadline = isCityPage
        ? <span>Best Digital Marketing Institute in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{locationName}</span></span>
        : (settings.homeHeroHeadline || "India's Only Agency-Style Digital Marketing Institute");

    const heroSubheadline = isCityPage
        ? `Don't just learn theory. Join our ${config.status === 'active' ? 'offline' : 'online'} cohort in ${locationName} and manage real ad budgets.`
        : (settings.homeHeroSubheadline || "Don't just learn. Experience the Agency Life. Manage real budgets, use AI tools, and graduate with a portfolio that gets you hired.");


    return (
        <div className="bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white font-sans selection:bg-blue-500/20 selection:text-blue-500">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-sm font-bold text-blue-700 dark:text-blue-300 mb-8 animate-fade-in-up">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Admissions Open for {locationName} Batch 2026
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                            {heroHeadline}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {heroSubheadline}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                            <Link href="/free-counseling">
                                <button className="w-full sm:w-auto px-8 py-4 bg-[#2563EB] dark:bg-[#3B82F6] hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1">
                                    Book Free Demo in {locationName}
                                </button>
                            </Link>
                            <Link href="/courses">
                                <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all">
                                    View Syllabus
                                </button>
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-col items-center gap-4 opacity-80">
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Trusted by teams at</p>
                            <div className="flex flex-wrap justify-center gap-8 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Hardcoded Logos for reliability, replace with API partners if needed */}
                                <img src="/images/google_logo.svg" alt="Google" className="h-6 md:h-8 w-auto opacity-70 hover:opacity-100" />
                                <img src="/images/meta_logo.svg" alt="Meta" className="h-6 md:h-8 w-auto opacity-70 hover:opacity-100" />
                                <img src="/images/amazon_logo.svg" alt="Amazon" className="h-6 md:h-8 w-auto opacity-70 hover:opacity-100" />
                                <img src="/images/zomato_logo.svg" alt="Zomato" className="h-6 md:h-8 w-auto opacity-70 hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.length > 0 ? stats.map(stat => (
                            <div key={stat.id} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">{stat.label}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{stat.sublabel}</div>
                            </div>
                        )) : (
                            // Fallback Stats
                            <>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">1250+</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Students Placed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">₹4.5L</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Avg. Stipend</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">350+</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Hiring Partners</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">4.9/5</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Student Rating</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Why Us / Comparison Section - Using Hardcoded Data for Reliability as per task */}
            <section className="py-20 lg:py-24 bg-white dark:bg-[#0F172A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Pixe is Different</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">Most institutes teach you definitions. We teach you how to run an agency.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 relative group hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Other Institutes</h3>
                            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                                <li className="flex gap-2"><span className="text-red-500">×</span> Recorded theory videos</li>
                                <li className="flex gap-2"><span className="text-red-500">×</span> Outdated 2023 strategies</li>
                                <li className="flex gap-2"><span className="text-red-500">×</span> No real ad budget</li>
                                <li className="flex gap-2"><span className="text-red-500">×</span> Generic certificates</li>
                            </ul>
                        </div>

                        {/* Card 2 - Main Feature */}
                        <div className="bg-[#2563EB] text-white p-8 rounded-2xl shadow-xl shadow-blue-500/20 relative scale-105 z-10">
                            <div className="absolute top-0 right-0 p-3 bg-white/10 rounded-bl-xl text-xs font-bold uppercase tracking-wider">Recommended</div>
                            <div className="w-14 h-14 bg-white/20 text-white rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">check</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Pixe Agency Simulation</h3>
                            <ul className="space-y-3 text-blue-100">
                                <li className="flex gap-2"><span className="text-white font-bold">✓</span> Live Agency Projects</li>
                                <li className="flex gap-2"><span className="text-white font-bold">✓</span> Manage ₹50,000+ Ad Budget</li>
                                <li className="flex gap-2"><span className="text-white font-bold">✓</span> AI Tools (Midjourney, GPT-4)</li>
                                <li className="flex gap-2"><span className="text-white font-bold">✓</span> 100% Placement Guarantee</li>
                            </ul>
                            <button className="w-full mt-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">Apply Now</button>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 relative group hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">school</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Traditional Colleges</h3>
                            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                                <li className="flex gap-2"><span className="text-yellow-500">!</span> 2-Year Theory Degree</li>
                                <li className="flex gap-2"><span className="text-yellow-500">!</span> Extremely Expensive</li>
                                <li className="flex gap-2"><span className="text-yellow-500">!</span> Zero Practical Experience</li>
                                <li className="flex gap-2"><span className="text-yellow-500">!</span> Very Low ROI</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-20 lg:py-24 bg-slate-50 dark:bg-[#0B1221]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Top Rated Courses</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300">Curriculum designed by experts from Google & Meta.</p>
                        </div>
                        <Link href="/courses" className="hidden md:flex items-center gap-1 font-bold text-blue-600 hover:gap-2 transition-all">
                            View All Courses <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {courses.slice(0, 3).map(course => (
                            <div key={course.id} className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-slate-100 dark:border-slate-800">
                                <div className="aspect-video bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600">
                                        <span className="material-symbols-outlined text-4xl">image</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">{course.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">Placement Guaranteed</span>
                                        <Link href={`/${course.slug}`} className="text-blue-600 font-bold text-sm">Know More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 lg:py-24 bg-white dark:bg-[#0F172A] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Success Stories</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">Join 1250+ alumni working at top global brands.</p>
                    </div>

                    <div className="relative">
                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#0F172A] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#0F172A] to-transparent z-10 pointer-events-none"></div>

                        <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
                            {stories.length > 0 ? stories.map(story => (
                                <div key={story.id} className="min-w-[300px] md:min-w-[400px] bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 snap-center">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <img src="/images/avatar_placeholder.png" className="w-full h-full object-cover" alt={story.name} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{story.name}</h4>
                                            <p className="text-sm text-slate-500">{story.role} at {story.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 italic">"{story.quote}"</p>
                                </div>
                            )) : (
                                <div className="w-full text-center text-slate-500">Loading stories...</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / Brochure */}
            <section className="py-20 bg-slate-900 dark:bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block mb-4 p-3 bg-white/10 rounded-2xl">
                        <span className="material-symbols-outlined text-3xl text-yellow-400">menu_book</span>
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Download {locationName} Course Brochure</h2>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Get the detailed syllabus, fee structure, and placement report for our 2026 batches.</p>

                    <div className="max-w-md mx-auto">
                        <BrochureForm />
                        <p className="text-xs text-slate-500 mt-4">We respect your privacy. No spam, ever.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
