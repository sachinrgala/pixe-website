"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function FreeCounselingPage() {
    const [activeTab, setActiveTab] = useState("all");

    const scrollToForm = (courseName?: string) => {
        const form = document.getElementById("enroll-form");
        if (form) {
            form.scrollIntoView({ behavior: "smooth" });
            // Ideally we would pre-fill the form here, but UniversalLeadForm handles its own state.
            // In a more complex setup, we'd pass a selectedCourse state down.
        }
    };

    return (
        <>
            <div className="font-body bg-background text-foreground overflow-x-hidden antialiased selection:bg-orange-500/20 selection:text-orange-600">

                <ExitIntentPopup
                    course="counseling"
                    title="Don't know where to start?"
                    description="Get our free 'Digital Marketing Career Guide 2026' before you go."
                    buttonText="Get Free Guide"
                    targetId="enroll-form"
                />

                {/* Hero Section with Integrated Booking Form */}
                <section className="relative bg-background pt-32 pb-12 lg:pt-48 lg:pb-24 overflow-hidden border-b border-border-color">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                        {/* Left Content */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 w-fit sm:mx-0 border border-orange-200 dark:border-orange-800/50">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-wide">Free Private Session</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight">
                                Confused About Your <br />
                                <span className="text-orange-600">Career Path?</span>
                            </h1>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                                Book a <strong>Free 1-on-1 Counseling Session</strong> or request a <strong>Live Demo Class</strong>. No fees. No commitment. Just 15 minutes to find your perfect niche.
                            </p>

                            {/* Value Props List */}
                            <div className="flex flex-col gap-4 mt-2">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border-color hover:border-orange-500/30 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-orange-600">map</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-sm group-hover:text-orange-600 transition-colors">Career Roadmap 2026</h3>
                                        <p className="text-sm text-muted-foreground">Personalized growth plan based on your background.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border-color hover:border-orange-500/30 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-blue-600">visibility</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-sm group-hover:text-blue-600 transition-colors">Live Platform Demo</h3>
                                        <p className="text-sm text-muted-foreground">See how our AI-native LMS works before you join.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border-color hover:border-orange-500/30 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-green-600">payments</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-sm group-hover:text-green-600 transition-colors">Salary & Job Market Data</h3>
                                        <p className="text-sm text-muted-foreground">Real placement stats and salary ranges for Fresher vs Pro.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center gap-6 mt-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mr-2">Hiring Partners:</span>
                                {["Google", "Zomato", "Swiggy", "Amazon", "Cred"].map((partner, i) => (
                                    <span key={i} className="text-xs font-bold text-muted-foreground/60 border border-border-color px-2 py-1 rounded">{partner}</span>
                                ))}
                                <span className="text-xs font-bold text-orange-500">+ 500 More</span>
                            </div>
                        </div>

                        {/* Right Content: Booking Widget */}
                        <div className="lg:col-span-5 w-full" id="enroll-form">
                            <div className="sticky top-24">
                                <UniversalLeadForm
                                    source="free_counseling_page"
                                    formId="free-counseling"
                                    title="Book Free Session"
                                    subtitle="Select a time that works for you. Limited slots available this week."
                                    submitButtonText="Confirm My Slot"
                                    className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-orange-100 dark:border-slate-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
                                />
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    2 Counselors are online now
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Explore All Courses (Knowledge Center) */}
                <section className="py-20 bg-surface border-b border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Explore Our Domains</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Not sure which path aligns with your goals? Explore the tracks below, then discuss with our counselor.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "SEO & Agentic AI",
                                    icon: "search_check",
                                    desc: "Master Search Generative Experience (SGE), Technical SEO, and AI-driven content ranking.",
                                    color: "blue",
                                    link: "/courses/seo-course"
                                },
                                {
                                    title: "Performance Marketing (PPC)",
                                    icon: "ads_click",
                                    desc: "Learn Google Ads, Meta Ads, and ROAS optimization strategies used by top agencies.",
                                    color: "purple",
                                    link: "/courses/ppc-course"
                                },
                                {
                                    title: "Social Media Marketing",
                                    icon: "share",
                                    desc: "Build viral organic growth, master Reels, and content psychology.",
                                    color: "pink",
                                    link: "/courses/social-media-marketing-course"
                                },
                                {
                                    title: "Affiliate & Email Revenue",
                                    icon: "forward_to_inbox",
                                    desc: "Create passive income systems using automation flows and cold outreach.",
                                    color: "orange",
                                    link: "/courses/affiliate-email-marketing-course"
                                },
                                {
                                    title: "WordPress Development",
                                    icon: "web",
                                    desc: "Build professional no-code websites and landing pages that convert.",
                                    color: "teal",
                                    link: "/courses/wordpress-development-course"
                                },
                                {
                                    title: "Marketing Analytics",
                                    icon: "analytics",
                                    desc: "Data-driven decision making with GA4, Looker Studio, and Python for marketing.",
                                    color: "indigo",
                                    link: "/courses/analytics-course"
                                }
                            ].map((item, idx) => (
                                <Link key={idx} href={item.link} className="group bg-background rounded-2xl p-6 border border-border-color hover:border-orange-500/30 hover:shadow-lg transition-all cursor-pointer flex flex-col items-start">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${item.color}-50 dark:bg-${item.color}-900/10`}>
                                        <span className="material-symbols-outlined text-2xl" style={{ color: `var(--${item.color}-500)` }}>{item.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-xl mb-3 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
                                    <span className="mt-auto text-sm font-bold text-orange-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View Course <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <button onClick={() => scrollToForm()} className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-[0_10px_30px_-10px_rgba(234,88,12,0.4)] transition-all hover:scale-105 active:scale-95">
                                <span className="material-symbols-outlined">download</span>
                                Download All Course
                            </button>
                        </div>
                    </div>
                </section>

                {/* Who Is This For Section */}
                <section className="py-20 bg-background border-t border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-3xl font-bold mb-4">Who Should Book a Session?</h2>
                            <p className="text-muted-foreground">If you fit into any of these categories, this session will be a game changer for you.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-surface p-8 rounded-2xl border border-border-color hover:border-orange-500/30 transition-all text-center group">
                                <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl text-blue-600">school</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Students & Freshers</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">Confused between SEO, PPC, or Design? We'll analyze your skills and suggest the highest-paying path for 2026.</p>
                            </div>
                            <div className="bg-surface p-8 rounded-2xl border border-border-color hover:border-orange-500/30 transition-all text-center group">
                                <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl text-green-600">work_history</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Working Professionals</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">Stuck in a stagnant job? Learn how to switch to Digital Marketing with a 30-50% salary hike.</p>
                            </div>
                            <div className="bg-surface p-8 rounded-2xl border border-border-color hover:border-orange-500/30 transition-all text-center group">
                                <div className="w-16 h-16 mx-auto bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl text-purple-600">store</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Business Owners</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">Want to scale your business online? Get a free audit of your current marketing strategy.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 bg-surface-deep border-y border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="font-display text-3xl font-bold mb-6">How The Free Session Works</h2>
                                <p className="text-muted-foreground mb-8 text-lg">No sales pressure. Just a genuine conversation about your future.</p>
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-500/30">1</div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Book Your Slot</h3>
                                            <p className="text-muted-foreground text-sm">Fill out the form and choose a time that works for you. You'll get a confirmation WhatsApp/Email instantly.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface border-2 border-orange-500 text-orange-500 flex items-center justify-center font-bold text-xl">2</div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Join the Video Call</h3>
                                            <p className="text-muted-foreground text-sm">Connect with a Senior Mentor (not a salesperson) for 15-20 minutes. Discuss your background and goals.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface border-2 border-orange-500 text-orange-500 flex items-center justify-center font-bold text-xl">3</div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Get Your Roadmap</h3>
                                            <p className="text-muted-foreground text-sm">Receive a personalized PDF roadmap and a scholarship offer if you decide to join a course.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="relative bg-background rounded-3xl p-1 border border-border-color shadow-2xl">
                                    <UniversalLeadForm
                                        source="free_counseling_how_it_works"
                                        formId="free-counseling-bottom"
                                        title="Book Your Slot Now"
                                        subtitle="Secure your free 1-on-1 counseling session instantly."
                                        submitButtonText="Confirm Slot"
                                        className="bg-transparent border-none shadow-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div>
                            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2 block">Our Faculty</span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold">Meet Your Mentors</h2>
                            <p className="text-muted-foreground mt-2">Get advice from industry veterans, not just counselors.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Mentor 1 */}
                        <div className="bg-surface border border-border-color rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                            <div className="aspect-[4/3] bg-slate-100 relative">
                                <Image
                                    src="/images/courses/smm/mentors/rajesh.png"
                                    alt="Senior Mentor"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="font-bold text-lg">Arjun Reddy</div>
                                    <div className="text-xs opacity-80 uppercase tracking-widest">Performance Marketing Lead</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-2 py-1 bg-background border border-border-color rounded text-[10px] font-bold">Ex-Swiggy</span>
                                    <span className="px-2 py-1 bg-background border border-border-color rounded text-[10px] font-bold">10+ Years</span>
                                </div>
                                <p className="text-sm text-muted-foreground">"I help students understand the technical depth of PPC before they commit. No fluff, just strategy."</p>
                            </div>
                        </div>

                        {/* Mentor 2 */}
                        <div className="bg-surface border border-border-color rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                            <div className="aspect-[4/3] bg-slate-100 relative">
                                <Image
                                    src="/images/courses/smm/mentors/priya.png"
                                    alt="Career Counselor"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="font-bold text-lg">Priya Sharma</div>
                                    <div className="text-xs opacity-80 uppercase tracking-widest">Senior Career Architect</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-2 py-1 bg-background border border-border-color rounded text-[10px] font-bold">Certified Coach</span>
                                    <span className="px-2 py-1 bg-background border border-border-color rounded text-[10px] font-bold">5000+ Students</span>
                                </div>
                                <p className="text-sm text-muted-foreground">"My goal is to align your natural strengths with the right digital domain. Let's find your fit."</p>
                            </div>
                        </div>

                        {/* Mentor 3 */}
                        <div className="bg-surface border border-border-color rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                            <div className="aspect-[4/3] bg-slate-100 relative">
                                <Image
                                    src="/images/amit_patel.png"
                                    alt="Design Lead"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="font-bold text-lg">Vikram Singh</div>
                                    <div className="text-xs opacity-80 uppercase tracking-widest">UI/UX & Creative Head</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-2 py-1 bg-background border border-border-color rounded text-[10px] font-bold">Design Awards</span>
                                    <span className="px-2 py-1 bg-background border border-border-color rounded text-[10px] font-bold">Agency Founder</span>
                                </div>
                                <p className="text-sm text-muted-foreground">"Creativity needs direction. I'll show you how to turn your design eye into a high-paying career."</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Student Success Stories (Testimonials) */}
                <section className="py-20 bg-background border-t border-border-color">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold mb-4">Stories from Our Students</h2>
                            <p className="text-muted-foreground">Real people who found their direction after a free counseling session.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-surface p-8 rounded-2xl border border-border-color shadow-sm">
                                <div className="flex gap-1 mb-4 text-orange-500">
                                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-xl fill-current">star</span>)}
                                </div>
                                <p className="text-lg font-medium italic mb-6">"I was confused between Data Science and Digital Marketing. The counselor showed me the job market reality and salary growth for both. I chose Performance Marketing and landed a job at a top agency within 3 months."</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                        {/* Use a generic avatar or initial if specific image not available, but user asked for India based images. Using a placeholder style with initials is safe or a known image if avail. */}
                                        <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg">SK</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Sneha Kapoor</h4>
                                        <p className="text-xs text-muted-foreground">Performance Marketer @ Dentsu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-surface p-8 rounded-2xl border border-border-color shadow-sm">
                                <div className="flex gap-1 mb-4 text-orange-500">
                                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-xl fill-current">star</span>)}
                                </div>
                                <p className="text-lg font-medium italic mb-6">"I thought I was too old to switch careers at 32. The mentor explained how my sales experience is actually a huge asset in Affiliate Marketing. Now I earn more passively than my previous salary."</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">RV</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Rahul Verma</h4>
                                        <p className="text-xs text-muted-foreground">Affiliate Marketer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 bg-background border-t border-border-color">
                    <div className="max-w-3xl w-full mx-auto px-4">
                        <h2 className="text-3xl font-display font-bold mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="group bg-surface rounded-xl border border-border-color open:border-orange-500/50 transition-all">
                                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-foreground">
                                    <span>Is the counseling session really free?</span>
                                    <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="text-muted-foreground p-5 pt-0 text-sm leading-relaxed border-t border-transparent group-open:border-border-color">
                                    Yes, absolutely! The session is 100% free. We believe every student deserves clarity before investing in education. There is no obligation to enroll.
                                </div>
                            </details>
                            <details className="group bg-surface rounded-xl border border-border-color open:border-orange-500/50 transition-all">
                                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-foreground">
                                    <span>What happens in the Demo Class?</span>
                                    <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="text-muted-foreground p-5 pt-0 text-sm leading-relaxed border-t border-transparent group-open:border-border-color">
                                    In the Demo Class, you attend a live session with one of our mentors. You'll experience our teaching style, see the LMS in action, and learn a specific topic (e.g., "SEO Fundamentals" or "First Facebook Ad").
                                </div>
                            </details>
                            <details className="group bg-surface rounded-xl border border-border-color open:border-orange-500/50 transition-all">
                                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-foreground">
                                    <span>Can I bring my parents?</span>
                                    <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="text-muted-foreground p-5 pt-0 text-sm leading-relaxed border-t border-transparent group-open:border-border-color">
                                    Of course! We encourage it. We can answer their questions about placement security, fee structure, and the future scope of digital marketing.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-12 px-4 border-t border-border-color bg-surface-deep">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-6">Need Instant Answers?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="tel:+919876543210" className="flex items-center justify-center gap-3 px-8 py-4 bg-background border border-border-color hover:border-orange-500 rounded-xl font-bold transition-all group">
                                <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">call</span>
                                </span>
                                <span>Call Our Team</span>
                            </a>
                            <a href="https://wa.me/919876543210" className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all">
                                <span className="material-symbols-outlined text-2xl">chat</span>
                                <span>Chat on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
}
