"use client";

import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";

const SCHOLARSHIP_TYPES = [
    { title: "Merit Scholarship", desc: "Up to 50% fee waiver for academic excellence", icon: "school", color: "orange", amount: "₹25,000" },
    { title: "Need-Based Aid", desc: "For students from economically weaker sections", icon: "volunteer_activism", color: "green", amount: "₹40,000" },
    { title: "Women in Tech", desc: "Encouraging women to enter digital marketing", icon: "female", color: "pink", amount: "₹20,000" },
    { title: "Early Bird Discount", desc: "Enroll within 7 days of inquiry", icon: "timer", color: "blue", amount: "₹15,000" }
];

const ELIGIBILITY_CRITERIA = [
    { title: "Academic Merit", desc: "60%+ in graduation or equivalent", icon: "trending_up" },
    { title: "Income Certificate", desc: "Annual family income < ₹6 LPA for need-based", icon: "receipt_long" },
    { title: "Age Criteria", desc: "18-35 years old", icon: "person" },
    { title: "Motivation Essay", desc: "500-word statement of purpose", icon: "edit_note" }
];

const SUCCESS_STORIES = [
    { name: "Priya Sharma", role: "SEO Specialist @ Flipkart", scholarship: "Women in Tech", savings: "₹20,000", quote: "The scholarship made my dream possible. Now I earn 5x what I invested!" },
    { name: "Rahul Kumar", role: "PPC Manager @ Zomato", scholarship: "Need-Based Aid", savings: "₹40,000", quote: "Coming from a small town, I never thought I could afford premium education." }
];

export default function ScholarshipsPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", income: "below-3", scholarship_type: "Merit Scholarship" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [emiAmount, setEmiAmount] = useState(5000);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    source: "scholarship_application"
                }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", income: "below-3", scholarship_type: "Merit Scholarship" });
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
                                Applications Open
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
                                Scholarships & <span className="text-orange-600">Financial Aid</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Don't let finances stop your dreams. Get up to 100% fee waiver and 0% EMI options to kickstart your digital marketing career.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                                <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 whitespace-nowrap">
                                    Check Eligibility
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <button onClick={() => document.getElementById('scholarships')?.scrollIntoView({ behavior: 'smooth' })} className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-background border border-border-color text-foreground hover:bg-surface hover:text-orange-600 hover:border-orange-200 font-bold rounded-xl transition-all hover:-translate-y-1 whitespace-nowrap">
                                    View Scholarships
                                    <span className="material-symbols-outlined text-orange-500">redeem</span>
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                <span className="text-orange-500 mr-1">★</span> 500+ Students Benefited This Year
                            </p>
                        </div>

                        {/* Right Card "Aid at a Glance" */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[2rem] blur-2xl"></div>
                            <div className="relative bg-background border border-border-color rounded-[2rem] p-8 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold text-lg font-display">Financial Aid Impact</h3>
                                    <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full border border-green-200 dark:border-green-800 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">verified</span> Transparent
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                        <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Max Scholarship</p>
                                        <div className="text-5xl font-black text-orange-600">₹50K</div>
                                        <p className="text-xs text-muted-foreground mt-2">Up to 100% tuition fee waiver</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">EMI Starting</p>
                                            <div className="text-2xl font-black text-foreground">₹2,999/mo</div>
                                        </div>
                                        <div className="p-6 bg-surface-deep rounded-2xl border border-border-color">
                                            <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Approval</p>
                                            <div className="text-2xl font-black text-foreground">48 Hrs</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Trust Strip */}
            <section className="py-10 border-b border-border-color bg-surface-deep overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                        <div>
                            <p className="text-3xl font-black text-orange-600">500+</p>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Students Aided</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-foreground">₹2.5Cr</p>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Total Aid Given</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-foreground">0%</p>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Interest EMI</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-foreground">No</p>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Hidden Charges</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Scholarship Types Grid */}
            <section id="scholarships" className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Available Scholarships</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Multiple pathways to make quality education accessible.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SCHOLARSHIP_TYPES.map((scholarship, i) => (
                            <div key={i} className="group bg-surface border border-border-color p-8 rounded-[2rem] hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden text-center">
                                <div className={`w-16 h-16 rounded-2xl bg-${scholarship.color}-100 dark:bg-${scholarship.color}-900/20 border border-border-color flex items-center justify-center text-2xl text-${scholarship.color}-600 mb-6 mx-auto`}>
                                    <span className="material-symbols-outlined">{scholarship.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-orange-600 transition-colors">{scholarship.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{scholarship.desc}</p>
                                <div className="pt-4 border-t border-border-color">
                                    <span className="text-2xl font-black text-orange-600">{scholarship.amount}</span>
                                    <p className="text-xs text-muted-foreground">Max Benefit</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Eligibility Criteria */}
            <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Eligibility Criteria</h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Simple requirements. Quick approval. No complicated paperwork.
                            </p>
                            <div className="space-y-4">
                                {ELIGIBILITY_CRITERIA.map((item, i) => (
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

                        {/* Documents Required */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-[2rem] blur-2xl"></div>
                            <div className="relative bg-background rounded-[2rem] border border-border-color p-8 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-600">folder_open</span>
                                    Documents Required
                                </h3>
                                <div className="space-y-3">
                                    {["Aadhaar Card / PAN Card", "Graduation Marksheet", "Income Certificate (for need-based)", "Passport Size Photo", "Statement of Purpose (500 words)"].map((doc, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border-color">
                                            <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                            <span className="text-sm">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">info</span>
                                        All documents can be uploaded digitally. No physical copies needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. EMI Calculator */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Affordable EMI Options</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">0% Interest. No cost EMI for up to 12 months.</p>
                    </div>

                    <div className="max-w-2xl mx-auto bg-surface rounded-[2rem] border border-border-color p-8 shadow-lg">
                        <div className="mb-8">
                            <label className="text-sm font-bold text-muted-foreground uppercase mb-4 block">Select Monthly Budget</label>
                            <input
                                type="range"
                                min="2999"
                                max="15000"
                                step="500"
                                value={emiAmount}
                                onChange={(e) => setEmiAmount(parseInt(e.target.value))}
                                className="w-full h-3 rounded-full appearance-none bg-surface-deep cursor-pointer accent-orange-600"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>₹2,999/mo</span>
                                <span>₹15,000/mo</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-6 bg-background rounded-2xl border border-border-color">
                                <p className="text-4xl font-black text-orange-600">₹{emiAmount.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold mt-1">Per Month</p>
                            </div>
                            <div className="p-6 bg-background rounded-2xl border border-border-color">
                                <p className="text-4xl font-black text-foreground">{Math.ceil(50000 / emiAmount)}</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold mt-1">Months</p>
                            </div>
                            <div className="p-6 bg-background rounded-2xl border border-border-color">
                                <p className="text-4xl font-black text-green-600">0%</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold mt-1">Interest</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl text-center text-white">
                            <p className="font-bold text-lg">Total Course Fee: ₹50,000</p>
                            <p className="text-orange-100 text-sm mt-1">Pay in easy installments. No hidden charges.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Success Stories */}
            <section className="py-20 lg:py-28 bg-surface border-y border-border-color">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Success Stories</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Students who transformed their careers with our financial aid.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {SUCCESS_STORIES.map((story, i) => (
                            <div key={i} className="bg-background border border-border-color p-8 rounded-[2rem] relative overflow-hidden group hover:border-orange-500/30 transition-all">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl leading-none text-orange-500">"</div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs font-bold rounded-full">{story.scholarship}</span>
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs font-bold rounded-full">Saved {story.savings}</span>
                                </div>
                                <p className="text-foreground italic leading-relaxed mb-6 relative z-10">"{story.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 font-bold">
                                        {story.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold">{story.name}</p>
                                        <p className="text-xs text-muted-foreground">{story.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. ROI Section */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment That Pays Back</h2>
                                <p className="text-slate-300 mb-6">Our graduates recover their course investment within 2 months of getting placed.</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-green-400">check_circle</span>
                                        <span>Average starting salary: ₹4.5 LPA</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-green-400">check_circle</span>
                                        <span>ROI within 60 days of placement</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-green-400">check_circle</span>
                                        <span>95% placement rate</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-6xl md:text-8xl font-black text-orange-500">9x</p>
                                <p className="text-xl text-slate-300 mt-2">Average Salary ROI</p>
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
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Apply for Scholarship</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
                        Check your eligibility in 2 minutes. Get approval within 48 hours.
                    </p>

                    <div className="bg-white text-left p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                                <p className="text-gray-500">Our counselor will contact you within 24 hours.</p>
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
                                        <label className="text-xs font-bold text-gray-500 uppercase">Annual Family Income</label>
                                        <select
                                            name="income"
                                            value={formData.income}
                                            onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                        >
                                            <option value="below-3">Below ₹3 LPA</option>
                                            <option value="3-6">₹3-6 LPA</option>
                                            <option value="6-10">₹6-10 LPA</option>
                                            <option value="above-10">Above ₹10 LPA</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Scholarship Type Interest</label>
                                    <select
                                        name="scholarship_type"
                                        onChange={(e) => setFormData({ ...formData, 'scholarship_type': e.target.value } as any)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                                    >
                                        <option>Merit Scholarship</option>
                                        <option>Need-Based Aid</option>
                                        <option>Women in Tech</option>
                                        <option>Early Bird Discount</option>
                                        <option>Not Sure - Help Me Decide</option>
                                    </select>
                                </div>
                                {status === 'error' && (
                                    <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded">
                                        Unable to submit application. Please try again.
                                    </p>
                                )}
                                <button type="submit" disabled={status === 'submitting'} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">
                                    {status === 'submitting' ? 'Processing...' : 'Check My Eligibility'}
                                </button>
                                <p className="text-center text-xs text-gray-400">
                                    By applying, you agree to our terms. We respect your privacy.
                                </p>
                            </form>
                        )}
                    </div>

                    {/* Approval Timeline */}
                    <div className="mt-12 grid grid-cols-3 gap-4 max-w-xl mx-auto">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="material-symbols-outlined text-orange-400">edit_note</span>
                            </div>
                            <p className="text-sm font-bold">Apply</p>
                            <p className="text-xs text-slate-400">2 minutes</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="material-symbols-outlined text-orange-400">fact_check</span>
                            </div>
                            <p className="text-sm font-bold">Review</p>
                            <p className="text-xs text-slate-400">24-48 hours</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="material-symbols-outlined text-orange-400">celebration</span>
                            </div>
                            <p className="text-sm font-bold">Approval</p>
                            <p className="text-xs text-slate-400">Start Learning!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FAQ */}
            <section className="py-20 lg:py-24 bg-background">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Can I combine multiple scholarships?", a: "No, only one scholarship can be applied per student. However, you can choose the one with the highest benefit." },
                            { q: "Is the EMI really 0% interest?", a: "Yes! We partner with leading NBFCs to offer genuine no-cost EMI for up to 12 months. No hidden charges." },
                            { q: "What if my scholarship application is rejected?", a: "You can still avail our EMI options or apply for a different scholarship category if eligible." },
                            { q: "Is the scholarship valid for the entire course duration?", a: "Yes, once approved, the scholarship covers your complete course fee. No renewal needed." }
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
                        <Link href="/pricing" className="px-6 py-3 bg-background border border-border-color rounded-xl font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all">
                            View Full Pricing
                        </Link>
                        <Link href="/courses/advanced-digital-marketing" className="px-6 py-3 bg-background border border-border-color rounded-xl font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all">
                            Explore Courses
                        </Link>
                        <Link href="/career" className="px-6 py-3 bg-background border border-border-color rounded-xl font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all">
                            Career Outcomes
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
