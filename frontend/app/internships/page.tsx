"use client";

import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";

const INTERNSHIP_TRACKS = [
    { title: "SEO Internship", icon: "search", skills: "Technical SEO, Content Optimization, Link Building", duration: "8 weeks", spots: 15 },
    { title: "PPC Internship", icon: "ads_click", skills: "Google Ads, Meta Ads, Campaign Optimization", duration: "8 weeks", spots: 12 },
    { title: "Social Media", icon: "share", skills: "Content Strategy, Community Management, Analytics", duration: "6 weeks", spots: 20 },
    { title: "Analytics & CRO", icon: "analytics", skills: "GA4, Looker Studio, A/B Testing, Heatmaps", duration: "6 weeks", spots: 10 }
];

const TOOLS_USED = [
    { name: "Google Analytics 4", icon: "analytics" },
    { name: "Meta Ads Manager", icon: "campaign" },
    { name: "Semrush", icon: "search" },
    { name: "WordPress", icon: "web" },
    { name: "Looker Studio", icon: "dashboard" },
    { name: "HubSpot CRM", icon: "contacts" }
];

const MENTORS = [
    { name: "Vikram Sharma", role: "Head of Performance", company: "Ex-Google", exp: "12+ years" },
    { name: "Priya Nair", role: "SEO Director", company: "Ex-Razorpay", exp: "8+ years" },
    { name: "Amit Patel", role: "Social Media Lead", company: "Ex-Zomato", exp: "6+ years" }
];

const SUCCESS_STORIES = [
    { name: "Sneha Gupta", role: "Performance Marketer @ Nykaa", internship: "PPC Track", result: "Managed ₹5L ad spend with 4.2x ROAS", linkedin: "#" },
    { name: "Rahul Verma", role: "SEO Specialist @ Flipkart", internship: "SEO Track", result: "Drove 40% organic traffic increase", linkedin: "#" }
];

export default function InternshipsPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", track: "seo", current_status: "Student (College)" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    source: "internship_application"
                }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", track: "seo", current_status: "Student (College)" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-body selection:bg-orange-500/20 selection:text-orange-600">

            {/* 1. Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-surface border-b border-border-color">
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-800">
                                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                                Next Batch: Feb 2026
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
                                Gain Real-World <span className="text-orange-600">Experience</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Work on live projects with real brands. Build an industry-ready portfolio. Get hired by top companies.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                                <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 whitespace-nowrap">
                                    Apply for Internship
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <button onClick={() => document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-background border border-border-color text-foreground hover:bg-surface hover:text-orange-600 hover:border-orange-200 font-bold rounded-xl transition-all hover:-translate-y-1 whitespace-nowrap">
                                    View Tracks
                                    <span className="material-symbols-outlined text-orange-500">work</span>
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                <span className="text-orange-500 mr-1">★</span> 500+ Interns Placed at Top Companies
                            </p>
                        </div>

                        {/* Right Card */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[2rem] blur-2xl"></div>
                            <div className="relative bg-background border border-border-color rounded-[2rem] p-8 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold text-lg font-display">Internship Impact</h3>
                                    <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full border border-green-200 dark:border-green-800 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">verified</span> Certified
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                        <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Placement Rate</p>
                                        <div className="text-5xl font-black text-orange-600">92%</div>
                                        <p className="text-xs text-muted-foreground mt-2">Interns hired within 30 days of completion</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Duration</p>
                                            <div className="text-2xl font-black text-foreground">6-8 Wks</div>
                                        </div>
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Projects</p>
                                            <div className="text-2xl font-black text-foreground">3-5 Live</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Partner Logos */}
            <section className="py-10 border-b border-border-color bg-surface-deep overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-xs font-bold text-muted-foreground mb-8 uppercase tracking-[0.2em]">Our Interns Work On Projects For</p>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {["Zomato", "Nykaa", "Flipkart", "Swiggy", "Urban Company", "1mg"].map((p, i) => (
                            <span key={i} className="text-xl md:text-2xl font-black text-foreground/40 hover:text-foreground transition-colors cursor-default">{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Internship Tracks */}
            <section id="tracks" className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Internship Tracks</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Hands-on experience in specialized digital marketing domains.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {INTERNSHIP_TRACKS.map((track, i) => (
                            <div key={i} className="group bg-surface border border-border-color p-8 rounded-[2rem] hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                                <div className="absolute top-4 right-4">
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 text-[10px] font-bold rounded-full">{track.spots} spots</span>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/20 border border-border-color flex items-center justify-center text-2xl text-orange-600 mb-6">
                                    <span className="material-symbols-outlined">{track.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-orange-600 transition-colors">{track.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{track.skills}</p>
                                <div className="pt-4 border-t border-border-color flex items-center justify-between">
                                    <span className="text-xs font-bold text-muted-foreground">{track.duration}</span>
                                    <button className="text-sm font-bold text-orange-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Apply <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Structure & Tools */}
            <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left: Structure */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">How It Works</h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                A structured program designed to transform you into an industry-ready professional.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { title: "Live Project Work", desc: "Work on real campaigns with actual ad budgets", icon: "rocket_launch" },
                                    { title: "Weekly Mentorship", desc: "1-on-1 sessions with industry experts", icon: "person" },
                                    { title: "Performance Reviews", desc: "Regular feedback and skill assessments", icon: "rate_review" },
                                    { title: "Portfolio Building", desc: "Documented case studies for your resume", icon: "folder_special" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border-color">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Tools */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-[2rem] blur-2xl"></div>
                            <div className="relative bg-background rounded-[2rem] border border-border-color p-8 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-600">build</span>
                                    Tools You'll Master
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {TOOLS_USED.map((tool, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border-color hover:border-orange-500/30 transition-colors">
                                            <span className="material-symbols-outlined text-orange-600">{tool.icon}</span>
                                            <span className="text-sm font-medium">{tool.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                                    <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">workspace_premium</span>
                                        Certification provided for each tool mastered.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Mentors */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Industry Mentors</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Learn from experts who've worked at top companies.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {MENTORS.map((mentor, i) => (
                            <div key={i} className="bg-surface border border-border-color p-8 rounded-[2rem] text-center hover:border-orange-500/30 transition-all group">
                                <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 mx-auto mb-6 text-3xl font-bold">
                                    {mentor.name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                                <p className="text-sm text-orange-600 font-medium mb-2">{mentor.role}</p>
                                <p className="text-xs text-muted-foreground mb-4">{mentor.company} • {mentor.exp}</p>
                                <div className="flex justify-center gap-2">
                                    <span className="px-3 py-1 bg-surface-deep rounded-full text-xs font-bold text-muted-foreground">SEO</span>
                                    <span className="px-3 py-1 bg-surface-deep rounded-full text-xs font-bold text-muted-foreground">PPC</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Success Stories */}
            <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Internship Success Stories</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From interns to full-time hires at top companies.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {SUCCESS_STORIES.map((story, i) => (
                            <div key={i} className="bg-background border border-border-color p-8 rounded-[2rem] relative overflow-hidden group hover:border-orange-500/30 transition-all">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl leading-none text-orange-500">"</div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs font-bold rounded-full">{story.internship}</span>
                                </div>
                                <p className="text-foreground font-medium leading-relaxed mb-4 relative z-10">{story.result}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 font-bold">
                                            {story.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold">{story.name}</p>
                                            <p className="text-xs text-muted-foreground">{story.role}</p>
                                        </div>
                                    </div>
                                    <a href={story.linkedin} className="text-blue-600 hover:underline text-sm font-bold">LinkedIn →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Placement Bridge */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Internship → Job Pathway</h2>
                                <p className="text-slate-300 mb-6">Our internship is designed as a direct pipeline to full-time employment.</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                        <span>Complete 6-8 week internship</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                        <span>Build portfolio with live projects</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                        <span>Get certified & placed via our network</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-6xl md:text-8xl font-black text-orange-500">92%</p>
                                <p className="text-xl text-slate-300 mt-2">Conversion to Full-Time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Application Form */}
            <section id="apply" className="py-20 bg-slate-950 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Apply for Internship</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
                        Limited seats per batch. Apply now to secure your spot.
                    </p>

                    <div className="bg-white text-left p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                                <p className="text-gray-500">Our team will contact you within 24 hours.</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 text-orange-600 font-bold hover:underline">
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            type="email"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                            placeholder="you@email.com"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
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
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Preferred Track</label>
                                        <select
                                            name="track"
                                            value={formData.track}
                                            onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        >
                                            <option value="seo">SEO Internship</option>
                                            <option value="ppc">PPC Internship</option>
                                            <option value="smm">Social Media</option>
                                            <option value="analytics">Analytics & CRO</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Current Status</label>
                                    <select
                                        name="current_status"
                                        onChange={(e) => setFormData({ ...formData, 'current_status': e.target.value } as any)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                    >
                                        <option>Student (College)</option>
                                        <option>Fresh Graduate</option>
                                        <option>Working Professional</option>
                                        <option>Career Switcher</option>
                                    </select>
                                </div>
                                {status === 'error' && (
                                    <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded">
                                        Unable to submit application. Please try again.
                                    </p>
                                )}
                                <button type="submit" disabled={status === 'submitting'} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">
                                    {status === 'submitting' ? 'Processing...' : 'Submit Application'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Batch Timeline */}
                    <div className="mt-12 grid grid-cols-3 gap-4 max-w-xl mx-auto">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="material-symbols-outlined text-orange-400">calendar_month</span>
                            </div>
                            <p className="text-sm font-bold">Next Batch</p>
                            <p className="text-xs text-slate-400">Feb 15, 2026</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="material-symbols-outlined text-orange-400">groups</span>
                            </div>
                            <p className="text-sm font-bold">Batch Size</p>
                            <p className="text-xs text-slate-400">30 seats only</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="material-symbols-outlined text-orange-400">schedule</span>
                            </div>
                            <p className="text-sm font-bold">Format</p>
                            <p className="text-xs text-slate-400">Remote + Flexible</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FAQ */}
            <section className="py-20 lg:py-24 bg-background">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Who is eligible for the internship?", a: "Anyone with a basic understanding of digital marketing can apply. We accept students, fresh graduates, and working professionals looking to upskill." },
                            { q: "Is this a paid internship?", a: "Currently, this is an unpaid learning internship. However, top performers get priority placement with our hiring partners with competitive packages." },
                            { q: "What is the weekly time commitment?", a: "Expect to dedicate 15-20 hours per week. The schedule is flexible and can be done remotely." },
                            { q: "Will I get a certificate?", a: "Yes! You'll receive a verified completion certificate plus individual tool certifications upon successful completion." }
                        ].map((faq, i) => (
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

            {/* 10. Internal Navigation */}
            <section className="py-12 bg-surface border-t border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/career" className="px-6 py-3 bg-background border border-border-color rounded-xl font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all">
                            Career Outcomes
                        </Link>
                        <Link href="/courses/advanced-digital-marketing" className="px-6 py-3 bg-background border border-border-color rounded-xl font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all">
                            Explore Courses
                        </Link>
                        <Link href="/career/hire-talent" className="px-6 py-3 bg-background border border-border-color rounded-xl font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all">
                            For Recruiters
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
