"use client";

import { useState } from "react";
import Link from "next/link";

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    duration: string;
    tags?: string[];
    badge?: string;
    level?: string;
}

interface FilteredCourseListProps {
    courses: Course[];
}

export function FilteredCourseList({ courses }: FilteredCourseListProps) {
    const [filter, setFilter] = useState("All Programs");

    const filteredCourses = courses.filter((course) => {
        if (filter === "All Programs") return true;

        const tags = (course.tags || []).join(" ").toLowerCase();
        const title = course.title.toLowerCase();
        const duration = course.duration.toLowerCase();

        if (filter === "For Career Starters") {
            // Logic: Long duration (> 6 months) OR specific tags like Placement, Agency Simulation
            const isLongTerm = duration.includes("year") || (parseInt(duration) >= 6 && duration.includes("month"));
            return isLongTerm || tags.includes("placement") || tags.includes("agency simulation") || tags.includes("organic");
        }

        if (filter === "For Professionals") {
            // Logic: Short duration (< 6 months), Advanced topics
            const isShortTerm = !duration.includes("year") && ((parseInt(duration) < 6 && duration.includes("month")) || duration.includes("week"));
            return isShortTerm || tags.includes("advanced") || tags.includes("strategy") || tags.includes("data");
        }

        if (filter === "AI Specialization") {
            return title.includes("ai") || tags.includes("ai") || tags.includes("data") || tags.includes("analytics") || tags.includes("automation");
        }

        return true;
    });

    return (
        <>
            <div className="flex flex-wrap gap-3 mb-12 items-center justify-center">
                <span className="text-sm font-bold text-slate-900 mr-2 uppercase tracking-wide">Program Fit:</span>
                {["All Programs", "For Career Starters", "For Professionals", "AI Specialization"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-full border text-sm font-bold transition-all shadow-sm ${filter === f
                            ? "border-blue-600 bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            : "border-slate-200 text-slate-600 bg-white hover:border-[#135bec] hover:text-[#135bec] hover:bg-blue-50"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div key={course.id || course.slug} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full border border-gray-100 ring-1 ring-slate-900/5 relative">
                            <div className="aspect-[16/9] bg-slate-200 relative overflow-hidden">
                                {course.image ? (
                                    <img alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={course.image} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                        <span className="material-symbols-outlined text-6xl">image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <Link href={`/${course.slug}`} className="px-4 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 shadow-lg text-sm">
                                            Quick View
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-2">
                                    {course.badge && (
                                        <div className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-orange-600 shadow-sm border border-orange-100 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">local_fire_department</span> {course.badge}
                                        </div>
                                    )}
                                    {/* Show Placement badge only for Career Starters or if explicitly tagged */}
                                    {(course.tags?.includes("100% Placement") || course.duration.includes("11 Months")) && (
                                        <div className="bg-blue-600/90 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm flex items-center gap-1">
                                            100% Placement
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {course.tags && course.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 rounded bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wide border border-slate-100">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="font-display text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#135bec] transition-colors line-clamp-2">{course.title}</h3>
                                <p className="text-sm text-slate-500 mb-6 line-clamp-2">{course.description}</p>

                                <div className="flex items-center gap-4 text-sm text-slate-600 mb-6 mt-auto border-t border-slate-50 pt-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-lg text-[#135bec]">schedule</span>
                                        <span className="font-medium">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-lg text-[#135bec]">videocam</span>
                                        <span className="font-medium">Live Classes</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link href={`/${course.slug}`} className="py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-center text-sm font-bold rounded-lg transition-all">
                                        View Curriculum
                                    </Link>
                                    <Link href={`/${course.slug}`} className="py-2.5 bg-[#135bec] hover:bg-blue-700 text-white text-center text-sm font-bold rounded-lg transition-all shadow-md shadow-blue-500/20">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">school</span>
                        <p>No courses match this filter. Try selecting "All Programs".</p>
                    </div>
                )}
            </div>
        </>
    );
}
