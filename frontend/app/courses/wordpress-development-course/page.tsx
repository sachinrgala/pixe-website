import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export const metadata: Metadata = {
    title: "Master No-Code Web Development Course | Wordpress Training India | Pixe",
    description: "Create professional, live websites without a single line of code in just 4–6 weeks. Master WordPress, Elementor, and Divi. Become a Freelance Web Developer.",
    keywords: ["WordPress Course", "No Code Web Development", "Freelance Web Designer", "Elementor Training", "Website Design Course India", "Divi Theme Training"],
    openGraph: {
        title: "Master Professional Web Development: No Coding Required | Pixe",
        description: "From 'Fear of Coding' to 'Confident Freelancer' in 6 weeks. Build real websites live.",
        images: ["/images/courses/wordpress/hero.png"],
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: "https://www.pixe.education/courses/wordpress-development-course",
    }
};

const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Course",
            "name": "Professional WordPress Website Development",
            "description": "A 6-week intensive program to master no-code web development using WordPress, Elementor, and WooCommerce. Build portfolio-ready websites live.",
            "provider": {
                "@type": "Organization",
                "name": "Pixe Education",
                "sameAs": "https://www.pixe.education"
            },
            "educationalCredentialAwarded": "Certified WordPress Developer",
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "courseWorkload": "PT6H"
            },
            "offers": {
                "@type": "Offer",
                "category": "Paid",
                "price": "35000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
            }
        },
        {
            "@type": "Product",
            "name": "WordPress Development Certification",
            "image": "https://www.pixe.education/images/courses/wordpress/hero.png",
            "description": "Launch your career as a Freelance Web Developer with our no-code WordPress mastery course.",
            "brand": {
                "@type": "Brand",
                "name": "Pixe"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "850"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "35000",
                "priceValidUntil": "2026-12-31"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Do I need to know coding?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely not. We focus entirely on 'No-Code' visual builders like Elementor and Divi. If you can use PowerPoint, you can build a website with us."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do I need to buy hosting?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We provide a sandbox server environment for all your practice projects during the course duration. We also guide you on buying the best value hosting for clients."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I get freelance clients after this?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! A major part of our curriculum covers 'The Business of Web Design'—how to find clients, price your projects (₹15k-₹50k), and deliver professionally."
                    }
                }
            ]
        }
    ]
};

export default function WordPressCoursePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />
            <div className="bg-background text-foreground font-body antialiased selection:bg-primary/20 selection:text-primary pb-24 md:pb-0 relative">

                <main className="">
                    <ExitIntentPopup
                        course="wordpress-development"
                        title="Wait! Want the Freelancer Roadmap?"
                        description="Download our guide: 'How to Earn Your First ₹50k as a Web Designer'."
                        buttonText="Get Free Guide"
                        targetId="enroll-form"
                    />

                    {/* Hero Section - Outcome Focused - Mobile Optimized */}
                    <section className="relative bg-white dark:bg-slate-950 pt-8 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                                <div className="lg:col-span-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-primary mb-6">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        No-Code Professional Certification
                                    </div>
                                    <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 lg:mb-6 leading-[1.2] lg:leading-[1.1] text-slate-900 dark:text-white">
                                        Master Professional <span className="text-primary">Web Development</span>
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                                        <span className="font-bold text-foreground">No Coding Required.</span> Create professional, live websites in just 4–6 weeks. Become a confident freelancer and launch your own web design agency.
                                    </p>

                                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm mb-10 h-[300px]">
                                        <Image
                                            src="/images/courses/wordpress/hero.png"
                                            alt="Professional Web Designer Building WordPress Site"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href="#enroll-form" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                                            Start Building Today
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </Link>
                                        <Link href="#curriculum" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">download</span>
                                            Download Syllabus
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:col-span-6" id="enroll-form">
                                    <UniversalLeadForm
                                        formId="wordpress-hero"
                                        source="wordpress_course_lp"
                                        course="WordPress Development"
                                        title="Launch Your Dev Career"
                                        subtitle="Get a free consultation on freelance opportunities in 2026."
                                        submitButtonText="Get Syllabus & Pricing"
                                        className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Professional Environment Section - Practical Mastery */}
                    <section className="py-12 lg:py-20 bg-slate-50 dark:bg-slate-900/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                                    <Image
                                        src="/images/courses/wordpress/training.png"
                                        alt="Live Website Building Workshop"
                                        width={800}
                                        height={600}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                        Practical Mastery, Not Just Theory
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                        Forget boring lectures on HTML syntax. We dive straight into building. You will set up live servers, install professional themes, and deploy real websites for hypothetical clients.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "Build 3 Full Live Projects (Portfolio Ready)",
                                            "Master Elementor & Divi Builders",
                                            "Learn CPanel & Server Management",
                                            "Client Handoff & Billing Workflows"
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

                    {/* No-Code Workflow Section */}
                    <section className="py-12 lg:py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">The No-Code Ecosystem</h2>
                                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Master the toolchain used by top agencies to build premium websites at speed.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {[
                                    { step: "01", icon: "dns", title: "Hosting", tool: "SiteGround/Hostinger", desc: "Server setup & domain DNS management." },
                                    { step: "02", icon: "architecture", title: "Structure", tool: "WordPress Core", desc: "CMS installation and security hardening." },
                                    { step: "03", icon: "brush", title: "Design", tool: "Elementor Pro", desc: "Pixel-perfect visual drag-and-drop design." },
                                    { step: "04", icon: "shopping_cart", title: "Commerce", tool: "WooCommerce", desc: "Payment gateways and inventory systems." },
                                    { step: "05", icon: "rocket", title: "Speed", tool: "WP Rocket", desc: "Caching and Core Web Vitals optimization." }
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

                    {/* Dashboard/Feature Section */}
                    <section className="py-12 lg:py-20 bg-white dark:bg-slate-950">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                                <div className="lg:col-span-12 md:grid md:grid-cols-2 gap-16 items-center">
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">Build Anything, visually.</h2>
                                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                                From corporate landing pages to full-scale e-commerce stores. Learn to manipulate every pixel without touching code using advanced visual builders and dynamic content logic.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { title: "Responsive Control", icon: "devices" },
                                                { title: "Dynamic Content", icon: "data_object" },
                                                { title: "Global Styles", icon: "palette" },
                                                { title: "Effect Interactions", icon: "animation" }
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
                                            src="/images/courses/wordpress/dashboard.png"
                                            alt="Visual Builder Interface"
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
                    <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 gap-10 lg:gap-12">
                        <div className="lg:col-span-2 space-y-16">
                            {/* Curriculum */}
                            <section id="curriculum">
                                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
                                <div className="space-y-4">
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden" open>
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-xs font-bold text-pink-500">01</span>
                                                <h3 className="font-bold text-foreground">The WordPress Ecosystem & Server Setup</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Understanding Domains, DNS, and Hosting</li>
                                                <li>CPanel Walkthrough & SSL Installation</li>
                                                <li>Manual vs One-Click WordPress Installation</li>
                                                <li>Essential Plugins for Security & Speed</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">02</span>
                                                <h3 className="font-bold text-foreground">Visual Design Mastery (Elementor/Divi)</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Drag-and-Drop page building fundamentals</li>
                                                <li>Creating custom Headers & Footers</li>
                                                <li>Mobile Responsiveness & Breakpoints</li>
                                                <li>Global Typography & Color Systems</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">03</span>
                                                <h3 className="font-bold text-foreground">E-Commerce with WooCommerce</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            Setting up a full online store. Managing products, inventory, taxes, shipping classes, and integrating Indian Payment Gateways (Razorpay/Stripe).
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">04</span>
                                                <h3 className="font-bold text-foreground">The Business of Freelancing</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            How to price projects (₹15k - ₹50k), writing proposals that convert, handling client feedback, and delivering maintenance contracts.
                                        </div>
                                    </details>
                                </div>
                                <Link href="#enroll-form" className="mt-6 text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all inline-flex">
                                    Download Detailed Syllabus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </section>

                            {/* Tools Section */}
                            <section className="bg-surface rounded-3xl p-8 border border-border-color">
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tools & Platforms You'll Master</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-blue-600/20 rounded flex items-center justify-center text-xs font-bold text-blue-600">WP</div>
                                        <span className="text-xs font-bold text-foreground">WordPress</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-pink-500/20 rounded flex items-center justify-center text-xs font-bold text-pink-500">EL</div>
                                        <span className="text-xs font-bold text-foreground">Elementor</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-purple-500/20 rounded flex items-center justify-center text-xs font-bold text-purple-500">WOO</div>
                                        <span className="text-xs font-bold text-foreground">WooCommerce</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-green-500/20 rounded flex items-center justify-center text-xs font-bold text-green-500">SEO</div>
                                        <span className="text-xs font-bold text-foreground">Yoast SEO</span>
                                    </div>
                                </div>
                            </section>

                            {/* Career Impact - Freelance Focus */}
                            <section>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Earning Potential</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">work</span> Job Roles
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Freelance Web Dev", "WordPress Admin", "Shopify Expert", "Agency Founder", "UI Integrator"].map((role, idx) => (
                                                <span key={idx} className="px-3 py-1.5 bg-surface text-foreground text-sm font-medium rounded-full border border-border-color">{role}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-surface border-border-color border bg-surface-deep p-6 rounded-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 bg-primary/5 rounded-full blur-2xl"></div>
                                        <h4 className="font-bold text-foreground/90 dark:text-white/90 text-sm uppercase tracking-wide mb-2">Project Pricing Range</h4>
                                        <div className="text-3xl font-display font-bold mb-1 text-foreground dark:text-white">₹15k - ₹50k</div>
                                        <p className="text-xs text-muted-foreground dark:text-white/60">Per Website Project (India)</p>
                                        <div className="mt-4 h-1.5 bg-border-color dark:bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4 rounded-full"></div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground dark:text-white/60 mt-2 text-right">Instant payouts on delivery</p>
                                    </div>
                                </div>
                            </section>



                            {/* Mentors */}
                            <section className="py-12 lg:py-16 px-6 sm:px-8 lg:px-12">
                                <div className="max-w-5xl mx-auto">
                                    <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Your Mentors & Developers</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { name: "Arjun Mehta", role: "Senior WP Developer", company: "Agency Founder", image: "/images/courses/smm/mentors/priya.png" }, // Reusing placeholder for now
                                            { name: "Sneha Patel", role: "UI/UX Designer", company: "Ex-Tech Mahindra", image: "/images/courses/smm/mentors/ananya.png" }, // Reusing placeholder for now
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

                            {/* Why Choose Pixe Section (Comparison) */}
                            <section className="py-16 relative overflow-visible">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                    <div className="text-center mb-12">
                                        <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                                            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Pixe?</span>
                                        </h2>
                                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                            The difference between <span className="text-red-500/70 line-through decoration-red-500/30 decoration-2">Endless Coding</span> and <span className="text-foreground font-bold border-b-2 border-primary">Smart Building</span>.
                                        </p>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative mt-6 lg:mt-0">
                                        {/* Central VS Badge */}
                                        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-background border-[8px] border-surface rounded-full items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.1)] animate-[float_6s_ease-in-out_infinite]">
                                            <span className="font-black text-2xl text-muted-foreground/30 italic font-mono">VS</span>
                                        </div>

                                        {/* The Old Way */}
                                        <div className="bg-surface/30 border border-dashed border-border-color rounded-[2rem] p-6 lg:p-12 flex flex-col grayscale opacity-60 hover:opacity-100 transition-all duration-500 group relative h-full">
                                            <h3 className="text-center text-xl font-bold text-muted-foreground/80 mb-10 uppercase tracking-widest group-hover:text-red-500/80 transition-colors">The Coding Slog</h3>
                                            <div className="space-y-6 flex-grow relative z-10">
                                                {[
                                                    "6 Months learning HTML/CSS/JS",
                                                    "Debugging broken syntax",
                                                    "Struggling with responsive layout code",
                                                    "No client-facing skills"
                                                ].map((text, i) => (
                                                    <div key={i} className="flex items-center gap-5 text-muted-foreground group-hover:text-red-800/70 dark:group-hover:text-red-200/50 transition-colors">
                                                        <span className="material-symbols-outlined text-sm opacity-50">close</span>
                                                        <span className="font-medium text-lg decoration-muted-foreground/30 line-through group-hover:decoration-transparent transition-all">{text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* The Pixe Way */}
                                        <div className="relative group perspective-1000 mt-6 lg:mt-0">
                                            <div className="absolute -inset-[2px] bg-gradient-to-br from-primary via-blue-500 to-cyan-500 rounded-[2.2rem] blur-sm opacity-50 group-hover:opacity-100 animate-gradient-xy transition-opacity duration-500"></div>
                                            <div className="relative bg-background/80 dark:bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 lg:p-12 h-full flex flex-col shadow-2xl shadow-primary/20 transform lg:scale-105 transition-transform duration-500 overflow-visible">
                                                {/* Badge - Positioned inside the card on mobile */}
                                                <div className="flex justify-center mb-6">
                                                    <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg">
                                                        Smart Developer System
                                                    </div>
                                                </div>
                                                <h3 className="text-center text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-2 mt-8 uppercase tracking-wider">The Pixe Edge</h3>
                                                <div className="space-y-6 flex-grow relative z-10 mt-10">
                                                    {[
                                                        { text: "Live Site in 4 Weeks", sub: "Speed to Market", icon: "rocket_launch" },
                                                        { text: "Drag & Drop Mastery", sub: "Elementor + Divi", icon: "drag_indicator" },
                                                        { text: "AI Content Generation", sub: "Copywriting Automated", icon: "auto_awesome" },
                                                        { text: "Freelance Client Kit", sub: "Proposals & Contracts", icon: "request_quote" }
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-5 group/item">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center shrink-0 border border-primary/20">
                                                                <span className="material-symbols-outlined text-primary">{item.icon}</span>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-foreground text-lg leading-tight">{item.text}</div>
                                                                <div className="text-xs text-muted-foreground font-medium mt-1">{item.sub}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* FAQ */}
                            <section>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Course FAQ</h2>
                                <div className="space-y-3">
                                    {[
                                        { q: "Do I really not need coding skills?", a: "Yes. In 2026, 70% of websites are built using No-Code Visual Builders. We teach you how to master these tools. No HTML/CSS needed." },
                                        { q: "What computer do I need?", a: "Any basic laptop with internet access works. WordPress runs in the cloud (browser), so you don't need a powerful PC." },
                                        { q: "Do you provide hosting for practice?", a: "Yes! Every student gets access to a Sandbox Server environment to practice building unlimited trial websites during the course." },
                                        { q: "Will I get a certificate?", a: "Yes, you will receive the 'Certified WordPress Developer' certificate from Pixe Education." },
                                        { q: "Is job assistance provided?", a: "We focus on 'Freelance Independence', guiding you on how to get clients on Upwork and LinkedIn. We also share agency job openings in our community." },
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
                            <div className="bg-surface rounded-2xl shadow-sm p-6 border border-border-color" id="program-fees">
                                <h3 className="text-lg font-bold text-foreground mb-4">Program Fees</h3>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-3xl font-display font-bold text-foreground">₹35,000</span>
                                    <span className="text-sm text-muted-foreground line-through mb-1">₹55,000</span>
                                </div>
                                <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded mb-6">Scholarship Available</span>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="material-symbols-outlined text-primary text-xl">payments</span>
                                        <span>Earn it back with your first 2 freelance projects.</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                        <span>Lifetime LMS Access</span>
                                    </div>
                                </div>
                                <Link href="#enroll-form" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors block text-center">
                                    Enroll Now
                                </Link>
                            </div>

                            {/* Hiring/Freelance Partners */}
                            <div className="p-6 bg-surface rounded-2xl border border-border-color text-center">
                                <h4 className="font-bold text-foreground mb-4 text-sm">Target Freelance Platforms</h4>
                                <div className="grid grid-cols-2 gap-4 opacity-70">
                                    {["Upwork", "Fiverr", "LinkedIn", "Freelancer"].map((platform, idx) => (
                                        <div key={idx} className="bg-background h-10 rounded flex items-center justify-center font-bold text-xs text-muted-foreground border border-border-color">{platform}</div>
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
                                        image: "/images/courses/smm/hero.png",
                                        title: "Social Media Marketing",
                                        desc: "Master Instagram & LinkedIn growth strategies with AI.",
                                        href: "/courses/social-media-marketing-course"
                                    },
                                    {
                                        image: "/images/courses/related/ppc.png", // Fallback image if exists, else SMM image
                                        title: "Google Ads (PPC)",
                                        desc: "Learn to run profitable paid search campaigns.",
                                        href: "/courses/ppc-course"
                                    },
                                    {
                                        image: "/images/courses/related/seo.png",
                                        title: "Advanced SEO",
                                        desc: "Rank #1 on Google with semantic SEO strategies.",
                                        href: "/courses/seo-course"
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

                <Footer />

                <div className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border-color shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 md:hidden flex gap-3">
                    <Link href="#curriculum" className="flex-1 py-3 bg-surface border border-primary text-primary font-bold rounded-lg text-sm flex items-center justify-center">
                        Syllabus
                    </Link>
                    <Link href="#enroll-form" className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg text-sm flex items-center justify-center">
                        Apply Now
                    </Link>
                </div>
            </div>
        </>
    );
}
