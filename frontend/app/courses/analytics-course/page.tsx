import React from "react";
import type { Metadata } from 'next';
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";

export const metadata: Metadata = {
    title: "Advanced Marketing Analytics Course | GA4 + GTM + Looker Studio",
    description: "Master marketing analytics instruments. Learn GA4, GTM, BigQuery, and PowerBI with India's most practical analytics program.",
    keywords: ["Marketing Analytics Course", "Google Analytics 4 Training", "GTM Mastery", "Looker Studio Course", "PowerBI for Marketers", "Digital Marketing Analytics"],
    openGraph: {
        title: "Advanced Marketing Analytics Course | Pixe",
        description: "Stop Guessing. Start Proving. Master GA4, GTM, and Looker Studio for advanced marketing attribution and reporting.",
        images: ["/images/courses/analytics/hero-v1.png"],
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: "https://www.pixe.education/courses/analytics-course",
    },
};

export default function AnalyticsCoursePage() {
    return (
        <div className="bg-background text-foreground font-body antialiased selection:bg-primary/30 selection:text-white pb-24 md:pb-0 relative">
            {/* Navbar handled globally */}

            <main>
                {/* 1. Hero Section */}
                <section className="relative bg-background pt-8 pb-12 lg:pt-24 lg:pb-32 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.07] mix-blend-overlay"></div>
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] opacity-20"></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
                        <div className="flex-1 text-left relative z-10">
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-foreground">
                                Advanced Marketing <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Analytics & Attribution</span>
                            </h1>
                            <p className="text-lg text-text-muted mb-8 max-w-xl leading-relaxed">
                                Stop guessing. Start proving ROI. Master <span className="text-foreground font-semibold">GA4, GTM, Looker Studio, and BigQuery</span> to make data-backed marketing decisions.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#curriculum" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-gleam transition-all transform hover:-translate-y-1">
                                    View Curriculum
                                </a>
                                <a href="#enroll" className="px-8 py-4 bg-transparent border border-border-color hover:bg-surface text-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">download</span>
                                    Brochure
                                </a>
                            </div>
                            <div className="mt-10">
                                <p className="text-xs font-bold text-text-muted mb-4 uppercase tracking-widest">Tools You Will Master</p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">GA4</div>
                                    <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">GTM</div>
                                    <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">LOOKER</div>
                                    <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">BIGQUERY</div>
                                    <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">POWER BI</div>
                                </div>
                            </div>

                            {/* Hero Image Space */}
                            <div className="mt-12 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-[300px] w-full max-w-2xl">
                                <Image
                                    src="/images/courses/analytics/hero-v1.png"
                                    alt="Data Analyst Dashboard"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-6 text-white">
                                    <p className="font-bold text-lg">Advanced Data Visualization</p>
                                    <p className="text-sm opacity-90">Building automated reporting dashboards</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-md lg:w-[480px]">
                            <div className="sticky top-24">
                                <UniversalLeadForm
                                    formId="analytics_hero"
                                    source="analytics_course_hero"
                                    course="Marketing Analytics"
                                    title="Quick Apply"
                                    subtitle="Fast Track Admission"
                                    submitButtonText="Check Eligibility & Scholarship"
                                    successMessage="Application Received! Our team will contact you."
                                    className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gleam border border-slate-100 dark:border-[#334155] p-8 transform transition-all hover:scale-[1.01]"
                                />
                                <p className="text-xs text-center text-slate-500 mt-4 opacity-80">
                                    🔒 100% Secure. We respect your privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Skills Icons Row */}
                <section className="py-12 bg-surface-deep border-b border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                { title: "Data Cleaning", icon: "cleaning_services", color: "blue" },
                                { title: "Trend Analysis", icon: "trending_up", color: "green" },
                                { title: "Attribution Modeling", icon: "hub", color: "purple" },
                                { title: "Conversion Optimization", icon: "ads_click", color: "orange" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-surface/40 backdrop-blur-md border border-border-color hover:border-primary/40 group shadow-sm hover:shadow-lg transition-all duration-300">
                                    <div className={`w-14 h-14 mx-auto bg-${item.color}-500/10 rounded-2xl flex items-center justify-center text-${item.color}-500 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                    </div>
                                    <h4 className="font-bold text-foreground text-lg">{item.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Training Feature Section */}
                <section className="py-20 bg-background overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                                <Image
                                    src="/images/courses/analytics/training-v1.png"
                                    alt="Analytics Workshop"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Live Implementation</h3>
                                    <p className="text-white/80">Setup real GTM triggers and GA4 events on live websites.</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-display text-4xl font-bold mb-6 text-foreground">Stop Guessing. <br /><span className="text-blue-600 dark:text-blue-400">Start Proving Data.</span></h2>
                                <p className="text-lg text-text-muted mb-8 leading-relaxed">
                                    Most marketers rely on default reports. We teach you to build custom tracking setups, verify data accuracy, and visualize insights.
                                    Master the <span className="font-semibold text-foreground">analytical instruments</span> used by top agencies.
                                </p>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Audit & Fix Broken GA4 Implementations",
                                        "Setup Cross-Domain & E-commerce Tracking",
                                        "Build Automated Dashboards in Looker Studio",
                                        "Master Server-Side Tracking (bypassing ad-blockers)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-green-500 bg-green-500/10 p-1 rounded-full text-sm">check</span>
                                            <span className="text-foreground font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="#enroll" className="inline-flex items-center px-6 py-3 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-all">
                                    Start Learning Analytics
                                    <span className="material-symbols-outlined ml-2">bar_chart</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* New Section: Real-World Projects */}
                <section className="py-20 bg-surface-deep border-y border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Build a Portfolio That <span className="text-primary">Gets You Hired</span></h2>
                            <p className="text-text-muted max-w-2xl mx-auto">Don't just watch tutorials. Build enterprise-grade measurement setups that you can show off in interviews.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Cross-Channel Attribution Model",
                                    desc: "Build a custom attribution dashboard in Looker Studio merging Facebook Ads, Google Ads, and CRM data to find true ROI.",
                                    tools: ["Looker Studio", "BigQuery", "SQL"],
                                    icon: "hub",
                                    color: "blue"
                                },
                                {
                                    title: "E-Commerce Funnel Audit",
                                    desc: "Implement Enhanced E-commerce tracking to identify drop-off points in the checkout journey using GA4 & Clarity.",
                                    tools: ["GA4", "GTM", "MS Clarity"],
                                    icon: "shopping_cart_checkout",
                                    color: "purple"
                                },
                                {
                                    title: "Server-Side Tracking Setup",
                                    desc: "Implement a robust conversion API (CAPI) setup using Google Tag Manager Server Container to bypass ad blockers.",
                                    tools: ["GTM Server", "Google Cloud"],
                                    icon: "dns",
                                    color: "orange"
                                }
                            ].map((project, i) => (
                                <div key={i} className="bg-surface rounded-2xl p-8 border border-border-color hover:border-primary/50 transition-all group hover:-translate-y-1">
                                    <div className={`w-14 h-14 rounded-xl bg-${project.color}-500/10 flex items-center justify-center text-${project.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{project.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                                    <p className="text-sm text-text-muted mb-6 leading-relaxed">{project.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tools.map((t, j) => (
                                            <span key={j} className="px-2 py-1 bg-surface-deep border border-border-color rounded text-[10px] font-bold text-foreground uppercase tracking-wider">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Content Grid */}
                <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 gap-12">
                    <div className="lg:col-span-2 space-y-16">
                        {/* Who Should Enroll */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Who Is This Course For?</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: "Digital Marketers", desc: "Move from 'creative' to 'technical' marketing for higher pay.", icon: "campaign" },
                                    { title: "Statisticians", desc: "Apply your math skills to the high-growth ad tech industry.", icon: "functions" },
                                    { title: "Business Owners", desc: "Understand exactly where your money is going.", icon: "store" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-surface p-6 rounded-2xl border border-border-color hover:border-primary/50 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-sm text-text-muted">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Mentors Section */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Learn From The Best</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        name: "Vikram Singh",
                                        role: "Head of Analytics @ Pixe",
                                        ex: "Ex-Google, Flipkart",
                                        image: "/images/vikram_singh.png",
                                        bio: "12+ years in digital analytics. Expert in auditing complex GA4 setups for enterprise brands."
                                    },
                                    {
                                        name: "Sarah John",
                                        role: "Marketing Science Lead",
                                        ex: "Ex-Dentsu, Amazon",
                                        image: "/images/sarah_john.png",
                                        bio: "Specializes in marketing attribution and visualization. Teaches Looker Studio & PowerBI Mastery."
                                    }
                                ].map((mentor, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-surface rounded-2xl border border-border-color hover:border-primary/30 transition-colors">
                                        <div className="shrink-0">
                                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                                                <Image
                                                    src={mentor.image}
                                                    alt={mentor.name}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg">{mentor.name}</h3>
                                            <p className="text-primary text-sm font-medium mb-1">{mentor.role}</p>
                                            <p className="text-xs text-text-muted mb-3 font-mono border-l-2 border-border-color pl-2">{mentor.ex}</p>
                                            <p className="text-sm text-text-muted leading-snug">{mentor.bio}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Success Stories */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Alumni Outcomes</h2>
                            <div className="bg-surface-deep rounded-3xl p-8 border border-border-color">
                                <div className="grid gap-8">
                                    {[
                                        {
                                            name: "Priya Venkatesh",
                                            role: "Data Analyst at Flipkart",
                                            quote: "I was a traditional marketer. Learning SQL and Python gave me an edge. I now analyze millions of user events daily.",
                                            image: "/images/sarah_john.png"
                                        },
                                        {
                                            name: "Sameer Khan",
                                            role: "Marketing Science Lead at Dentsu",
                                            quote: "The attribution modeling module is world-class. It helped us solve a major tracking issue for a banking client.",
                                            image: "/images/rahul_verma.png"
                                        }
                                    ].map((story, i) => (
                                        <div key={i} className="bg-surface p-6 rounded-2xl shadow-sm border border-border-color flex gap-4 items-start">
                                            <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                                            <div>
                                                <p className="text-foreground text-sm leading-relaxed italic mb-3">"{story.quote}"</p>
                                                <h4 className="font-bold text-foreground text-sm">{story.name}</h4>
                                                <p className="text-xs text-primary font-semibold">{story.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Curriculum */}
                        <section id="curriculum">
                            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Module 1: Data Foundations & GA4 Mastery",
                                        lessons: ["Understanding Data Layers & Events", "GA4 Implementation Guide", "Exploration Reports & Funnel Analysis", "BigQuery Linking"]
                                    },
                                    {
                                        title: "Module 2: Technical Marketing (GTM & CAPI)",
                                        lessons: ["Google Tag Manager Deep Dive", "Server-Side Tracking Setup", "Meta CAPI & Offline Conversions", "Cookie-less Future Strategy"]
                                    },
                                    {
                                        title: "Module 3: Data Warehousing & Blending",
                                        lessons: ["Introduction to BigQuery for Marketers", "Supermetrics Data Connectors", "Blending Data Sources in Looker", "Automated Reporting Pipelines"]
                                    },
                                    {
                                        title: "Module 4: Visualization & Storytelling",
                                        lessons: ["Looker Studio Advanced Dashboards", "PowerBI for Enterprise Reporting", "Client Reporting & Storytelling", "Presenting to C-Suite"]
                                    }
                                ].map((mod, i) => (
                                    <details key={i} className="group bg-surface/50 backdrop-blur-sm rounded-xl shadow-sm border border-border-color overflow-hidden hover:border-primary/30 transition-colors" open={i === 0}>
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-transparent transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-open:bg-primary group-open:text-white transition-colors">0{i + 1}</span>
                                                <h3 className="font-bold text-foreground text-lg group-open:text-primary transition-colors">{mod.title}</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-text-muted group-open:rotate-180 transition-transform duration-300">expand_more</span>
                                        </summary>
                                        <div className="p-5 pt-0 border-t-0 text-text-muted text-sm leading-relaxed pl-[4.5rem]">
                                            <ul className="list-disc space-y-2 marker:text-primary/50">
                                                {mod.lessons.map((l, j) => <li key={j}>{l}</li>)}
                                            </ul>
                                        </div>
                                    </details>
                                ))}
                            </div>
                            <button className="mt-6 text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Download Full Syllabus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </section>

                        {/* Tools & Tech Stack Expanded */}
                        <section className="bg-surface-deep/50 rounded-3xl p-8 border border-border-color backdrop-blur-sm">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Complete Modern Data Stack</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 text-center">Data Collection & Tagging</h3>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {["GA4", "GTM Server-Side", "Meta CAPI", "Segment"].map((t, i) => (
                                            <div key={i} className="px-4 py-2 bg-surface border border-border-color rounded-lg text-sm font-bold text-foreground flex items-center gap-2">
                                                <span className="material-symbols-outlined text-blue-500 text-lg">tag</span> {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 text-center">Storage & Connectors</h3>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {["Google BigQuery", "Supermetrics", "SQL (Basics)", "2Performance"].map((t, i) => (
                                            <div key={i} className="px-4 py-2 bg-surface border border-border-color rounded-lg text-sm font-bold text-foreground flex items-center gap-2">
                                                <span className="material-symbols-outlined text-orange-500 text-lg">database</span> {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 text-center">Visualization</h3>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {["Looker Studio", "PowerBI", "Tableau", "MS Clarity"].map((t, i) => (
                                            <div key={i} className="px-4 py-2 bg-surface border border-border-color rounded-lg text-sm font-bold text-foreground flex items-center gap-2">
                                                <span className="material-symbols-outlined text-green-500 text-lg">monitoring</span> {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Validated Certifications */}
                        <section>
                            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h2 className="font-display text-2xl font-bold mb-4">Dual Certification</h2>
                                        <p className="text-blue-200 mb-6 max-w-md">Get certified in Google Analytics 4 and Advanced Data Visualization with Pixe.</p>
                                        <div className="flex gap-3">
                                            {["GA4 Certified", "Data Analyst Level 1"].map((c, i) => (
                                                <div key={i} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold backdrop-blur-md">
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex -space-x-4">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-blue-800 transition-transform hover:scale-110 hover:z-10">
                                            <img src="/images/about/ga4-logo.svg" alt="GA4" className="w-10 h-10 object-contain" />
                                        </div>
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-blue-800 transition-transform hover:scale-110 hover:z-10">
                                            <span className="material-symbols-outlined text-4xl text-blue-600">verified</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
                            </div>
                        </section>


                        {/* FAQ Section */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "Is this course different from Digital Marketing?", a: "Yes. This is a technical course. While we touch on marketing concepts, 80% of the focus is on data collection, processing, and analysis using tools like SQL and Python." },
                                    { q: "Do I need coding experience?", a: "No prior coding experience is needed. We built this curriculum for marketers, starting from scratch with SQL and Python fundamentals." },
                                    { q: "What tools will I learn?", a: "You will master Google Analytics 4 (GA4), Google Tag Manager (GTM), Looker Studio, BigQuery, SQL, and Python (Pandas library)." },
                                    { q: "Can I get a job as a Data Analyst?", a: "Absolutely. This course prepares you for roles like Marketing Analyst, Data Analyst, and Marketing Science Executive." }
                                ].map((faq, i) => (
                                    <details key={i} className="group bg-surface rounded-xl border border-border-color overflow-hidden hover:border-primary/30 transition-colors">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-foreground hover:text-primary transition-colors list-none">
                                            {faq.q}
                                            <span className="material-symbols-outlined text-text-muted group-open:rotate-180 transition-transform duration-300">expand_more</span>
                                        </summary>
                                        <div className="p-5 pt-0 border-t-0 text-text-muted text-sm leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8 sticky top-24 self-start">
                        <div id="enroll" className="bg-surface/50 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-border-color/60">
                            <h3 className="text-lg font-bold text-foreground mb-4">Program Fees</h3>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-display font-bold text-foreground tracking-tight">₹29,999</span>
                                <span className="text-sm text-text-muted line-through mb-1.5 opacity-70">₹45,000</span>
                            </div>
                            <span className="inline-block bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold px-3 py-1.5 rounded-full mb-8">Analytics Special • 33% OFF</span>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 text-sm text-text-muted font-medium">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg">credit_score</span>
                                    </div>
                                    <span>No Cost EMI starts ₹2,500/mo</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-text-muted font-medium">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                    </div>
                                    <span>Dual Certification Included</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-primary dark:bg-foreground hover:bg-primary-dark dark:hover:bg-foreground/90 text-white dark:text-background font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5">
                                Enroll Now
                            </button>
                        </div>

                        <div className="bg-surface rounded-2xl shadow-sm border border-border-color p-6">
                            <h3 className="text-lg font-bold text-foreground mb-4">Why This Course?</h3>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border-color">
                                        <th className="text-left py-2 font-medium text-text-muted text-xs text-[10px] uppercase">Feature</th>
                                        <th className="text-right py-2 font-bold text-primary text-[10px] uppercase">Us</th>
                                        <th className="text-right py-2 font-medium text-text-muted/60 text-[10px] uppercase">Others</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-color/30">
                                    {[
                                        { f: "GA4 & GTM Mastery", us: true, others: false },
                                        { f: "Server-Side Tracking", us: true, others: false },
                                        { f: "BigQuery & SQL", us: true, others: false }
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td className="py-3 text-text-muted text-xs">{row.f}</td>
                                            <td className="py-3 text-right"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></td>
                                            <td className="py-3 text-right"><span className="material-symbols-outlined text-text-muted/40 text-sm">cancel</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 4. Related Career Paths */}
                <section className="py-16 bg-surface-deep border-t border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-8">Related Career Paths</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "PPC Course",
                                    desc: "Master paid ads on Google & Meta.",
                                    link: "/courses/ppc-course",
                                    image: "/images/course_ppc.png",
                                    icon: "ads_click",
                                    position: "object-center"
                                },
                                {
                                    title: "Free Counseling",
                                    desc: "Get 1:1 expert guidance for your career.",
                                    link: "/free-counseling",
                                    image: "/images/priya_sharma.png",
                                    icon: "support_agent",
                                    position: "object-top"
                                },
                                {
                                    title: "Adv. Digital Marketing",
                                    desc: "Comprehensive full-stack marketing program.",
                                    link: "/advance-digital-marketing-course",
                                    image: "/images/course_dm.png",
                                    icon: "campaign",
                                    position: "object-center"
                                }
                            ].map((path, i) => (
                                <a href={path.link} key={i} className="block group bg-surface rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 border border-border-color transition-all duration-300 overflow-hidden hover:-translate-y-1">
                                    <div className="aspect-[16/9] relative overflow-hidden">
                                        <Image
                                            src={path.image}
                                            alt={path.title}
                                            fill
                                            className={`${path.position} object-cover group-hover:scale-105 transition-transform duration-500`}
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                                        <div className="absolute top-4 left-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                                                <span className="material-symbols-outlined text-xl text-white drop-shadow-md">{path.icon}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
                                        <p className="text-sm text-text-muted mb-4">{path.desc}</p>
                                        <span className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                            View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </main>

            {/* Floating Elements */}

            <div className="fixed bottom-0 inset-x-0 z-50 bg-background border-t border-border-color shadow-soft dark:shadow-[0_-4px_20px_rgba(0,0,0,0.5)] p-4 md:hidden flex gap-3">
                <button className="flex-1 py-3 bg-background border border-primary text-primary font-bold rounded-lg text-sm">
                    Syllabus
                </button>
                <button className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg text-sm">
                    Apply Now
                </button>
            </div>


            <ExitIntentPopup
                title="Wait! Don't leave yet."
                description="Get the detailed Analytics Curriculum & Salary Guide delivered to your email."
                buttonText="Download Syllabus"
                course="Analytics_Course"
                targetId="application-form"
            />

            {/* SEO Footer Data - Hidden but present for crawlers or structured data */}
            <div className="hidden sr-only">
                {/* 6. Technical SEO Footer */}
                <section className="py-16 bg-background text-text-muted border-t border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 text-sm leading-relaxed">
                            <div>
                                <h3 className="text-foreground font-bold mb-4 font-display">Marketing Analytics Course in Bangalore & Mumbai</h3>
                                <p>
                                    Our Marketing Analytics Course is the only program in India that teaches both the marketing context and the technical data science skills.
                                    Learn to build custom attribution models, query BigQuery databases, and visualize data in Looker Studio.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-foreground font-bold mb-4 font-display">Data Science for Marketers</h3>
                                <p>
                                    Bridge the gap between marketing and data science. Our curriculum covers SQL, Python (Pandas/Matplotlib),
                                    and server-side tracking, making you a unicorn in the job market.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Schema Metadata */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Course",
                            "name": "Marketing Analytics & Data Science Course",
                            "description": "Master GA4, SQL, Python and predictive analytics for marketing.",
                            "provider": {
                                "@type": "Organization",
                                "name": "Pixe Education",
                                "sameAs": "https://pixe.education"
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": "29999",
                                "priceCurrency": "INR",
                                "availability": "https://schema.org/InStock",
                                "category": "Data Science Training"
                            },
                            "educationalCredentialAwarded": ["GA4 Certification", "Data Analyst Level 1"],
                            "occupationalCategory": "Marketing Analyst"
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://pixe.education"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Courses",
                                    "item": "https://pixe.education/courses"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Marketing Analytics",
                                    "item": "https://pixe.education/courses/analytics-course"
                                }
                            ]
                        }
                    ])
                }} />
            </div>
        </div>
    );
}
