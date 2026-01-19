"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCityConfig } from "@/config/cityConfig";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";

interface CityLandingTemplateProps {
    city: string;
}

export default function CityLandingTemplate({ city }: CityLandingTemplateProps) {
    const config = getCityConfig(city);
    const cityName = config.name;
    const [faqOpen, setFaqOpen] = useState<number | null>(null);



    // Localized Stats (Simulated)
    const stats = [
        { label: "Avg Salary", value: "₹4.5 LPA", desc: `For freshers in ${cityName}` },
        { label: "Open Jobs", value: "12,000+", desc: `Active on Linkedin in ${cityName}` },
        { label: "Hiring Partners", value: "350+", desc: "Agencies & Corporates" },
        { label: "Alumni", value: "2,500+", desc: `Working in ${cityName} & Remote` },
    ];

    return (
        <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-white font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center pt-20 pb-5 overflow-hidden">
                {/* Background Details */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#0B1121] dark:to-[#162032] opacity-100"></div>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Admissions Open in {cityName}
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Digital Marketing Expert</span> in {cityName}
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Don't just learn theory. Join {cityName}'s only <strong>Agency-Style Training Program</strong>.
                            Manage real budgets, run live campaigns, and master AI tools like ChatGPT & Midjourney.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="#enroll-form" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
                                Book Free Counseling
                            </Link>
                            <Link href="/courses" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-all">
                                View Curriculum
                            </Link>
                        </div>

                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 13}`} alt="Student" />
                                    </div>
                                ))}
                            </div>
                            <p>Join <span className="text-slate-900 dark:text-white font-bold">450+ students</span> from {cityName}</p>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div id="enroll-form" className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-lg transform rotate-3 shadow-md">
                            LIMITED SEATS!
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Check Eligibility 🚀</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                            Get a free career roadmap tailored for {cityName}'s job market.
                        </p>
                        <UniversalLeadForm
                            source={`city_page_${config.slug}`}
                            submitButtonText="Get Free Career Report"
                            successMessage="We've sent the report to your email!"
                        />
                    </div>
                </div>
            </section>

            {/* 2. STATS STRIP */}
            <section className="border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-[#020617]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center group cursor-default">
                                <div className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-xs text-slate-400 dark:text-slate-500">
                                    {stat.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. WHY CITY - CONTENT */}
            <section className="py-20 bg-slate-50 dark:bg-[#0B1121]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                                {/* Using a generic office image that looks professional */}
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt={`Digital Marketing scope in ${cityName}`}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                                    <p className="font-bold text-lg">Live Classroom in {cityName}</p>
                                    <p className="text-sm opacity-80">Experience the energy of agency-style learning.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Why Digital Marketing is Booming in <span className="text-blue-600">{cityName}</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                {cityName} is rapidly becoming a hub for digital innovation. From startups to established MNCs,
                                every business in {cityName} needs digital experts to survive and thrive.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    `High demand for SEO & PPC experts in ${cityName}.`,
                                    "Average starting salary of ₹4.5 LPA for freshers.",
                                    "Opportunities to work with top global brands remotely.",
                                    "Fast-track career growth compared to traditional roles."
                                ].map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-200 font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>



            {/* 4. WHO IS THIS FOR? */}
            <section className="py-20 bg-white dark:bg-[#020617]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Should Join this Course?</h2>
                        <p className="text-slate-500 dark:text-slate-400">Designed for ambitious individuals in {cityName}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Students & Freshers", icon: "school", desc: "Launch your career with a high-paying job in Digital Marketing." },
                            { title: "Working Professionals", icon: "work", desc: "Switch careers or upskill to get a promotion & salary hike." },
                            { title: "Business Owners", icon: "store", desc: "Grow your business online and increase sales by 10x." }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl text-center hover:shadow-xl transition-all hover:-translate-y-2 border border-slate-100 dark:border-slate-800">
                                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. TOOLS SECTION */}
            <section className="py-20 bg-slate-50 dark:bg-[#0B1121] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Master 50+ Premium AI Tools</h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">We don't just teach theory. We give you hands-on experience with industry-standard tools used by top agencies.</p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">

                        {/* ChatGPT / OpenAI */}
                        <div className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:shadow-green-500/20 group-hover:border-green-500/50 transition-all">
                                <Image src="/images/about/chatgpt-icon.png" alt="ChatGPT" width={48} height={48} className="object-contain" />
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">ChatGPT</span>
                        </div>

                        {/* Midjourney - Simulated with Boat/Sail Icon */}
                        <div className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:shadow-blue-500/20 group-hover:border-blue-500/50 transition-all">
                                <span className="material-symbols-outlined text-4xl text-slate-900 dark:text-white">sailing</span>
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">Midjourney</span>
                        </div>

                        {/* Google */}
                        <div className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:shadow-red-500/20 group-hover:border-red-500/50 transition-all">
                                <Image src="/images/about/google-logo.svg" alt="Google" width={40} height={40} />
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">Google Ads</span>
                        </div>

                        {/* Semrush - Orange Fireball Simulation */}
                        <div className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:shadow-orange-500/20 group-hover:border-orange-500/50 transition-all">
                                <span className="material-symbols-outlined text-4xl text-[#FF642D]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">Semrush</span>
                        </div>

                        {/* Zapier */}
                        <div className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:shadow-orange-600/20 group-hover:border-orange-600/50 transition-all">
                                <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#FF4F00] fill-current"><path d="M3.6 13.2l7.2-10.8v7.2h8.4l-7.2 10.8v-7.2z" /></svg>
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">Zapier</span>
                        </div>

                        {/* Meta */}
                        <div className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:shadow-blue-600/20 group-hover:border-blue-600/50 transition-all">
                                <Image src="/images/about/meta-icon.png" alt="Meta Ads" width={48} height={48} className="object-contain" />
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">Meta Ads</span>
                        </div>

                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
                            + 45 more tools included in syllabus
                        </Link>
                    </div>

                </div>
            </section>

            {/* 6. PLACEMENT ROADMAP */}
            <section className="py-20 bg-white dark:bg-[#020617]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Journey to a ₹5 LPA+ Job</h2>
                        <p className="text-slate-500 text-lg">Our proven 4-step placement process for {cityName} students.</p>
                    </div>

                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:-translate-x-px md:before:h-full md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-transparent md:before:via-slate-300 md:before:to-transparent">
                        {[
                            { step: "Step 1", title: "Skill Building", desc: "Master SEO, Google Ads, and AI tools through live agency projects." },
                            { step: "Step 2", title: "Portfolio Creation", desc: "Build a real-world portfolio that showcases your actual work." },
                            { step: "Step 3", title: "Interview Prep", desc: "Mock interviews with industry experts to polish your soft skills." },
                            { step: "Step 4", title: "Guaranteed Placement", desc: "Sit for interviews with our 350+ hiring partners until you get hired." }
                        ].map((item, i) => (
                            <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${i % 2 === 0 ? '' : 'text-right'}`}>
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#020617] bg-blue-600 dark:bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md">
                                    <span className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-1 block">{item.step}</span>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. INTERACTIVE CURRICULUM PREVIEW (Renumbering implies logic, but layout is sequential) */}

            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">What You Will Learn?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-16">
                        A complete 360° syllabus covering everything from basics to advanced AI-driven marketing strategies.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {[
                            { title: "SEO & Content Mastery", desc: "Rank 1 on Google using AI tools.", icon: "search" },
                            { title: "Social Media Branding", desc: "Build million-follower communities.", icon: "share" },
                            { title: "Performance Marketing", desc: "Run ads on FB, Insta & Google.", icon: "ads_click" },
                            { title: "AI & Automation", desc: "Automate tasks with ChatGPT & Zapier.", icon: "smart_toy" },
                            { title: "Freelancing & Agency", desc: "Get international clients from Day 1.", icon: "currency_rupee" },
                            { title: "Video Editing & Design", desc: "Create viral reels & graphics.", icon: "movie_creation" }
                        ].map((module, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-2xl">{module.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                                <p className="text-slate-400 text-sm">{module.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link href="/courses/advance-digital-marketing-course" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                            View Detailed Syllabus <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="py-20 bg-white dark:bg-[#020617]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: `Is this course available offline in ${cityName}?`, a: `Currently, our ${cityName} batch acts as an "Online Live" cohort where you attend live classes with mentors. We are opening our physical centre in ${cityName} soon.` },
                            { q: "Do you provide placement assistance?", a: "Yes! We offer 100% placement support. We help you build your resume, prepare for interviews, and connect you with our hiring partners." },
                            { q: "Can I do this course along with my job/college?", a: "Absolutely. We have weekend and evening batches specifically designing for students and working professionals." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                                <button
                                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                >
                                    {faq.q}
                                    <span className="material-symbols-outlined transform transition-transform duration-300" style={{ transform: faqOpen === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                        expand_more
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 bg-white dark:bg-[#020617]`}
                                    style={{ maxHeight: faqOpen === i ? '200px' : '0px' }}
                                >
                                    <div className="p-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FINAL CTA */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to Start Your Career in {cityName}?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Download the brochure to get full details about fees, syllabus, and upcoming batch dates.
                    </p>
                    <Link href="#enroll-form" className="inline-block px-10 py-5 bg-white text-blue-700 font-bold text-lg rounded-2xl shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all">
                        Download {cityName} Brochure
                    </Link>
                </div>
            </section>

        </div>
    );
}
