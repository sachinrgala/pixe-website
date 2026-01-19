"use client";

import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";

const TOOLS = [
    {
        id: 1,
        title: "Ultimate 2025 Marketing Guide",
        desc: "The bible of digital marketing. Includes strategies for SEO, PPC, and Content Marketing in 2025.",
        category: "Guide",
        downloads: "15.4k",
        likes: 892,
        comments: 124,
        promoted: true,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpQlh_EtHO6pmsFyCKZXXNHpE3UTMwT4zw61VD8mQ3PP3yRWKtUEKP9YDn-fY6nCdPYa0JVzhooQYOMr08NdrtzWuzghrZ68OggOlrOs9ZeQ0wS8q889N5bwPAWnfzGNq6zAgRaTbTqn39yFUvJBQIcVAKUXrF_qQDRbheekghgNIGSl6NniChEfL0sf-csRWXb2xOluWFqb9iU9QsprCDSP_tqG4LlNreicv95a-2-fjvsu82_PtBCC94AMs8OAgcADRPKkWvc-Y"
    },
    {
        id: 2,
        title: "Technical SEO Audit Sheet",
        desc: "Identify and fix technical issues hindering your organic ranking with this checklist.",
        category: "SEO",
        downloads: "12.2k",
        likes: 423,
        comments: 56,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFSVA8uELZYYZxRoATkqkrzCi-HIuMpWjzB7owriPqZ7nEB2R83V44g1upJ0Nd9sWXRj6Z08xMFJaLeCqwL2cPEX9k659D-Yl2W2sHCDXMq86P-N8Q4660iC-ungiZP0Ho3HuAQo-n8WPgqcQShlfZMFRDFyJdBZSuXkJgDYdK9WbXLDJFSrWHm36O52c5tnjiefdThxvBcMlo-I_56dAVcgeryoTUBYMgvSFz4WKolT5hVBvXgdO2GFMVyv6HsRqzX6ml2qp97Sk"
    },
    {
        id: 3,
        title: "2025 Social Media Calendar",
        desc: "Plan your social media posts across all platforms with this automated Google Sheet.",
        category: "SMM",
        downloads: "8.5k",
        likes: 310,
        comments: 42,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqCsmdD4T7GKzHZZe2lvUEPbeetbvANxqXUdhxvNFW1UMbyRYdqCE4Kdk1uTXGc3Tq8UhbdC1MgnaXAIx7hBcfrYFOSOolYgzZikPcD2BKlSs6UTE4mH9XmTeJP0yNT2X4iW2SsViOk9FsuxWwbPviL8oEr6xnUb1GvuOPBF-5XjG8RACBVBc4ZHYKWN1eTBQHCcc9H6ltnfw-WlCB7gig4sHwHb46QxmjiJAx1Au653huvbRZP9OjfDg-3QBFHEKqK1lcibDK3tU"
    },
    {
        id: 4,
        title: "PPC Budget Calculator",
        desc: "Forecast your ROAS and manage your monthly ad spend allocation efficiently.",
        category: "PPC",
        downloads: "5.1k",
        likes: 180,
        comments: 20,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRfPUUkWQ9TKqvItNGneuHedWNSCZ7d2LEsAK2jdB38JPrD2MRVWFd7ZvHfVVY-tkAdtyIzqZRtK99Ct8Hin48qnGSu_LYWTGTzaUfkI41xltWTooYEkW8MGsQpNaB1U4UvopHupHm3zLpAQctMzgin2AgiDZFqI95tdjdvmphQK1xcb49_yO6MDitMtV5H9TLsck-c9iURzhZSsN44wqusWZ8zlX14xRrtz5fTZ9KHkX72re5xFhkwj-UT7jGmNGz_wIeMYV7u30"
    },
    {
        id: 5,
        title: "Email Nurture Scripts",
        desc: "Pre-written email templates to nurture new leads and convert them into customers.",
        category: "Email",
        downloads: "9.8k",
        likes: 560,
        comments: 89,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDodnWnWMgKyZJXap2zCd6GUPBsYsUf1cQE3UdUtNqLV4NvZdxEB1PjydXDLSddHLg1M87IfCuBN3VeUXaQnwgQ8_e3Yv05IswM0w-J4imy6wH-p2Ak694SO8W6sdC7PcADbsDd77YExDKONwjcTrMwLOmZoJqtXQvREfSyZrOUX7sDSEp4wx2uOuLI3H8f_UGFxIsmoCkdI4ydzkkILVPNGIH5XOqaxo29Z4Q-y79o5Ly9Qid3pyTBBqCj_ffvRox490wLIZsWFHU"
    },
    {
        id: 6,
        title: "Buyer Persona Builder",
        desc: "Define your ideal customer profile with this step-by-step worksheet.",
        category: "Strategy",
        downloads: "6.3k",
        likes: 245,
        comments: 33,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0tAiHqkwdz_yofywYIu9titUVzG-laDJsOzYyUEQ96RSCWOFjamxhdLu60E-hZUQyQyHHVhUTYlpQH8jc7a1x-T9UTBcnR_hATGdOZHHk4f3IQv7k7Cq0b4LmH33NMixffAJlj_cWMUO0WWPYmTxuoYgDqddgaCRgWp_yA6uMsvgFk3Z6BK4Ffq61tRN3x-2VuLlBzupXvsO48KV1fQ08zGENHyS6g0expEFF16BLnDhyT4HZI1yFN8hDebavk27Qp960aYRvQrQ"
    }
];

export default function FreeToolsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [downloadTool, setDownloadTool] = useState<typeof TOOLS[0] | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showToast, setShowToast] = useState<string | null>(null);

    // Toast logic
    const triggerToast = (msg: string) => {
        setShowToast(msg);
        setTimeout(() => setShowToast(null), 3000);
    };

    // Filter Logic
    const displayedTools = activeCategory === "All"
        ? TOOLS.filter(t => !t.promoted) // Exclude promoted from grid, show separate? Or just all. Let's filter out promoted IF we show it at top.
        : TOOLS.filter(t => t.category === activeCategory);

    const promotedTool = TOOLS.find(t => t.promoted);

    const closeModal = () => {
        setDownloadTool(null);
        setStatus("idle");
        setFormData({ name: "", email: "", phone: "" });
        setIsPhoneVerified(false);
    };

    const handleDownloadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    source: "resource_download",
                    data: {
                        tool_id: downloadTool?.id,
                        tool_title: downloadTool?.title,
                        tool_category: downloadTool?.category
                    }
                })
            });

            if (res.ok) {
                setStatus("success");
                triggerToast(`Sent ${downloadTool?.title} to your email!`);
                setTimeout(closeModal, 2000);
            } else {
                alert("Something went wrong. Please try again.");
                setStatus("idle");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to submit. Please check your connection.");
            setStatus("idle");
        }
    };

    return (
        <div className="bg-[#f3f4f6] dark:bg-[#000000] min-h-screen font-sans text-slate-900 dark:text-slate-50">

            {/* Mobile Header */}
            <div className="lg:hidden bg-white dark:bg-[#0e0e10] p-4 sticky top-0 z-50 shadow-sm flex items-center justify-between">
                <span className="font-bold text-xl text-blue-600">Pixe.</span>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">Get App</button>
            </div>

            <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 px-4 pb-12">

                {/* LEFT SIDEBAR (Navigation/Filters) */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
                    <div className="bg-white dark:bg-[#0e0e10] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800">
                        {/* Profile/Welcome */}
                        <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                        <div className="px-5 pb-5 -mt-10">
                            <div className="w-20 h-20 rounded-full border-4 border-white dark:border-[#0e0e10] overflow-hidden bg-white">
                                <img src="/logo.svg" alt="Pixe" className="w-full h-full object-cover p-1" />
                            </div>
                            <div className="mt-2">
                                <h2 className="text-xl font-bold dark:text-white">Resource Library</h2>
                                <p className="text-sm text-slate-500 dark:text-zinc-500">@pixe_resources • 50k+ Learners</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="px-5 py-3 border-t border-gray-100 dark:border-zinc-800 grid grid-cols-3 gap-2 text-center">
                            <div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">120+</div>
                                <div className="text-[10px] uppercase text-slate-400 font-bold">Tools</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">50k</div>
                                <div className="text-[10px] uppercase text-slate-400 font-bold">Users</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">Free</div>
                                <div className="text-[10px] uppercase text-slate-400 font-bold">Access</div>
                            </div>
                        </div>

                        {/* Filter Navigation */}
                        <div className="p-3">
                            <h3 className="px-3 py-2 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Categories</h3>
                            <div className="flex flex-col gap-1">
                                {['All', 'SEO', 'SMM', 'PPC', 'Email', 'Strategy', 'Career'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-left ${activeCategory === cat ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {cat === 'All' ? 'grid_view' :
                                                cat === 'SEO' ? 'search' :
                                                    cat === 'SMM' ? 'share' :
                                                        cat === 'PPC' ? 'ads_click' :
                                                            cat === 'Email' ? 'mail' :
                                                                cat === 'Career' ? 'work' : 'lightbulb'}
                                        </span>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Sidebar Widget */}
                    <div className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -mr-16 -mt-16"></div>
                        <h3 className="font-bold text-lg relative z-10">Weekly Drops</h3>
                        <p className="text-indigo-100 text-sm mb-4 relative z-10">Get new templates delivered to your inbox every Monday.</p>
                        <button onClick={() => triggerToast('Subscribed!')} className="w-full py-2 bg-white text-indigo-600 font-bold rounded-lg text-sm shadow-sm hover:scale-[1.02] transition-transform relative z-10">
                            Subscribe Free
                        </button>
                    </div>
                </aside>

                {/* CENTER FEED */}
                <div className="lg:col-span-6 flex flex-col gap-6">

                    {/* FEATURED / PROMOTED POST */}
                    {promotedTool && activeCategory === 'All' && (
                        <article className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                            <div className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">P</div>
                                <div>
                                    <h3 className="font-bold text-sm dark:text-white flex items-center gap-1">
                                        Pixe Team <span className="material-symbols-outlined text-blue-500 text-[14px] filled">verified</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-zinc-500">Pinned • Most Popular 🌟</p>
                                </div>
                            </div>

                            <div className="px-4 pb-3">
                                <h2 className="text-lg font-bold dark:text-white mb-1">{promotedTool.title}</h2>
                                <p className="text-sm dark:text-slate-300 leading-relaxed">
                                    {promotedTool.desc} <span className="text-blue-500 hover:underline cursor-pointer">#marketing #2025</span>
                                </p>
                            </div>

                            <div className="bg-gray-100 dark:bg-zinc-900 aspect-video relative group cursor-pointer" onClick={() => setDownloadTool(promotedTool)}>
                                <img src={promotedTool.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" alt={promotedTool.title} />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <button className="bg-white/90 dark:bg-black/90 text-black dark:text-white px-6 py-3 rounded-full font-bold shadow-xl transform scale-90 group-hover:scale-110 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined">download</span> Download Now
                                    </button>
                                </div>
                            </div>

                            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100 dark:border-zinc-800 text-sm text-slate-500 dark:text-zinc-500">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors" onClick={() => triggerToast('Liked!')}>
                                        <span className="material-symbols-outlined text-[20px]">thumb_up</span> {promotedTool.likes}
                                    </span>
                                    <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span> {promotedTool.comments}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-400">
                                    <span className="material-symbols-outlined text-[18px]">download_done</span> {promotedTool.downloads} downloads
                                </div>
                            </div>
                        </article>
                    )}

                    {/* FILTERS TABS (MOBILE) */}
                    <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {['All', 'SEO', 'SMM', 'PPC', 'Email', 'Career'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap border transition-colors ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white' : 'bg-white dark:bg-[#0e0e10] text-slate-600 dark:text-slate-400 border-gray-200 dark:border-zinc-800'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* FEED GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayedTools.map(tool => (
                            <article key={tool.id} className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col h-full hover:shadow-md transition-shadow">
                                {/* Card Header */}
                                <div className="p-3 flex items-center justify-between border-b border-gray-50 dark:border-zinc-900/50">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-zinc-900 px-2 py-1 rounded">{tool.category}</span>
                                    <span className="text-[10px] text-slate-400">{tool.downloads} uses</span>
                                </div>

                                {/* Thumbnail */}
                                <div className="aspect-[4/3] bg-gray-100 dark:bg-zinc-900 relative overflow-hidden group cursor-pointer" onClick={() => setDownloadTool(tool)}>
                                    <img src={tool.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={tool.title} />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">download</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setDownloadTool(tool)}>{tool.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-zinc-500 line-clamp-3 mb-4 flex-1">{tool.desc}</p>

                                    <button
                                        onClick={() => setDownloadTool(tool)}
                                        className="w-full py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Download <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {displayedTools.length === 0 && (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-zinc-700 mb-2">sentiment_dissatisfied</span>
                            <p className="text-slate-500 dark:text-zinc-500">No tools found for this category yet.</p>
                        </div>
                    )}

                </div>

                {/* RIGHT SIDEBAR (Ad/Testimonials) */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit flex flex-col gap-6">

                    {/* AD / PROMO */}
                    <div className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-1">
                        <div className="bg-slate-900 dark:bg-zinc-900 rounded-lg p-5 text-center text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto mb-3 mx-auto shadow-lg shadow-yellow-500/50">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <h3 className="font-bold mb-1">Want to Master These?</h3>
                                <p className="text-xs text-slate-300 mb-4">Join our Advanced Digital Marketing Course.</p>
                                <Link href="/courses/seo-course" className="block w-full py-2 bg-white text-black font-bold text-xs rounded shadow hover:bg-gray-100 transition-colors">
                                    View Syllabus
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* TESTIMONIALS */}
                    <div className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-4">
                        <h3 className="font-bold text-sm mb-4 dark:text-white">Community Love ❤️</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Sarah J.", role: "SEO Freelancer", msg: "Accurate audit sheets!" },
                                { name: "Mike T.", role: "Agency Owner", msg: "Saved me 10+ hours." },
                                { name: "Ankit R.", role: "Student", msg: "Best free resources ever." },
                            ].map((test, i) => (
                                <div key={i} className="flex gap-3 items-start border-b border-gray-50 dark:border-zinc-900 pb-3 last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                        {test.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold dark:text-white">{test.name}</p>
                                        <p className="text-[10px] text-slate-400">{test.role}</p>
                                        <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">"{test.msg}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COPYRIGHT */}
                    <div className="text-center text-xs text-slate-400 dark:text-zinc-600">
                        Pixe Resources © 2025 • <Link href="/terms" className="hover:underline">Terms</Link>
                    </div>
                </aside>

            </main>

            {/* DOWNLOAD MODAL */}
            {downloadTool && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#0e0e10] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300 border border-gray-200 dark:border-zinc-800">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 z-10">
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Modal Header */}
                        <div className="h-32 bg-gray-100 dark:bg-zinc-900 relative">
                            <img src={downloadTool.image} className="w-full h-full object-cover opacity-80" alt="Cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <h3 className="text-white font-bold text-xl">{downloadTool.title}</h3>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {status === 'success' ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                        <span className="material-symbols-outlined text-3xl">check</span>
                                    </div>
                                    <h4 className="font-bold text-lg dark:text-white">Check Your Inbox!</h4>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">We've sent the download link to {formData.email}.</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Enter your details to unlock this premium resource for free.</p>
                                    <form onSubmit={handleDownloadSubmit} className="flex flex-col gap-4">
                                        <input
                                            required
                                            placeholder="Your Name"
                                            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <input
                                            required
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />

                                        <InlineWhatsAppVerify
                                            phone={formData.phone}
                                            onVerifySuccess={() => setIsPhoneVerified(true)}
                                        />

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting' || (!!formData.phone && !isPhoneVerified)}
                                            className={`w-full py-3.5 rounded-xl font-bold shadow-lg text-white transition-all ${status === 'submitting' || (!!formData.phone && !isPhoneVerified) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                                        >
                                            {status === 'submitting' ? 'Sending...' : 'Unlock Download'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST */}
            {showToast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    <span className="font-bold text-sm">{showToast}</span>
                </div>
            )}

            {/* WHATSAPP FLOAT */}
            <a href="https://wa.me/919876543210" target="_blank" className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all group">
                <span className="material-symbols-outlined text-white text-3xl">chat</span>
            </a>

            <Footer />
        </div>
    );
}
