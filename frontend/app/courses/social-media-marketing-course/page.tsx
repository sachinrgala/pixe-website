import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export const metadata: Metadata = {
    title: "Advanced Social Media Marketing Course with AI | Pixe Education",
    description: "Master AI-driven social media marketing in 8 weeks. Learn Instagram viral strategies, Meta Ads, and content automation. Rated #1 SMM Course in India.",
    keywords: ["Social Media Marketing Course", "SMM Certification", "AI Marketing Course", "Instagram Growth Strategy", "Meta Ads Training", "Digital Marketing India"],
    openGraph: {
        title: "Advanced SMM Course: Master AI & Viral Content | Pixe",
        description: "Don't just post. Dominate. Join the only AI-native Social Media Marketing program designed for 2026.",
        images: ["/images/courses/smm/hero.png"],
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: "https://www.pixe.education/courses/social-media-marketing-course",
    }
};

const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Course",
            "name": "Advanced Social Media Marketing with AI",
            "description": "A comprehensive 8-week program mastering data-driven strategies, viral content creation, and ROI-focused paid advertising using modern AI tools.",
            "provider": {
                "@type": "Organization",
                "name": "Pixe Education",
                "sameAs": "https://www.pixe.education"
            },
            "educationalCredentialAwarded": "Advanced Social Media Marketing Specialist",
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "courseWorkload": "PT4H"
            },
            "offers": {
                "@type": "Offer",
                "category": "Paid",
                "price": "45000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
            }
        },
        {
            "@type": "Product",
            "name": "Social Media Marketing Certification Program",
            "image": "https://www.pixe.education/images/courses/smm/hero.png",
            "description": "Professional certification in AI-Augmented Social Media Marketing.",
            "brand": {
                "@type": "Brand",
                "name": "Pixe"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1240"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "45000",
                "priceValidUntil": "2026-12-31"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Do I need to be on camera?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely not. We have a dedicated module on Faceless Organic Growth — how to build massive brands without ever showing your face."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is this only for Gen-Z?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. This is for anyone who understands that Attention is the new currency. We've trained founders, corporate VPs, and students alike."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Will I get a certificate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, you will receive an industry-recognized 'Advanced Social Media Marketing Specialist' certification from Pixe."
                    }
                }
            ]
        }
    ]
};

export default function SMMCoursePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />
            <div className="bg-background text-foreground font-body antialiased selection:bg-primary/20 selection:text-primary pb-24 md:pb-0 relative">


                <main className="">
                    <ExitIntentPopup
                        course="social-media-marketing"
                        title="Wait! Get the Full SMM Roadmap?"
                        description="We've compiled a 2026 Social Media Strategy Checklist including the top 50 AI Tools."
                        buttonText="Get Free Checklist"
                        targetId="enroll-form"
                    />

                    {/* Hero Section - Professional & Subtle */}
                    <section className="relative bg-white dark:bg-slate-950 pt-12 pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                                <div className="lg:col-span-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-primary mb-6">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Professional Certification Program
                                    </div>
                                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
                                        Advanced <span className="text-primary">Social Media Marketing</span> for Business
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                                        A comprehensive 8-week program designed for professionals and entrepreneurs. Master data-driven strategies for Brand Growth, ROI-focused Paid Ads, and Modern Content Systems.
                                    </p>

                                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm mb-10 h-[300px]">
                                        <Image
                                            src="/images/courses/smm/hero.png"
                                            alt="Professional Indian Digital Marketer"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href="#enroll-form" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                                            Enroll in Next Batch
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </Link>
                                        <Link href="#curriculum" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">description</span>
                                            Curriculum PDF
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:col-span-6" id="enroll-form">
                                    <UniversalLeadForm
                                        formId="smm-hero-business"
                                        source="smm_course_business"
                                        course="Social Media Marketing"
                                        title="Consult with an Advisor"
                                        subtitle="Get a personalized roadmap for your career or business growth."
                                        submitButtonText="Request Call Back"
                                        className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Professional Environment Section */}
                    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                                    <Image
                                        src="/images/courses/smm/training.png"
                                        alt="Corporate Training Session India"
                                        width={800}
                                        height={600}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                        Collaborative Learning for Professionals
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                        Join a network of marketing professionals and business leaders. Our program emphasizes real-world application, peer collaboration, and direct mentorship from industry experts.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "Industry-standard case study analysis",
                                            "Live workspace-style training sessions",
                                            "Access to a select professional community",
                                            "Bi-weekly performance review audits"
                                        ].map((text, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
                                                <span className="font-medium">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AI-Accelerated Workflow Section - Refined */}
                    <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Optimized Content Workflow</h2>
                                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Implementing modern AI tools to streamline content production and data analysis.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {[
                                    { step: "01", icon: "psychology", title: "Strategy", tool: "Data Research", desc: "Evidence-based topic identification." },
                                    { step: "02", icon: "edit_note", title: "Production", tool: "Professional Copy", desc: "High-impact narrative construction." },
                                    { step: "03", icon: "variable_insert", title: "Visuals", tool: "Asset Design", desc: "Clean, brand-aligned visual style." },
                                    { step: "04", icon: "movie_edit", title: "Distribution", tool: "Channel Ops", desc: "Systematic multi-platform scheduling." },
                                    { step: "05", icon: "rocket_launch", title: "Growth", tool: "Ads Optimization", desc: "ROI-focused performance scaling." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg">
                                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary font-bold shadow-sm mb-6">
                                            {item.step}
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-primary/80 mb-3">{item.tool}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Skills & Analysis Section */}
                    <section className="py-20 bg-white dark:bg-slate-950">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-12 gap-16 items-center">
                                <div className="lg:col-span-12 md:grid md:grid-cols-2 gap-16 items-center">
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">Master Business Analytics</h2>
                                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                                Move beyond vanity metrics. Learn to interpret complex data, optimize conversion funnels, and prove ROI to stakeholders with professional-grade reporting.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { title: "Funnel Analysis", icon: "filter_list" },
                                                { title: "ROI Tracking", icon: "monitoring" },
                                                { title: "Market Research", icon: "analytics" },
                                                { title: "Growth Audit", icon: "auto_graph" }
                                            ].map((skill, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                                    <span className="material-symbols-outlined text-primary">{skill.icon}</span>
                                                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{skill.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mt-8 md:mt-0">
                                        <Image
                                            src="/images/courses/smm/dashboard.png"
                                            alt="Social Media Marketing Dashboard Analysis"
                                            width={800}
                                            height={600}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 gap-12">
                        <div className="lg:col-span-2 space-y-16">
                            {/* Curriculum */}
                            <section id="curriculum">
                                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
                                <div className="space-y-4">
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden" open>
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-xs font-bold text-pink-500">01</span>
                                                <h3 className="font-bold text-foreground">Social Media Strategy &amp; Branding</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Defining Brand Voice &amp; Visual Identity</li>
                                                <li>Platform Selection (Insta vs LinkedIn vs Twitter)</li>
                                                <li>Competitor Analysis &amp; Audience Personas</li>
                                                <li>Creating a 30-Day Content Calendar</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">02</span>
                                                <h3 className="font-bold text-foreground">Content Creation &amp; Virality</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Reels &amp; Shorts Editing Masterclass</li>
                                                <li>Canva Design for Carousel Posts</li>
                                                <li>Copywriting for Captions &amp; Hooks</li>
                                                <li>Understanding Algorithms &amp; Hashtags</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">03</span>
                                                <h3 className="font-bold text-foreground">Paid Advertising (Meta + YouTube)</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            Setting up Ad Manager, Audience Targeting (Lookalike &amp; Custom), Retargeting strategies, and A/B Testing creatives.
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">04</span>
                                                <h3 className="font-bold text-foreground">Influencer Marketing &amp; Analytics</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            How to find influencers, negotiate deals, measure ROI using analytics tools, and community management.
                                        </div>
                                    </details>
                                </div>
                                <Link href="#enroll-form" className="mt-6 text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all inline-flex">
                                    Download Detailed Syllabus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </section>

                            {/* Tools Section */}
                            <section className="bg-surface rounded-3xl p-8 border border-border-color">
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tools &amp; Platforms You&apos;ll Master</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center text-xs font-bold text-blue-500">META</div>
                                        <span className="text-xs font-bold text-foreground">Ads Manager</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-teal-500/20 rounded flex items-center justify-center text-xs font-bold text-teal-500">CNV</div>
                                        <span className="text-xs font-bold text-foreground">Canva Pro</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-red-500/20 rounded flex items-center justify-center text-xs font-bold text-red-500">YT</div>
                                        <span className="text-xs font-bold text-foreground">YouTube Studio</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-purple-500/20 rounded flex items-center justify-center text-xs font-bold text-purple-500">INF</div>
                                        <span className="text-xs font-bold text-foreground">Influencer Tools</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs text-center text-muted-foreground">Learn to use these tools for live campaign management.</p>
                            </section>

                            {/* Career Impact */}
                            <section>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Career Impact</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">badge</span> Job Roles &amp; Opportunities
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["SMM Strategist", "Content Lead", "Viral Growth Specialist", "Brand Storyteller", "Creative Director"].map((role, idx) => (
                                                <span key={idx} className="px-3 py-1.5 bg-surface text-foreground text-sm font-medium rounded-full border border-border-color">{role}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-surface border-border-color border bg-surface-deep p-6 rounded-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 bg-primary/5 rounded-full blur-2xl"></div>
                                        <h4 className="font-bold text-foreground/90 dark:text-white/90 text-sm uppercase tracking-wide mb-2">Average Salary Range (CTC)</h4>
                                        <div className="text-3xl font-display font-bold mb-1 text-foreground dark:text-white">₹6L - ₹25L+</div>
                                        <p className="text-xs text-muted-foreground dark:text-white/60">Per annum (2026 Market Estimates)</p>
                                        <div className="mt-4 h-1.5 bg-border-color dark:bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-3/4 rounded-full"></div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground dark:text-white/60 mt-2 text-right">High demand for versatile creators</p>
                                    </div>
                                </div>
                            </section>

                            {/* Vertical Reels Student Showcase */}
                            <section className="py-20 bg-background overflow-hidden border-y border-border-color -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                    <div className="text-center mb-16">
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Student Masterpieces: The Reels Grid</h2>
                                        <p className="text-muted-foreground">See the viral content our students are creating in just 4 weeks of training.</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {[
                                            { title: "D2C Brand Scale", result: "+500% Growth", student: "S. Mehta", color: "from-pink-500 to-rose-500" },
                                            { title: "Viral Hook Reel", result: "1.2M Views", student: "VZ Analysis", color: "from-purple-500 to-indigo-500" },
                                            { title: "Faceless Growth", result: "10k Subs/Mo", student: "Arjun M.", color: "from-blue-500 to-cyan-500" },
                                            { title: "AI Scripted Reel", result: "85k Likes", student: "Neha K.", color: "from-orange-500 to-amber-500" }
                                        ].map((reel, idx) => (
                                            <div key={idx} className="aspect-[9/16] bg-surface rounded-3xl overflow-hidden relative group border border-border-color shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${reel.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="material-symbols-outlined text-sm text-primary">play_circle</span>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{reel.title}</span>
                                                    </div>
                                                    <div className="text-lg font-bold mb-1">{reel.result}</div>
                                                    <div className="text-[10px] text-white/70">Concept by {reel.student}</div>
                                                </div>
                                                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                                    <span className="material-symbols-outlined text-white text-sm">favorite</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Mentors - Simple & Clean */}
                            <section className="py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-5xl mx-auto">
                                    <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Your Mentors</h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {[
                                            { name: "Priya Sharma", role: "Digital Marketing Head", company: "Ex-Zomato", image: "/images/courses/smm/mentors/priya.png" },
                                            { name: "Rajesh Menon", role: "Growth Director", company: "Ex-Flipkart", image: "/images/courses/smm/mentors/rajesh.png" },
                                            { name: "Ananya Reddy", role: "Content Lead", company: "Ex-Nykaa", image: "/images/courses/smm/mentors/ananya.png" },
                                        ].map((mentor, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border-color">
                                                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                                                    <Image
                                                        src={mentor.image}
                                                        alt={mentor.name}
                                                        width={56}
                                                        height={56}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-foreground">{mentor.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{mentor.role}</p>
                                                    <p className="text-xs text-primary font-medium">{mentor.company}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Divider */}
                            <div className="border-t border-border-color my-8"></div>

                            {/* Why Choose Pixe Section */}
                            <section className="py-16 relative overflow-visible">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                    <div className="text-center mb-12">
                                        <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                                            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Pixe?</span>
                                        </h2>
                                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                            The difference between <span className="text-red-500/70 line-through decoration-red-500/30 decoration-2">Just Posting</span> and <span className="text-foreground font-bold border-b-2 border-primary">Building an Empire</span>.
                                        </p>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
                                        {/* Central VS Badge (Desktop) - Floating Animation */}
                                        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-background border-[8px] border-surface rounded-full items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.1)] animate-[float_6s_ease-in-out_infinite]">
                                            <span className="font-black text-2xl text-muted-foreground/30 italic font-mono">VS</span>
                                        </div>

                                        {/* The Old Way Card - Muted & Minimal */}
                                        <div className="bg-surface/30 border border-dashed border-border-color rounded-[2rem] p-8 lg:p-12 flex flex-col grayscale opacity-60 hover:opacity-100 transition-all duration-500 hover:border-red-500/30 group relative h-full">
                                            <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors duration-500 rounded-[2rem]"></div>
                                            <h3 className="text-center text-xl font-bold text-muted-foreground/80 mb-10 uppercase tracking-widest group-hover:text-red-500/80 transition-colors">The Ordinary Way</h3>

                                            <div className="space-y-6 flex-grow relative z-10">
                                                {[
                                                    "Outdated '2022' Static Strategies",
                                                    "Theory-Heavy, Boring Lectures",
                                                    "Generic & Repetitive Advice",
                                                    "No Real Mentor Access",
                                                    "Zero Live Project Experience"
                                                ].map((text, i) => (
                                                    <div key={i} className="flex items-center gap-5 text-muted-foreground group-hover:text-red-800/70 dark:group-hover:text-red-200/50 transition-colors">
                                                        <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 opacity-50">
                                                            <span className="material-symbols-outlined text-sm">close</span>
                                                        </div>
                                                        <span className="font-medium text-lg decoration-muted-foreground/30 line-through group-hover:decoration-transparent transition-all">{text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* The Pixe Way Card - Ultra Premium */}
                                        <div className="relative group perspective-1000">
                                            {/* Animated Glowing Border Gradient */}
                                            <div className="absolute -inset-[2px] bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-[2.2rem] blur-sm opacity-50 group-hover:opacity-100 animate-gradient-xy transition-opacity duration-500"></div>

                                            <div className="relative bg-background/80 dark:bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 lg:p-12 h-full flex flex-col shadow-2xl shadow-primary/20 transform lg:scale-105 transition-transform duration-500 overflow-visible">

                                                {/* Floating Badge - Shimmer Effect */}
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-[90%] sm:max-w-auto flex justify-center">
                                                    <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_20px_-5px_rgba(79,70,229,0.5)] border border-white/20 whitespace-nowrap overflow-hidden relative">
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-base animate-pulse">star</span>
                                                            Pixe Dominance System
                                                        </span>
                                                        {/* Shimmer Overlay */}
                                                        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                                                    </div>
                                                </div>

                                                <h3 className="text-center text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 mb-2 mt-8 uppercase tracking-wider">The Pixe Edge</h3>
                                                <p className="text-center text-xs font-bold text-muted-foreground mb-10 uppercase tracking-widest opacity-70">Top 1% Creator Framework</p>

                                                <div className="space-y-6 flex-grow relative z-10">
                                                    {[
                                                        { text: "2026 Live Algorithm Hacks", sub: "Updated Weekly", icon: "update" },
                                                        { text: "Viral Hook Psychology", sub: "Neuro-marketing Secrets", icon: "psychology" },
                                                        { text: "AI-Accelerated Workflow", sub: "Midjourney + CapCut Pro", icon: "rocket_launch" },
                                                        { text: "Private Creator Circle", sub: "Network with the Elite", icon: "groups" },
                                                        { text: "Monetization Roadmap", sub: "First ₹50L Strategy", icon: "monetization_on" }
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-5 group/item">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover/item:border-primary/50 group-hover/item:bg-primary/20 transition-all duration-300 shadow-sm">
                                                                <span className="material-symbols-outlined text-primary group-hover/item:scale-110 transition-transform">{item.icon}</span>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-foreground text-lg leading-tight group-hover/item:text-primary transition-colors">{item.text}</div>
                                                                <div className="text-xs text-muted-foreground font-medium mt-1">{item.sub}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Price/CTA Block - Enhanced */}
                                                <div className="mt-12 pt-8 border-t border-dashed border-primary/20 bg-gradient-to-b from-transparent to-primary/5 -mx-8 sm:-mx-12 -mb-12 p-6 sm:p-10 rounded-b-[2rem]">
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div className="text-center">
                                                            <div className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">Scholarship Price</div>
                                                            <div className="flex items-baseline gap-3 justify-center">
                                                                <span className="text-4xl font-display font-black text-foreground tracking-tight">₹45,000</span>
                                                                <span className="text-lg text-muted-foreground line-through decoration-red-500/50 decoration-2">₹85,000</span>
                                                            </div>
                                                            <div className="text-[10px] text-muted-foreground mt-1 flex items-center justify-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> EMI Available</div>
                                                        </div>
                                                        <Link href="#enroll-form" className="w-full max-w-[320px] bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group/btn whitespace-nowrap">
                                                            Claim Spot
                                                            <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* FAQ */}
                            <section>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">SMM Course FAQ</h2>
                                <div className="space-y-3">
                                    {[
                                        { q: "Do I need to be on camera?", a: "Absolutely not. We have a dedicated module on Faceless Organic Growth — how to build massive brands without ever showing your face." },
                                        { q: "Is this only for Gen-Z?", a: "No. This is for anyone who understands that Attention is the new currency. We've trained founders, corporate VPs, and students alike." },
                                        { q: "Will I get practical experience with AI tools?", a: "Yes! You will master Midjourney for visuals, CapCut AI for editing, and ChatGPT for viral scriptwriting and hook generation." },
                                        { q: "Do I need prior marketing experience?", a: "Not at all. The course starts with the fundamentals of branding and psychology before moving to advanced strategies. It's suitable for complete beginners." },
                                        { q: "What if I miss a live session?", a: "Don't worry! All live sessions are recorded and uploaded to your student dashboard within 24 hours for lifetime access." },
                                        { q: "Will I get a certificate upon completion?", a: "Yes, you will receive an industry-recognized 'Advanced Social Media Marketing Specialist' certification from Pixe, which you can add to your LinkedIn profile." },
                                        { q: "How much time per week is required?", a: "We recommend dedicating 4-6 hours per week. This includes watching the modules, attending live Q&A, and completing the practical assignments." },
                                        { q: "Are paid tools like Canva Pro included?", a: "We teach you how to leverage both free and paid tools. While subscriptions aren't included, we guide you on how to get student discounts and extended trials." },
                                    ].map((faq, idx) => (
                                        <details key={idx} className="bg-surface border border-border-color rounded-lg p-4 group">
                                            <summary className="font-semibold text-foreground cursor-pointer flex justify-between items-center list-none">
                                                {faq.q}
                                                <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                            </summary>
                                            <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Program Fees Card Sidebar - Styled like Advance Digital Marketing Course */}
                            <div className="bg-surface rounded-2xl shadow-sm p-6 border border-border-color" id="program-fees">
                                <h3 className="text-lg font-bold text-foreground mb-4">Program Fees</h3>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-3xl font-display font-bold text-foreground">₹45,000</span>
                                    <span className="text-sm text-muted-foreground line-through mb-1">₹65,000</span>
                                </div>
                                <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded mb-6">Limited Time Offer: Save 30%</span>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="material-symbols-outlined text-primary text-xl">credit_score</span>
                                        <span>Invest in your career for less than the cost of a daily latte. EMI starts ₹3,750/mo.</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="material-symbols-outlined text-primary text-xl">school</span>
                                        <span>Scholarships available</span>
                                    </div>
                                </div>
                                <Link href="#enroll-form" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors block text-center">
                                    Enroll Now
                                </Link>
                            </div>

                            {/* Free Masterclass CTA */}
                            <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
                                <span className="material-symbols-outlined text-4xl mb-3 block">videocam</span>
                                <h3 className="font-bold text-lg mb-2">Free SMM Masterclass</h3>
                                <p className="text-sm text-pink-100 mb-6">Join our 2-hour live session on &quot;Cracking the Instagram Algorithm&quot; this Saturday.</p>
                                <Link href="/masterclass" className="w-full py-3 bg-white text-pink-700 font-bold rounded-lg shadow-lg hover:bg-pink-50 transition-colors block">
                                    Reserve Free Seat
                                </Link>
                            </div>

                            {/* Hiring Partners */}
                            <div className="p-6 bg-surface rounded-2xl border border-border-color text-center">
                                <h4 className="font-bold text-foreground mb-4 text-sm">Our Hiring Partners</h4>
                                <div className="grid grid-cols-3 gap-4 opacity-60">
                                    {["Zomato", "Swiggy", "Nykaa", "CRED", "Boat", "LensKart"].map((partner, idx) => (
                                        <div key={idx} className="bg-background h-10 rounded flex items-center justify-center font-bold text-xs text-muted-foreground border border-border-color">{partner}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Courses */}
                    <section className="py-16 bg-background border-t border-border-color">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Related Courses</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        image: "/images/courses/related/seo.png",
                                        title: "SEO & Agentic Search Course",
                                        desc: "Master AI-native SEO, SGE optimization, and Answer Engine Optimization for 2026.",
                                        href: "/courses/seo-course"
                                    },
                                    {
                                        image: "/images/courses/related/ppc.png",
                                        title: "PPC & Performance Marketing",
                                        desc: "Learn Google Ads, Meta Ads, and data-driven paid advertising strategies.",
                                        href: "/courses/ppc-course"
                                    },
                                    {
                                        image: "/images/courses/related/digital.png",
                                        title: "Advanced Digital Marketing",
                                        desc: "Complete 360° digital marketing mastery with all channels and strategies.",
                                        href: "/advance-digital-marketing-course"
                                    },
                                ].map((course, idx) => (
                                    <a key={idx} href={course.href} className="group bg-surface rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-border-color block">
                                        <div className="aspect-[16/9] relative overflow-hidden">
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-4">{course.desc}</p>
                                            <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View Details <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                {/* Global Footer */}
                <Footer />

                {/* WhatsApp handled by global component */}


                {/* Mobile Bottom Bar */}
                <div className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border-color shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 md:hidden flex gap-3">
                    <Link href="#curriculum" className="flex-1 py-3 bg-surface border border-primary text-primary font-bold rounded-lg text-sm flex items-center justify-center">
                        Syllabus
                    </Link>
                    <Link href="#enroll-form" className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg text-sm flex items-center justify-center">
                        Apply Now
                    </Link>
                </div>
            </div >
        </>
    );
}
