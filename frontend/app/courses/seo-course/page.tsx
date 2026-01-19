import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Advanced SEO Masterclass | Technical & Programmatic SEO Course | Pixe",
    description: "Master Technical SEO, Programmatic SEO, and AI Search Optimization (SGE). Learn to audit 100k+ page sites and automate rankings with Python.",
    keywords: ["SEO Course", "Technical SEO Training", "Programmatic SEO", "SGE Optimization", "SEO Certification India", "Python for SEO"],
    openGraph: {
        title: "Advanced SEO Masterclass: Dominate AI Search | Pixe",
        description: "Future-proof your career. Learn Technical SEO, Schema, and how to rank in ChatGPT & Gemini.",
        images: ["/images/courses/seo/hero-v2.png"],
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: "https://www.pixe.education/courses/seo-course",
    }
};

const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Course",
            "name": "Advanced Search Engine Optimization (SEO) Masterclass",
            "description": "Deep dive into Technical SEO, Programmatic SEO, and AI Search Strategy.",
            "provider": {
                "@type": "Organization",
                "name": "Pixe Education",
                "sameAs": "https://www.pixe.education"
            },
            "educationalCredentialAwarded": "SEO Specialist Certification",
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Blended",
                "location": "Bangalore & Online",
                "courseWorkload": "PT12W"
            },
            "offers": {
                "@type": "Offer",
                "category": "Paid",
                "price": "25000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
            }
        },
        {
            "@type": "Product",
            "name": "Advanced SEO Certification",
            "image": "https://www.pixe.education/images/courses/seo/hero-v2.png",
            "description": "12-Week Intensive Program in Technical & AI SEO.",
            "brand": {
                "@type": "Brand",
                "name": "Pixe"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "850"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "25000",
                "priceValidUntil": "2026-12-31"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is this course different from basic Digital Marketing?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. This is a specialized deep-dive into SEO only. We assume you know the basics. We cover advanced Technical SEO, JS Rendering, Log File Analysis, and Python automation."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do I need to know Python?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. We teach 'Python for SEO' from scratch. You will learn scripts to automate keyword research, meta tag generation, and internal linking."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Will I work on live projects?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, you will perform technical audits on real e-commerce websites and implement schema markup."
                    }
                }
            ]
        }
    ]
};

export default function SEOCoursePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />
            <div className="bg-background text-foreground font-body antialiased selection:bg-green-500/20 selection:text-green-600 pb-24 md:pb-0 relative">

                <main className="">
                    <ExitIntentPopup
                        course="seo-masterclass"
                        title="Get the Technical SEO Checklist?"
                        description="Download our 50-point Technical SEO Audit checklist used by agencies."
                        buttonText="Get Free Checklist"
                        targetId="enroll-form"
                    />

                    {/* Hero Section */}
                    <section className="relative bg-white dark:bg-slate-950 pt-12 pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                                <div className="lg:col-span-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-xs font-semibold text-green-700 dark:text-green-400 mb-6">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Updated for SGE & AI Overviews 2026
                                    </div>
                                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
                                        Don&apos;t Just Rank. <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Dominate AI Search.</span>
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                                        The most advanced SEO training in India. Master Technical SEO, Programmatic Scaling, and <span className="text-foreground font-bold">Python Automation</span>.
                                    </p>

                                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm mb-10 h-[300px]">
                                        <Image
                                            src="/images/courses/seo/hero-v2.png"
                                            alt="Technical SEO Dashboard"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href="#enroll-form" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                                            Start Free Trial
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </Link>
                                        <Link href="#curriculum" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">download</span>
                                            Syllabus
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:col-span-6" id="enroll-form">
                                    <UniversalLeadForm
                                        formId="seo-hero"
                                        source="seo_course_page"
                                        course="SEO Masterclass"
                                        title="Get a Free Site Audit"
                                        subtitle="Schedule a call and get a free mini-audit of your website."
                                        submitButtonText="Get Free Audit"
                                        className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                                    <Image
                                        src="/images/courses/seo/training-v2.png"
                                        alt="Advanced SEO Training"
                                        width={800}
                                        height={600}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                        The &quot;Technical&quot; Edge.
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                        Content is King, but Technical is the Castle. We teach you how to build structurally perfect websites that search engines (and AI) love to crawl.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "Audit 100k+ page e-commerce sites",
                                            "Implement Schema for Rich Snippets",
                                            "Core Web Vitals Optimization",
                                            "Python Scripts for Auto-Internal Linking"
                                        ].map((text, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <span className="material-symbols-outlined text-green-600 font-bold">verified</span>
                                                <span className="font-medium">{text}</span>
                                            </div>
                                        ))}
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
                                                <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-600">01</span>
                                                <h3 className="font-bold text-foreground">Advanced Technical SEO</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Crawling, Indexing, and Rendering (JS SEO)</li>
                                                <li>Log File Analysis to optimize Crawl Budget</li>
                                                <li>Advanced Schema.org Implementation (JSON-LD)</li>
                                                <li>Core Web Vitals & Page Speed optimization</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">02</span>
                                                <h3 className="font-bold text-foreground">Programmatic &amp; AI SEO</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Building 10,000 pages with Programmatic SEO</li>
                                                <li>Optimizing for SGE (Search Generative Experience)</li>
                                                <li>Ranking in ChatGPT and Perplexity AI</li>
                                                <li>Using Python for Bulk SEO Tasks</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">03</span>
                                                <h3 className="font-bold text-foreground">Authority &amp; Link Building</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Digital PR &amp; Journalist Outreach</li>
                                                <li>Broken Link Building &amp; Resource Page Strategy</li>
                                                <li>Parasite SEO (Ranking on high DR sites)</li>
                                                <li>E-E-A-T Optimization for YMYL niches</li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                            </section>

                            {/* Tools Section */}
                            <section className="bg-surface rounded-3xl p-8 border border-border-color my-16">
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Industry Standard Tools</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { name: "Screaming Frog", icon: "pest_control", color: "text-green-500" },
                                        { name: "Ahrefs", icon: "bar_chart", color: "text-orange-500" },
                                        { name: "Semrush", icon: "query_stats", color: "text-orange-400" },
                                        { name: "Google Search Console", icon: "search", color: "text-blue-500" },
                                        { name: "Surfer SEO", icon: "article", color: "text-purple-500" },
                                        { name: "Python", icon: "code", color: "text-yellow-500" },
                                    ].map((tool, i) => (
                                        <div key={i} className="flex flex-col items-center justify-center p-4 bg-background rounded-xl border border-border-color gap-2 hover:border-green-500/30 transition-colors">
                                            <span className={`material-symbols-outlined text-3xl ${tool.color}`}>{tool.icon}</span>
                                            <span className="font-bold text-sm text-foreground text-center">{tool.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Mentors Section */}
                            <section className="py-12">
                                <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Your SEO Mentors</h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { name: "Arjun Reddy", role: "Technical SEO Lead", company: "Ex-Flipkart", image: "/images/courses/smm/mentors/rajesh.png" },
                                        { name: "Neha Gupta", role: "Head of Content", company: "Pixe Media", image: "/images/courses/smm/mentors/priya.png" },
                                        { name: "Vikram Singh", role: "Programmatic Expert", company: "SaaS Founder", image: "/images/courses/smm/mentors/ananya.png" }, // Reusing ananya for Vikram implies a gender mismatch if visual, but for placeholder reusing available files. I will swap Ananya for generic or correct gender if possible. I'll stick to Ananya file but maybe change name to 'Ananya' to match image.
                                    ].map((mentor, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border-color hover:shadow-md transition-shadow">
                                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-green-500/20">
                                                <Image
                                                    src={mentor.image}
                                                    alt={mentor.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground text-lg">{idx === 2 ? "Ananya Singh" : mentor.name}</h4> {/* Correction for 3rd image */}
                                                <p className="text-sm text-muted-foreground">{mentor.role}</p>
                                                <p className="text-xs text-green-600 font-bold mt-1">{mentor.company}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Why Choose Pixe Section */}
                            <section className="py-12 relative overflow-visible">
                                <div className="text-left mb-8">
                                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                                        Why Master <span className="text-green-600">SEO</span> with us?
                                    </h2>
                                    <p className="text-muted-foreground">Because "Keyword Stuffing" died in 2012.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-surface border border-dashed border-border-color p-8 rounded-2xl opacity-70">
                                        <h3 className="font-bold text-lg mb-4 text-muted-foreground">Other Courses</h3>
                                        <ul className="space-y-4">
                                            {["Focus on Meta Tags only", "No technical training", "Zero automation skills", "Theoretical concepts"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground line-through decoration-red-500/50">
                                                    <span className="material-symbols-outlined text-red-500 text-sm">close</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-surface border border-green-500/30 p-8 rounded-2xl shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 bg-green-500/5 rounded-full blur-3xl"></div>
                                        <h3 className="font-bold text-lg mb-4 text-foreground">Pixe Approach</h3>
                                        <ul className="space-y-4 relative z-10">
                                            {["Deep Technical Audits", "Programmatic SEO (Scale)", "Python for Automation", "Future-proof for AI Search"].map((item, i) => (
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
                                        { q: "Is this course suitable for beginners?", a: "We recommend having basic digital marketing knowledge. This is an intermediate-to-advanced course." },
                                        { q: "Will I learn coding?", a: "You will learn 'Python for SEO'. We provide pre-made scripts and teach you how to run them to automate tasks. You don't need to be a developer." },
                                        { q: "How much time is required?", a: "Expect to spend 4-6 hours per week on classes and assignments." },
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
                            <div className="sticky top-24 space-y-8">
                                {/* Program Fees Card */}
                                <div className="bg-surface rounded-2xl shadow-sm p-6 border border-border-color" id="program-fees">
                                    <h3 className="text-lg font-bold text-foreground mb-4">Course Fees</h3>
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-3xl font-display font-bold text-foreground">₹25,000</span>
                                        <span className="text-sm text-muted-foreground line-through mb-1">₹45,000</span>
                                    </div>
                                    <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded mb-6">Limited Time Offer</span>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="material-symbols-outlined text-green-600 text-xl">schedule</span>
                                            <span>12 Weeks Duration</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="material-symbols-outlined text-green-600 text-xl">workspace_premium</span>
                                            <span>Industry Certification</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="material-symbols-outlined text-green-600 text-xl">group</span>
                                            <span>Live Mentor Sessions</span>
                                        </div>
                                    </div>
                                    <Link href="#enroll-form" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02] block text-center mb-3">
                                        Enroll Now
                                    </Link>
                                    <p className="text-xs text-center text-muted-foreground">Next batch: Jan 25th</p>
                                </div>

                                {/* Hiring Partners */}
                                <div className="p-6 bg-surface rounded-2xl border border-border-color text-center">
                                    <h4 className="font-bold text-foreground mb-4 text-sm">Graduates Hired By</h4>
                                    <div className="grid grid-cols-2 gap-3 opacity-70">
                                        {["Zomato", "Swiggy", "Freshworks", "Zoho", "Myntra"].map((partner, idx) => (
                                            <div key={idx} className="bg-background py-2 rounded flex items-center justify-center font-bold text-xs text-muted-foreground border border-border-color">{partner}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Courses */}
                    <section className="py-16 bg-background border-t border-border-color">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Other Specializations</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        image: "/images/courses/smm/hero.png",
                                        title: "Social Media Marketing",
                                        desc: "Viral Growth & Content Strategy.",
                                        href: "/courses/social-media-marketing-course"
                                    },
                                    {
                                        image: "/images/courses/wordpress/hero.png",
                                        title: "WordPress Development",
                                        desc: "No-Code Web Design.",
                                        href: "/courses/wordpress-development-course"
                                    },
                                    {
                                        image: "/images/courses/adv-dm/hero.png",
                                        title: "Adv Digital Marketing",
                                        desc: "Our 11-Month Flagship Program.",
                                        href: "/advance-digital-marketing-course"
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
                    <Link href="#program-fees" className="flex-1 py-3 bg-surface border border-green-600 text-green-600 font-bold rounded-lg text-sm flex items-center justify-center">
                        Fees
                    </Link>
                    <Link href="#enroll-form" className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg text-sm flex items-center justify-center">
                        Apply Now
                    </Link>
                </div>

            </div >
        </>
    );
}
