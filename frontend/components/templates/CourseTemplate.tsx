"use client";

import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSupplement, CourseSupplement } from "@/data/course_content";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";

const FALLBACK_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2931&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
];

// Shared Interfaces
export interface Feature {
    icon: string;
    title: string;
    desc: string;
}

export interface Module {
    id: number;
    number: string;
    title: string;
    description: string;
    lessons: string[];
    isOpen: boolean;
}

export interface Stat {
    id: number;
    label: string;
    sublabel?: string;
}

export interface Course {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    duration: string;
    price: number;
    originalPrice: number;
    image: string;
    highlights: Feature[];
    curriculum: Module[];
    jobRoles: string[];
    salaryRange: string;
    placementStats: Stat[];
}

export function CourseTemplate({ course, supplement }: { course: Course, supplement: CourseSupplement }) {

    if (!course) return null;


    return (
        <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white font-body selection:bg-blue-500/20 selection:text-blue-500">
            {/* Navbar handled globally by ContentWrapper */}
            <main className="pb-24 md:pb-0 relative">
                {/* Hero Section */}
                <section className="relative bg-[#1e293b] dark:bg-[#0f172a] pb-16 lg:pb-24 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#0f172a]/90 dark:bg-[#0f172a]/95 mix-blend-multiply z-10"></div>
                        <img
                            src={supplement?.heroImage || course.image || FALLBACK_HERO_IMAGES[course.id % FALLBACK_HERO_IMAGES.length]}
                            alt={course.title}
                            className="w-full h-full object-cover opacity-10 dark:opacity-5"
                        />
                    </div>

                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] z-10"></div>
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] opacity-20 z-10"></div>

                    <div className="absolute top-0 inset-x-0 bg-[#F59E0B] text-slate-950 text-center py-2 text-xs md:text-sm font-bold shadow-lg z-20">
                        <span className="material-symbols-outlined align-middle text-sm mr-1">timer</span>
                        Seats Filling Fast — Apply Before Deadline
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-7 pt-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 dark:bg-white/5 dark:border-white/10 text-xs font-semibold text-blue-200 mb-6 backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                                    Next Cohort Starting Soon
                                </div>
                                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
                                    {course.title}
                                </h1>
                                <p className="text-lg text-slate-300 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                                    {course.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <button onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)] transition-all flex items-center justify-center gap-2 border border-blue-500">
                                        Apply Now
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                    <button onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                                        <span className="material-symbols-outlined">download</span>
                                        Download Brochure
                                    </button>
                                </div>

                                {supplement?.tools && (
                                    <div className="border-t border-white/10 pt-8">
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Master tools used by top brands</p>
                                        <div className="flex flex-wrap gap-4 opacity-80 hover:opacity-100 transition-opacity">
                                            {supplement.tools.map((tool, i) => (
                                                <div key={i} className="h-8 px-4 bg-white/10 border border-white/10 rounded flex items-center justify-center text-xs font-bold text-white tracking-wider">
                                                    {tool}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sticky Form */}
                            <div className="lg:col-span-5 relative">
                                <div className="sticky top-24 bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 backdrop-blur-xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Quick Apply</h3>
                                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">Fast Track</span>
                                    </div>
                                    <UniversalLeadForm
                                        formId="course-quick-apply"
                                        source="course_quick_apply"
                                        course={course.title}
                                        submitButtonText="Check Eligibility"
                                        successMessage="Application Received! Our team will contact you."
                                    />



                                    {/* Highlights Grid (Matched to Master Wireframe) */}
                                    {course.highlights && course.highlights.length > 0 && (
                                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10">
                                            <div className="grid grid-cols-4 gap-2 text-center">
                                                {course.highlights.map((h, i) => (
                                                    <div key={i} className="flex flex-col items-center">
                                                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                                                            <span className="material-symbols-outlined text-lg">{h.icon}</span>
                                                        </div>
                                                        <h4 className="text-[10px] font-bold text-slate-900 dark:text-white leading-tight">{h.title}</h4>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Main Content Grid */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 gap-12">
                    <div className="lg:col-span-2 space-y-16">

                        {/* Curriculum */}
                        {course.curriculum && course.curriculum.length > 0 && (
                            <section>
                                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-8">Course Curriculum</h2>
                                <div className="space-y-4">
                                    {course.curriculum.map((module) => (
                                        <details key={module.id} className="group bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden [&_summary::-webkit-details-marker]:hidden" open={module.isOpen}>
                                            <summary className="flex items-center justify-between p-5 cursor-pointer bg-slate-50 dark:bg-[#1e293b] hover:bg-white dark:hover:bg-[#334155] transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">{module.number}</span>
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{module.title}</h3>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-open:rotate-180 transition-transform">expand_more</span>
                                            </summary>
                                            <div className="p-5 border-t border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed bg-white dark:bg-[#0f172a]">
                                                <p className="mb-2">{module.description}</p>
                                                {module.lessons && (
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {module.lessons.map((l, j) => <li key={j}>{l}</li>)}
                                                    </ul>
                                                )}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                                <button className="mt-6 text-blue-500 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Download Full Syllabus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </section>
                        )}

                        {/* Learn by Doing (NEW from Master Template) */}
                        {supplement?.learnByDoing && (
                            <section className="bg-surface-subtle dark:bg-[#0f172a] rounded-3xl p-8 border border-slate-100 dark:border-white/10">
                                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Learn by Doing</h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {supplement.learnByDoing.map((item, i) => (
                                        <div key={i} className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 text-center">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">{item.title}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Career Section */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Your Career After This Course</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-500">badge</span> Job Roles You Can Target
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.jobRoles?.map((role, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full">{role}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-slate-900 dark:bg-slate-800 text-white p-6 rounded-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 bg-white/5 rounded-full blur-2xl"></div>
                                    <h4 className="font-bold text-white/90 text-sm uppercase tracking-wide mb-2">Average Salary Range</h4>
                                    <div className="text-3xl font-display font-bold mb-1">{course.salaryRange}</div>
                                    <p className="text-xs text-slate-400">Per annum based on experience & role</p>
                                    <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-400 w-3/4 rounded-full"></div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 text-right">Industry Growth: +25% YoY</p>
                                </div>
                            </div>
                        </section>

                        {/* Student Success Stories (Matched to Master Wireframe) */}
                        {supplement?.successStories && supplement.successStories.length > 0 && (
                            <section>
                                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Student Success Stories</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {supplement.successStories.map((story, i) => (
                                        <div key={i} className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-card border border-slate-100 dark:border-white/5">
                                            <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-xl mb-4 relative flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/5">
                                                <span className="material-symbols-outlined text-4xl text-slate-400">play_circle</span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-4">"{story.quote}"</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                                                <div>
                                                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">{story.name}</h5>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{story.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}


                        {/* Mentors */}
                        {supplement?.mentors && supplement.mentors.length > 0 && (
                            <section>
                                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Learn from Experts</h2>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {supplement.mentors.map((mentor, i) => (
                                        <div key={i} className="text-center group">
                                            <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full mb-4 border-2 border-white dark:border-slate-600 shadow-md overflow-hidden relative">
                                                <span className="material-symbols-outlined text-5xl text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">person</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{mentor.name}</h4>
                                            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">{mentor.role}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{mentor.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* FAQs */}
                        {supplement?.faqs && supplement.faqs.length > 0 && (
                            <section>
                                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-3">
                                    {supplement.faqs.map((faq, i) => (
                                        <details key={i} className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/5 rounded-lg p-4 group">
                                            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex justify-between items-center bg-transparent">
                                                {faq.question}
                                                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                            </summary>
                                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{faq.answer}</p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Fees */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-card p-6 border border-slate-100 dark:border-white/10">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Program Fees</h3>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-display font-bold text-slate-900 dark:text-white">₹{course.price.toLocaleString()}</span>
                                <span className="text-sm text-slate-400 line-through mb-1">₹{course.originalPrice.toLocaleString()}</span>
                            </div>
                            <span className="inline-block bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded mb-6">Limited Time Offer: Save 30%</span>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-blue-500 text-xl">credit_score</span>
                                    <span>No Cost EMI starting from ₹3,750/mo</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-blue-500 text-xl">school</span>
                                    <span>Scholarships available</span>
                                </div>
                            </div>
                            <button onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-lg transition-colors">
                                Enroll Now
                            </button>
                        </div>

                        {/* Placement Support (Matched to Master Wireframe) */}
                        <div className="bg-surface-subtle dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-500">verified</span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Placement Support</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-6 opacity-70 dark:opacity-100">
                                {course.placementStats?.map((stat, i) => (
                                    <div key={i} className="h-8 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/5 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">{stat.label}</div>
                                ))}
                            </div>
                            <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-100 dark:border-white/5 text-center mb-4">
                                <span className="block text-2xl font-bold text-blue-600 dark:text-blue-500">92%</span>
                                <span className="text-xs text-slate-500">Placement Rate</span>
                            </div>
                            <div className="bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold p-3 rounded-lg text-center border border-green-100 dark:border-green-500/20">
                                Guaranteed Interview Support
                            </div>
                        </div>


                        {/* Workshop CTA */}
                        {supplement?.workshop && (
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
                                <span className="material-symbols-outlined text-4xl mb-3 block">cast_for_education</span>
                                <h3 className="font-bold text-lg mb-2">{supplement.workshop.title}</h3>
                                <p className="text-sm text-indigo-100 mb-6">{supplement.workshop.description}</p>
                                <button className="w-full py-3 bg-white text-indigo-700 font-bold rounded-lg shadow-lg hover:bg-indigo-50 transition-colors">
                                    {supplement.workshop.cta}
                                </button>
                            </div>
                        )}

                        {/* Why Choose Us Table */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 p-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Why Choose Us?</h3>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-white/5">
                                        <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">Feature</th>
                                        <th className="text-right py-2 font-bold text-blue-600 dark:text-blue-400">EduTech</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                    <tr>
                                        <td className="py-3 text-slate-600 dark:text-slate-300">Live Projects</td>
                                        <td className="py-3 text-right"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-slate-600 dark:text-slate-300">Job Guarantee</td>
                                        <td className="py-3 text-right"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-slate-600 dark:text-slate-300">1:1 Mentorship</td>
                                        <td className="py-3 text-right"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    );
}
