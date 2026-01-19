"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

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

    if (status === "success") return (
        <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-bold animate-in fade-in zoom-in">
            <span className="material-symbols-outlined mr-2">check_circle</span>
            Brochure sent to your email!
        </div>
    );

    return (
        <form onSubmit={handleDownload} className="relative max-w-lg mx-auto">
            <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 material-symbols-outlined z-10">mail</span>
                <input
                    className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium shadow-sm hover:shadow-md"
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button
                    className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? (
                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</span>
                    ) : (
                        "Download"
                    )}
                </button>
            </div>
            <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-3 flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Updated for 2026 Curriculum
            </p>
        </form>
    );
};

export default function HomeLanding() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [settings, setSettings] = useState<Settings>({});
    const [stories, setStories] = useState<Story[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [stats, setStats] = useState<Stat[]>([]);

    useEffect(() => {
        // Fetch all CMS data
        fetch("/api/courses").then(r => r.json()).then(data => {
            if (Array.isArray(data)) setCourses(data.filter(c => c.status === "published").slice(0, 3));
        }).catch(() => { });

        fetch("/api/settings").then(r => r.json()).then(data => {
            setSettings(data || {});
        }).catch(() => { });

        fetch("/api/stories").then(r => r.json()).then(data => {
            if (Array.isArray(data)) setStories(data.slice(0, 3));
        }).catch(() => { });

        fetch("/api/faqs").then(r => r.json()).then(data => {
            if (Array.isArray(data)) setFaqs(data);
        }).catch(() => { });

        fetch("/api/partners").then(r => r.json()).then(data => {
            if (Array.isArray(data)) setPartners(data);
        }).catch(() => { });

        fetch("/api/stats").then(r => r.json()).then(data => {
            if (Array.isArray(data)) setStats(data.slice(0, 6));
        }).catch(() => { });
    }, []);

    // Course images from wireframe
    const courseImages = [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    ];

    const defaultCourses = [
        {
            title: "Advance Digital Marketing",
            slug: "advance-digital-marketing-course",
            features: ["AI-Driven SEO Strategy", "Google & Meta Ads Mastery", "Analytics & ROAS Optimization"],
            badge: "Most Popular"
        },
        {
            title: "Social Media Marketing",
            slug: "courses/social-media-marketing-course",
            features: ["Instagram & LinkedIn Growth", "Viral Content Strategy", "Influencer Collaboration"],
            badge: null
        },
        {
            title: "PPC & Performance Marketing",
            slug: "courses/ppc-course",
            features: ["Google Ads Certification", "Facebook Ad scaling", "Conversion Rate Optimization"],
            badge: null
        }
    ];

    return (
        <div className="bg-[#F9FAFB] dark:bg-[#0F172A] text-[#111827] dark:text-[#F1F5F9] font-body antialiased selection:bg-primary/20 selection:text-primary pb-20 md:pb-0">

            {/* Global Header Used */}

            <div className="w-full">

                {/* HERO SECTION */}
                <section className="relative pt-8 pb-12 lg:pt-24 lg:pb-32 overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {/* Premium Abstract Background */}
                        <div className="absolute inset-0 bg-[#F8FAFC] dark:bg-[#020617]"></div>
                        <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100 dark:border-blue-800 animate-fade-in-up">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Admissions Open for 2026 Batch
                            </div>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                                Don't Just Learn. <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Master the System.</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                India's first <strong>Agency-Simulation Program</strong>. Manage real ad budgets (₹50k/student), use premium AI tools, and build a career-ready portfolio.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <span className="material-symbols-outlined text-green-500">verified</span>
                                    100% Placement Support
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <span className="material-symbols-outlined text-purple-500">auto_awesome</span>
                                    AI-Integrated Modules
                                </div>
                            </div>
                        </div>

                        {/* Lead Form */}
                        <div className="w-full max-w-md lg:w-[480px]">
                            <UniversalLeadForm
                                formId="home-hero"
                                source="home_hero"
                                title="Book Free Counselling"
                                subtitle="Get your career roadmap today"
                                submitButtonText="Request Call Back"
                                successMessage="Request received! We'll call you shortly."
                                className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-neon border border-white/20 dark:border-slate-700 p-8 transform transition-all hover:scale-[1.01]"
                            />
                            <p className="text-xs text-center text-slate-500 mt-4 opacity-80 flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-sm">lock</span> Secure. No spam, ever.
                            </p>
                        </div>
                    </div>
                </section >

                {/* TRUST & STATS SECTION - REDESIGNED */}
                <section className="bg-white dark:bg-[#0F172A] border-y border-slate-100 dark:border-[#334155] py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:invert"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                            {[
                                { icon: "school", label: "92%", sub: "Placement Rate", color: "text-blue-500" },
                                { icon: "payments", label: "₹4.5L+", sub: "Avg. Starting Salary", color: "text-green-500" },
                                { icon: "handshake", label: "350+", sub: "Hiring Partners", color: "text-orange-500" },
                                { icon: "groups", label: "12k+", sub: "Alumni Network", color: "text-purple-500" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#1E293B]/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-lg transition-all group">
                                    <div className={`mb-3 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${stat.color} group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                                    </div>
                                    <div className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">{stat.label}</div>
                                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.sub}</div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mb-10">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by Hiring Partners</p>
                            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-duration-500">
                                {/* SVG Placeholders for Logos ensures they always look crisp */}
                                {["Google", "Amazon", "Flipkart", "Swiggy", "Zomato", "Microsoft"].map((brand, i) => (
                                    <div key={i} className="text-2xl font-black text-slate-800 dark:text-white cursor-default hover:text-blue-600 transition-colors">{brand}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* GAP STRATEGY: Comparison Section */}
                <section className="py-12 md:py-20 bg-slate-50 dark:bg-[#020617] border-b border-slate-200 dark:border-[#334155]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Top Recruiters Prefer Pixe Graduates</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">Discover the difference between academic theory and agency simulation.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
                            {/* Traditional */}
                            <div className="bg-white dark:bg-[#0f172a] p-6 md:p-8 rounded-3xl border border-red-100 dark:border-red-900/20 shadow-sm relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                                <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                                <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-red-500">cancel</span>
                                    Traditional Institutes
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-400 mt-0.5 shrink-0">close</span>
                                        <span className="text-slate-600 dark:text-slate-400">Theory-heavy lectures & recorded videos</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-400 mt-0.5 shrink-0">close</span>
                                        <span className="text-slate-600 dark:text-slate-400">Outdated 2022 Syllabus</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-400 mt-0.5 shrink-0">close</span>
                                        <span className="text-slate-600 dark:text-slate-400">Generic "Completion Certificates"</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Pixe Advantage */}
                            <div className="bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-3xl border-2 border-[#2563EB] dark:border-[#60A5FA] shadow-xl relative overflow-hidden transform md:scale-105 z-10">
                                <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#2563EB] dark:bg-[#60A5FA] text-white text-xs font-bold rounded-bl-xl uppercase tracking-wider">
                                    The Pixe Advantage
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2563EB] dark:text-[#60A5FA] filled">check_circle</span>
                                    Agency Simulation
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-green-500 mt-0.5 shrink-0">check</span>
                                        <span className="text-slate-700 dark:text-slate-200 font-medium"><strong>Live Agency Simulation:</strong> Manage real ad budgets.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-green-500 mt-0.5 shrink-0">check</span>
                                        <span className="text-slate-700 dark:text-slate-200 font-medium"><strong>AI-First Curriculum:</strong> Master ChatGPT, Midjourney & Analytics AI.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-green-500 mt-0.5 shrink-0">check</span>
                                        <span className="text-slate-700 dark:text-slate-200 font-medium"><strong>Proof of Work:</strong> Graduate with a verifiable portfolio.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CERTIFICATIONS */}
                <section className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-100 dark:border-[#334155]">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Industry-Recognized Certifications</h2>
                        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-8">
                            Don't just get certified. Get recognized. Our dual-certification program is accredited by <strong>ISO</strong> and aligned with <strong>Google & Meta</strong> professional standards. Validated by top agency heads.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {/* Certificate Badges/Icons Placeholders */}
                            <div className="h-20 w-32 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                                ISO Certified
                            </div>
                            <div className="h-20 w-32 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                                Google Partner
                            </div>
                            <div className="h-20 w-32 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                                Meta Blueprint
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROGRAMS SECTION */}
                < section className="py-10 lg:py-28 bg-[#F9FAFB] dark:bg-[#0F172A]" >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Master the Skills the Market Pays For</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Focus on Outcomes, not just Features.
                            </p>
                        </div>

                        {/* Outcome Highlights Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {[
                                { icon: "rocket_launch", title: "Viral Content Strategy", desc: "Not just posting. Learn the psychology of vitality on Reels & Shorts.", color: "pink" },
                                { icon: "attach_money", title: "Performance Marketing", desc: "Stop burning cash. Master the art of profitable ad scaling.", color: "green" },
                                { icon: "search", title: "Advanced SEO & AI", desc: "Dominate Search. Use AI to automate audits and rank #1.", color: "blue" },
                                { icon: "pie_chart", title: "Data Storytelling", desc: "Beyond Analytics. Drive C-level decisions with Looker Studio.", color: "purple" }
                            ].map((item, idx) => (
                                <div key={idx} className={`bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300 group cursor-default hover:border-${item.color}-200 dark:hover:border-${item.color}-900`}>
                                    <div className={`w-12 h-12 bg-${item.color}-50 dark:bg-${item.color}-500/10 rounded-xl flex items-center justify-center text-${item.color}-500 mb-4 group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                            {defaultCourses.map((course, idx) => (
                                <div key={idx} className="min-w-[80vw] sm:min-w-[70vw] md:min-w-0 snap-center group bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm dark:shadow-soft hover:shadow-xl dark:hover:shadow-neon hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-[#334155] flex flex-col overflow-hidden relative h-full">

                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/50 shadow-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            Admissions Open
                                        </span>
                                    </div>

                                    <div className="h-48 sm:h-56 bg-cover bg-center relative group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${courseImages[idx]}")` }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                                        <div className="absolute bottom-4 left-5 right-5">
                                            {course.badge && (
                                                <span className="inline-block px-2 py-1 rounded bg-[#F59E0B] text-white text-[10px] font-bold mb-2 shadow-sm relative z-30">{course.badge}</span>
                                            )}
                                            <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight leading-snug drop-shadow-md">{course.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col relative z-10 bg-white dark:bg-[#1E293B]">
                                        <ul className="space-y-3 mb-6 flex-1">
                                            {course.features.map((feature, fidx) => (
                                                <li key={fidx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                                    <span className="material-symbols-outlined text-blue-500 text-lg shrink-0 mt-0.5">check_circle</span>
                                                    <span className="leading-snug">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={`/${course.slug}`} className="group/btn block w-full text-center py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all text-sm flex items-center justify-center gap-2">
                                            View Curriculum
                                            <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Link className="inline-flex items-center gap-2 text-[#2563EB] dark:text-[#60A5FA] font-bold hover:text-[#1D4ED8] dark:hover:text-white transition-colors group" href="/advance-digital-marketing-course">
                                Explore All Courses
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </section >

                {/* CAREER QUIZ CTA */}
                < section className="py-10 lg:py-20 bg-white dark:bg-[#020617] border-y border-slate-100 dark:border-[#334155]" >
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-6 shadow-sm dark:ring-1 dark:ring-purple-500/20 animate-bounce-slow">
                            <span className="material-symbols-outlined text-3xl">psychology_alt</span>
                        </div>
                        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Not sure which path to choose?</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                            Take our 2-minute career assessment quiz to find the perfect program based on your strengths, personality, and career goals.
                        </p>
                        <Link href="/career" className="inline-flex items-center justify-center py-4 px-8 bg-slate-900 dark:bg-white text-white dark:text-[#020617] font-bold rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            Take Career Quiz
                        </Link>
                    </div>
                </section >

                {/* SCHOLARSHIP BANNER (Section 8) */}
                <section className="bg-slate-900 dark:bg-black text-white overflow-hidden relative dark:border-b dark:border-white/5">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-20 dark:invert"></div>
                    <div className="relative max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                        <div>
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded bg-[#F59E0B] dark:bg-[#FBBF24] text-slate-900 text-xs font-bold uppercase tracking-wide mb-3">
                                <span className="material-symbols-outlined text-sm mr-1">school</span> Scholarship
                            </span>
                            <h3 className="text-2xl font-display font-bold mb-1">Merit-Based Scholarships Available</h3>
                            <p className="text-slate-300">Up to <span className="text-[#F59E0B] font-bold">₹15,000 off</span> for qualifying candidates who pass our aptitude test.</p>
                        </div>
                        <Link href="/scholarships" className="px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg shadow-white/10 whitespace-nowrap transform hover:scale-105 active:scale-95 flex items-center gap-2">
                            Check Eligibility
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </section>

                {/* TESTIMONIALS (Section 9) */}
                <section className="py-12 md:py-20 bg-slate-50 dark:bg-[#020617] border-y border-slate-200 dark:border-[#334155]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Real Stories. Real Careers.</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">See how our alumni transformed their trajectories.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Testimonial 1 */}
                            <div className="bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-700">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Priya S." className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">Priya S.</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            Senior Executive @ <span className="font-bold text-[#F59E0B]">Swiggy</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg italic text-slate-700 dark:text-slate-300 flex-1 leading-relaxed">"I had a career gap of 3 years. Pixe's practical portfolio helped me land a job at Swiggy in 2 months. The interviewers were impressed by my live campaign data."</p>
                                <div className="mt-6 flex text-[#F59E0B] gap-0.5">
                                    <span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span>
                                </div>
                            </div>
                            {/* Testimonial 2 */}
                            <div className="bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-700">
                                        <img src="https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=400&q=80" alt="Rahul K." className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">Rahul K.</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Freelance Digital Marketer</div>
                                    </div>
                                </div>
                                <p className="text-lg italic text-slate-700 dark:text-slate-300 flex-1 leading-relaxed">"The AI module is a game changer. I'm doing things manually that used to take days. Worth every rupee for the efficiency boost alone."</p>
                                <div className="mt-6 flex text-[#F59E0B] gap-0.5">
                                    <span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span><span className="material-symbols-outlined fill-current">star</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MASTERCLASS CTA (Section 10) */}
                < section className="py-10 lg:py-28 bg-[#F9FAFB] dark:bg-[#0F172A]" >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 dark:bg-[#1E293B] text-white flex flex-col md:flex-row dark:border dark:border-[#334155] group">
                            <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 dark:from-blue-500/10 to-transparent pointer-events-none"></div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-100 text-xs font-bold uppercase tracking-wider w-fit mb-6 border border-red-500/30 rounded-full animate-pulse">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Live Event
                                </span>
                                <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight">Digital Marketing 101 <br /><span className="text-blue-400">Masterclass</span></h2>
                                <p className="text-blue-100 dark:text-slate-300 mb-8 text-lg max-w-lg leading-relaxed">
                                    Stuck Deciding? Experience the Pixe Difference. Join our free session this Saturday. No commitment. Just value.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/masterclass" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2">
                                        Register for Free
                                    </Link>
                                    <Link href="/masterclass#schedule" className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                                        View Schedule
                                    </Link>
                                </div>
                            </div>
                            <div className="md:w-1/2 min-h-[300px] md:min-h-0 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=80")' }}></div>
                                <div className="absolute inset-0 bg-blue-900/60 dark:bg-[#0F172A]/60 mix-blend-multiply"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">R</div>
                                            <div>
                                                <div className="font-bold text-sm">Rohan Mehta</div>
                                                <div className="text-[10px] text-blue-200">Ex-Google, Lead Instructor</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >



                {/* FAQ SECTION (SEO Optimized) */}
                <section className="py-16 bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-[#334155]">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate-600 dark:text-slate-400">Everything you need to know about our Agency-Simulation Program.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="border border-slate-200 dark:border-[#334155] rounded-2xl p-6 bg-slate-50 dark:bg-[#1E293B]/50 hover:bg-white dark:hover:bg-[#1E293B] transition-colors">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Why is Pixe Education the best digital marketing institute in India?</h3>
                                <p className="text-slate-600 dark:text-slate-300">Pixe Education is the only institute offering an Agency-Simulation model where students manage real ad budgets and use AI tools like ChatGPT and Midjourney, ensuring practical, job-ready skills.</p>
                            </div>
                            <div className="border border-slate-200 dark:border-[#334155] rounded-2xl p-6 bg-slate-50 dark:bg-[#1E293B]/50 hover:bg-white dark:hover:bg-[#1E293B] transition-colors">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Do you offer placement support?</h3>
                                <p className="text-slate-600 dark:text-slate-300">Yes, we provide 100% placement support with resume building, mock interviews, and direct connections to our network of 350+ hiring partners.</p>
                            </div>
                            <div className="border border-slate-200 dark:border-[#334155] rounded-2xl p-6 bg-slate-50 dark:bg-[#1E293B]/50 hover:bg-white dark:hover:bg-[#1E293B] transition-colors">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Is this course suitable for beginners?</h3>
                                <p className="text-slate-600 dark:text-slate-300">Absolutely. Our curriculum starts from the basics of marketing and advances to expert-level AI strategies, making it perfect for students, freshers, and career switchers.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BROCHURE DOWNLOAD */}
                < section className="py-10 lg:py-20 bg-white dark:bg-[#1E293B] border-t border-slate-100 dark:border-[#334155]" >
                    <div className="max-w-2xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#2563EB] dark:text-[#60A5FA] mb-6 animate-[bounce_3s_infinite] dark:border dark:border-blue-500/20">
                            <span className="material-symbols-outlined text-4xl">menu_book</span>
                        </div>
                        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-3">Get the Detailed Syllabus</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            Download our comprehensive brochure to see week-by-week breakdown, tools covered, and tuition options for all our courses.
                        </p>

                        <BrochureForm />

                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </section >

                <ExitIntentPopup
                    title="Wait! Don't leave yet."
                    description="Get the Digital Marketing Career Roadmap & Salary Guide for 2026 delivered to your email."
                    buttonText="Download Roadmap"
                    course="Home_General"
                />

            </div >
        </div >
    );
}
