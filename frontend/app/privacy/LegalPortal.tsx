"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

// --- CONTENT WITH TL;DR ---

const TERMS_CONTENT = (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <section id="terms-intro" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-blue-600 mt-0.5">info</span>
                    <div>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-blue-900 leading-relaxed font-medium">This is a binding contract. By simply using Pixe, you agree to follow our rules. If you break them, we can ban you instantly.</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-blue-600 transition-colors duration-300">1. Introduction & Acceptance</h2>
            <p className="text-lg leading-8 text-slate-600">Welcome to Pixe Education. By accessing our platform, enrolling in courses, or using our services, you agree to be legally bound by these Terms of Service ("Terms"). These Terms constitute an electronic record in terms of the Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000.</p>
        </section>

        <section id="terms-usage" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-blue-600 mt-0.5">lock</span>
                    <div>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-blue-900 leading-relaxed font-medium">You can learn from our content, but you cannot steal it, share your login credentials, or resell it to others.</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-blue-600 transition-colors duration-300">2. Permitted Use & License</h2>
            <p className="text-lg leading-8 text-slate-600">We grant you a limited, non-exclusive, non-transferable, revocable license to access our educational content for personal, non-commercial use. You expressly agree NOT to:</p>
            <ul className="list-disc pl-5 space-y-3 mt-4 text-slate-600 marker:text-blue-500">
                <li className="pl-2">Share your login credentials with any third party.</li>
                <li className="pl-2">Record, download (unless explicitly permitted), or distribute our proprietary video content.</li>
                <li className="pl-2">Use our content to create a competing product or service.</li>
                <li className="pl-2">Decompile, reverse engineer, or disassemble the platform.</li>
            </ul>
        </section>

        <section id="terms-ip-assignment" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-amber-600 mt-0.5">design_services</span>
                    <div>
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-amber-900 leading-relaxed font-medium">Projects you create for our "Agency Simulation" client work belong to Pixe or the Client, not you. This protects real client confidentiality.</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-amber-600 transition-colors duration-300">3. Intellectual Property & Student Work</h2>
            <p className="text-lg leading-8 text-slate-600">Due to the live "Agency-Simulation" nature of our courses, you may work on real-world campaigns or simulated client briefs. You hereby assign to Pixe Education all rights, title, and interest in and to any work product, designs, or campaigns created by you during the course as part of the curriculum.</p>
        </section>

        <section id="terms-liability" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-rose-50/80 to-red-50/50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-rose-600 mt-0.5">shield_lock</span>
                    <div>
                        <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-rose-900 leading-relaxed font-medium">We teach you skills, but we don't guarantee a job. If something goes wrong, our liability is strictly capped at ₹100.</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-rose-600 transition-colors duration-300">4. Limitation of Liability & No Guarantees</h2>
            <div className="bg-slate-900 text-slate-300 p-10 rounded-2xl my-8 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <p className="mb-6 text-base leading-relaxed relative z-10">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, PIXE EDUCATION SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
                </p>
                <p className="text-base font-bold text-white leading-relaxed border-t border-slate-700 pt-6 relative z-10">
                    OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES SHALL IN NO EVENT EXCEED THE GREATER OF ₹100 (ONE HUNDRED RUPEES) OR THE AMOUNT PAID BY YOU IN THE LAST 3 MONTHS.
                </p>
            </div>
            <p className="text-lg leading-8 text-slate-600"><strong>Placement Disclaimer:</strong> While we provide dedicated placement support, we strictly disclaim any guarantee of employment, specific salary packages, or interview calls. Career success depends on individual merit and market conditions.</p>
        </section>

        <section id="terms-termination" className="scroll-mt-40 group">
            <h2 className="group-hover:text-slate-900 transition-colors duration-300">5. Termination</h2>
            <p className="text-lg leading-8 text-slate-600">Pixe reserves the right to suspend or terminate your account immediately, without notice or refund, if you are found in violation of these Terms, particularly regarding ID sharing or abusive behavior towards mentors.</p>
        </section>
    </div>
);

const REFUND_CONTENT = (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <section id="refund-policy" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-rose-50/80 to-red-50/50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-rose-600 mt-0.5">block</span>
                    <div>
                        <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-rose-900 leading-relaxed font-medium">All fees are strictly non-refundable. Once you pay, the money cannot be returned to your bank account under any circumstances.</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-rose-600 transition-colors duration-300">1. Strict No-Refund Policy</h2>
            <p className="text-lg leading-8 text-slate-600">Pixe Education operates with a strict <strong>No-Refund Policy</strong>. By enrolling in any of our courses (Live, Recorded, or Hybrid), you acknowledge and agree that:</p>
            <ul className="list-disc pl-5 space-y-3 mt-6 text-slate-600 marker:text-rose-500">
                <li className="pl-2">Fees once paid are <strong>non-refundable</strong> and <strong>non-transferable</strong> to other individuals.</li>
                <li className="pl-2">This applies to all components: Registration Fees, Tuition Fees, and taxes (GST).</li>
                <li className="pl-2">No refunds will be processed for lack of attendance, technical issues on the user's end, or change of mind.</li>
            </ul>
        </section>

        <section id="refund-adjustment" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-emerald-600 mt-0.5">swap_horiz</span>
                    <div>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-emerald-900 leading-relaxed font-medium">Don't like the course? No problem. You can swap your fees to ANY other Pixe course/lecture within 12 months.</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-emerald-600 transition-colors duration-300">2. Course Adjustment Facility</h2>
            <p className="text-lg leading-8 text-slate-600">While we do not offer monetary refunds, we understand that learning preferences may change. We offer a comprehensive <strong>Fee Adjustment Facility</strong>:</p>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 mt-6">
                <h4 className="font-bold text-emerald-900 mb-2">How it works:</h4>
                <p className="text-slate-700 leading-7">If you are unsatisfied with your current batch or course, 100% of the fees paid by you can be adjusted against <strong>any other active course</strong> or future batch within Pixe Education.</p>
            </div>
        </section>

        <section id="refund-terms" className="scroll-mt-40 group">
            <h2 className="group-hover:text-slate-900 transition-colors duration-300">3. Adjustment Terms & Validity</h2>
            <p className="text-lg leading-8 text-slate-600 mb-6">To avail the adjustment facility, the following terms apply:</p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        </span>
                        <h4 className="font-bold text-slate-900">Validity Period</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">The fee credit is valid for <strong>12 Months</strong> from the date of original payment. You must re-enroll within this window.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined text-[18px]">upgrade</span>
                        </span>
                        <h4 className="font-bold text-slate-900">Upgrades</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">If the new course fee is higher, you only pay the difference. If lower, the balance remains as credit for future workshops.</p>
                </div>
            </div>

            <p className="text-lg leading-8 text-slate-600 mt-8"><strong>Process:</strong> Send an email to <a href="mailto:support@pixe.education" className="text-blue-600 font-medium hover:underline">support@pixe.education</a> with the subject "Course Adjustment Request". Our team will approve the credit note within 48 hours.</p>
        </section>
    </div>
);

const PRIVACY_CONTENT = (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <section id="privacy-scope" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-blue-600 mt-0.5">security</span>
                    <div>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-blue-900 leading-relaxed font-medium">We collect your info solely to teach you and get you hired. We strictly follow the new Digital Data Protection laws (DPDP Act).</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-blue-600 transition-colors duration-300">1. Scope & Compliance (DPDP Act, 2023)</h2>
            <p className="text-lg leading-8 text-slate-600">This Privacy Policy outlines how Pixe Education ("Data Fiduciary") collects, processes, and protects the personal data of its Users ("Data Principals") in compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <strong>Information Technology Act, 2000</strong>.</p>
        </section>

        <section id="privacy-collection" className="scroll-mt-40 group">
            <h2 className="group-hover:text-blue-600 transition-colors duration-300">2. Data Collection</h2>
            <p className="text-lg leading-8 text-slate-600">We collect only necessary data for service delivery:</p>
            <ul className="list-disc pl-5 space-y-3 mt-6 text-slate-600 marker:text-blue-500">
                <li className="pl-2"><strong>Identity Data:</strong> Name, Profile Picture (for certificate verification).</li>
                <li className="pl-2"><strong>Contact Data:</strong> Email, Phone Number (for WhatsApp class alerts).</li>
                <li className="pl-2"><strong>Professional Data:</strong> CV, LinkedIn Profile, Education History (for placement assistance).</li>
            </ul>
            <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-lg flex gap-3 text-slate-500 text-sm italic items-start">
                <span className="material-symbols-outlined text-slate-400 text-[20px] mt-0.5">child_care</span>
                <p>Note: For users under 18, we mandate verifiable parental consent mechanisms before any data processing occurs.</p>
            </div>
        </section>

        <section id="privacy-marketing" className="scroll-mt-40 group">
            <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-xl shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-amber-600 mt-0.5">campaign</span>
                    <div>
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">TL;DR Summary</p>
                        <p className="text-[15px] text-amber-900 leading-relaxed font-medium">If you succeed, we want to share it. We reserve the right to use your success story in our marketing materials.</p>
                    </div>
                </div>
            </div>
            <h2 className="group-hover:text-amber-600 transition-colors duration-300">3. Marketing Rights & Publicity</h2>
            <p className="text-lg leading-8 text-slate-600">By enrolling, you grant Pixe Education a perpetual, worldwide, royalty-free license to use your name, photograph, testimonial, and "Success Story" (e.g., job placement news) for marketing and promotional purposes across our website and social media channels. You waive approval rights for such materials.</p>
        </section>

        <section id="privacy-sharing" className="scroll-mt-40 group">
            <h2 className="group-hover:text-blue-600 transition-colors duration-300">4. Data Sharing</h2>
            <p className="text-lg leading-8 text-slate-600">We do NOT sell your data. However, we share data with strictly defined third parties to enable our services:</p>
            <ul className="list-disc pl-5 space-y-3 mt-6 text-slate-600 marker:text-blue-500">
                <li className="pl-2"><strong>Hiring Partners:</strong> Your CV is shared with our network of 350+ companies for recruitment.</li>
                <li className="pl-2"><strong>Technology Providers:</strong> AWS (Hosting), Razorpay (Payments), Zoom (Live Classes).</li>
            </ul>
        </section>

        <section id="privacy-grievance" className="scroll-mt-40 border-t border-slate-100 pt-12 group">
            <h2 className="group-hover:text-slate-900 transition-colors duration-300">5. Grievance Redressal</h2>
            <p className="text-lg leading-8 text-slate-600 mb-8">In accordance with the IT Act 2000 and DPDP Act 2023, you may contact our Grievance Officer for any data discrepancies.</p>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl shadow-lg shadow-slate-200/50 transition-transform hover:scale-[1.01] hover:shadow-xl hover:shadow-slate-200/50">
                <div className="flex items-center gap-5 mb-6 border-b border-slate-100 pb-6">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
                        <span className="material-symbols-outlined text-[28px]">gavel</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg">Grievance Officer</h4>
                        <p className="text-sm text-slate-500">Legal Compliance Team</p>
                    </div>
                </div>
                <div className="space-y-4 text-[15px]">
                    <div className="flex items-start gap-4">
                        <span className="font-semibold text-slate-400 w-20 shrink-0">Name</span>
                        <span className="text-slate-700 font-medium">Mr. Legal Head</span>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="font-semibold text-slate-400 w-20 shrink-0">Email</span>
                        <a href="mailto:grievance@pixe.education" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">grievance@pixe.education</a>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="font-semibold text-slate-400 w-20 shrink-0">Address</span>
                        <span className="text-slate-700 font-medium">Pixe HQ, Mumbai, Maharashtra</span>
                    </div>
                    <div className="flex items-start gap-4 pt-2">
                        <span className="font-semibold text-slate-400 w-20 shrink-0">Timeline</span>
                        <div className="flex gap-3">
                            <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">24h Ack</span>
                            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded">15 Days Resolution</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="privacy-dispute" className="scroll-mt-40">
            <div className="bg-slate-900 text-white p-6 rounded-xl my-8 shadow-xl shadow-slate-900/10 flex items-center gap-4">
                <span className="material-symbols-outlined text-yellow-400 text-3xl">balance</span>
                <div>
                    <p className="text-xs uppercase text-slate-400 font-bold tracking-widest mb-1">Legal Jurisdiction</p>
                    <p className="text-sm font-medium text-slate-200">
                        All disputes are subject to the exclusive jurisdiction of courts in <span className="text-white font-bold border-b border-white/30">Mumbai, Maharashtra</span>.
                    </p>
                </div>
            </div>
        </section>
    </div>
);


const DOCS = [
    {
        id: "privacy", name: "Privacy Policy", content: PRIVACY_CONTENT, lastUpdated: "Jan 18, 2026", toc: [
            { id: "privacy-scope", label: "1. Scope & Compliance" },
            { id: "privacy-collection", label: "2. Data Collection" },
            { id: "privacy-marketing", label: "3. Marketing Rights" },
            { id: "privacy-sharing", label: "4. Data Sharing" },
            { id: "privacy-grievance", label: "5. Grievance Officer" },
        ]
    },
    {
        id: "terms", name: "Terms of Service", content: TERMS_CONTENT, lastUpdated: "Jan 18, 2026", toc: [
            { id: "terms-intro", label: "1. Introduction" },
            { id: "terms-usage", label: "2. Permitted Use" },
            { id: "terms-ip-assignment", label: "3. IP & Student Work" },
            { id: "terms-liability", label: "4. Liability Cap" },
            { id: "terms-termination", label: "5. Termination" },
        ]
    },
    {
        id: "refund", name: "Refund Policy", content: REFUND_CONTENT, lastUpdated: "Jan 18, 2026", toc: [
            { id: "refund-policy", label: "1. Strict No-Refund" },
            { id: "refund-adjustment", label: "2. Adjustment Facility" },
            { id: "refund-terms", label: "3. Terms & Validity" },
        ]
    },
];

export default function LegalPortal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("privacy");

    // Handle deep linking from URL
    useEffect(() => {
        const doc = searchParams.get("doc");
        if (doc && DOCS.find(d => d.id === doc)) {
            setActiveTab(doc);
        }
    }, [searchParams]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`/privacy?doc=${tabId}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const activeDoc = DOCS.find(d => d.id === activeTab) || DOCS[0];

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-900 selection:text-white pb-32">

            {/* Header - Transparent & Premium */}
            <header className="sticky top-0 z-40 w-full border-b border-transparent bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
                <div className="flex h-20 items-center justify-between px-6 lg:px-12 max-w-[1600px] mx-auto">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="font-display font-bold text-2xl tracking-tighter transition-opacity hover:opacity-80">
                            Pixe<span className="text-slate-400">.Legal</span>
                        </Link>
                        <span className="hidden sm:inline-block h-6 w-px bg-slate-200/60"></span>
                        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-100/50 rounded-full border border-slate-200/50">
                            <div className="relative">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-0 left-0 animate-ping opacity-75"></span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 relative block"></span>
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Legal Center</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
                        <Link href="/" className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-colors group">
                            Exit to Home
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                        </Link>
                    </div>
                </div>
                {/* Progress Line */}
                <div className="h-[1px] w-full bg-slate-200/50"></div>
            </header>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Document Switcher */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 px-2">Legal Documents</h3>
                                <nav className="space-y-2">
                                    {DOCS.map((doc) => (
                                        <button
                                            key={doc.id}
                                            onClick={() => handleTabChange(doc.id)}
                                            className={`w-full text-left px-4 py-3.5 text-[15px] font-medium rounded-xl transition-all duration-300 flex items-center justify-between group border ${activeTab === doc.id
                                                ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 translate-x-2"
                                                : "bg-white border-transparent text-slate-500 hover:text-slate-900 hover:bg-white hover:border-slate-200 hover:shadow-sm"
                                                }`}
                                        >
                                            {doc.name}
                                            {activeTab === doc.id && (
                                                <span className="material-symbols-outlined text-[18px] animate-in slide-in-from-left-2 fade-in">chevron_right</span>
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50">
                                <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                    <span className="material-symbols-outlined">mail</span>
                                </span>
                                <p className="text-sm font-bold text-slate-900 mb-1">Have legal questions?</p>
                                <p className="text-sm text-slate-500 mb-4 leading-relaxed">Our legal team is available for urgent inquiries.</p>
                                <a href="mailto:legal@pixe.education" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2 group">
                                    Contact Support
                                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* CENTER COLUMN: Main Content */}
                    <main className="lg:col-span-6 min-h-[60vh] max-w-3xl">

                        {/* Mobile Tab Switcher */}
                        <div className="lg:hidden mb-12 overflow-x-auto pb-4 -mx-4 px-4 flex gap-3 scrollbar-hide snap-x">
                            {DOCS.map((doc) => (
                                <button
                                    key={doc.id}
                                    onClick={() => handleTabChange(doc.id)}
                                    className={`snap-center whitespace-nowrap px-6 py-2.5 text-sm font-bold rounded-full transition-all border shadow-sm ${activeTab === doc.id
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-600 border-slate-200"
                                        }`}
                                >
                                    {doc.name}
                                </button>
                            ))}
                        </div>

                        <div className="mb-16 border-b border-slate-100 pb-10">
                            <h1 className="text-5xl font-display font-medium text-slate-900 mb-6 tracking-tight">{activeDoc.name}</h1>
                            <p className="text-2xl text-slate-500 font-serif font-light leading-relaxed">
                                Please read this document carefully. It contains important information about your rights and obligations.
                            </p>
                        </div>

                        {/* Content Injection - Typography handled by inner classes */}
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-p:text-slate-600 prose-p:leading-8 prose-li:text-slate-600 prose-li:leading-8">
                            {activeDoc.content}
                        </div>

                    </main>

                    {/* RIGHT COLUMN: Table of Contents & Actions */}
                    <div className="lg:col-span-3 hidden xl:block">
                        <div className="sticky top-32 pl-12 border-l border-slate-100/80">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">On this page</h3>
                            <nav className="space-y-4">
                                {activeDoc.toc.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="block text-[14px] leading-relaxed text-slate-500 hover:text-blue-600 transition-all hover:translate-x-1 duration-200 truncate"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-16 pt-8 border-t border-slate-100">
                                <button
                                    onClick={() => window.print()}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all font-medium text-sm group"
                                >
                                    <span>Download PDF</span>
                                    <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-slate-900 transition-colors">download</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}
