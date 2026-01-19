import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Advanced Digital Marketing Course | 11-Month AI Flagship Program | Pixe",
    description: "India's first AI-Integrated Digital Marketing Course. Master SEO, SMM, Google Ads, and Python for Marketing in an intensive 11-month flagship program with 100% placement support.",
    keywords: ["Digital Marketing Course", "AI Digital Marketing", "Advanced SEO Course", "PPC Training", "Digital Marketing Certification India", "Marketing Automation"],
    openGraph: {
        title: "Future-Ready Digital Marketing: 11-Month Flagship Program | Pixe",
        description: "Don't just learn tools. Master the ecosystem. From coding marketing agents to managing million-dollar budgets.",
        images: ["/images/courses/adv-dm/hero.png"],
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: "https://www.pixe.education/advance-digital-marketing-course",
    }
};

const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Course",
            "name": "Advanced Digital Marketing with AI Integration",
            "description": "The most comprehensive digital marketing program in India, covering 360-degree strategies from SEO and PPC to AI Automation and Python for Marketers.",
            "provider": {
                "@type": "Organization",
                "name": "Pixe Education",
                "sameAs": "https://www.pixe.education"
            },
            "educationalCredentialAwarded": "Masters in Digital Strategy & AI",
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Blended",
                "location": "Bangalore & Online",
                "courseWorkload": "PT11M"
            },
            "offers": {
                "@type": "Offer",
                "category": "Paid",
                "price": "85000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
            }
        },
        {
            "@type": "Product",
            "name": "Flagship Digital Marketing Program",
            "image": "https://www.pixe.education/images/courses/adv-dm/hero.png",
            "description": "11-Month Advanced Certification in AI-Driven Digital Marketing.",
            "brand": {
                "@type": "Brand",
                "name": "Pixe"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2150"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "85000",
                "priceValidUntil": "2026-12-31"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Why is this course 11 months long?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "This is a flagship 'Masters-level' program. We don't rush. You spend 2 months on foundations, 6 months on specialization (SEO/PPC/SMM), and 3 months on AI automation and Capstone projects."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do I need coding knowledge?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No prior coding knowledge is required. However, we DO teach you 'Python for Marketers' from scratch to help you automate tasks and analyze data better than 99% of marketers."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the placement support?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We offer 100% placement assistance. Our dedicated placement cell partners with 500+ top agencies and brands in India and abroad."
                    }
                }
            ]
        }
    ]
};

export default function AdvanceDigitalMarketingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />
            <div className="bg-background text-foreground font-body antialiased selection:bg-primary/20 selection:text-primary pb-24 md:pb-0 relative">

                <main className="">
                    <ExitIntentPopup
                        course="advanced-digital-marketing"
                        title="Download the 2026 Career Handbook?"
                        description="Get the full syllabus + our 'Future of Marketing Jobs' report."
                        buttonText="Get Free Handbook"
                        targetId="enroll-form"
                    />

                    {/* Hero Section */}
                    <section className="relative bg-white dark:bg-slate-950 pt-8 pb-12 md:pt-12 md:pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                                <div className="lg:col-span-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-primary mb-6">
                                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                        India&apos;s Only AI-First Flagship Program
                                    </div>
                                    <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 leading-[1.1] text-slate-900 dark:text-white">
                                        Become a Future-Ready <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Digital Leader</span>
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                                        The most advanced 11-month curriculum. Master the entire ecosystem: SEO, Ads, Content, and <span className="text-foreground font-bold">Code Marketing Agents</span>.
                                    </p>

                                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm mb-10 h-[300px]">
                                        <Image
                                            src="/images/courses/adv-dm/hero.png"
                                            alt="Futuristic Digital Marketing Command Center"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href="#enroll-form" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                                            Apply for 2026 Batch
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </Link>
                                        <Link href="#curriculum" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">download</span>
                                            Download Brochure
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:col-span-6" id="enroll-form">
                                    <UniversalLeadForm
                                        formId="adv-dm-hero"
                                        source="adv_dm_course_page"
                                        course="Advanced Digital Marketing"
                                        title="Book Career Counselling"
                                        subtitle="Speak to a Senior Mentor about your eligibility."
                                        submitButtonText="Schedule Free Call"
                                        className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Professional Environment Section */}
                    <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                                    <Image
                                        src="/images/courses/adv-dm/training.png"
                                        alt="Advanced Marketing Classroom"
                                        width={800}
                                        height={600}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                        Not Just a Course. <br />A Career Transformation.
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                        This program is designed for those who want to reach the C-Suite. We move beyond basic execution to teach you strategy, data handling, and team leadership.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "11 Months of intensive, hands-on training",
                                            "2 Months of Paid Internship guaranteed",
                                            "Manage real ad budgets (₹50k+ provided)",
                                            "Learn Python & SQL for Data Analysis"
                                        ].map((text, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <span className="material-symbols-outlined text-primary font-bold">verified</span>
                                                <span className="font-medium">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 360-Degree Skill Stack */}
                    <section className="py-12 md:py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Complete 360° Digital Mastery</h2>
                                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We cover every single channel, tool, and strategy used by top digital agencies today.</p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-6">
                                {[
                                    { icon: "search", title: "SEO & SGE", desc: "Rank on Google & AI Search" },
                                    { icon: "campaign", title: "Social Media", desc: "Viral Organic Growth" },
                                    { icon: "ads_click", title: "Performance", desc: "Facebook & Google Ads" },
                                    { icon: "code", title: "Automation", desc: "Python & AI Agents" },
                                    { icon: "analytics", title: "Analytics", desc: "GA4, SQL & PowerBI" },
                                    { icon: "store", title: "E-Commerce", desc: "Shopify & Amazon Scale" }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg text-center flex flex-col items-center justify-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary font-bold shadow-sm mb-3 sm:mb-4">
                                            <span className="material-symbols-outlined text-2xl sm:text-3xl">{item.icon}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm leading-tight">{item.title}</h3>
                                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* AI Dashboard Section */}
                    <section className="py-12 md:py-20 bg-white dark:bg-slate-950">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-12 gap-16 items-center">
                                <div className="lg:col-span-12 md:grid md:grid-cols-2 gap-16 items-center">
                                    <div className="space-y-8 order-2 md:order-1">
                                        <div>
                                            <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold mb-4">
                                                New Module
                                            </div>
                                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Marketing + Data Science</h2>
                                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                                The average marketer guesses. The Pixe Marketer <i>knows</i>. We teach you how to build custom dashboards, scrape competitor data, and use Predictive AI to forecast trends.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { title: "Predictive Analytics", icon: "troubleshoot" },
                                                { title: "Competitor Scraping", icon: "bug_report" },
                                                { title: "CRM Integration", icon: "hub" },
                                                { title: "Automated Reporting", icon: "summarize" }
                                            ].map((skill, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                                    <span className="material-symbols-outlined text-primary">{skill.icon}</span>
                                                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{skill.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mt-8 md:mt-0 order-1 md:order-2">
                                        <Image
                                            src="/images/courses/adv-dm/dashboard.png"
                                            alt="AI Marketing Intelligence Dashboard"
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
                    <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 gap-8 md:gap-12">
                        <div className="lg:col-span-2 space-y-16">
                            {/* Curriculum */}
                            <section id="curriculum">
                                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
                                <div className="space-y-4">
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden" open>
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">01</span>
                                                <h3 className="font-bold text-foreground">Foundation &amp; Website Creation</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Digital Marketing Fundamentals &amp; Consumer Psychology</li>
                                                <li>WordPress Dev: Elementor, Hosting, &amp; Domain Management</li>
                                                <li>Landing Page UI/UX Optimization</li>
                                                <li>Setting up Google Analytics 4 &amp; Search Console</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">02</span>
                                                <h3 className="font-bold text-foreground">Authoritative SEO &amp; Content</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Keyword Research in the Age of AI</li>
                                                <li>On-Page, Off-Page, and Technical SEO audit</li>
                                                <li>Local SEO &amp; GMB Optimization</li>
                                                <li>SGE (Search Generative Experience) Optimization</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">03</span>
                                                <h3 className="font-bold text-foreground">Advanced Performance Marketing</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Google Ads: Search, Display, Video, &amp; Shopping</li>
                                                <li>Meta Ads: Scaling via CBO &amp; Lookalikes</li>
                                                <li>LinkedIn &amp; Twitter Ads for B2B</li>
                                                <li>Programmatic Advertising Basics</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">04</span>
                                                <h3 className="font-bold text-foreground">Data Science &amp; AI Automation</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Python Basics for Marketers</li>
                                                <li>Building simple Automations (Zapier + APIs)</li>
                                                <li>Fine-tuning LLMs for Brand Voice</li>
                                                <li>Automated Reporting Dashboards (Looker Studio)</li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <Link href="#enroll-form" className="mt-6 text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all inline-flex">
                                    Download Full 11-Month Syllabus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </section>

                            {/* Tools Section */}
                            <section className="bg-surface rounded-3xl p-8 border border-border-color my-16">
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Enterprise Tools Stack</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { name: "Google Ads (360)", icon: "ads_click", color: "text-blue-500" },
                                        { name: "Meta Business Suite", icon: "social_leaderboard", color: "text-blue-600" },
                                        { name: "Ahrefs / Semrush", icon: "search", color: "text-orange-500" },
                                        { name: "Google Analytics 4", icon: "analytics", color: "text-yellow-500" },
                                        { name: "Tableau / Looker", icon: "query_stats", color: "text-blue-400" },
                                        { name: "Python / Pandas", icon: "code", color: "text-green-500" },
                                        { name: "HubSpot CRM", icon: "hub", color: "text-orange-600" },
                                        { name: "Midjourney / DALL-E", icon: "image", color: "text-purple-500" },
                                    ].map((tool, i) => (
                                        <div key={i} className="flex flex-col items-center justify-center p-4 bg-background rounded-xl border border-border-color gap-2 hover:border-primary/50 transition-colors">
                                            <span className={`material-symbols-outlined text-3xl ${tool.color}`}>{tool.icon}</span>
                                            <span className="font-bold text-sm text-foreground text-center">{tool.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Mentors Section */}
                            <section className="py-12">
                                <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Learn from Agency Leaders</h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { name: "Rajesh Menon", role: "Head of Performance", company: "Ex-Ogilvy", image: "/images/courses/smm/mentors/rajesh.png" },
                                        { name: "Priya Sharma", role: "Director of AI Strategy", company: "Pixe Labs", image: "/images/courses/smm/mentors/priya.png" },
                                        { name: "Ananya Reddy", role: "Brand Storyteller", company: "Ex-Google", image: "/images/courses/smm/mentors/ananya.png" },
                                    ].map((mentor, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border-color hover:shadow-md transition-shadow">
                                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                                                <Image
                                                    src={mentor.image}
                                                    alt={mentor.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground text-lg">{mentor.name}</h4>
                                                <p className="text-sm text-muted-foreground">{mentor.role}</p>
                                                <p className="text-xs text-primary font-bold mt-1">{mentor.company}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Why Choose Pixe Section - Adapted */}
                            <section className="py-12 relative overflow-visible">
                                <div className="text-left mb-8">
                                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                                        The <span className="text-primary">Difference</span>
                                    </h2>
                                    <p className="text-muted-foreground">Why 90% of our graduates get hired within 30 days.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-surface border border-dashed border-border-color p-8 rounded-2xl opacity-70 hover:opacity-100 transition-opacity">
                                        <h3 className="font-bold text-lg mb-4 text-muted-foreground">Typical Institute</h3>
                                        <ul className="space-y-4">
                                            {["Teaches outdated 2021 tactics", "Uses dummy data for practice", "Generic certification", "Mentors are just 'trainers'"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground line-through decoration-red-500/50">
                                                    <span className="material-symbols-outlined text-red-500 text-sm">close</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-surface border border-primary/30 p-8 rounded-2xl shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-full blur-3xl"></div>
                                        <h3 className="font-bold text-lg mb-4 text-foreground">Pixe Ecosystem</h3>
                                        <ul className="space-y-4 relative z-10">
                                            {["Live AI-Integrated Curriculum", "Real Budget (₹50k) for Ads", "Google & HubSpot Certified", "Mentors are Agency Founders"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* FAQ */}
                            <section>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Common Questions</h2>
                                <div className="space-y-3">
                                    {[
                                        { q: "Why is this course 11 months long?", a: "This is a flagship 'Masters-level' program. You attend 2 months of foundations, 6 months of specialization, and 3 months of AI automation/Code Capstone. It's designed to replace an MBA in Marketing." },
                                        { q: "Do I need coding knowledge?", a: "No. We teach 'Python for Marketers' from absolute scratch. If you can use Excel, you can learn this. It gives you a massive unfair advantage in the job market." },
                                        { q: "Is placement guaranteed?", a: "We provide 100% placement assistance. We don't stop sending you to interviews until you are placed. Our Placement Cell works with 500+ partners." },
                                        { q: "Can I do this part-time?", a: "Yes, we have weekend batches for working professionals, though the duration may extend slightly to ensure all modules are covered." },
                                        { q: "What is the starting salary?", a: "Freshers typically start between ₹4.5L to ₹8L per annum. experienced professionals often see a 40-60% hike after this certification." },
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

                        {/* Sidebar - FIXED STICKY STRUCTURE */}
                        <div className="space-y-8">
                            <div className="sticky top-24 space-y-8">
                                {/* Program Fees Card */}
                                <div className="bg-surface rounded-2xl shadow-sm p-6 border border-border-color" id="program-fees">
                                    <h3 className="text-lg font-bold text-foreground mb-4">Flagship Program Fees</h3>
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-3xl font-display font-bold text-foreground">₹85,000</span>
                                        <span className="text-sm text-muted-foreground line-through mb-1">₹1,20,000</span>
                                    </div>
                                    <span className="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 text-xs font-bold px-2 py-1 rounded mb-6">Early Bird: Save ₹35k</span>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="material-symbols-outlined text-primary text-xl">payments</span>
                                            <span>No Cost EMI options available</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                                            <span>Includes ₹15k worth paid tools</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                                            <span>100% Placement Support</span>
                                        </div>
                                    </div>
                                    <Link href="#enroll-form" className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02] block text-center mb-3">
                                        Secure Your Seat
                                    </Link>
                                    <p className="text-xs text-center text-muted-foreground">Batch filling fast. Next cohort starts Feb 1st.</p>
                                </div>

                                {/* Hiring Partners */}
                                <div className="p-6 bg-surface rounded-2xl border border-border-color text-center">
                                    <h4 className="font-bold text-foreground mb-4 text-sm">Alumni Placed At</h4>
                                    <div className="grid grid-cols-2 gap-3 opacity-70">
                                        {["Google", "Amazon", "Flipkart", "Ogilvy", "GroupM", "Dentsu"].map((partner, idx) => (
                                            <div key={idx} className="bg-background py-2 rounded flex items-center justify-center font-bold text-xs text-muted-foreground border border-border-color">{partner}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Courses */}
                    <section className="py-12 md:py-16 bg-background border-t border-border-color">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Specialized Modules</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        image: "/images/courses/smm/hero.png",
                                        title: "Social Media Marketing",
                                        desc: "Specialized 8-week certification for SMM & Viral Growth.",
                                        href: "/courses/social-media-marketing-course"
                                    },
                                    {
                                        image: "/images/courses/related/seo.png", // Assuming this exists from previous work
                                        title: "SEO Masterclass",
                                        desc: "Advanced Technical SEO & Programmatic SEO training.",
                                        href: "/courses/seo-course"
                                    },
                                    {
                                        image: "/images/courses/wordpress/hero.png", // Assuming this is where I put the WP image earlier
                                        title: "WordPress Development",
                                        desc: "No-Code Website Building for Freelancers.",
                                        href: "/courses/wordpress-development-course"
                                    },
                                ].map((course, idx) => (
                                    <Link key={idx} href={course.href} className="group bg-surface rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-border-color block">
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
                                            <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View Program <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />

                {/* Mobile Bottom Bar */}
                <div className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border-color shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 md:hidden flex gap-3">
                    <Link href="#program-fees" className="flex-1 py-3 bg-surface border border-primary text-primary font-bold rounded-lg text-sm flex items-center justify-center">
                        Fees
                    </Link>
                    <Link href="#enroll-form" className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg text-sm flex items-center justify-center">
                        Apply Now
                    </Link>
                </div>

            </div >
        </>
    );
}
