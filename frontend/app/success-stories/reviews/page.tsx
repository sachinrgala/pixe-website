"use client";

import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

// --- Static Data ---
// Expanded to include 'internship_win' and 'employer_testimonial' to match requests
const SUCCESS_STORIES: any[] = [
    {
        type: "salary_jump",
        name: "Priya V.",
        role: "Performance Marketer",
        old_salary: "₹3.2 LPA",
        new_salary: "₹8.5 LPA",
        company: "Amazon",
        image: "/images/reviews/priya.png",
    },
    {
        type: "linkedin_post",
        name: "Rahul Sharma",
        role: "SEO Strategist",
        company: "Zomato",
        content: "Officially joined Zomato! 🚀 A big thank you to Pixe for the hands-on training.",
        image: "/images/reviews/rahul.png",
        verified: true,
        likes: 428,
        time: "2d",
        category: "SEO"
    },
    {
        type: "internship_win",
        name: "Kabir Singh",
        role: "Digital Marketing Intern",
        company: "Ogilvy",
        stipend: "₹25,000/mo",
        image: "/images/reviews/kabir.png",
        quote: "Cracked the interview on my first try thanks to the portfolio I built.",
        category: "DM"
    },
    {
        type: "video_testimonial",
        name: "Arjun K.",
        title: "From Fresher to Agency Owner",
        thumbnail: "/images/reviews/arjun_thumb.png",
        views: "1.2k",
        category: "Freelance"
    },
    {
        type: "review",
        name: "Sanya Malhotra",
        role: "Content Creator",
        rating: 5,
        text: "The best investment I made for my career. The live projects gave me the confidence to start my own agency.",
        image: "/images/reviews/sanya.png",
        category: "SMM"
    },
    {
        type: "case_study",
        title: "Scaling a D2C Brand",
        metric_before: "₹45k",
        metric_after: "₹2.1L",
        growth: "+360%",
        desc: "Scaled revenue 3x using Pixe's FB Ads strategy.",
        student: "Meera Reddy",
        image: "/images/reviews/meera.png",
        category: "PPC"
    },
    {
        type: "employer_testimonial",
        name: "Anjali Mehta",
        role: "HR Director",
        company: "Nykaa",
        text: "Pixe students come with practical experience, not just theory. They are job-ready from day one.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Nykaa_Logo.png"
    },
    {
        type: "linkedin_post",
        name: "Vikram Singh",
        role: "Digital Marketing Manager",
        company: "Flipkart",
        content: "Offer accepted at Flipkart! 🛍️ The mock interviews at Pixe were a game changer.",
        image: "/images/reviews/vikram.png",
        verified: true,
        likes: 892,
        time: "5d",
        category: "DM"
    },
    {
        type: "salary_jump",
        name: "Ananya G.",
        role: "Freelance SMM",
        old_salary: "₹0",
        new_salary: "₹65k/mo",
        company: "Freelance",
        image: "/images/reviews/ananya.png",
        category: "Freelance"
    },
    {
        type: "video_testimonial",
        name: "Manoj Kumar",
        title: "Lawyer to Marketer Switch",
        thumbnail: "/images/reviews/manoj_thumb.png",
        views: "850",
        category: "PPC"
    },
    {
        type: "salary_jump",
        name: "Karan Johar",
        role: "PPC Specialist",
        old_salary: "₹2.4 LPA",
        new_salary: "₹6.0 LPA",
        company: "Swiggy",
        image: "/images/reviews/karan.png",
        category: "PPC"
    },
    {
        type: "internship_win",
        name: "Rohan Das",
        role: "SEO Intern",
        company: "Times Internet",
        stipend: "₹18,000/mo",
        image: "/images/reviews/rohan.png",
        quote: "Landed an internship in my 2nd month of the course!",
        category: "SEO"
    }
];

// FILTERS per user request: SEO / PPC / SMM / DM / Freelance
const FILTERS = ["All", "SEO", "PPC", "SMM", "DM", "Freelance"];

export default function ReviewsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    // Filter Logic
    const filteredStories = activeFilter === "All"
        ? SUCCESS_STORIES
        : SUCCESS_STORIES.filter(s => s.category?.includes(activeFilter) || s.type === 'employer_testimonial'); // Always show employer testimonials

    // Helper to render card based on type
    const renderCard = (story: any, idx: number) => {
        if (story.type === 'linkedin_post') {
            return (
                <div key={idx} className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 hover:shadow-md transition-shadow break-inside-avoid">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                            <img src={story.image} alt={story.name} className="w-10 h-10 rounded-full object-cover" suppressHydrationWarning />
                            <div className="leading-tight">
                                <div className="flex items-center gap-1">
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{story.name}</h4>
                                    {story.verified && <span className="material-symbols-outlined text-blue-500 text-[14px]">verified</span>}
                                </div>
                                <p className="text-xs text-gray-500">{story.role}</p>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400">{story.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{story.content}</p>
                    <div className="flex items-center gap-4 text-gray-400 text-xs border-t border-gray-100 dark:border-gray-800 pt-3">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">thumb_up</span> {story.likes}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">comment</span> 24</span>
                    </div>
                </div>
            );
        }
        if (story.type === 'salary_jump') {
            return (
                <div key={idx} className="mb-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group break-inside-avoid">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <img src={story.image} alt={story.name} className="w-10 h-10 rounded-full border-2 border-orange-500" suppressHydrationWarning />
                            <div>
                                <p className="font-bold text-sm">{story.name}</p>
                                <p className="text-xs text-gray-400 opacity-80">{story.company}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm opacity-60">
                                <span>Previous Salary</span>
                                <span className="line-through decoration-red-400">{story.old_salary}</span>
                            </div>
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span className="text-orange-400">New Salary</span>
                                <span>{story.new_salary}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (story.type === 'internship_win') {
            return (
                <div key={idx} className="mb-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-900/50 break-inside-avoid">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <span className="material-symbols-outlined">work</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-indigo-500 tracking-wider">Internship Secured</p>
                            <p className="font-bold text-sm text-gray-900 dark:text-white">{story.company}</p>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">"{story.quote}"</p>
                    <div className="inline-block bg-white dark:bg-indigo-900/50 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                        Stipend: {story.stipend}
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-indigo-100 dark:border-indigo-800/50">
                        <img src={story.image} alt={story.name} className="w-6 h-6 rounded-full" suppressHydrationWarning />
                        <span className="text-xs text-gray-500">{story.name}, {story.role}</span>
                    </div>
                </div>
            );
        }
        if (story.type === 'video_testimonial') {
            return (
                <div key={idx} className="mb-6 group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md break-inside-avoid">
                    <img src={story.thumbnail} alt={story.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" suppressHydrationWarning />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute  inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="font-bold text-sm mb-1">{story.title}</p>
                        <p className="text-xs opacity-75">{story.name}</p>
                    </div>
                </div>
            );
        }
        if (story.type === 'case_study') {
            return (
                <div key={idx} className="mb-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/50 break-inside-avoid">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-200/50 px-2 py-1 rounded">Case Study</span>
                        <span className="text-emerald-600 font-black text-sm">{story.growth}</span>
                    </div>
                    <div className="flex justify-between items-end mb-4">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Before</p>
                            <p className="font-mono font-bold text-gray-400">{story.metric_before}</p>
                        </div>
                        <span className="material-symbols-outlined text-emerald-500">arrow_forward</span>
                        <div className="text-center">
                            <p className="text-xs text-emerald-600 mb-1">After</p>
                            <p className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-lg">{story.metric_after}</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{story.desc}"</p>
                </div>
            )
        }
        if (story.type === 'employer_testimonial') {
            return (
                <div key={idx} className="mb-6 bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 border-l-4 border-orange-500 break-inside-avoid">
                    <div className="flex items-center gap-3 mb-4">
                        {/* Use a clear specific height/width and object-contain for logos */}
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                            <img src={story.logo} alt={story.company} className="w-full h-full object-contain" suppressHydrationWarning />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-gray-900 dark:text-white">{story.company}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Hiring Partner</p>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 italic mb-3">"{story.text}"</p>
                    <p className="text-xs text-right font-bold text-gray-500">- {story.name}, {story.role}</p>
                </div>
            )
        }
        // General Review
        return (
            <div key={idx} className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm break-inside-avoid">
                <div className="flex items-center gap-2 mb-3 text-orange-500">
                    {[...Array(story.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-[18px] fill-current">star</span>)}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">"{story.text}"</p>
                <div className="flex items-center gap-3">
                    <img src={story.image} alt={story.name} className="w-8 h-8 rounded-full object-cover" suppressHydrationWarning />
                    <div>
                        <p className="text-xs font-bold">{story.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase">{story.role}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-display min-h-screen relative">

            {/* Sticky Sub-Header */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                            {[1, 2, 3].map(i => <div key={i} className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white dark:border-black"></div>)}
                        </div>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400">2500+ Reviews</span>
                    </div>
                    <Link href="/free-counseling" className="text-xs font-bold bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full hover:opacity-80 transition-opacity shadow-lg">
                        Get Placed Now
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-orange-200 dark:border-orange-800">
                        Wall of Love ❤️
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">Real Stories. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Real Results.</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Join 15,000+ students who transformed their careers with Pixe.</p>

                    {/* Filters - Horizontal Scroll on Mobile */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar justify-start md:justify-center mt-10 pb-2 px-1">
                        {FILTERS.map(f => (
                            <button key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeFilter === f ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25 scale-105' : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-orange-500 hover:text-orange-500'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Grid Layout - Robust Manual Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

                    {/* Column 1 */}
                    <div className="flex flex-col w-full">
                        {filteredStories.filter((_, i) => i % 3 === 0).map((story, i) => renderCard(story, i))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col w-full">
                        {filteredStories.filter((_, i) => i % 3 === 1).map((story, i) => renderCard(story, i))}
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col w-full">
                        {filteredStories.filter((_, i) => i % 3 === 2).map((story, i) => renderCard(story, i))}
                    </div>

                </div>

                {/* New Section: CTA Reinforcement */}
                <div className="mt-20 text-center py-10 border-t border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Don't just watch, be the next story</p>
                    <h2 className="text-3xl font-black mb-8">Ready to Join the Next Success Story?</h2>
                    <Link href="/free-counseling" className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl shadow-orange-600/30 transition-all hover:scale-105 inline-block">
                        Book Free Success Plan
                    </Link>
                </div>
            </main>





            <Footer />
        </div>
    );
}
