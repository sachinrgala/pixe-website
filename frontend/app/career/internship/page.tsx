"use client";

import { Footer } from "@/components/layout/Footer";

export default function InternshipPage() {
    return (
        <>
            <main className="bg-white dark:bg-[#111518] text-[#111518] dark:text-white font-sans transition-colors duration-300">
                {/* HeroSection */}
                <div className="relative bg-white dark:bg-[#111518]">
                    <div className="px-4 py-12 md:py-20 max-w-[1280px] mx-auto">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            {/* Text Content */}
                            <div className="flex-1 flex flex-col gap-6 text-left max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#1876c3] w-fit">
                                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                                    <span className="text-xs font-bold uppercase tracking-wide">Certified Experience</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#111518] dark:text-white">
                                    Gain Real-World Experience Through Internships
                                </h1>
                                <h2 className="text-lg text-[#637788] dark:text-gray-300 font-normal leading-relaxed max-w-xl">
                                    Work with real brands and build industry-ready portfolios. Bridge the gap between learning and employment with our live project modules.
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <button onClick={() => window.location.href = '/internships'} className="flex items-center justify-center rounded-lg h-12 px-8 bg-[#1876c3] text-white text-base font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
                                        Apply for Internship Eligibility
                                    </button>
                                    <button onClick={() => window.location.href = '/courses'} className="flex items-center justify-center rounded-lg h-12 px-8 bg-white dark:bg-transparent border border-[#dce1e5] dark:border-gray-600 text-[#111518] dark:text-white text-base font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        View Curriculum
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url('https://i.pravatar.cc/100?u=student${i}')` }}></div>
                                        ))}
                                    </div>
                                    <p className="text-sm font-medium text-[#637788] dark:text-gray-400">Join 500+ active interns</p>
                                </div>
                            </div>
                            {/* Hero Image */}
                            <div className="flex-1 w-full">
                                <div className="relative w-full aspect-video md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg max-w-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="material-symbols-outlined text-green-600">trending_up</span>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Live Result</p>
                                            </div>
                                            <p className="text-sm font-bold text-[#111518]">SEO Campaign: +145% Organic Traffic Growth</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partner Logos (Trust Bar) */}
                <div className="border-y border-[#f0f2f4] dark:border-[#2a343e] bg-[#f6f7f8] dark:bg-[#111a21] py-8">
                    <div className="max-w-[1280px] mx-auto px-4 text-center">
                        <h4 className="text-[#637788] dark:text-gray-400 text-sm font-bold tracking-wider uppercase mb-6">Interns have worked on live projects for</h4>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {[
                                { name: "AcmeCorp", icon: "rocket_launch" },
                                { name: "GemStone", icon: "diamond" },
                                { name: "EnergyPlus", icon: "bolt" },
                                { name: "PureFlow", icon: "water_drop" },
                                { name: "EcoLogic", icon: "forest" }
                            ].map((logo, i) => (
                                <div key={i} className="flex items-center gap-2 font-bold text-xl text-gray-600 dark:text-gray-300">
                                    <span className="material-symbols-outlined">{logo.icon}</span> {logo.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Internship Structure (Feature Section) */}
                <div className="py-16 md:py-24 max-w-[1280px] mx-auto px-4">
                    <div className="flex flex-col gap-4 mb-12">
                        <h2 className="text-[#111518] dark:text-white text-3xl md:text-4xl font-bold leading-tight">
                            Internship Structure: <br className="hidden md:block" />Live Project Experience
                        </h2>
                        <p className="text-[#637788] dark:text-gray-300 text-lg max-w-2xl">
                            Don't just watch tutorials. Gain hands-on experience across key digital marketing domains by managing real budgets and campaigns.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "SEO Mastery", desc: "Execute live SEO audits, keyword research, and on-page optimizations for client websites.", icon: "search", bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-[#1876c3]" },
                            { title: "PPC Campaigns", desc: "Manage real ad budgets on Google Ads & Meta. Set up conversion tracking and optimize ROAS.", icon: "ads_click", bg: "bg-orange-100 dark:bg-orange-900/30", color: "text-orange-600" },
                            { title: "SMM Strategy", desc: "Create and schedule social media calendars. Design creatives and analyze engagement metrics.", icon: "share", bg: "bg-pink-100 dark:bg-pink-900/30", color: "text-pink-600" },
                            { title: "Analytics & Data", desc: "Track user behavior and generate professional performance reports utilizing GA4 data.", icon: "bar_chart", bg: "bg-purple-100 dark:bg-purple-900/30", color: "text-purple-600" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-4 p-6 rounded-xl border border-[#dce1e5] dark:border-[#2a343e] bg-white dark:bg-[#1a222a] hover:shadow-lg transition-shadow">
                                <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center ${item.color}`}>
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#111518] dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-[#637788] dark:text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Duration, Format & Tools */}
                <div className="bg-[#f0f6fa] dark:bg-[#16202a] py-16 md:py-24">
                    <div className="max-w-[1280px] mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left: Logistics */}
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-3xl font-bold text-[#111518] dark:text-white">Program Logistics</h2>
                                    <p className="text-[#637788] dark:text-gray-300">Designed to fit around your academic schedule while providing professional intensity.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: "Duration", val: "12 Weeks (Part-time)", icon: "schedule" },
                                        { label: "Format", val: "Remote or Hybrid", icon: "laptop_mac" },
                                        { label: "Mentorship", val: "Weekly 1:1 Reviews", icon: "group" },
                                        { label: "Certification", val: "Industry Recognized", icon: "verified" }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white dark:bg-[#1a222a] p-5 rounded-lg flex items-start gap-3 shadow-sm">
                                            <span className="material-symbols-outlined text-[#1876c3] mt-1">{item.icon}</span>
                                            <div>
                                                <h4 className="font-bold text-[#111518] dark:text-white">{item.label}</h4>
                                                <p className="text-sm text-[#637788] dark:text-gray-400">{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Right: Tools */}
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-3xl font-bold text-[#111518] dark:text-white">Tools You'll Master</h2>
                                    <p className="text-[#637788] dark:text-gray-300">We don't just teach concepts; we train you on the industry-standard tech stack.</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                        { name: "Google Analytics 4", icon: "analytics", color: "text-orange-500" },
                                        { name: "Google Ads", icon: "campaign", color: "text-blue-600" },
                                        { name: "Meta Business", icon: "public", color: "text-blue-400" },
                                        { name: "Semrush", icon: "search", color: "text-orange-600" },
                                        { name: "Mailchimp", icon: "mail", color: "text-purple-500" },
                                        { name: "WordPress", icon: "edit_note", color: "text-gray-700 dark:text-gray-300" }
                                    ].map((tool, i) => (
                                        <div key={i} className="bg-white dark:bg-[#1a222a] h-24 rounded-lg border border-[#dce1e5] dark:border-[#2a343e] flex flex-col items-center justify-center gap-2 hover:border-[#1876c3] transition-colors">
                                            <span className={`material-symbols-outlined text-3xl ${tool.color}`}>{tool.icon}</span>
                                            <span className="text-sm font-bold">{tool.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Work Showcase */}
                <div className="py-16 md:py-24 max-w-[1280px] mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#111518] dark:text-white mb-4">Student Work Showcase</h2>
                        <p className="text-[#637788] dark:text-gray-300">See the results our interns achieve. Real screenshots, real data, real impact.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "E-commerce Ad Campaign", desc: "Managed $5k budget for a fashion retailer.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070", badge: "ROI: 350%", badgeColor: "bg-green-500" },
                            { title: "Local SEO Optimization", desc: "Improved local visibility for a dental clinic.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015", badge: "Rank #3", badgeColor: "bg-blue-500" },
                            { title: "Social Brand Awareness", desc: "Content strategy for tech startup launch.", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974", badge: "+20k Reach", badgeColor: "bg-purple-500" }
                        ].map((project, i) => (
                            <div key={i} className="bg-white dark:bg-[#1a222a] rounded-xl overflow-hidden border border-[#dce1e5] dark:border-[#2a343e] shadow-sm group hover:shadow-lg transition-all">
                                <div className="h-48 bg-gray-200 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${project.img}')` }}></div>
                                    <div className={`absolute top-3 right-3 ${project.badgeColor} text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10`}>{project.badge}</div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                                    <p className="text-sm text-[#637788] dark:text-gray-400 mb-3">{project.desc}</p>
                                    <button className="flex items-center gap-2 text-xs font-semibold text-[#1876c3] hover:gap-3 transition-all">
                                        <span>View Case Study</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Placement Bridge (Visual Pathway) */}
                <div className="bg-[#111a21] text-white py-20">
                    <div className="max-w-[1280px] mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Placement Bridge</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">How our internship program translates directly into career success.</p>
                        </div>
                        <div className="relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 z-0"></div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                {[
                                    { title: "Skill Acquisition", desc: "Intensive training on core concepts.", icon: "school", color: "bg-[#1876c3]" },
                                    { title: "Internship", desc: "3 months of live project execution.", icon: "work_history", color: "bg-[#1876c3]" },
                                    { title: "Portfolio", desc: "Documented proof of results.", icon: "folder_shared", color: "bg-[#1876c3]" },
                                    { title: "Placement", desc: "Interview prep & company referrals.", icon: "handshake", color: "bg-green-600 text-green-500" } // text-green-500 for title
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center text-center gap-4">
                                        <div className={`w-16 h-16 rounded-full ${step.color.split(' ')[0]} flex items-center justify-center text-white shadow-lg border-4 border-[#111a21]`}>
                                            <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                                        </div>
                                        <div className="bg-[#1a222a] p-6 rounded-xl border border-gray-700 w-full">
                                            <h3 className={`font-bold text-lg mb-2 ${step.title === "Placement" ? "text-green-500" : "text-[#1876c3]"}`}>{i + 1}. {step.title}</h3>
                                            <p className="text-sm text-gray-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mentors */}
                <div className="py-16 md:py-24 max-w-[1280px] mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#111518] dark:text-white mb-10 text-center">Guided by Industry Experts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            { name: "James Wilson", role: "SEO Specialist", exp: "Ex-Google, 8yrs Exp.", img: "https://i.pravatar.cc/100?u=james" },
                            { name: "Sarah Chen", role: "PPC Lead", exp: "Managed $2M+ Ad Spend", img: "https://i.pravatar.cc/100?u=sarah" },
                            { name: "David Ross", role: "Analytics Head", exp: "Data Scientist @ Fintech", img: "https://i.pravatar.cc/100?u=david" }
                        ].map((m, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a222a] border border-[#f0f2f4] dark:border-[#2a343e] shadow-sm">
                                <img src={m.img} alt={m.name} className="w-16 h-16 rounded-full bg-cover bg-center" />
                                <div>
                                    <h3 className="font-bold text-[#111518] dark:text-white">{m.name}</h3>
                                    <p className="text-xs text-[#1876c3] font-bold uppercase tracking-wide">{m.role}</p>
                                    <p className="text-sm text-[#637788] dark:text-gray-400 mt-1">{m.exp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline & Batches + FAQ */}
                <div className="bg-[#f0f6fa] dark:bg-[#16202a] py-16">
                    <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Batches */}
                        <div>
                            <h3 className="text-2xl font-bold text-[#111518] dark:text-white mb-6">Upcoming Batches</h3>
                            <div className="bg-white dark:bg-[#1a222a] rounded-xl overflow-hidden shadow-sm border border-[#dce1e5] dark:border-[#2a343e]">
                                <div className="grid grid-cols-3 p-4 bg-gray-50 dark:bg-[#202a34] border-b border-[#dce1e5] dark:border-[#2a343e] font-bold text-sm text-[#111518] dark:text-white">
                                    <div>Start Date</div>
                                    <div>Format</div>
                                    <div>Status</div>
                                </div>
                                {[
                                    { date: "Oct 15, 2023", format: "Weekend", status: "Fast Filling", color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30" },
                                    { date: "Nov 01, 2023", format: "Weekday", status: "Open", color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
                                    { date: "Nov 15, 2023", format: "Weekend", status: "Open", color: "text-green-600 bg-green-100 dark:bg-green-900/30" }
                                ].map((batch, i) => (
                                    <div key={i} className="grid grid-cols-3 p-4 border-b border-[#f0f2f4] dark:border-[#2a343e] text-sm items-center last:border-0">
                                        <div className="font-medium text-[#111518] dark:text-white">{batch.date}</div>
                                        <div className="text-[#637788] dark:text-gray-400">{batch.format}</div>
                                        <div className={`${batch.color} font-bold text-xs w-fit px-2 py-1 rounded`}>{batch.status}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-6 bg-[#1876c3]/10 rounded-xl border border-[#1876c3]/20">
                                <h4 className="font-bold text-[#1876c3] mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined">chat</span>
                                    Still have doubts?
                                </h4>
                                <p className="text-sm text-[#637788] dark:text-gray-400 mb-4">Talk to a career counselor to check your eligibility.</p>
                                <button onClick={() => window.location.href = '/free-counseling'} className="w-full h-10 rounded-lg bg-white dark:bg-[#111518] text-[#1876c3] border border-[#1876c3] font-bold text-sm hover:bg-blue-50 transition-colors">
                                    Book Free Counseling
                                </button>
                            </div>
                        </div>
                        {/* FAQ */}
                        <div>
                            <h3 className="text-2xl font-bold text-[#111518] dark:text-white mb-6">Frequently Asked Questions</h3>
                            <div className="flex flex-col gap-3">
                                {[
                                    { q: "Who is eligible for this internship?", a: "Graduates, final year students, and career switchers who have completed our foundation course or pass an eligibility test can apply." },
                                    { q: "Is this a paid internship?", a: "This is a training-focused internship. While we do not offer a stipend during the training phase, top performers are often hired directly or referred to paid partners." },
                                    { q: "Will I get a certificate?", a: "Yes, upon successful completion of all live projects and evaluations, you will receive an Industry-Recognized Experience Certificate." },
                                    { q: "Can I do this along with my college?", a: "Absolutely. We have weekend batches and flexible evening hours specifically designed for students and working professionals." }
                                ].map((faq, i) => (
                                    <details key={i} className="group bg-white dark:bg-[#1a222a] rounded-lg border border-[#dce1e5] dark:border-[#2a343e] open:ring-1 open:ring-[#1876c3]/20">
                                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-[#111518] dark:text-white">
                                            <span>{faq.q}</span>
                                            <span className="transition group-open:rotate-180">
                                                <span className="material-symbols-outlined text-gray-400">expand_more</span>
                                            </span>
                                        </summary>
                                        <div className="text-[#637788] dark:text-gray-400 text-sm p-4 pt-0 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA Footer */}
                <div className="bg-white dark:bg-[#111a21] py-12 md:py-20 border-t border-[#f0f2f4] dark:border-[#2a343e]">
                    <div className="max-w-[1280px] mx-auto px-4 flex flex-col items-center text-center gap-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#111518] dark:text-white max-w-2xl">
                            Ready to Kickstart Your Career?
                        </h2>
                        <p className="text-[#637788] dark:text-gray-300 text-lg max-w-xl">
                            Limited seats available for the upcoming batch. Secure your spot and start building your future today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                            <button onClick={() => window.location.href = '/internships'} className="flex-1 flex items-center justify-center rounded-lg h-12 px-6 bg-[#1876c3] text-white text-base font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all">
                                Apply Now
                            </button>
                            <button onClick={() => window.location.href = '/contact'} className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#25D366] text-white text-base font-bold hover:bg-[#20bd5a] transition-colors">
                                <span className="material-symbols-outlined">chat</span>
                                WhatsApp Us
                            </button>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
