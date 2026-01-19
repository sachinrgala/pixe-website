"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

interface Settings {
    contactEmail?: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    address?: string;
}

export default function ContactPage() {
    const [settings, setSettings] = useState<Settings>({
        contactEmail: "admissions@pixe.com",
        phoneNumber: "+91 98765 43210",
        whatsappNumber: "919876543210",
        address: "HSR Layout, Sector 4, Bengaluru, Karnataka 560102"
    });

    useEffect(() => {
        // Fetch Settings (simulated fallback above if fetch fails/is empty)
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => setSettings(prev => ({ ...prev, ...data })))
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground font-body selection:bg-orange-500/20 selection:text-orange-600">
            <ExitIntentPopup
                course="general"
                title="Have Questions?"
                description="Get a free call back from our senior counselor within 5 minutes."
                buttonText="Request Call Back"
                targetId="contact-form-section"
            />

            <main className="pb-20">
                {/* Header */}
                <section className="relative py-16 lg:py-24 bg-surface overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-6 border border-orange-200 dark:border-orange-800">
                            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                            We are Online Now
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display tracking-tight">
                            Let's Build Your <span className="text-orange-600">Career Together</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Have questions about courses, placement, or fees? Our dedicated counselors are here to guide you to the right path.
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Contact Info Cards (Left Column) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Phone Card */}
                            <div className="bg-surface p-6 rounded-2xl shadow-lg border border-border-color hover:border-orange-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/10 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-2xl">call</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">Talk to Us</h3>
                                        <p className="text-muted-foreground text-xs mb-3 font-medium uppercase tracking-wide">Mon-Sat, 9am - 7pm</p>
                                        <a href={`tel:${settings.phoneNumber}`} className="text-xl font-bold text-foreground hover:text-orange-600 transition-colors block mb-2">
                                            {settings.phoneNumber}
                                        </a>
                                        <div className="flex items-center gap-2 text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded w-fit">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                                            Instant Connection
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Card */}
                            <div className="bg-surface p-6 rounded-2xl shadow-lg border border-border-color hover:border-green-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/10 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-2xl">chat</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">WhatsApp Support</h3>
                                        <p className="text-muted-foreground text-sm mb-3">Get brochures & syllabus instantly.</p>
                                        <a
                                            href={`https://wa.me/${settings.whatsappNumber}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-green-600/20"
                                        >
                                            Chat Now
                                            <span className="material-symbols-outlined text-sm">arrow_outward</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="bg-surface p-6 rounded-2xl shadow-lg border border-border-color hover:border-blue-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-2xl">mail</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">Email Support</h3>
                                        <p className="text-muted-foreground text-sm mb-3">For corporate & partnership queries.</p>
                                        <a href={`mailto:${settings.contactEmail}`} className="text-foreground hover:text-blue-600 font-medium transition-colors break-all">
                                            {settings.contactEmail}
                                        </a>
                                        <p className="text-xs text-muted-foreground mt-1">Response time: ~2 hours</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Contact Form (Right Column) */}
                        <div className="lg:col-span-8 flex justify-center items-start" id="contact-form-section">
                            <div className="w-full max-w-xl">
                                <UniversalLeadForm
                                    formId="home-hero"
                                    source="contact_page"
                                    title="Quick Apply"
                                    subtitle="Fast Track Admission"
                                    submitButtonText="Check Eligibility & Scholarship"
                                    successMessage="Application Received! Our team will contact you."
                                    className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gleam border border-slate-100 dark:border-[#334155] p-8 transform transition-all hover:scale-[1.01]"
                                />
                                <p className="text-xs text-center text-muted-foreground mt-4 opacity-80">
                                    🔒 100% Secure. We respect your privacy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map & Location Section */}


                    {/* Trust Signals */}
                    <div className="mt-20 border-t border-border-color pt-12 text-center overflow-hidden">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">Trusted by Hiring Partners</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Using basic text placeholders or simple SVGs if actual images fetch fails, but aiming for visuals */}
                            {["Google", "Amazon", "Flipkart", "Swiggy", "Zomato", "Microsoft"].map((brand, i) => (
                                <span key={i} className="text-xl md:text-2xl font-bold text-slate-400 hover:text-orange-600 transition-colors cursor-default">{brand}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </main>



            <Footer />
        </div>
    );
}
