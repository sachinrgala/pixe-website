import React from "react";
import type { Metadata } from 'next';
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";

export const metadata: Metadata = {
    title: "Advanced PPC & Performance Marketing Course | Google & Meta Ads",
    description: "Master ROI-driven marketing with India's only agency-led PPC course. Live budgets, advanced scaling strategies, and 100% placement support.",
    keywords: ["PPC Course", "Performance Marketing Training", "Google Ads Course", "Facebook Ads Course", "Digital Marketing Course India", "Paid Media Training"],
    openGraph: {
        title: "Advanced PPC & Performance Marketing Course | Pixe",
        description: "Zero to Expert in Google Ads, Meta Ads & Programmatic Advertising. Real money, real campaigns.",
        images: ["/images/courses/ppc/hero-v2.png"],
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: "https://www.pixe.education/courses/ppc-course",
    },
};

export default function PPCCoursePage() {
    return (
        <div className="bg-background text-foreground font-body antialiased selection:bg-primary/30 selection:text-white pb-24 md:pb-0 relative">
            {/* Navbar handled globally */}

            <main>
                {/* 1. Hero Section */}
                <section className="relative bg-background pt-12 pb-12 md:pt-24 md:pb-16 lg:pt-32 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.07] mix-blend-overlay"></div>
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] opacity-20"></div>

                    <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-yellow-500/90 to-amber-500/90 text-slate-900 text-center py-2 text-xs md:text-sm font-bold shadow-lg backdrop-blur-sm z-30">
                        <span className="material-symbols-outlined align-middle text-sm mr-1">timer</span>
                        Batch Closing Soon — Secure Your Spot Today
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-7 relative z-10">
                                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] text-foreground">
                                    Advanced 2026 Curriculum for <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400">PPC & Performance Marketing</span>
                                </h1>
                                <p className="text-lg text-text-muted mb-8 max-w-xl leading-relaxed">
                                    Master Google Ads, Meta Ads, and GA4 with the only agency-led program
                                    that provides <span className="text-foreground font-semibold">Live Ad Budgets</span> to every student.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#curriculum" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-gleam transition-all transform hover:-translate-y-1 text-center">
                                        View Curriculum
                                    </a>
                                    <a href="#enroll" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border-color hover:bg-surface text-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">download</span>
                                        Brochure
                                    </a>
                                </div>
                                <div className="mt-10">
                                    <p className="text-xs font-bold text-text-muted mb-4 uppercase tracking-widest">Industry Recognized Certifications</p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">META BLUEPRINT</div>
                                        <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">GOOGLE ADS</div>
                                        <div className="h-8 px-4 bg-surface-deep border border-border-color rounded flex items-center justify-center text-xs font-bold text-foreground tracking-wider">GA4 ANALYTICS</div>
                                    </div>
                                </div>

                                {/* Hero Image Space */}
                                <div className="mt-12 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-[300px] w-full max-w-2xl">
                                    <Image
                                        src="/images/courses/ppc/hero-v2.png"
                                        alt="PPC Dashboard Analysis"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-6 text-white">
                                        <p className="font-bold text-lg">Real-Time Data Analysis</p>
                                        <p className="text-sm opacity-90">Learn on live agency accounts</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                                <div className="sticky top-24 bg-surface rounded-2xl p-6 md:p-8 shadow-2xl text-foreground border border-border-color">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold font-display text-foreground">Check My Eligibility</h3>
                                        <span className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">Fast Apply</span>
                                    </div>
                                    <UniversalLeadForm
                                        formId="ppc_hero_form"
                                        source="ppc_course_hero"
                                        course="PPC & Performance Marketing"
                                        title=""
                                        submitButtonText="Start Application"
                                        successMessage="We'll call you shortly!"
                                        className="space-y-4 text-foreground"
                                    />
                                    <p className="text-xs text-center text-slate-500 mt-3">Priority selection for candidates with analytical backgrounds.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Skills Icons Row */}
                <section className="py-12 bg-surface-deep border-b border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                { title: "Campaign Setup", icon: "settings_suggest", color: "blue" },
                                { title: "Optimization", icon: "tune", color: "green" },
                                { title: "Attribution Models", icon: "hub", color: "purple" },
                                { title: "ROAS Scaling", icon: "monetization_on", color: "orange" }
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
                <section className="py-12 md:py-20 bg-background overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                                <Image
                                    src="/images/courses/ppc/training-v2.png"
                                    alt="PPC Strategy Workshop"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Agency-Style Workshops</h3>
                                    <p className="text-white/80">Brainstorm, plan, and execute live campaigns in teams.</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">Stop Watching. <br /><span className="text-primary">Start Spending (Our Money).</span></h2>
                                <p className="text-lg text-text-muted mb-8 leading-relaxed">
                                    Creating a dummy campaign is easy. Spending real money and getting an ROI is hard.
                                    Thats why we give you a <strong>Live Ad Budget</strong> to practice on real platforms.
                                </p>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Manage ₹5,000+ in Live Spend",
                                        "A/B Test Ad Creatives Live",
                                        "Analyze Real Conversion Data",
                                        "Fix Scaling Issues in Real-Time"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-green-500 bg-green-500/10 p-1 rounded-full text-sm">check</span>
                                            <span className="text-foreground font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="#enroll" className="inline-flex items-center px-6 py-3 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-all">
                                    Claim Your Ad Budget
                                    <span className="material-symbols-outlined ml-2">payments</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Content Grid */}
                <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 gap-8 md:gap-12">
                    <div className="lg:col-span-2 space-y-16">
                        {/* Who Should Enroll */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Who Is This Course For?</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: "Students & Freshers", desc: "Start your career with a high-paying skill. No coding required.", icon: "school" },
                                    { title: "Marketing Pros", desc: "Upgrade from organic social/SEO to high-performance paid ads.", icon: "rocket_launch" },
                                    { title: "Agency Owners", desc: "Stop outsourcing. Build an in-house performance team.", icon: "business_center" }
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

                        {/* Recent Success Stories */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Student Success Stories</h2>
                            <div className="bg-surface-deep rounded-3xl p-8 border border-border-color">
                                <div className="grid gap-8">
                                    {[
                                        {
                                            name: "Neha Gupta",
                                            role: "Now Performance Marketer at Swiggy",
                                            quote: "I was stuck in a generic digital marketing role. This course taught me actual scaling strategies. The live budget practice was a game changer.",
                                            image: "https://randomuser.me/api/portraits/women/44.jpg"
                                        },
                                        {
                                            name: "Rahul Nair",
                                            role: "Freelance Media Buyer",
                                            quote: "From zero to managing ₹5L/month in ad spend. The mentorship on finding international clients helped me quit my 9-5.",
                                            image: "https://randomuser.me/api/portraits/men/32.jpg"
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
                                        title: "Google Ads Fundamentals & Search",
                                        lessons: ["Keyword Match Types & Quality Score", "Ad Copywriting & Extensions", "Bidding Strategies (Manual vs Smart)", "Campaign Structure & Audience Targeting"]
                                    },
                                    {
                                        title: "Meta Ads Mastery (FB + Insta)",
                                        lessons: ["Meta Pixel Setup & CAPI", "Audience Funnels (Cold, Warm, Hot)", "Creative Strategy & A/B Testing", "Advantage+ Shopping Campaigns"]
                                    },
                                    {
                                        title: "Programmatic, Video & Discovery",
                                        lessons: ["YouTube Ads", "Display (GDN)", "DV360 Introduction", "Native Advertising"]
                                    },
                                    {
                                        title: "Analytics, Attribution & Reporting",
                                        lessons: ["GA4 for Paid Media", "Custom Reports", "Attribution Models", "Looker Studio Dashboards"]
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

                        {/* Tools & Tech Stack */}
                        <section className="bg-surface-deep/50 rounded-3xl p-8 border border-border-color backdrop-blur-sm">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Master The PPC Tech Stack</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { name: "Google Ads", icon: "/images/about/google-g-logo.png", color: "bg-surface" },
                                    { name: "Meta Ads", icon: "/images/about/meta-logo-blue.svg", color: "bg-surface" },
                                    { name: "GA4", icon: "/images/about/ga4-logo.svg", color: "bg-surface" },
                                    { name: "Looker Studio", icon: "monitoring", type: "icon", color: "bg-blue-500" }
                                ].map((tool, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-6 bg-surface rounded-2xl border border-border-color shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                                        <div className={`w-16 h-16 ${tool.color} rounded-xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                            {tool.type === 'icon' ? (
                                                <span className="material-symbols-outlined text-white text-3xl">{tool.icon}</span>
                                            ) : (
                                                <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain p-2" />
                                            )}
                                        </div>
                                        <h4 className="font-bold text-foreground text-sm">{tool.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Validated Certifications */}
                        <section>
                            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h2 className="font-display text-2xl font-bold mb-4">3 Global Certifications</h2>
                                        <p className="text-indigo-200 mb-6 max-w-md">Get recognized by top employers. We guide you through the official exams for Google Ads, Meta Blueprint, and GA4.</p>
                                        <div className="flex gap-3">
                                            {["Google Ads Search", "Meta Media Buying", "Google Analytics"].map((c, i) => (
                                                <div key={i} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold backdrop-blur-md">
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex -space-x-4">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-indigo-800 transition-transform hover:scale-110 hover:z-10">
                                            <img src="/images/about/google-g-logo.png" alt="Google" className="w-10 h-10 object-contain" />
                                        </div>
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-indigo-800 transition-transform hover:scale-110 hover:z-10">
                                            <img src="/images/about/meta-logo-blue.svg" alt="Meta" className="w-10 h-10 object-contain" />
                                        </div>
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-indigo-800 transition-transform hover:scale-110 hover:z-10">
                                            <img src="/images/about/ga4-logo.svg" alt="GA4" className="w-10 h-10 object-contain" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
                            </div>
                        </section>


                        {/* FAQ Section */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "Do you provide placement assistance?", a: "Yes. We have a dedicated placement cell that helps with resume building, mock interviews, and connecting you with our hiring partners like Schbang and GroupM." },
                                    { q: "Is the ad budget included in the fee?", a: "No, the ad budget is separate. However, we provide a practice budget of ₹5,000 for the live project phase so you don't have to spend your own money initially." },
                                    { q: "What if I miss a live class?", a: "All live sessions are recorded and uploaded to your student dashboard within 24 hours. You have lifetime access to these recordings." },
                                    { q: "Do I need coding knowledge?", a: "No coding is required. We teach you how to set up pixels and tracking using Google Tag Manager, which is a low-code/no-code tool." }
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
                                <span className="text-4xl font-display font-bold text-foreground tracking-tight">₹34,999</span>
                                <span className="text-sm text-text-muted line-through mb-1.5 opacity-70">₹55,000</span>
                            </div>
                            <span className="inline-block bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 text-xs font-bold px-3 py-1.5 rounded-full mb-8">Early Bird Offer • 36% OFF</span>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 text-sm text-text-muted font-medium">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg">credit_score</span>
                                    </div>
                                    <span>No Cost EMI starts ₹2,900/mo</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-text-muted font-medium">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                    </div>
                                    <span>3 Certifications Included</span>
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
                                        { f: "Live Budget Provided", us: true, others: false },
                                        { f: "Advantage+ Training", us: true, others: false },
                                        { f: "Agency Hiring Partners", us: true, others: false }
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
                <section className="py-12 md:py-16 bg-surface-deep border-t border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-8">Related Career Paths</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "SEO Course",
                                    desc: "Master organic growth & technical SEO strategies.",
                                    link: "/courses/seo-course",
                                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", // Corporate data/analytics
                                },
                                {
                                    title: "Free Counseling",
                                    desc: "Get 1:1 expert guidance for your career.",
                                    link: "/free-counseling",
                                    image: "/images/courses/ppc/counseling-indian-meeting.jpg", // Custom Uploaded Image
                                },
                                {
                                    title: "Adv. Digital Marketing",
                                    desc: "Comprehensive full-stack marketing program.",
                                    link: "/advance-digital-marketing-course",
                                    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", // Team/Strategy
                                }
                            ].map((path, i) => (
                                <a href={path.link} key={i} className="block group bg-surface rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 border border-border-color transition-all duration-300 overflow-hidden hover:-translate-y-1">
                                    <div className="aspect-[16/9] relative overflow-hidden">
                                        <Image
                                            src={path.image}
                                            alt={path.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
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
                description="Get the detailed PPC Curriculum & Salary Guide delivered to your email."
                buttonText="Download Syllabus"
                course="PPC_Performance_Course"
                targetId="application-form"
            />

            {/* SEO Footer Data - Hidden but present for crawlers or structured data */}
            <div className="hidden sr-only">
                {/* 6. Technical SEO Footer */}
                <section className="py-16 bg-background text-text-muted border-t border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 text-sm leading-relaxed">
                            <div>
                                <h3 className="text-foreground font-bold mb-4 font-display">Performance Marketing Course in Bangalore & Mumbai</h3>
                                <p>
                                    Our Performance Marketing Course in Bangalore and Mumbai is designed for the high-intent marketer.
                                    Unlike generic digital marketing programs, we focus exclusively on the math of digital ads.
                                    As the best PPC training in India, we cover the entire funnel—from audience predictive modeling to search engine dominance.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-foreground font-bold mb-4 font-display">Best PPC Training in India with Placement</h3>
                                <p>
                                    We bridge the gap left by colleges and traditional institutes by teaching high-level concepts like Server-Side Tracking,
                                    Multi-Touch Attribution (MTA), and Media Mix Modeling (MMM). Our syllabus is optimized for the 2026 landscape.
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
                            "name": "Advanced PPC & Performance Marketing Course",
                            "description": "Master Google Ads, Meta Ads, and GA4 with the only agency-led program that provides Live Ad Budgets to every student.",
                            "provider": {
                                "@type": "Organization",
                                "name": "Pixe Education",
                                "sameAs": "https://pixe.education"
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": "34999",
                                "priceCurrency": "INR",
                                "availability": "https://schema.org/InStock",
                                "category": "Paid Media Training"
                            },
                            "hasCourseInstance": {
                                "@type": "CourseInstance",
                                "courseMode": "Online",
                                "courseWorkload": "PT12W",
                                "instructor": [
                                    { "@type": "Person", "name": "Vikram Malhotra", "jobTitle": "Director of Paid Media" },
                                    { "@type": "Person", "name": "Sarah Jenkins", "jobTitle": "Meta Ads Specialist" }
                                ]
                            },
                            "educationalCredentialAwarded": ["Google Ads Certification", "Meta Blueprint Certification", "GA4 Certification"],
                            "occupationalCategory": "Performance Marketer"
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Do you provide placement assistance?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Yes. We have a dedicated placement cell that helps with resume building, mock interviews, and connecting you with our hiring partners like Schbang and GroupM."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Is the ad budget included in the fee?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "No, the ad budget is separate. However, we provide a practice budget of ₹5,000 for the live project phase so you don't have to spend your own money initially."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What if I miss a live class?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "All live sessions are recorded and uploaded to your student dashboard within 24 hours. You have lifetime access to these recordings."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Do I need coding knowledge?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "No coding is required. We teach you how to set up pixels and tracking using Google Tag Manager, which is a low-code/no-code tool."
                                    }
                                }
                            ]
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
                                    "name": "PPC & Performance Marketing",
                                    "item": "https://pixe.education/courses/ppc-course"
                                }
                            ]
                        }
                    ])
                }} />
            </div>
        </div>
    );
}
