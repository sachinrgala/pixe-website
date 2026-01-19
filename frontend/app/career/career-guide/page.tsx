"use client";

import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";

// Force Rebuild
export default function CareerGuidePage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [hasShownPopup, setHasShownPopup] = useState(false);

    // Exit Intent Logic
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShownPopup) {
                setShowExitPopup(true);
                setHasShownPopup(true);
            }
        };
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [hasShownPopup]);

    return (
        <div className="bg-[#f3f4f6] dark:bg-[#000000] font-sans min-h-screen text-slate-900 dark:text-slate-50 selection:bg-blue-600 selection:text-white">

            {/* Exit Intent Popup */}
            {showExitPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-[#18191a] rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 transform scale-100 transition-all">
                        <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-sm">close</span>
                        </button>
                        <div className="p-8 text-center flex flex-col gap-4">
                            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 text-white">
                                <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Wait! Don't Miss Out</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                Unsure which path to take? Get a <strong>Free 1:1 Career Counseling</strong> session with our experts before you go.
                            </p>
                            <Link href="/free-counseling" className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl">
                                Book Free Session
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* 3-Column Layout: Mobile (1) -> Tablet/Laptop (2) -> Desktop (3) */}
            <main className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 px-4 pb-12">

                {/* Left Sidebar (Navigation) - Hidden on mobile/tablet, Visible on LG+ */}
                <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 sticky top-6 h-fit">
                    <div className="bg-white dark:bg-[#0e0e10] rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        {/* Profile Mini Header */}
                        <div className="h-24 bg-gradient-to-r from-blue-600 to-violet-600 relative">
                            <div className="absolute inset-0 bg-[url('/images/career-guide/sidebar-bg.png')] bg-cover bg-center opacity-40"></div>
                        </div>
                        <div className="px-5 pb-6 -mt-10 relative z-10">
                            <div className="w-20 h-20 rounded-full border-4 border-white dark:border-[#0e0e10] bg-white dark:bg-black shadow-md flex items-center justify-center overflow-hidden">
                                <img src="/logo.svg" alt="Pixe" className="w-full h-full object-cover p-1" />
                            </div>
                            <h2 className="mt-3 font-bold text-lg dark:text-white">Pixe Education</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">@pixe_edu • 25k followers</p>
                        </div>

                        <div className="px-3 pb-3 flex flex-col gap-1">
                            <h3 className="px-4 py-2 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">On this page</h3>
                            {[
                                { name: "Overview", icon: "dashboard", href: "#overview" },
                                { name: "Job Roles", icon: "work_outline", href: "#job-roles" },
                                { name: "Salary Guide", icon: "payments", href: "#salary" },
                                { name: "Roadmap", icon: "map", href: "#roadmap" },
                                { name: "Skills", icon: "bolt", href: "#skills" },
                            ].map((item) => (
                                <a key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400 font-medium transition-colors group">
                                    <span className="material-symbols-outlined text-[20px] text-slate-400 dark:text-zinc-600 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">{item.icon}</span>
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar CTA */}
                    <Link href="/free-counseling" className="mt-6 block bg-gradient-to-br from-orange-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl shadow-orange-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl group-hover:scale-110 transition-transform"></div>
                        <h3 className="font-bold text-lg relative z-10 mb-1">Confused?</h3>
                        <p className="text-orange-50 text-sm relative z-10 mb-4 font-medium opacity-90">Talk to a career expert for free.</p>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-sm font-bold inline-flex items-center gap-2 group-hover:bg-white/30 transition-colors">
                            Book Call <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </Link>
                </aside>

                {/* Main Content Feed - Min-w-0 Critical Fix */}
                <div className="lg:col-span-9 xl:col-span-6 flex flex-col gap-8 min-w-0">

                    {/* Hero Section */}
                    <section id="overview" className="bg-white dark:bg-[#0e0e10] rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm group">
                        {/* Indian Context Hero Image: Professional Indian Team */}
                        <div className="h-64 bg-[url('/images/career-guide/office-team.jpg')] bg-cover bg-center relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <span className="inline-block px-3 py-1 mb-3 rounded-full bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">Ultimate Guide 2025</span>
                                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2 text-shadow-sm">
                                    Digital Marketing Career Roadmap
                                </h1>
                                <p className="text-gray-200 text-sm font-medium max-w-lg">
                                    Everything you need to know about salaries, job roles, and skills to land your first ₹10LPA job in India.
                                </p>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-zinc-800 border-b border-gray-100 dark:border-zinc-800">
                            {[
                                { label: "India Growth", value: "30%", icon: "trending_up", color: "text-green-500" },
                                { label: "Avg Salary", value: "₹8 LPA", icon: "payments", color: "text-blue-500" },
                                { label: "Open Jobs", value: "50k+", icon: "work_history", color: "text-purple-500" },
                            ].map((stat, i) => (
                                <div key={i} className="py-4 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-default">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className={`material-symbols-outlined text-lg ${stat.color}`}>{stat.icon}</span>
                                        <span className="text-lg font-black dark:text-white">{stat.value}</span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-zinc-500 tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="p-4 bg-gray-50 dark:bg-black/20">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-3.5 text-gray-400">search</span>
                                <input
                                    className="w-full bg-white dark:bg-[#18191a] border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-400 dark:text-white"
                                    placeholder="Search for 'SEO Salary' or 'SMM Skills'..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Job Roles Feed */}
                    <section id="job-roles" className="flex flex-col gap-6">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                                Choose Your Path
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {[
                                { title: "SEO Specialist", desc: "Master of organic traffic & technical audits.", icon: "search", color: "bg-orange-500", link: "/courses/seo-course" },
                                { title: "PPC Manager", desc: "Expert in paid ads & budget optimization.", icon: "ads_click", color: "bg-blue-500", link: "#" },
                                { title: "Social Media Manager", desc: "Voice of the brand on social platforms.", icon: "share", color: "bg-pink-500", link: "/courses/social-media-marketing-course" }
                            ].map((role, i) => (
                                <details key={i} className="group bg-white dark:bg-[#0e0e10] rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm open:ring-1 open:ring-blue-500/50 transition-all">
                                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-200 dark:shadow-none ${role.color}`}>
                                                <span className="material-symbols-outlined text-2xl">{role.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{role.title}</h3>
                                                <p className="text-sm text-slate-500 dark:text-zinc-500">{role.desc}</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center group-open:bg-blue-600 group-open:text-white transition-colors">
                                            <span className="material-symbols-outlined text-gray-500 group-open:text-white transition-transform group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="px-5 pb-6 pt-0 pl-[4.5rem]">
                                        <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-4 border-l-2 border-gray-100 dark:border-zinc-800 pl-4 py-1">
                                            Responsible for driving traffic, generating leads, and optimizing conversions. Requires strong analytical skills and creativity.
                                        </p>
                                        <Link href={role.link} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
                                            Explore Course <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Salary Guide - Table Post */}
                    <section id="salary" className="bg-white dark:bg-[#0e0e10] rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500">payments</span>
                                    Salary Benchmarks
                                </h2>
                                <p className="text-xs text-slate-500 mt-1">Based on 2025 Indian Industry Reports</p>
                            </div>
                            <button className="text-xs font-bold bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">
                                Download Report
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-gray-50 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-400 font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Junior <span className="text-[10px] opacity-70">(0-2y)</span></th>
                                        <th className="px-6 py-4">Mid <span className="text-[10px] opacity-70">(2-5y)</span></th>
                                        <th className="px-6 py-4">Senior <span className="text-[10px] opacity-70">(5y+)</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                                    {[
                                        { r: "SEO Specialist", j: "₹3-5L", m: "₹6-10L", s: "₹12L+" },
                                        { r: "PPC Manager", j: "₹4-6L", m: "₹8-12L", s: "₹15L+" },
                                        { r: "Content Lead", j: "₹3-4L", m: "₹5-9L", s: "₹10L+" },
                                        { r: "Analytics Lead", j: "₹5-7L", m: "₹10-15L", s: "₹20L+" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.r}</td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-zinc-400">{row.j}</td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-zinc-400">{row.m}</td>
                                            <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-transparent">{row.s}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Timeline */}
                    <section id="roadmap" className="bg-white dark:bg-[#0e0e10] rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6 md:p-8">
                        <h2 className="text-xl font-bold dark:text-white mb-8 flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-500">route</span>
                            Your Career Roadmap
                        </h2>
                        <div className="relative pl-8 border-l-2 border-dashed border-gray-200 dark:border-zinc-700 space-y-10">
                            {[
                                { title: "Executive Level", time: "0-2 Years", desc: "Focus on execution. Learn tools like GA4, WordPress, and Canva.", color: "bg-slate-200 border-slate-300" },
                                { title: "Specialist / Manager", time: "2-5 Years", desc: "Own a channel (SEO/Ads). Focus on strategy, ROI, and client comms.", color: "bg-blue-500 border-blue-600 shadow-lg shadow-blue-500/30" },
                                { title: "Head of Marketing", time: "5+ Years", desc: "Lead teams. Align marketing goals with business revenue.", color: "bg-slate-900 border-black dark:border-white shadow-lg" },
                            ].map((step, i) => (
                                <div key={i} className="relative">
                                    <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-2 ${step.color}`}></div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{step.time}</span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                                        <p className="text-slate-500 dark:text-zinc-400 text-sm">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Sidebar - Hidden on LG, Visible on XL+ */}
                <aside className="hidden xl:block xl:col-span-3 flex flex-col gap-6 sticky top-6 h-fit">

                    {/* Featured Course */}
                    <div className="bg-white dark:bg-[#0e0e10] rounded-2xl border border-gray-100 dark:border-zinc-800 p-1 shadow-sm group cursor-pointer hover:border-blue-500/30 transition-colors">
                        <div className="h-40 rounded-xl bg-gray-200 overflow-hidden relative">
                            {/* Indian Student Context Image */}
                            <div className="absolute inset-0 bg-[url('/images/career-guide/student-learning.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Bestseller</div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">Advanced Digital Marketing Masterclass</h3>
                            <div className="flex items-center gap-1 mb-4">
                                <div className="flex text-yellow-400 text-[14px]">
                                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                                </div>
                                <span className="text-xs text-slate-400">(2.4k reviews)</span>
                            </div>
                            <Link href="/courses/seo-course" className="block w-full text-center py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                View Syllabus
                            </Link>
                        </div>
                    </div>

                    {/* Hiring Companies */}
                    <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 relative z-10 text-slate-300">Top Hiring Partners</h3>
                        <div className="flex flex-wrap justify-center gap-3 relative z-10">
                            {['Google', 'Flipkart', 'Zoho', 'Swiggy', 'Zomato', 'TCS'].map(c => (
                                <span key={c} className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-default">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Post Job / Social Proof */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <span className="material-symbols-outlined">work</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Hiring? Post a Job</p>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400">Reach 50k+ students</p>
                        </div>
                    </div>

                </aside>

                {/* Sticky WhatsApp - Bottom Right */}


            </main>

            {/* Lead Magnet Footer */}
            <div className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-black py-16 px-4">
                <div className="max-w-xl mx-auto text-center">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                        <span className="material-symbols-outlined text-3xl text-blue-600">download</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Download the 2025 Career Guide</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Get the complete breakdown of salaries, skills, and interview questions for every digital marketing role.</p>
                    <form onSubmit={(e) => { e.preventDefault(); setStatus('success'); }} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 px-5 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-3.5 font-bold rounded-xl shadow-lg hover:transform hover:-translate-y-1 transition-all">
                            {status === 'success' ? 'Sent!' : 'Download PDF'}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
