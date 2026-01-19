import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export const metadata: Metadata = {
    title: "Affiliate & Email Marketing Course | Master Monetization & Automation",
    description: "Learn list-building, automation & affiliate monetization. Master tools like Mailchimp, Klaviyo, and Amazon Associates in this practical, outcome-focused course.",
    keywords: ["Email Marketing Course", "Affiliate Marketing Training", "Klaviyo Mastery", "Mailchimp Course", "Passive Income", "Digital Marketing Automation"],
    openGraph: {
        title: "Master Affiliate & Email Marketing | Pixe Education",
        description: "Build profitable funnels and automate your revenue. The most comprehensive course on Affiliate & Email Marketing strategies.",
        images: ["/images/courses/email-affiliate/hero.png"],
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: "https://www.pixe.education/courses/affiliate-email-marketing",
    }
};

const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Course",
            "name": "Affiliate & Email Marketing Mastery",
            "description": "A specialized program covering advanced email automation, list building, and affiliate marketing monetization strategies.",
            "provider": {
                "@type": "Organization",
                "name": "Pixe Education",
                "sameAs": "https://www.pixe.education"
            },
            "educationalCredentialAwarded": "Email Marketing & Automation Specialist",
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
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Do I need a website to start affiliate marketing?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Not necessarily. We teach you how to use social media, landing pages, and email lists to drive affiliate sales without a full-blown website."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How quickly can I start earning?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Many students see their first affiliate sale within 4-6 weeks of implementing our 'First 1000 Subscribers' framework."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is technical coding knowledge required for email automation?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. Modern tools like Klaviyo and Mailchimp are drag-and-drop. We guide you through every click to set up complex automations."
                    }
                }
            ]
        }
    ]
};

export default function AffiliateEmailCoursePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />
            <div className="bg-background text-foreground font-body antialiased selection:bg-orange-500/20 selection:text-orange-600 pb-24 md:pb-0 relative">

                <main>
                    <ExitIntentPopup
                        course="email-affiliate"
                        title="Wait! Get the 5-Step Passive Income Blueprint?"
                        description="We've compiled a 2026 Affiliate Strategy Checklist including the top 50 High-Ticket Programs."
                        buttonText="Get Free Checklist"
                        targetId="enroll-form"
                    />

                    {/* Hero Section - Premium SMM Style - Mobile Optimized */}
                    <section className="relative bg-white dark:bg-slate-950 pt-8 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                                <div className="lg:col-span-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-orange-600 dark:text-orange-400 mb-6">
                                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                        Revenue-Focused Certification
                                    </div>
                                    <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 lg:mb-6 leading-[1.2] lg:leading-[1.1] text-slate-900 dark:text-white">
                                        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Affiliate & Email Marketing</span> for Real Revenue
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                                        Stop relying on algorithms. Build an asset you own. Learn <strong>List Building</strong>, <strong>Advanced Automation</strong> (Klaviyo/Mailchimp), and <strong>High-Ticket Monetization</strong> in this outcome-driven program.
                                    </p>

                                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl mb-10 h-[300px] group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                        <Image
                                            src="/images/courses/email-affiliate/hero.png"
                                            alt="Affiliate Marketing Dashboard"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            priority
                                        />
                                        <div className="absolute bottom-6 left-6 z-20">
                                            <div className="inline-block px-3 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-xs font-bold rounded-lg mb-2">
                                                Live Revenue Tracking
                                            </div>
                                            <div className="text-white font-bold text-lg">Build Your First Funnel in Week 2</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href="#enroll-form" className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
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
                                        formId="email_affiliate_hero"
                                        source="email_affiliate_course_hero"
                                        course="Email & Affiliate Marketing"
                                        title="Start Your Revenue Journey"
                                        subtitle="Get a personalized roadmap to your first ₹1 Lakh/month side income."
                                        submitButtonText="Get Revenue Roadmap"
                                        successMessage="We'll send the roadmap shortly!"
                                        className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 relative overflow-hidden"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Professional Environment Section - Matches SMM */}
                    <section className="py-12 lg:py-20 bg-slate-50 dark:bg-slate-900/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 h-[400px]">
                                    {/* Using placeholder or relevant image if available, else reusing generic training or SMM image for structure */}
                                    {/* Optimally should refer to a specific email/affiliate image, using SMM training as placeholder/fallback if specific not available or generic enough */}
                                    <Image
                                        src="/images/courses/smm/training.png"
                                        alt="Strategic Marketing Workshop"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                        Build a Recession-Proof Skillset
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                        Own your audience. Unlike social media algorithm changes, your email list is an asset you control. Learn to build, nurture, and monetize communities directly.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "Asset ownership vs. Renting audience",
                                            "Live automation workflow setup",
                                            "Access to high-ticket affiliate networks",
                                            "Weekly revenue optimization audits"
                                        ].map((text, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <span className="material-symbols-outlined text-orange-500 font-bold">check_circle</span>
                                                <span className="font-medium">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AI & Automation Workflow Section - Refined like SMM */}
                    <section className="py-12 lg:py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">The Automation Engine</h2>
                                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Implementing smart workflows to turn subscribers into loyal customers on autopilot.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {[
                                    { step: "01", icon: "person_add", title: "Acquisition", tool: "Lead Magnets", desc: "High-value opt-in strategies." },
                                    { step: "02", icon: "waving_hand", title: "Nurture", tool: "Welcome Flow", desc: "Building trust & authority instantly." },
                                    { step: "03", icon: "loyalty", title: "Engagement", tool: "Segmentation", desc: "Sending the right message to the right person." },
                                    { step: "04", icon: "shopping_cart_checkout", title: "Monetization", tool: "Sales Emails", desc: "Psychology-backed conversion copy." },
                                    { step: "05", icon: "autorenew", title: "Retention", tool: "Win-back Flow", desc: "Maximizing lifetime value (LTV)." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg">
                                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-orange-500 font-bold shadow-sm mb-6">
                                            {item.step}
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-orange-500/80 mb-3">{item.tool}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Student Results Section - Replaces Skills Section */}
                    <section className="py-12 lg:py-20 bg-background overflow-hidden border-y border-border-color px-6 sm:px-8 lg:px-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Real Results. Real Revenue.</h2>
                                <p className="text-muted-foreground">See the campaign performance our students achieve within 60 days.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { title: "Cold Email Outreach", stat: "68% Open Rate", sub: "Freelance Project", student: "A. Sharma", color: "from-blue-500 to-indigo-500", icon: "mail" },
                                    { title: "Affiliate Promo", stat: "₹4.2L Sales", sub: "Black Friday Seq.", student: "K. Verma", color: "from-green-500 to-emerald-500", icon: "payments" },
                                    { title: "Newsletter Growth", stat: "0 to 5k Subs", sub: "In 45 Days", student: "R. Singh", color: "from-orange-500 to-amber-500", icon: "groups" },
                                    { title: "Automation Flow", stat: "12% Recovery", sub: "Cart Abandonment", student: "N. Patel", color: "from-purple-500 to-pink-500", icon: "autorenew" }
                                ].map((result, idx) => (
                                    <div key={idx} className="bg-surface rounded-3xl p-6 border border-border-color shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden group">
                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${result.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${result.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                                            <span className="material-symbols-outlined">{result.icon}</span>
                                        </div>
                                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">{result.title}</div>
                                        <div className="text-2xl font-black text-foreground mb-1">{result.stat}</div>
                                        <div className="flex justify-between items-end mt-4">
                                            <div className="text-xs text-muted-foreground">{result.sub}</div>
                                            <div className="text-[10px] font-bold bg-background px-2 py-1 rounded text-foreground border border-border-color">{result.student}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Main Content Grid - Curriculum & Sidebar */}
                    <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 gap-10 lg:gap-12">
                        <div className="lg:col-span-2 space-y-16">
                            {/* Curriculum */}
                            <section id="curriculum">
                                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
                                <div className="space-y-4">
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden" open>
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-500">01</span>
                                                <h3 className="font-bold text-foreground">Foundation & Niche Selection</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Understanding the Affiliate Ecosystem</li>
                                                <li>Profitable Niche Research & Validation</li>
                                                <li>Finding High-Ticket Programs (Amazon, ClickBank, SaaS)</li>
                                                <li>Compliance & Legal Essentials (FTC, GDPR)</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">02</span>
                                                <h3 className="font-bold text-foreground">List Building & Lead Magnets</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Creating Irresistible Lead Magnets (Ebooks, Checklists)</li>
                                                <li>High-Converting Landing Page Design</li>
                                                <li>Strategies for First 1000 Subscribers</li>
                                                <li>Opt-in forms and Popups psychology</li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">03</span>
                                                <h3 className="font-bold text-foreground">Email Automation Mastery</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            Setting up Klaviyo/Mailchimp, Welcome Series to build trust, Cart Abandonment flows, Post-purchase upsells, and cold email outreach sequences.
                                        </div>
                                    </details>
                                    <details className="group bg-surface rounded-xl shadow-sm border border-border-color overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-surface hover:bg-background transition-colors list-none">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-surface border border-border-color flex items-center justify-center text-xs font-bold text-muted-foreground">04</span>
                                                <h3 className="font-bold text-foreground">Scaling & Optimization</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-border-color text-muted-foreground text-sm leading-relaxed">
                                            Advanced segmentation, A/B testing subject lines, pruning lists for hygiene, and scaling revenue with paid traffic to funnels.
                                        </div>
                                    </details>
                                </div>
                                <Link href="#enroll-form" className="mt-6 text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all inline-flex">
                                    Download Detailed Syllabus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </section>

                            {/* Tools Section */}
                            <section className="bg-surface rounded-3xl p-8 border border-border-color">
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tools & Platforms You&apos;ll Master</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-orange-500/30 transition-colors">
                                        <div className="w-10 h-10 bg-yellow-500/20 rounded flex items-center justify-center text-xs font-bold text-yellow-600">MC</div>
                                        <span className="text-xs font-bold text-foreground">Mailchimp</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-orange-500/30 transition-colors">
                                        <div className="w-10 h-10 bg-green-500/20 rounded flex items-center justify-center text-xs font-bold text-green-600">KL</div>
                                        <span className="text-xs font-bold text-foreground">Klaviyo</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-orange-500/30 transition-colors">
                                        <div className="w-10 h-10 bg-pink-500/20 rounded flex items-center justify-center text-xs font-bold text-pink-600">AW</div>
                                        <span className="text-xs font-bold text-foreground">Awin</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center gap-3 text-center h-32 hover:border-orange-500/30 transition-colors">
                                        <div className="w-10 h-10 bg-purple-500/20 rounded flex items-center justify-center text-xs font-bold text-purple-500">AMZ</div>
                                        <span className="text-xs font-bold text-foreground">Amazon Assoc.</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs text-center text-muted-foreground">Plus Awin, ClickBank, ShareASale & more.</p>
                            </section>

                            {/* Career Impact */}
                            <section>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Career Impact</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-orange-500">badge</span> Job Roles & Opportunities
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Email Marketing Specialist", "Affiliate Manager", "Marketing Automation Expert", "Retention Lead", "Growth Hacker"].map((role, idx) => (
                                                <span key={idx} className="px-3 py-1.5 bg-surface text-foreground text-sm font-medium rounded-full border border-border-color">{role}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-surface border-border-color border bg-surface-deep p-6 rounded-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 bg-orange-500/10 rounded-full blur-2xl"></div>
                                        <h4 className="font-bold text-foreground/90 dark:text-white/90 text-sm uppercase tracking-wide mb-2">Earnings Potential</h4>
                                        <div className="text-3xl font-display font-bold mb-1 text-foreground dark:text-white">₹5L - ₹18L+</div>
                                        <p className="text-xs text-muted-foreground dark:text-white/60">Salary (CTC) or Freelance Income</p>
                                        <div className="mt-4 h-1.5 bg-border-color dark:bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 w-3/4 rounded-full"></div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground dark:text-white/60 mt-2 text-right">Includes Affiliate Side-Income</p>
                                    </div>
                                </div>
                            </section>



                            {/* Mentors - Simple & Clean */}
                            {/* Mentors Section Removed to make space for Testimonials or kept if needed, but adding Testimonials here */}
                            <section className="py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-surface-deep/50">
                                <div className="max-w-5xl mx-auto">
                                    <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Student Success Stories</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { name: "Rahul K.", role: "Affiliate Marketer", quote: "I closed my first high-ticket sale ($350 commission) in week 5 using the landing page templates.", result: "₹85k in Month 2" },
                                            { name: "Sneha G.", role: "Email Specialist", quote: "Landed a retainer with a US ecommerce brand managing their Klaviyo flows. The automation module is gold.", result: "$1.5k/month Retainer" }
                                        ].map((testimonial, idx) => (
                                            <div key={idx} className="bg-background p-6 rounded-2xl border border-border-color shadow-sm relative">
                                                <div className="absolute top-4 right-4 text-orange-200">
                                                    <span className="material-symbols-outlined text-4xl">format_quote</span>
                                                </div>
                                                <p className="text-foreground/80 italic mb-4 relative z-10">"{testimonial.quote}"</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                                    </div>
                                                    <div className="ml-auto bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded">
                                                        {testimonial.result}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Divider */}
                            <div className="border-t border-border-color my-8"></div>

                            {/* Why Choose Pixe Section - Ultra Premium */}
                            <section className="py-16 relative overflow-visible">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                    {/* ... (Copying premium structure from SMM but with Email content) ... */}
                                    <div className="text-center mb-12">
                                        <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                                            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Pixe?</span>
                                        </h2>
                                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                            The difference between <span className="text-red-500/70 line-through decoration-red-500/30 decoration-2">Spamming Inboxes</span> and <span className="text-foreground font-bold border-b-2 border-orange-500">Printing Money</span>.
                                        </p>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative mt-6 lg:mt-0">
                                        {/* Central VS Badge (Desktop) */}
                                        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-background border-[8px] border-surface rounded-full items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.1)] animate-[float_6s_ease-in-out_infinite]">
                                            <span className="font-black text-2xl text-muted-foreground/30 italic font-mono">VS</span>
                                        </div>

                                        {/* The Old Way Card */}
                                        <div className="bg-surface/30 border border-dashed border-border-color rounded-[2rem] p-6 lg:p-12 flex flex-col grayscale opacity-60 hover:opacity-100 transition-all duration-500 hover:border-red-500/30 group relative h-full">
                                            <h3 className="text-center text-xl font-bold text-muted-foreground/80 mb-10 uppercase tracking-widest group-hover:text-red-500/80 transition-colors">The Standard Way</h3>
                                            <div className="space-y-6 flex-grow relative z-10">
                                                {[
                                                    "Buying 'Dead' Email Lists",
                                                    "Spammy ClickBank Links",
                                                    "Manual Email Sending",
                                                    "Zero Automation Knowledge",
                                                    "Getting Banned by Gmail"
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
                                        <div className="relative group perspective-1000 mt-6 lg:mt-0">
                                            <div className="absolute -inset-[2px] bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-[2.2rem] blur-sm opacity-50 group-hover:opacity-100 animate-gradient-xy transition-opacity duration-500"></div>
                                            <div className="relative bg-background/80 dark:bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 lg:p-12 h-full flex flex-col shadow-2xl shadow-orange-500/20 transform lg:scale-105 transition-transform duration-500 overflow-visible">

                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-[90%] sm:max-w-auto flex justify-center">
                                                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg border border-white/20 whitespace-nowrap overflow-hidden relative">
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-base animate-pulse">star</span>
                                                            Pixe Profit Framework
                                                        </span>
                                                        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                                                    </div>
                                                </div>

                                                <h3 className="text-center text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 mb-2 mt-8 uppercase tracking-wider">The Pixe Edge</h3>
                                                <p className="text-center text-xs font-bold text-muted-foreground mb-10 uppercase tracking-widest opacity-70">Top 1% Affiliate System</p>

                                                <div className="space-y-6 flex-grow relative z-10">
                                                    {[
                                                        { text: "Proven High-Ticket Funnels", sub: "Copy-Paste Templates", icon: "content_copy" },
                                                        { text: "Private Network Access", sub: "Exclusive Offers", icon: "diamond" },
                                                        { text: "Klaviyo & Mailchimp Mastery", sub: "Full Automation", icon: "settings_suggest" },
                                                        { text: "Live Campaign Audits", sub: "Real-time Feedback", icon: "analytics" },
                                                        { text: "Passive Income Roadmap", sub: "First ₹50K Strategy", icon: "monetization_on" }
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-5 group/item">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 group-hover/item:border-orange-500/50 group-hover/item:bg-orange-500/20 transition-all duration-300 shadow-sm">
                                                                <span className="material-symbols-outlined text-orange-500 group-hover/item:scale-110 transition-transform">{item.icon}</span>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-foreground text-lg leading-tight group-hover/item:text-orange-500 transition-colors">{item.text}</div>
                                                                <div className="text-xs text-muted-foreground font-medium mt-1">{item.sub}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-12 pt-8 border-t border-dashed border-orange-500/20 bg-gradient-to-b from-transparent to-orange-500/5 -mx-8 sm:-mx-12 -mb-12 p-6 pb-10 sm:p-10 sm:pb-14 rounded-b-[2rem]">
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div className="text-center">
                                                            <div className="text-orange-500 font-bold text-[10px] uppercase tracking-widest mb-1">Scholarship Price</div>
                                                            <div className="flex items-baseline gap-3 justify-center">
                                                                <span className="text-4xl font-display font-black text-foreground tracking-tight">₹35,000</span>
                                                                <span className="text-lg text-muted-foreground line-through decoration-red-500/50 decoration-2">₹55,000</span>
                                                            </div>
                                                            <div className="text-[10px] text-muted-foreground mt-1 flex items-center justify-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> EMI Available</div>
                                                        </div>
                                                        <Link href="#enroll-form" className="w-full max-w-[320px] bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-2xl shadow-[0_10px_30px_-10px_rgba(234,88,12,0.5)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group/btn whitespace-nowrap">
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
                                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Course FAQ</h2>
                                <div className="space-y-3">
                                    {[
                                        { q: "Is this course suitable for beginners?", a: "Yes! We start from the basics of how email and affiliate marketing work, moving up to advanced automation strategies." },
                                        { q: "Do I need to pay for tools like Mailchimp?", a: "Most tools we use have free ties perfect for learning. You won't need to pay for software subscriptions to complete the course." },
                                        { q: "Can I do this part-time?", a: "Absolutely. The course is designed for working professionals and students. Sessions are recorded, and assignments are flexible." },
                                        { q: "Do I need a website to start?", a: "Not necessarily. We teach strategies to use social media and landing pages to drive traffic without a full custom website initially." },
                                        { q: "How long until I make my first sale?", a: "Many students see results within 4-6 weeks of implementing our 'First 1000 Subscriber' framework, but this varies based on effort." }
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
                            {/* Program Fees Card Sidebar */}
                            <div className="bg-surface rounded-2xl shadow-sm p-6 border border-border-color" id="program-fees">
                                <h3 className="text-lg font-bold text-foreground mb-4">Program Fees</h3>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-3xl font-display font-bold text-foreground">₹35,000</span>
                                    <span className="text-sm text-muted-foreground line-through mb-1">₹55,000</span>
                                </div>
                                <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded mb-6">Limited Time Offer: Save 36%</span>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="material-symbols-outlined text-orange-500 text-xl">credit_score</span>
                                        <span>EMI starts ₹2,900/mo. Invest in your passive income future.</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="material-symbols-outlined text-orange-500 text-xl">school</span>
                                        <span>Scholarships available</span>
                                    </div>
                                </div>
                                <Link href="#enroll-form" className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors block text-center">
                                    Enroll Now
                                </Link>
                            </div>

                            {/* Free Masterclass CTA */}
                            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
                                <span className="material-symbols-outlined text-4xl mb-3 block">videocam</span>
                                <h3 className="font-bold text-lg mb-2">Free Income Masterclass</h3>
                                <p className="text-sm text-indigo-100 mb-6">Join our 2-hour live session on &quot;Building Your First Funnel&quot; this Sunday.</p>
                                <Link href="/masterclass" className="w-full py-3 bg-white text-indigo-700 font-bold rounded-lg shadow-lg hover:bg-indigo-50 transition-colors block">
                                    Reserve Free Seat
                                </Link>
                            </div>

                            {/* Hiring Partners */}
                            <div className="p-6 bg-surface rounded-2xl border border-border-color text-center">
                                <h4 className="font-bold text-foreground mb-4 text-sm">Our Hiring Partners & Networks</h4>
                                <div className="grid grid-cols-3 gap-4 opacity-60">
                                    {["Amazon", "ClickBank", "ShareASale", "HubSpot", "Shopify", "ConvertKit"].map((partner, idx) => (
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
                                        title: "SEO & Agentic Search",
                                        desc: "Master SEO to drive organic traffic to your affiliate funnels.",
                                        href: "/courses/seo-course"
                                    },
                                    {
                                        image: "/images/courses/smm/hero.png",
                                        title: "Social Media Marketing",
                                        desc: "Use social organic reach to build your email list faster.",
                                        href: "/courses/social-media-marketing-course"
                                    },
                                    {
                                        image: "/images/courses/related/digital.png",
                                        title: "Advanced Digital Marketing",
                                        desc: "The complete stack: Funnels, Ads, SEO, and Content.",
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
                                            <h3 className="font-bold text-foreground mb-2 group-hover:text-orange-600 transition-colors">{course.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-4">{course.desc}</p>
                                            <span className="text-orange-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View Details <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />

                {/* Mobile Bottom Bar */}
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
