"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Settings {
    twitterUrl?: string;
    linkedinUrl?: string;
    instagramUrl?: string;
    siteTitle?: string;
}

interface FormField {
    id: number;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    options?: string[];
}

export function Footer() {
    const [settings, setSettings] = useState<Settings>({});
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => setSettings(data || {}))
            .catch(() => { });

        fetch("/api/formfields?form=newsletter")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setFormFields(data);
                    // Initialize form data
                    const initialData: Record<string, any> = {};
                    data.forEach(field => {
                        initialData[field.name] = "";
                    });
                    setFormData(initialData);
                }
            })
            .catch(err => console.error("Failed to fetch form fields:", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch("/api/subscribers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus("success");
                setFormData(prev => {
                    const reset: Record<string, any> = {};
                    Object.keys(prev).forEach(key => reset[key] = "");
                    return reset;
                });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const isSingleField = formFields.length === 1;

    return (
        <footer className="w-full bg-background pt-16 pb-8 border-t border-border-color text-sm transition-colors">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 text-foreground group">
                            <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">school</span>
                            <span className="font-display font-bold text-2xl">{settings.siteTitle || "Pixe Education"}</span>
                        </Link>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                            Empowering the next generation of digital leaders through industry-aligned education, practical skills, and global career opportunities.
                        </p>
                        <div className="flex gap-3">
                            {settings.twitterUrl && (
                                <a className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all border border-border-color" href={settings.twitterUrl}>
                                    <span className="material-symbols-outlined text-xl">public</span>
                                </a>
                            )}
                            {settings.linkedinUrl && (
                                <a className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:bg-[#0077B5] hover:text-white transition-all border border-border-color" href={settings.linkedinUrl}>
                                    <span className="material-symbols-outlined text-xl">work</span>
                                </a>
                            )}
                            {settings.instagramUrl && (
                                <a className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:bg-[#E1306C] hover:text-white transition-all border border-border-color" href={settings.instagramUrl}>
                                    <span className="material-symbols-outlined text-xl">photo_camera</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-4 border-b border-border-color md:border-none pb-4 md:pb-0">
                        <button onClick={() => toggleSection('company')} className="flex items-center justify-between w-full md:cursor-default group">
                            <span className="font-bold text-foreground text-base">Company</span>
                            <span className={`material-symbols-outlined text-muted-foreground md:hidden transition-transform duration-200 ${openSection === 'company' ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        <ul className={`${openSection === 'company' ? 'flex' : 'hidden'} md:flex flex-col gap-3 text-muted-foreground`}>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/courses" className="hover:text-primary transition-colors">All Courses</Link></li>
                            <li><Link href="/certifications" className="hover:text-primary transition-colors">Certifications</Link></li>
                            <li><Link href="/success-stories/reviews" className="hover:text-primary transition-colors">Success Stories</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing & EMI</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col gap-4 border-b border-border-color md:border-none pb-4 md:pb-0">
                        <button onClick={() => toggleSection('resources')} className="flex items-center justify-between w-full md:cursor-default group">
                            <span className="font-bold text-foreground text-base">Resources</span>
                            <span className={`material-symbols-outlined text-muted-foreground md:hidden transition-transform duration-200 ${openSection === 'resources' ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        <ul className={`${openSection === 'resources' ? 'flex' : 'hidden'} md:flex flex-col gap-3 text-muted-foreground`}>
                            <li><Link href="/masterclass" className="hover:text-primary transition-colors">Masterclass</Link></li>
                            <li><Link href="/resources" className="hover:text-primary transition-colors">Content Hub</Link></li>
                            <li><Link href="/resources/tools" className="hover:text-primary transition-colors">Free Tools</Link></li>
                            <li><Link href="/career/career-guide" className="hover:text-primary transition-colors">Career Guide</Link></li>
                            <li><Link href="/internships" className="hover:text-primary transition-colors">Internships</Link></li>
                            <li><Link href="/scholarships" className="hover:text-primary transition-colors">Scholarships</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4 border-b border-border-color md:border-none pb-4 md:pb-0">
                        <button onClick={() => toggleSection('legal')} className="flex items-center justify-between w-full md:cursor-default group">
                            <span className="font-bold text-foreground text-base">Legal</span>
                            <span className={`material-symbols-outlined text-muted-foreground md:hidden transition-transform duration-200 ${openSection === 'legal' ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        <ul className={`${openSection === 'legal' ? 'flex' : 'hidden'} md:flex flex-col gap-3 text-muted-foreground`}>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/refund" className="hover:text-primary transition-colors">Refund & Cancellation</Link></li>
                            <li><Link href="/website-map" className="hover:text-primary transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter & Bottom Bar */}
                <div className="border-t border-border-color pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                        <div className="text-center lg:text-left">
                            <h4 className="font-bold text-foreground text-lg mb-2">Subscribe to our newsletter</h4>
                            <p className="text-muted-foreground">Get the latest news, updates and special offers delivered directly to your inbox.</p>
                        </div>
                        <div className="w-full max-w-md">
                            {status === "success" ? (
                                <div className="bg-green-500/10 text-green-500 px-4 py-3 rounded-xl border border-green-500/20 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span className="font-bold">Subscribed successfully!</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className={isSingleField ? "flex gap-2" : "flex flex-col gap-4"}>
                                    {formFields.length > 0 ? (
                                        formFields.map(field => (
                                            <div key={field.id} className={isSingleField ? "flex-1" : "w-full"}>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    required={field.required}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name] || ""}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-surface border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex-1">
                                            {/* Fallback while loading or if no fields */}
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="Enter your email"
                                                value={formData["email"] || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-surface border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                                            />
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className={`px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all disabled:opacity-70 whitespace-nowrap ${!isSingleField && "w-full"}`}
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs pt-8 border-t border-border-color/50">
                        <p className="text-muted-foreground">© {new Date().getFullYear()} {settings.siteTitle || "Pixe Education"}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
