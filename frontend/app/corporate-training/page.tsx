"use client";

import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";

export default function CorporateTrainingPage() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", size: "1-10", timeline: "Immediately" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    data: {
                        size: formData.size,
                        timeline: formData.timeline
                    },
                    source: "corporate_training"
                }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", size: "1-10", timeline: "Immediately" });
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
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-200 dark:border-orange-800">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                                Corporate Solutions
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
                                Upskill Your Workforce.<br className="hidden lg:block" /> Drive <span className="text-orange-600">Business Growth.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Tailored digital marketing training for enterprise teams. Increase efficiency, revenue, and retention with our certified expert tracks.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 whitespace-nowrap">
                                    Request Proposal
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <button onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-background border border-border-color text-foreground hover:bg-surface hover:text-orange-600 hover:border-orange-200 font-bold rounded-xl transition-all hover:-translate-y-1 whitespace-nowrap">
                                    View Curriculum Tracks
                                    <span className="material-symbols-outlined text-orange-500 group-hover:translate-y-1 transition-transform">download</span>
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                <span className="text-orange-500 mr-1">★</span> Trusted by 500+ Enterprises Globally
                            </p>
                        </div>

                        {/* Right Card "Impact at a Glance" */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[2rem] blur-2xl"></div>
                            <div className="relative bg-background border border-border-color rounded-[2rem] p-8 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold text-lg font-display">Enterprise Impact</h3>
                                    <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full border border-green-200 dark:border-green-800 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">trending_up</span> Proven ROI
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                        <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Revenue Uplift</p>
                                        <div className="text-5xl font-black text-orange-600">+35%</div>
                                        <p className="text-xs text-muted-foreground mt-2">Average increase in campaign ROI post-training</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Time to Value</p>
                                            <div className="text-2xl font-black text-foreground">3 Wks</div>
                                        </div>
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Adoption Rate</p>
                                            <div className="text-2xl font-black text-foreground">92%</div>
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
                        {["Microsoft", "Salesforce", "HubSpot", "Adobe", "Oracle", "SAP"].map((p, i) => (
                            <span key={i} className="text-xl md:text-3xl font-black text-foreground/40 hover:text-foreground transition-colors cursor-default">{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Journey / Formats */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Flexible Delivery Models</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the rigorous training format that fits your team's workflow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Onsite Workshops", desc: "Intensive 2-5 day bootcamps at your office. Best for confidential strategy & team building." },
                            { step: "02", title: "Live Virtual Labs", desc: "Interactive Zoom sessions with breakout rooms. Ideal for distributed global teams." },
                            { step: "03", title: "Hybrid LMS + Live", desc: "Self-paced modules with weekly expert Q&A. Maximum flexibility for busy executives." }
                        ].map((step, i) => (
                            <div key={i} className="group relative">
                                <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black text-orange-500 select-none z-0">{step.step}</div>
                                <div className="bg-surface p-10 rounded-3xl border border-border-color text-center hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col justify-center">
                                    <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Curriculum Tracks (Alumni Stories Style) */}
            <section id="curriculum" className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Specialized Role Tracks</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Training that speaks the language of every department.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Marketing Teams", role: "Execution", focus: "SEO, PPC, Content", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20", icon: "campaign" },
                            { title: "Sales Teams", role: "Revenue", focus: "Social Selling, CRM", color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/20", icon: "trending_up" },
                            { title: "Leadership", role: "Strategy", focus: "Digital Transformation", color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20", icon: "verified_user" }
                        ].map((track, i) => (
                            <div key={i} className="bg-background border border-border-color p-8 rounded-[2rem] hover:border-orange-500/30 transition-all group relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${track.bg} border border-border-color flex items-center justify-center text-2xl font-bold ${track.color}`}>
                                        <span className="material-symbols-outlined">{track.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">{track.title}</h4>
                                        <p className="text-xs font-bold text-muted-foreground uppercase">{track.role} Focus</p>
                                    </div>
                                </div>
                                <div className="space-y-3 relative z-10">
                                    {track.focus.split(',').map((skill, j) => (
                                        <div key={j} className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                            <span className="text-sm text-foreground/80">{skill.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-border-color">
                                    <button className="text-sm font-bold text-orange-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View Modules <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Comprehensive Support (Bento Grid) */}
            <section className="py-20 lg:py-28 bg-background overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-24 lg:gap-32">
                        {/* Left: Features */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Enterprise-Grade Support</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Custom LMS", desc: "White-labeled portal for your team.", icon: "school" },
                                    { title: "Dedicated Success Mgr", desc: "Single point of contact.", icon: "support_agent" },
                                    { title: "Pre/Post Assessment", desc: "Measure skill lift accurately.", icon: "analytics" },
                                    { title: "Global Certificates", desc: "Industry recognized badges.", icon: "workspace_premium" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-surface p-6 rounded-2xl border border-border-color hover:border-orange-500/50 transition-colors group">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Internship Banner */}
                            <div className="mt-10 p-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl flex items-center justify-between shadow-xl shadow-orange-600/20">
                                <div>
                                    <h4 className="font-bold text-white text-xl mb-1">Completion Certification</h4>
                                    <p className="text-orange-100 opacity-90">Blockchain-verified badges for every learner.</p>
                                </div>
                                <span className="material-symbols-outlined text-white text-4xl opacity-80">workspace_premium</span>
                            </div>
                        </div>

                        {/* Right: Evidence Card */}
                        <div className="relative">
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Skill Evidence</h2>
                            <div className="bg-surface rounded-[2rem] border border-border-color p-8 shadow-lg relative overflow-hidden h-[450px] flex flex-col justify-center text-center">
                                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-bounce">
                                    <span className="material-symbols-outlined text-4xl">verified</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">100% Certified</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mb-8">All participants receive verifiable blockchain certificates upon completion, integrated with LinkedIn.</p>
                                <div className="flex justify-center gap-4">
                                    <div className="bg-background px-4 py-2 rounded-lg border border-border-color text-xs font-bold text-muted-foreground">ISO Certified</div>
                                    <div className="bg-background px-4 py-2 rounded-lg border border-border-color text-xs font-bold text-muted-foreground">CPD Accredited</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Success Stories (Case Study Table) */}
            <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <h2 className="text-3xl md:text-4xl font-display font-bold">Client Success Stories</h2>
                        <Link href="/career/hire-talent" className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider">
                            Hire Our Talent <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="rounded-3xl border border-border-color shadow-2xl bg-background overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-surface-deep text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                        <th className="p-6">Company</th>
                                        <th className="p-6">Challenge</th>
                                        <th className="p-6">Solution</th>
                                        <th className="p-6">Results</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-color">
                                    {[
                                        { company: "FinTech Corp", challenge: "Low Lead Quality", solution: "Advanced PPC Training", result: "+40% Conversion" },
                                        { company: "RetailGiant", challenge: "Siloed Teams", solution: "Cross-Functional SEO", result: "2x Organic Traffic" },
                                        { company: "SaaS Inc", challenge: "Slow Pipeline", solution: "Social Selling for Sales", result: "-20% Sales Cycle" }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-surface-deep/50 transition-colors group">
                                            <td className="p-6 font-bold">{row.company}</td>
                                            <td className="p-6 text-muted-foreground">{row.challenge}</td>
                                            <td className="p-6 font-bold text-foreground">{row.solution}</td>
                                            <td className="p-6 text-green-600 font-bold">{row.result}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Footer CTA / Application */}
            <section id="contact" className="py-20 bg-slate-950 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Ready to Transform Your Team?</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
                        Get a customized training proposal within 24 hours. No commitment required.
                    </p>

                    {/* Form Embed */}
                    <div className="bg-white text-left p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                                <p className="text-gray-500">We'll be in touch shortly.</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 text-orange-600 font-bold hover:underline">
                                    Request Another Quote
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                            placeholder="Doe"
                                        />
                                    </div>
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
                                        placeholder="john@company.com"
                                    />
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
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Company / Organization</label>
                                    <input
                                        name="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        placeholder="Acme Inc."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Team Size</label>
                                        <select
                                            name="size"
                                            value={formData.size}
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        >
                                            <option>1-10</option>
                                            <option>10-50</option>
                                            <option>50-200</option>
                                            <option>200+</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Timeline</label>
                                        <select
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        >
                                            <option>Immediately</option>
                                            <option>Next Quarter</option>
                                            <option>Researching</option>
                                        </select>
                                    </div>
                                </div>
                                {status === 'error' && (
                                    <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded">
                                        Unable to submit request. Please try again.
                                    </p>
                                )}
                                <button type="submit" disabled={status === 'submitting'} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">
                                    {status === 'submitting' ? 'Processing...' : 'Get Quote'}
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
