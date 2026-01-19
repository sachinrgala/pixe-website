
"use client";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Link from "next/link";
import { getCityConfig } from "@/config/cityConfig";

interface CourseLandingTemplateProps {
    city?: string;
}

export function CourseLandingTemplate({ city }: CourseLandingTemplateProps) {
    // 1. Intelligent Configuration
    const config = getCityConfig(city || "bangalore");
    const isCityPage = !!city;
    const locationName = config.name;

    // 2. Dynamic Headlines (using Config)
    const heroHeadline = isCityPage
        ? <span>Advanced AI Digital Marketing Course in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 capitalize">{locationName}</span></span>
        : <span>Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI-Agentic Workflows</span> that 90% of Marketers Don't Know Yet.</span>;

    const subHeadline = config.description_override
        ? config.description_override
        : `Don't just learn "Digital Marketing." Build, automate, and scale confident campaigns in ${locationName} using the same AI agents used by growth teams.`;

    const modules = [
        {
            title: "Dominating Search Generative Experience (SGE)",
            desc: "Forget old-school SEO. Optimize for Google's SGE and AI Overviews with Python-based agents.",
            lessons: ["Zero-Click Search Optimization", "Voice Search Strategy & Entity Mapping", "AI Overview Ranking Factors", "Python for SEO Automation"]
        },
        {
            title: "High-ROAS Performance Architecture",
            desc: "Stop burning budget. Master the 'AI-bidding' ecosystem on Meta & Google Ads.",
            lessons: ["Predictive Audience Modeling", "Conversion API (CAPI) Setup", "Automated Bidding Strategies (PMax)", "Cross-Channel Attribution with GA4"]
        },
        {
            title: "Agentic Content Systems at Scale",
            desc: "Deploy AI agents (AutoGPT) to research, draft, and publish content 10x faster.",
            lessons: ["AutoGPT Workflows & Zapier AI", "Midjourney & Stable Diffusion Mastery", "Video AI (Runway/Pika) for Ads", "Automated Content Calendars"]
        },
        {
            title: "Data Storytelling & Predictive Analytics",
            desc: "Move beyond basic reporting. Use Python-based data agents to forecast trends.",
            lessons: ["Python for Marketers (No-Code)", "Predictive Trend Analysis", "Automated ROI Reporting", "BigQuery Basics for Marketers"]
        },
        {
            title: "Fundamentals of Agentic Marketing",
            desc: "The foundation of the 2026 marketing landscape.",
            lessons: ["AI-Native Marketing Funnels", "Customer Journey Mapping with AI", "Prompt Engineering Mastery", "Ethics in AI Marketing"]
        }
    ];

    return (
        <div className="bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white font-sans selection:bg-blue-500/20 selection:text-blue-500">
            {/* Navbar handled globally by ContentWrapper */}
            <main>
                {/* 1. Hero Section */}
                <section className="relative bg-slate-900 dark:bg-[#020617] text-white pb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
                    <div className="absolute top-0 inset-x-0 bg-yellow-500 text-slate-900 text-center py-2 text-xs md:text-sm font-bold shadow-sm z-20">
                        <span className="material-symbols-outlined align-middle text-sm mr-1">timer</span>
                        Batch Closing Soon — Secure Your Spot Today
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12 md:mt-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Left Content */}
                            <div className="lg:col-span-7 pt-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-green-300 mb-6 backdrop-blur-sm">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Next Cohort Starting Soon
                                </div>
                                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                                    {heroHeadline}
                                </h1>
                                <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                                    {subHeadline}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <button onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                                        Apply Now
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                    <button className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">download</span>
                                        Download Syllabus
                                    </button>
                                </div>
                                <div className="border-t border-white/10 pt-8">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-4">Direct Certification from Platforms that Run the Web</p>
                                    <div className="flex flex-wrap gap-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
                                        <div className="h-8 px-4 bg-white/10 border border-white/10 rounded flex items-center justify-center text-xs font-bold text-white tracking-wider">GOOGLE ADS</div>
                                        <div className="h-8 px-4 bg-white/10 border border-white/10 rounded flex items-center justify-center text-xs font-bold text-white tracking-wider">META AI</div>
                                        <div className="h-8 px-4 bg-white/10 border border-white/10 rounded flex items-center justify-center text-xs font-bold text-white tracking-wider">AUTOGPT</div>
                                        <div className="h-8 px-4 bg-white/10 border border-white/10 rounded flex items-center justify-center text-xs font-bold text-white tracking-wider">SEMRUSH</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Sticky Form */}
                            <div className="lg:col-span-5 relative">
                                <div className="sticky top-24 bg-white dark:bg-[#1E293B] rounded-2xl p-6 md:p-8 shadow-2xl text-slate-900 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                        <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white leading-tight">Get 2026 Salary Guide + Syllabus</h3>
                                        <span className="shrink-0 text-[10px] uppercase tracking-wider font-bold bg-green-100 text-green-700 px-2 py-1 rounded mt-1">Fast Track</span>
                                    </div>
                                    <UniversalLeadForm
                                        formId={`hero_register_${locationName}`}
                                        source={`advance_dm_${locationName}`}
                                        course="Advance Agentic Marketing"
                                        title=""
                                        submitButtonText="Check Eligibility"
                                        successMessage="We'll call you shortly!"
                                        className="space-y-4"
                                    />
                                    <p className="text-xs text-center text-slate-500 mt-3">By continuing, you agree to our Terms & Privacy Policy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Features Grid */}
                <section className="py-12 bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                { title: "100% Practical Training", icon: "school", color: "blue" },
                                { title: "Live Industry Projects", icon: "business_center", color: "green" },
                                { title: "Placement Assistance", icon: "handshake", color: "purple" },
                                { title: "Interview Prep Included", icon: "record_voice_over", color: "orange" }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                    <div className={`w-12 h-12 mx-auto bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-full flex items-center justify-center text-${item.color}-600 dark:text-${item.color}-400 mb-3 group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Curriculum & Learn by Doing */}
                <div className="grid lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 gap-12">
                    <div className="lg:col-span-2 space-y-16">
                        {/* Curriculum Accordion */}
                        <section>
                            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-8">Course Curriculum</h2>
                            <div className="space-y-4">
                                {modules.map((mod, i) => (
                                    <details key={i} className="group bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden" open={i === 0}>
                                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-slate-50 dark:bg-slate-800/50 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-400">0{i + 1}</span>
                                                <h3 className="font-bold text-slate-900 dark:text-white">{mod.title}</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                        </summary>
                                        <div className="p-5 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            <p className="mb-2">{mod.desc}</p>
                                            <ul className="list-disc pl-5 mt-2 space-y-1 opacity-80">
                                                {mod.lessons.map((l, j) => <li key={j}>{l}</li>)}
                                            </ul>
                                        </div>
                                    </details>
                                ))}
                            </div>
                            <button className="mt-6 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Download Full Syllabus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </section>

                        {/* Tools Mastery (Native Grid) */}
                        <section className="py-8">
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Tools You Will Master</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">smart_toy</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">ChatGPT (Advanced)</h4>
                                        <p className="text-[10px] text-slate-500">Prompt Engineering</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <span className="material-symbols-outlined">palette</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Midjourney</h4>
                                        <p className="text-[10px] text-slate-500">Generative Design</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">code</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Python Agents</h4>
                                        <p className="text-[10px] text-slate-500">Automation Scripts</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                        <span className="material-symbols-outlined">ads_click</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Google Ads AI</h4>
                                        <p className="text-[10px] text-slate-500">PMax & Scripts</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 dark:text-blue-300">
                                        <span className="material-symbols-outlined">campaign</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Meta Ads Manager</h4>
                                        <p className="text-[10px] text-slate-500">CAPI & Attribution</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                        <span className="material-symbols-outlined">bolt</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zapier</h4>
                                        <p className="text-[10px] text-slate-500">Workflow Autos</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Learn by Doing */}
                        <section className="bg-slate-50 dark:bg-[#1E293B] rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Learn by Doing</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">work</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">Internship Included</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">2 months guaranteed internship with partner agencies.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                                        <span className="material-symbols-outlined">simulation</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">Agency Simulation</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Run a virtual agency and handle client briefs.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">campaign</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">Live Campaigns</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Spend real budget (₹50k) on ads and optimize ROI.</p>
                                </div>
                            </div>
                        </section>

                        {/* Career & Salary */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Your Career After This Course</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-600">badge</span> Job Roles You Can Target
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["AI Marketing Manager", "Growth Engineer", "PPC Analyst", "Content Strategist", "Social Media Lead"].map((role, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full">{role}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-slate-900 dark:bg-[#1E293B] dark:border dark:border-slate-700 text-white p-6 rounded-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 bg-white/5 rounded-full blur-2xl"></div>
                                    <h4 className="font-bold text-white/90 text-sm uppercase tracking-wide mb-2">Average Salary Range</h4>
                                    <div className="text-3xl font-display font-bold mb-1">₹12L - ₹22L</div>
                                    <p className="text-xs text-slate-400">Per annum based on expertise</p>
                                    <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-400 w-3/4 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 text-right">Industry Growth: +25% YoY</p>
                                </div>
                            </div>
                        </section>

                        {/* Success Stories */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Student Success Stories</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-card border border-slate-100 dark:border-slate-700">
                                    <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl mb-4 relative flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-4xl text-white absoute z-10 drop-shadow-lg">play_circle</span>
                                        <div className="absolute inset-0 bg-black/20 z-0"></div>
                                        <img src="/images/priya_sharma.png" alt="Priya Sharma" className="absolute inset-0 w-full h-full object-cover object-top" />
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-4">&quot;The live projects gave me the confidence to crack my interview at a top agency. Highly recommended!&quot;</p>
                                    <div className="flex items-center gap-3">
                                        <img src="/images/priya_sharma.png" alt="Priya Sharma" className="w-10 h-10 rounded-full object-cover object-top" />
                                        <div>
                                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">Priya Sharma</h5>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Placed at Ogilvy</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-card border border-slate-100 dark:border-slate-700">
                                    <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl mb-4 relative flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-4xl text-white absolute z-10 drop-shadow-lg">play_circle</span>
                                        <div className="absolute inset-0 bg-black/20 z-0"></div>
                                        <img src="/images/rahul_verma.png" alt="Rahul Verma" className="absolute inset-0 w-full h-full object-cover object-top" />
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-4">&quot;Best investment for my career. The mentors are industry leaders who know the current trends.&quot;</p>
                                    <div className="flex items-center gap-3">
                                        <img src="/images/rahul_verma.png" alt="Rahul Verma" className="w-10 h-10 rounded-full object-cover object-top" />
                                        <div>
                                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">Rahul Verma</h5>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Digital Marketing Manager</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Certificate Showcase */}
                        <section className="bg-slate-900 dark:bg-black rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-full mb-4">Official Certification</span>
                                    <h2 className="font-display text-3xl font-bold mb-4">Get Certified & Recognized</h2>
                                    <p className="text-slate-300 mb-6">Earn the &quot;Advanced Agentic Marketing Expert&quot; certification from Pixe, recognized by top agencies and tech companies. Add it to your LinkedIn profile and resume to stand out.</p>
                                    <ul className="space-y-2 mb-6 text-sm text-slate-300">
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Industry Recognized</li>
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Verifiable Digital ID</li>
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Lifetime Validity</li>
                                    </ul>
                                </div>
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-yellow-500/20 blur-3xl rounded-full"></div>
                                    <img src="/images/certificate_mockup.png" alt="Certificate Preview" className="relative rounded-lg shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 w-full" />
                                </div>
                            </div>
                        </section>

                        {/* Experts */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Learn from Experts</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {[
                                    { name: "Amit Patel", role: "Ex-Google, 10y Exp", special: "Specialist in SEO & Analytics", img: "/images/amit_patel.png" },
                                    { name: "Sarah John", role: "Meta Certified", special: "Social Media Strategist", img: "/images/sarah_john.png" },
                                    { name: "Vikram Singh", role: "CMO, TechStartup", special: "Brand Strategy Expert", img: "/images/vikram_singh.png" }
                                ].map((expert, i) => (
                                    <div key={i} className="text-center group p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full mb-4 border-2 border-white dark:border-slate-600 shadow-md overflow-hidden relative flex items-center justify-center">
                                            <img src={expert.img} alt={expert.name} className="w-full h-full object-cover object-top" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">{expert.name}</h4>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">{expert.role}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{expert.special}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ Section (Dynamic Questions) */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-3">
                                <details className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-lg p-4 group">
                                    <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex justify-between items-center bg-transparent">
                                        {isCityPage ? `Do you have an offline center in ${city}?` : "Is there a weekend batch for working professionals?"}
                                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {isCityPage
                                            ? (config.status === "active"
                                                ? `Yes! We have an active center in ${locationName} at ${config.address}. You can visit us for offline counseling.`
                                                : `We operate via our HQ in Bangalore, offering our extensive curriculum via live interactive online sessions for students in ${locationName}.`)
                                            : `Yes. We have a dedicated "Pro-Executive" batch on Saturdays & Sundays.`
                                        }
                                    </p>
                                </details>
                                <details className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-lg p-4 group">
                                    <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex justify-between items-center bg-transparent">
                                        I come from a non-tech background (B.Com/Arts). Can I do this?
                                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Absolutely. 70% of our top achievers come from non-tech backgrounds. We don&apos;t teach you to code complex algorithms; we teach you to <strong>direct AI agents</strong> to do the work.
                                    </p>
                                </details>
                                <details className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-lg p-4 group">
                                    <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex justify-between items-center bg-transparent">
                                        Do I need to pay extra for AI tools like Midjourney or GPT-4?
                                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        No. We provide student access to premium tools including ChatGPT Plus (Enterprise), Midjourney, and Semrush for the duration of the course so you can practice without extra costs.
                                    </p>
                                </details>
                                <details className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-lg p-4 group">
                                    <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex justify-between items-center bg-transparent">
                                        How does the placement assistance work?
                                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Our dedicated Placement Cell helps you build an AI-optimized resume, conducts mock interviews with industry experts, and schedules interviews with our network of 500+ hiring partners.
                                    </p>
                                </details>
                                <details className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-lg p-4 group">
                                    <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex justify-between items-center bg-transparent">
                                        Is the certification recognized globally?
                                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Yes. Pixe&apos;s Advanced Agentic Marketing Certification is industry-recognized. We also prepare you for Google and Meta official certifications, adding double value to your profile.
                                    </p>
                                </details>
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar (Pricing & Placement) */}
                    <div className="space-y-8 sticky top-24 h-fit">
                        <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-card p-6 border border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Program Fees</h3>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-display font-bold text-slate-900 dark:text-white">₹45,000</span>
                                <span className="text-sm text-slate-400 line-through mb-1">₹65,000</span>
                            </div>
                            <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded mb-6">Limited Time Offer: Save 30%</span>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-blue-600 text-xl">credit_score</span>
                                    <span>Invest in your career for less than the cost of a daily latte. EMI starts ₹3,750/mo.</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-blue-600 text-xl">school</span>
                                    <span>Scholarships available</span>
                                </div>
                            </div>
                            <button onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
                                Enroll Now
                            </button>
                        </div>

                        {/* Placement Support Sidebar */}
                        <div className="bg-slate-50 dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-green-600">verified</span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Placement Support</h3>
                            </div>
                            <div className="mb-6 opacity-70 grayscale hover:grayscale-0 transition-all">
                                <img src="/images/hiring_partners.png" alt="Hiring Partners: Amazon, Flipkart, Zomato" className="w-full h-auto rounded-lg" />
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center mb-4">
                                <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">92%</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Placement Rate</span>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold p-3 rounded-lg text-center border border-green-100 dark:border-green-800">
                                Guaranteed Interview Support
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Popular Courses */}
                <section className="py-16 bg-slate-50 dark:bg-[#0B1221] border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8">Other Popular Courses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group bg-white dark:bg-[#1E293B] rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                                <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                                    <img src="/images/course_ppc.png" alt="PPC Course" className="w-full h-full object-cover top-0" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">PPC & Paid Ads Expert</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Master Google Ads, Meta Ads & Funnel Optimization.</p>
                                    <Link className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all" href="/courses/ppc-course">View Details <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                                </div>
                            </div>
                            <div className="group bg-white dark:bg-[#1E293B] rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                                <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                                    <img src="/images/course_seo.png" alt="SEO Course" className="w-full h-full object-cover top-0" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Advanced SEO Mastery</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Dominate SERPs with Technical SEO & Content Strategy.</p>
                                    <Link className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all" href="/courses/seo-course">View Details <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                                </div>
                            </div>
                            <div className="group bg-white dark:bg-[#1E293B] rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                                <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                                    <img src="/images/course_dm.png" alt="Digital Marketing Course" className="w-full h-full object-cover top-0" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">360° Digital Marketing</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">The complete roadmap to becoming a full-stack marketer.</p>
                                    <Link className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all" href="/digital-marketing-courses">View Details <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enrollment Section (Bottom) */}
                <section id="enroll" className="py-16 bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-4">Start Your Journey Today</h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Fill out the form below to book your seat or download the course brochure.
                            </p>
                        </div>
                        <UniversalLeadForm
                            formId={`registration_bottom_${locationName}`}
                            source={`advance_dm_bottom_${locationName}`}
                            course="Advance Digital Marketing Course"
                            title="Secure Your Spot"
                            submitButtonText="Enroll Now"
                            successMessage="Registration successful!"
                            className="max-w-md mx-auto"
                        />
                    </div>
                </section>

                <ExitIntentPopup
                    title="Wait! Don't leave yet."
                    description={`Get the Advance Digital Marketing & AI-Agentic Curriculum and Career Roadmap for ${locationName} delivered to your inbox.`}
                    buttonText="Download Full Syllabus"
                    course="Advance_DM_Course"
                />

                <Footer />
            </main>
        </div>
    );
}
