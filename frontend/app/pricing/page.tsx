"use client";

import { Footer } from "@/components/layout/Footer";
import { useEffect, useState, useRef } from "react";
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";
import Link from "next/link";

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showExitIntent, setShowExitIntent] = useState(false);
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    // Exit Intent Logic
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) setShowExitIntent(true);
        };
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, []);

    const [formData, setFormData] = useState({ name: "", phone: "" });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'phone') setIsPhoneVerified(false);
    };

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAdvisorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    source: "pricing_page",
                    course: "Financial Advisor Request"
                })
            });

            if (res.ok) {
                setFormStatus("success");
                setFormData({ name: "", phone: "" });
                setIsPhoneVerified(false);
            } else {
                showToast("Something went wrong. Please try again.");
                setFormStatus("idle");
            }
        } catch {
            showToast("Connection failed.");
            setFormStatus("idle");
        }
    };

    const handleApplyClick = (plan?: string) => {
        document.getElementById('advisor-form')?.scrollIntoView({ behavior: 'smooth' });
        showToast(plan ? `Selected ${plan} Plan. Fill details to proceed.` : "Please fill details ensuring your callback.");
        // Optional: pre-fill message or focus input
        const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
        if (nameInput) nameInput.focus();
    };

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-[#f3f4f6] dark:bg-[#000000] min-h-screen font-sans text-slate-900 dark:text-slate-50">

            {/* Mobile Nav Header */}
            <div className="lg:hidden bg-white dark:bg-[#0e0e10] p-4 sticky top-0 z-50 shadow-sm flex items-center justify-between">
                <span className="font-bold text-xl text-blue-600">Pixe.</span>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">Get Started</button>
            </div>

            <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 px-4 pb-10">

                {/* LEFT SIDEBAR (Navigation) */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
                    <div className="flex flex-col gap-4">
                        {/* Profile Card */}
                        <div className="bg-white dark:bg-[#0e0e10] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800">
                            <div className="h-20 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                            <div className="px-4 pb-4 -mt-10">
                                <div className="w-20 h-20 rounded-full border-4 border-white dark:border-[#0e0e10] overflow-hidden bg-white">
                                    <img src="/logo.svg" alt="Pixe" className="w-full h-full object-cover" />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-xl font-bold flex items-center gap-1 dark:text-white">
                                        Pixe Finance <span className="material-symbols-outlined text-blue-500 text-lg filled">verified</span>
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-zinc-500">@pixe_official • Financial Aid Available</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 dark:border-zinc-800 p-2">
                                <nav className="flex flex-col gap-1">
                                    <button onClick={() => scrollToSection('fees')} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors text-left font-medium text-slate-600 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-green-500">payments</span> Course Fees
                                    </button>
                                    <button onClick={() => scrollToSection('emi')} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors text-left font-medium text-slate-600 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-purple-500">credit_score</span> EMI Plans
                                    </button>
                                    <button onClick={() => scrollToSection('scholarship')} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors text-left font-medium text-slate-600 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-yellow-500">school</span> Scholarships
                                    </button>
                                    <button onClick={() => scrollToSection('comparison')} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors text-left font-medium text-slate-600 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-red-500">compare_arrows</span> Comparison
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Trust Signals */}
                        <div className="bg-white dark:bg-[#0e0e10] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-zinc-800">
                            <h3 className="font-bold text-slate-500 dark:text-zinc-500 text-sm mb-3 uppercase tracking-wider">Trusted Payments</h3>
                            <div className="flex flex-wrap gap-2 text-2xl opacity-70">
                                <span className="p-1 bg-gray-100 dark:bg-zinc-900 rounded">💳</span>
                                <span className="p-1 bg-gray-100 dark:bg-zinc-900 rounded">🏦</span>
                                <span className="p-1 bg-gray-100 dark:bg-zinc-900 rounded">📱</span>
                            </div>
                            <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">lock</span> SSL Encrypted
                            </p>
                        </div>
                    </div>
                </aside>

                {/* CENTER FEED */}
                <div className="lg:col-span-6 flex flex-col gap-6">

                    {/* HERO POST */}
                    <article id="fees" className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                        <div className="p-4 flex items-center gap-3 mb-2">
                            <img src="/logo.svg" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-900" />
                            <div>
                                <h3 className="font-bold text-sm dark:text-white flex items-center gap-1">
                                    Pixe Education <span className="text-blue-500 material-symbols-outlined text-[14px] filled">verified</span>
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-zinc-500">Just now • 🌍</p>
                            </div>
                            <button className="ml-auto text-slate-400 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-full">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>

                        <div className="px-4 pb-2">
                            <p className="text-sm md:text-base leading-relaxed mb-3 dark:text-slate-200">
                                Investing in your career shouldn't be complicated. 🚀 <br />
                                We keep it simple: <span className="font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1 rounded">One Price. All Inclusive.</span> NO hidden onboarding fees.
                            </p>
                        </div>

                        {/* Main Image/Banner */}
                        <div className="bg-gradient-to-br from-[#135bec] to-[#4f46e5] relative text-white p-8 md:p-12 text-center">
                            <div className="absolute top-0 right-0 p-32 bg-white opacity-5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                            <h2 className="relative z-10 text-4xl md:text-5xl font-black tracking-tight mb-2">₹49,999<span className="text-xl md:text-2xl font-medium opacity-80">/total</span></h2>
                            <p className="relative z-10 text-blue-100 font-medium tracking-wide uppercase text-sm mb-6">Limited Time Offer • Batch Starts Feb 1st</p>

                            <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-8 max-w-lg mx-auto border-t border-white/20 pt-6">
                                <div>
                                    <div className="text-2xl font-bold">100+</div>
                                    <div className="text-[10px] md:text-xs uppercase opacity-75">Hours</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">1:1</div>
                                    <div className="text-[10px] md:text-xs uppercase opacity-75">Mentorship</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">100%</div>
                                    <div className="text-[10px] md:text-xs uppercase opacity-75">Job Assist</div>
                                </div>
                            </div>
                        </div>

                        {/* Social Interactions */}
                        <div className="px-4 py-2 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-slate-500 dark:text-zinc-500 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="bg-blue-500 rounded-full p-1 text-white material-symbols-outlined text-[10px]">thumb_up</span>
                                <span>2.4k interested</span>
                            </div>
                            <span>452 comments • 128 shares</span>
                        </div>
                        <div className="px-2 py-1 flex justify-between border-t border-gray-100 dark:border-zinc-800">
                            <button onClick={() => showToast("Liked!")} className="flex-1 py-3 hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-center gap-2 font-semibold text-slate-600 dark:text-slate-400 active:scale-95 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">thumb_up</span> Like
                            </button>
                            <button onClick={() => showToast("Comments are closed.")} className="flex-1 py-3 hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-center gap-2 font-semibold text-slate-600 dark:text-slate-400 active:scale-95 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">chat_bubble</span> Comment
                            </button>
                            <button onClick={() => showToast("Shared to clipboard!")} className="flex-1 py-3 hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-center gap-2 font-semibold text-slate-600 dark:text-slate-400 active:scale-95 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">share</span> Share
                            </button>
                        </div>
                    </article>

                    {/* EMI PLANS POST */}
                    <article id="emi" className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                        <div className="p-4 flex items-center gap-3">
                            <img src="/logo.svg" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-900" />
                            <div>
                                <h3 className="font-bold text-sm dark:text-white">Pixe Finance Team</h3>
                                <p className="text-xs text-slate-500 dark:text-zinc-500">Sponsored • 2h ago</p>
                            </div>
                        </div>
                        <div className="px-4 pb-4">
                            <p className="text-sm dark:text-slate-200 mb-4">Don't let fees stop you. Break it down with our **Interest-Free EMI** options. 👇</p>

                            <div className="overflow-hidden border border-gray-100 dark:border-zinc-800 rounded-xl">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-500 font-semibold uppercase text-xs">
                                        <tr>
                                            <th className="p-3">Duration</th>
                                            <th className="p-3">Monthly</th>
                                            <th className="p-3">Interest</th>
                                            <th className="p-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                                        <tr className="bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100/50 transition-colors">
                                            <td className="p-3 font-medium dark:text-white">3 Months</td>
                                            <td className="p-3 font-bold text-blue-600">₹16,666</td>
                                            <td className="p-3"><span className="text-green-600 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded bg-green-50 dark:bg-green-900/20">0% NO COST</span></td>
                                            <td className="p-3 text-right"><button onClick={() => handleApplyClick('3 Month EMI')} className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline">APPLY</button></td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                                            <td className="p-3 font-medium dark:text-white">6 Months</td>
                                            <td className="p-3 font-bold dark:text-slate-200">₹8,500</td>
                                            <td className="p-3 text-slate-500 dark:text-zinc-500 text-xs">Standard</td>
                                            <td className="p-3 text-right"><button onClick={() => handleApplyClick('6 Month EMI')} className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline">APPLY</button></td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                                            <td className="p-3 font-medium dark:text-white">12 Months</td>
                                            <td className="p-3 font-bold dark:text-slate-200">₹4,250</td>
                                            <td className="p-3 text-slate-500 dark:text-zinc-500 text-xs">Low Interest</td>
                                            <td className="p-3 text-right"><button onClick={() => handleApplyClick('12 Month EMI')} className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline">APPLY</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                                {/* Bank Logos (Placeholders) */}
                                {['HDFC', 'ICICI', 'Bajaj Finserv', 'Zest'].map(bank => (
                                    <span key={bank} className="px-3 py-1 bg-gray-100 dark:bg-zinc-900 rounded text-xs font-semibold text-slate-500 dark:text-zinc-500 whitespace-nowrap">{bank}</span>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* COMPARISON POST */}
                    <article id="comparison" className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                        <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
                            <h3 className="font-bold text-lg dark:text-white">Why students choose Pixe? 📊</h3>
                        </div>
                        <div className="p-6">
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gray-100 dark:bg-zinc-800"></div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-[45%] text-right font-bold text-xl text-blue-600">Pixe.</div>
                                    <div className="w-[45%] font-bold text-xl text-gray-400">Others</div>
                                </div>

                                {[{ l: "₹49,999", r: "₹75,000+" }, { l: "Live Mentorship", r: "Recorded Only" }, { l: "100% Placement", r: "Assistance Only" }].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center mb-6 relative z-10">
                                        <div className="w-[45%] text-right pr-4">
                                            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold px-3 py-2 rounded-lg inline-block shadow-sm">
                                                {row.l}
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-gray-500">VS</div>
                                        <div className="w-[45%] pl-4">
                                            <div className="text-slate-500 dark:text-zinc-500 font-medium px-3 py-2">
                                                {row.r}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* FAQ POST */}
                    <article className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-4">
                        <h3 className="font-bold text-base mb-4 dark:text-white">Common Questions 💬</h3>
                        <div className="space-y-2">
                            {[
                                "Is the fee refundable?",
                                "Do I need a credit card for EMI?",
                                "Are there scholarship tests?"
                            ].map((q, i) => (
                                <details key={i} className="group bg-gray-50 dark:bg-zinc-900/50 rounded-lg open:bg-blue-50 dark:open:bg-blue-900/10 transition-colors">
                                    <summary className="p-3 font-medium text-sm cursor-pointer list-none flex justify-between items-center dark:text-slate-200">
                                        {q}
                                        <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform text-[18px]">expand_more</span>
                                    </summary>
                                    <div className="px-3 pb-3 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                                        Yes! We provide complete transparency. Read our full policy in the brochure.
                                    </div>
                                </details>
                            ))}
                        </div>
                    </article>

                </div>

                {/* RIGHT SIDEBAR (Sticky Actions) */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit flex flex-col gap-6">

                    {/* ADVISOR FORM CARD */}
                    <div id="advisor-form" className="bg-white dark:bg-[#0e0e10] rounded-xl shadow-lg border border-blue-100 dark:border-blue-900 overflow-hidden">
                        <div className="bg-[#135bec] p-4 text-white">
                            <h3 className="font-bold text-lg">Talk to an Advisor</h3>
                            <p className="text-xs text-blue-100 opacity-90">Get a callback in 15 mins.</p>
                        </div>
                        <div className="p-4">
                            {formStatus === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="material-symbols-outlined text-3xl">check</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Request Received!</h4>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">Expect a call shortly.</p>
                                    <button onClick={() => setFormStatus('idle')} className="mt-4 text-blue-600 text-sm font-bold hover:underline">Send another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleAdvisorSubmit} className="flex flex-col gap-3">
                                    <input
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                        className="bg-gray-50 dark:bg-zinc-900 border-none rounded-lg text-sm p-3 focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                                    />
                                    <input
                                        name="phone"
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className="bg-gray-50 dark:bg-zinc-900 border-none rounded-lg text-sm p-3 focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                                    />

                                    <InlineWhatsAppVerify
                                        phone={formData.phone}
                                        onVerifySuccess={() => setIsPhoneVerified(true)}
                                    />

                                    <button
                                        type="submit"
                                        disabled={formStatus === 'submitting' || (!!formData.phone && !isPhoneVerified)}
                                        className={`w-full font-bold py-3 rounded-lg shadow-md transition-all active:scale-95 text-sm ${formStatus === 'submitting' || (!!formData.phone && !isPhoneVerified)
                                            ? 'bg-gray-300 dark:bg-zinc-800 cursor-not-allowed text-gray-500'
                                            : 'bg-[#135bec] hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {formStatus === 'submitting' ? 'Sending...' : 'Request Callback'}
                                    </button>
                                </form>
                            )}
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs text-slate-500 dark:text-zinc-500">12 Advisors Online Now</span>
                            </div>
                        </div>
                    </div>

                    {/* SCHOLARSHIP CTA */}
                    <div id="scholarship" className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="bg-white dark:bg-[#0e0e10] relative rounded-xl p-5 border border-yellow-100 dark:border-yellow-900/30">
                            <div className="flex items-start gap-4">
                                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                                    <span className="material-symbols-outlined">workspace_premium</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Scholarship Test</h4>
                                    <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Get up to <span className="font-bold text-yellow-600">50% waiver</span> on fees.</p>
                                </div>
                            </div>
                            <Link href="/scholarships" className="mt-3 block w-full py-2 bg-yellow-50 text-yellow-700 font-bold text-xs rounded border border-yellow-200 hover:bg-yellow-100 transition-colors text-center">
                                Check Eligibility
                            </Link>
                        </div>
                    </div>

                    <div className="text-center text-xs text-slate-400 dark:text-zinc-600">
                        <Link href="/terms" className="hover:underline">Terms</Link> • <Link href="/privacy" className="hover:underline">Privacy</Link> • Pixe © 2024
                    </div>

                </aside>

            </main>

            {/* EXIT INTENT POPUP (Mock) */}
            {showExitIntent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-[#0e0e10] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                        <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl">sentiment_satisfied</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white">Wait! Don't overpay.</h3>
                            <p className="text-slate-500 dark:text-zinc-400 text-sm mb-6">Unlock a hidden <span className="font-bold text-green-600">10% Discount Code</span> by chatting with our finance counselor now.</p>
                            <button onClick={() => { setShowExitIntent(false); handleApplyClick('Exit Intent'); }} className="w-full bg-[#135bec] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all">
                                Chat & Get Code
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST NOTIFICATION */}
            {toastMessage && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    <span className="font-medium text-sm">{toastMessage}</span>
                </div>
            )}

            <Footer />
        </div>
    );
}
