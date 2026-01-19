"use client";

import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";

const TALENT_CATEGORIES = [
    { title: "SEO Specialists", icon: "search", skills: "Technical SEO, On-page, Link Building", count: 45, color: "orange" },
    { title: "PPC Experts", icon: "ads_click", skills: "Google Ads, ROAS, Campaign Mgmt", count: 38, color: "blue" },
    { title: "Social Media Managers", icon: "share", skills: "Content, Community, Paid Social", count: 52, color: "pink" },
    { title: "Analytics & Data", icon: "analytics", skills: "GA4, Looker Studio, Tracking", count: 28, color: "green" },
    { title: "Content Marketers", icon: "article", skills: "Blog, Copy, Email Marketing", count: 35, color: "indigo" },
    { title: "WordPress Developers", icon: "web", skills: "Theme, Plugins, Landing Pages", count: 20, color: "purple" }
];

export default function HireTalentPage() {
    const [formData, setFormData] = useState({ company: "", email: "", phone: "", role: "", size: "1-5" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [showExitPopup, setShowExitPopup] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    source: "hire_talent"
                }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ company: "", email: "", phone: "", role: "", size: "1-5" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-body selection:bg-orange-500/20 selection:text-orange-600">

            {/* 1. Hero Section (Career Page Style) */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-surface border-b border-border-color">
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-800">
                                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                                150+ Candidates Available Now
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
                                Hire Job-Ready <span className="text-orange-600">Digital Talent</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Skilled, certified, placement-ready professionals trained on live projects. Pre-vetted for SEO, PPC, Analytics, and Content roles.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 whitespace-nowrap">
                                    Request Candidates
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <button onClick={() => document.getElementById('talent')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-background border border-border-color text-foreground hover:bg-surface hover:text-orange-600 hover:border-orange-200 font-bold rounded-xl transition-all hover:-translate-y-1 whitespace-nowrap">
                                    Browse Talent Pool
                                    <span className="material-symbols-outlined text-orange-500">groups</span>
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                <span className="text-orange-500 mr-1">★</span> Trusted by 500+ Hiring Partners
                            </p>
                        </div>

                        {/* Right Card "Stats at a Glance" */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[2rem] blur-2xl"></div>
                            <div className="relative bg-background border border-border-color rounded-[2rem] p-8 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold text-lg font-display">Hiring Impact</h3>
                                    <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full border border-green-200 dark:border-green-800 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">verified</span> Verified
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                        <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Placement Rate</p>
                                        <div className="text-5xl font-black text-orange-600">95%</div>
                                        <p className="text-xs text-muted-foreground mt-2">Graduates placed within 90 days</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Avg. TAT</p>
                                            <div className="text-2xl font-black text-foreground">7 Days</div>
                                        </div>
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Partners</p>
                                            <div className="text-2xl font-black text-foreground">500+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Partners Strip */}
            <section className="py-10 border-b border-border-color bg-surface-deep overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-xs font-bold text-muted-foreground mb-8 uppercase tracking-[0.2em]">Our Alumni Work At</p>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {["Google", "Amazon", "Flipkart", "Zomato", "Ogilvy", "GroupM", "Nykaa"].map((p, i) => (
                            <span key={i} className="text-xl md:text-2xl font-black text-foreground/40 hover:text-foreground transition-colors cursor-default">{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Talent Categories Grid */}
            <section id="talent" className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Browse by Specialization</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Pre-vetted talent with deep expertise in their chosen domain.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TALENT_CATEGORIES.map((cat, i) => (
                            <div key={i} className="group bg-surface border border-border-color p-8 rounded-[2rem] hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                                <div className={`absolute top-0 right-0 opacity-5 text-9xl font-black select-none -mt-4 -mr-4 text-${cat.color}-500`}>{cat.count}</div>
                                <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-100 dark:bg-${cat.color}-900/20 border border-border-color flex items-center justify-center text-2xl text-${cat.color}-600 mb-6`}>
                                    <span className="material-symbols-outlined">{cat.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">{cat.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{cat.skills}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-border-color">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">{cat.count} Available</span>
                                    <button className="text-sm font-bold text-orange-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Quality Proof / Skills Matrix */}
            <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The Graduate Quality Standard</h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Every candidate completes a rigorous 12-week intensive program. We verify skills with live projects and certifications, so you don't have to.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { skill: "Google Ads & Analytics", level: "Certified", icon: "verified", color: "green" },
                                    { skill: "HubSpot CRM", level: "Certified", icon: "verified", color: "green" },
                                    { skill: "Semrush / Ahrefs", level: "Advanced", icon: "check", color: "orange" },
                                    { skill: "Meta Business Suite", level: "Advanced", icon: "check", color: "orange" },
                                    { skill: "Email Automation", level: "Intermediate", icon: "check", color: "slate" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border-color">
                                        <span className="font-medium">{item.skill}</span>
                                        <span className={`flex items-center gap-1 text-sm font-bold text-${item.color}-600`}>
                                            <span className="material-symbols-outlined text-base">{item.icon}</span> {item.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-[2rem] blur-2xl"></div>
                            <div className="relative bg-background rounded-[2rem] border border-border-color p-8 shadow-lg text-center">
                                <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-6">
                                    <span className="material-symbols-outlined text-4xl">workspace_premium</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">100% Verified</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mb-6">All candidates have completed live agency projects with real ad spend and client briefs.</p>
                                <Link href="/corporate-training" className="inline-block px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors">
                                    Corporate Training
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Hiring Process Steps */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Hiring Made Simple</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From request to interview in 48 hours.</p>
                    </div>

                    <div className="relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-1 bg-gradient-to-r from-orange-500/20 via-orange-500/50 to-orange-500/20 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {[
                                { step: "01", title: "Request Talent", desc: "Submit your requirements via our simple form.", icon: "edit_document" },
                                { step: "02", title: "We Shortlist", desc: "Our team matches you with top 3-5 candidates.", icon: "filter_list" },
                                { step: "03", title: "Interview & Hire", desc: "Coordinate interviews directly. Zero fees.", icon: "groups" }
                            ].map((step, i) => (
                                <div key={i} className="group">
                                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl relative z-10 transition-all ${i === 1 ? 'bg-orange-600 text-white border-4 border-orange-300' : 'bg-background border-4 border-surface-deep text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-400'}`}>
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

            {/* 6. Testimonials */}
            <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Recruiter Feedback</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Hear from HR leaders who've hired our talent.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { quote: "The candidates were surprisingly job-ready. We hired an SEO specialist who started contributing from day one.", name: "Sarah Jenkins", role: "HR Director, TechFlow Agency" },
                            { quote: "Fast turnaround and quality candidates. Our PPC hire improved campaign ROAS by 40% in the first month.", name: "Rahul Mehta", role: "Marketing Head, E-com Startup" }
                        ].map((test, i) => (
                            <div key={i} className="bg-background border border-border-color p-8 rounded-[2rem] relative overflow-hidden group hover:border-orange-500/30 transition-all">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl leading-none text-orange-500">"</div>
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                                </div>
                                <p className="text-foreground italic leading-relaxed mb-6 relative z-10">"{test.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 font-bold">
                                        {test.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold">{test.name}</p>
                                        <p className="text-xs text-muted-foreground">{test.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Lead Form CTA */}
            <section id="contact" className="py-20 bg-slate-950 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Ready to Hire?</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
                        Get matched candidate profiles within 24 hours. Zero placement fees.
                    </p>

                    <div className="bg-white text-left p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                                <p className="text-gray-500">We'll send candidate profiles within 24 hours.</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 text-orange-600 font-bold hover:underline">
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Company Name</label>
                                        <input
                                            name="company"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                            placeholder="Acme Inc."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Work Email</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            type="email"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                            placeholder="hr@company.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        type="tel"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Role Needed</label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        >
                                            <option value="">Select Role</option>
                                            <option>SEO Specialist</option>
                                            <option>PPC Expert</option>
                                            <option>Social Media Manager</option>
                                            <option>Analytics Expert</option>
                                            <option>Content Marketer</option>
                                            <option>Multiple Roles</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Hiring Volume</label>
                                        <select
                                            name="size"
                                            value={formData.size}
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        >
                                            <option>1-5 Hires</option>
                                            <option>5-10 Hires</option>
                                            <option>10+ Hires</option>
                                        </select>
                                    </div>
                                </div>
                                {status === 'error' && (
                                    <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded">
                                        Unable to submit request. Please try again or email us directly.
                                    </p>
                                )}
                                <button type="submit" disabled={status === 'submitting'} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">
                                    {status === 'submitting' ? 'Processing...' : 'Get Candidate Matches'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
