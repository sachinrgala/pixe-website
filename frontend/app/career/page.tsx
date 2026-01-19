"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import Link from "next/link";
import Image from "next/image";

export default function CareerOutcomesPage() {
    // Static Data for Immediate Loading & Reliability
    const data = {
        title: "Career Guarantee",
        hero: {
            title: "We Don't Just Teach. We Get You Hired.",
            subtitle: "Join the only digital marketing institute with an agency-simulation model. 100% Placement Support until you land your dream job.",
            stats: [
                { label: "100%", subLabel: "Placement Support" },
                { label: "4.5L", subLabel: "Avg. Starting Package" },
                { label: "350+", subLabel: "Hiring Partners" }
            ]
        },
        sections: {
            partners: ["Google", "Amazon", "Flipkart", "Zomato", "Swiggy", "Myntra", "HDFC Bank", "Ogilvy", "GroupM"],
            journey_steps: [
                { step: "01", title: "Enroll & Assessment", desc: "Skill gap analysis to customize your learning path." },
                { step: "02", title: "Agency Training", desc: "Work on live simulator accounts with real ad budgets." },
                { step: "03", title: "Paid Internship", desc: "2-month guaranteed internship with partner agencies." },
                { step: "04", title: "Placement Drive", desc: "Unlimited interview opportunities until hired." }
            ],
            alumni_stories: [
                { name: "Rahul Verma", role: "SEO Specialist", company: "Zomato", before: "Fresh Graduate", after: "₹5.5 LPA", quote: "I had zero practical knowledge. Pixe's agency simulator changed everything. I cracked the Zomato interview in the first attempt!" },
                { name: "Sneha Gupta", role: "Performance Marketer", company: "Nykaa", before: "BPO Job", after: "₹7.2 LPA", quote: "Switching from a BPO to Digital Marketing seemed impossible. Pixe didn't just teach me ads; they taught me strategy." },
                { name: "Amit Patel", role: "Social Media Manager", company: "Ogilvy", before: "Freelancer", after: "₹6.0 LPA", quote: "The portfolio I built during the course is what got me hired. No other institute lets you spend real money on ads." }
            ],
            career_support: [
                { title: "Resume Building", desc: "ATS-friendly resumes crafted by HR experts.", icon: "description" },
                { title: "Mock Interviews", desc: "1-on-1 practice with agency founders.", icon: "person_play" },
                { title: "LinkedIn Optimization", desc: "Profile makeover to attract recruiters.", icon: "share" },
                { title: "Portfolio Creation", desc: "Showcase real campaign results, not just certificates.", icon: "folder_special" }
            ],
            roi_table: [
                { role: "SEO Executive", before: "₹2.4 LPA", after: "₹4.2 LPA", growth: "+75%", time: "3 Months" },
                { role: "PPC Specialist", before: "₹3.0 LPA", after: "₹5.5 LPA", growth: "+83%", time: "4 Months" },
                { role: "Social Media Mgr", before: "₹2.8 LPA", after: "₹4.8 LPA", growth: "+71%", time: "3 Months" },
                { role: "Digital Strategist", before: "₹4.5 LPA", after: "₹8.0 LPA", growth: "+77%", time: "6 Months" }
            ],
            faqs: [
                { q: "Do you guarantee a job?", a: "We provide a 'Job Guarantee' program for eligible students who pass our internal agency assessment. For others, we offer 100% placement assistance with unlimited interview lineups." },
                { q: "What is the average salary I can expect?", a: "Freshers typically start between ₹3.5L to ₹5.5L PA. Experienced professionals switching domains often see hikes of 50-100%." },
                { q: "Are the internships paid?", a: "Yes. After completing the training, qualified students enter a 2-month paid internship with our partner agencies to gain commercial experience." }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-body selection:bg-orange-500/20 selection:text-orange-600">
            <main className="pb-20">
                {/* 1. Hero Section */}
                <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-surface border-b border-border-color">
                    <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div className="space-y-8 text-center lg:text-left">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-800">
                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                                    Career Outcomes Guarantee
                                </span>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
                                    {data.hero.title}
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                    {data.hero.subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                                    <Link href="/free-counseling" className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 whitespace-nowrap">
                                        Book Career Counseling
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Link>
                                    <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-background border border-border-color text-foreground hover:bg-surface hover:text-orange-600 hover:border-orange-200 font-bold rounded-xl transition-all hover:-translate-y-1 whitespace-nowrap">
                                        Download Placement Report
                                        <span className="material-symbols-outlined text-orange-500 group-hover:translate-y-1 transition-transform">download</span>
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                    <span className="text-orange-500 mr-1">★</span> Trusted by 15,000+ students worldwide
                                </p>
                            </div>

                            {/* Right Card "Impact at a Glance" */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[2rem] blur-2xl"></div>
                                <div className="relative bg-background border border-border-color rounded-[2rem] p-8 shadow-2xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="font-bold text-lg font-display">Impact at a Glance</h3>
                                        <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full border border-green-200 dark:border-green-800 font-bold uppercase tracking-wider flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">verified</span> Verified
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">{data.hero.stats?.[0]?.subLabel}</p>
                                            <div className="text-5xl font-black text-orange-600">{data.hero.stats?.[0]?.label}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                                <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{data.hero.stats?.[1]?.subLabel}</p>
                                                <div className="text-2xl font-black text-foreground">{data.hero.stats?.[1]?.label}</div>
                                            </div>
                                            <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                                <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{data.hero.stats?.[2]?.subLabel}</p>
                                                <div className="text-2xl font-black text-foreground">{data.hero.stats?.[2]?.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Partners Strip */}
                <section className="py-8 border-b border-border-color bg-surface-deep overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4">
                        <p className="text-center text-xs font-bold text-muted-foreground mb-6 uppercase tracking-[0.2em]">Our Alumni Work At</p>
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            {/* Ideally integrate actual SVGs here, using text for now as placeholders */}
                            {data.sections.partners.map((p, i) => (
                                <span key={i} className="text-xl md:text-2xl font-black text-foreground/40 hover:text-foreground transition-colors cursor-default">{p}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Your Journey to Success */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Your Journey to Success</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A structured path designed to transform you from a beginner to an industry-ready professional.</p>
                        </div>

                        <div className="relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-1 bg-gradient-to-r from-orange-500/20 via-orange-500/50 to-orange-500/20 z-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                {data.sections.journey_steps.map((step, i) => (
                                    <div key={i} className="group">
                                        <div className="w-20 h-20 mx-auto bg-background border-4 border-surface-deep rounded-full flex items-center justify-center text-2xl font-black text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:border-orange-400 group-hover:text-white transition-all shadow-xl relative z-10">
                                            {step.step}
                                        </div>
                                        <div className="bg-surface p-8 rounded-3xl border border-border-color text-center group-hover:border-orange-500/30 group-hover:-translate-y-2 transition-all duration-300 h-full">
                                            <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Alumni Success Stories */}
                <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Real Students. Real Results.</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {data.sections.alumni_stories.map((story, i) => (
                                <div key={i} className="bg-background border border-border-color p-8 rounded-[2rem] hover:border-orange-500/30 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl leading-none text-orange-500">"</div>
                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                        <div className="w-14 h-14 rounded-full bg-surface-deep border border-border-color flex items-center justify-center text-xl font-bold text-orange-600">
                                            {story.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{story.name}</h4>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">{story.role} @ <span className="text-orange-600">{story.company}</span></p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-6 text-[11px] font-bold uppercase tracking-wider">
                                        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full">{story.before}</span>
                                        <span className="text-muted-foreground">→</span>
                                        <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full">{story.after}</span>
                                    </div>

                                    <p className="text-muted-foreground italic leading-relaxed relative z-10">"{story.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Comprehensive Support & Skill Evidence */}
                <section className="py-20 lg:py-28 bg-background overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32">
                            {/* Left: Support Features */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Comprehensive Career Support</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {data.sections.career_support.map((item, i) => (
                                        <div key={i} className="bg-surface p-6 rounded-2xl border border-border-color hover:border-orange-500/50 transition-colors group">
                                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                            </div>
                                            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10 p-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl flex items-center justify-between shadow-xl shadow-orange-600/20">
                                    <div>
                                        <h4 className="font-bold text-white text-xl mb-1">Internship Included</h4>
                                        <p className="text-orange-100 opacity-90">Get 2 months of verified agency experience.</p>
                                    </div>
                                    <span className="material-symbols-outlined text-white text-4xl opacity-80">workspace_premium</span>
                                </div>
                            </div>

                            {/* Right: Practical Evidence Bento Grid */}
                            <div className="relative">
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Practical Skill Evidence</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[450px]">
                                    {/* Left Column: ROI Card */}
                                    <div className="bg-surface rounded-[2rem] border border-border-color p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group h-full">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <span className="material-symbols-outlined text-9xl">trending_up</span>
                                        </div>
                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Campaign ROI</p>
                                                <h4 className="text-4xl font-black text-foreground">$12,450</h4>
                                            </div>
                                            <span className="text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">north_east</span> 24%
                                            </span>
                                        </div>
                                        <div className="space-y-4 relative z-10">
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                                                    <span>Ad Spend</span>
                                                    <span>70%</span>
                                                </div>
                                                <div className="h-3 w-full bg-background rounded-full overflow-hidden">
                                                    <div className="h-full bg-orange-500 w-[70%] rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                                                    <span>Revenue</span>
                                                    <span>45%</span>
                                                </div>
                                                <div className="h-3 w-full bg-background rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                                                    <span>Profit</span>
                                                    <span>85%</span>
                                                </div>
                                                <div className="h-3 w-full bg-background rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-border-color flex justify-between text-xs font-mono text-muted-foreground relative z-10 bg-background/50 p-3 rounded-lg">
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Imp: 1.2M</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Clicks: 45K</span>
                                        </div>
                                    </div>

                                    {/* Right Column: Stacked Cards */}
                                    <div className="flex flex-col gap-6 h-full">
                                        {/* Certification Card */}
                                        <div className="bg-surface rounded-[2rem] border border-border-color p-6 flex items-center gap-5 shadow-lg flex-1">
                                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                                                <span className="material-symbols-outlined text-3xl">verified_user</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg leading-tight mb-1">Google Ads Certified</h4>
                                                <p className="text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded inline-block">ID: 884-291-00</p>
                                            </div>
                                        </div>

                                        {/* Score Card */}
                                        <div className="bg-surface rounded-[2rem] border border-border-color p-6 flex flex-col items-center justify-center shadow-lg relative overflow-hidden flex-[1.5]">
                                            <div className="relative w-28 h-28 mb-4">
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                    <path className="text-background" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                    <path className="text-orange-500 drop-shadow-md" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-black">92%</span>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Average Score</p>
                                                <p className="text-[10px] text-muted-foreground">Based on 50+ Live Projects</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. ROI & Salary Outlook */}
                <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                            <h2 className="text-3xl md:text-4xl font-display font-bold">ROI & Salary Outlook</h2>
                            <Link href="#" className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider">
                                View detailed report <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                            <div className="min-w-[600px] md:min-w-full overflow-hidden rounded-3xl border border-border-color shadow-2xl bg-background">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-deep text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                            <th className="p-6">Role</th>
                                            <th className="p-6">Avg Salary (Before)</th>
                                            <th className="p-6">Avg Salary (After)</th>
                                            <th className="p-6">Growth</th>
                                            <th className="p-6">Time to Hike</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-color">
                                        {data.sections.roi_table.map((row, i) => (
                                            <tr key={i} className="hover:bg-surface-deep/50 transition-colors group">
                                                <td className="p-6 font-bold">{row.role}</td>
                                                <td className="p-6 text-muted-foreground">{row.before}</td>
                                                <td className="p-6 font-bold text-foreground">{row.after}</td>
                                                <td className="p-6">
                                                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                                                        {row.growth}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-sm text-muted-foreground">{row.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. FAQ Accordion */}
                <section className="py-20 lg:py-24 bg-background">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Common Questions</h2>
                        <div className="space-y-4">
                            {data.sections.faqs.map((faq, i) => (
                                <details key={i} className="bg-surface border border-border-color rounded-2xl overflow-hidden group">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-surface-deep transition-colors list-none select-none">
                                        <h4 className="font-bold text-lg pr-4">{faq.q}</h4>
                                        <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border-color/50 pt-4">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. Footer CTA */}
                <section className="py-20 lg:py-32 bg-slate-950 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto px-4 relative z-10">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Ready to Start Your Career?</h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            Join the program that has launched 10,000+ careers.
                            <br />Guaranteed placement support or full refund*.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/30 hover:scale-105 text-lg">
                                Apply Now
                            </button>
                            <Link href="https://wa.me/919876543210" target="_blank" className="px-10 py-5 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2 backdrop-blur-sm">
                                <span className="material-symbols-outlined">chat</span> Chat on WhatsApp
                            </Link>
                        </div>
                        <p className="mt-8 text-xs text-slate-500">*Terms and conditions apply. Refund applicable for Job Guarantee program only.</p>
                    </div>
                </section>

                {/* 10. Application Section */}
                <section id="apply" className="py-20 bg-surface border-t border-border-color">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold mb-4">Start Your Career Journey</h2>
                            <p className="text-muted-foreground">Fill out the form below to get started with our placement-guaranteed programs.</p>
                        </div>
                        <div className="bg-background rounded-3xl shadow-2xl border border-border-color overflow-hidden max-w-lg mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-center">
                                <h3 className="text-white font-bold text-xl">Apply for Next Cohort</h3>
                                <p className="text-orange-100 text-sm mt-1">Limited seats available for this month</p>
                            </div>
                            <div className="p-2">
                                <RegistrationForm eventTitle="Career Program Application" source="career_page" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
