"use client";

import React, { useState, useEffect } from "react";
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";

interface Course {
    id: number;
    title: string;
    slug: string;
    status?: string;
}

interface FormField {
    id: number;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    order: number;
    enabled: boolean;
    options: string[] | null;
}

interface UniversalLeadFormProps {
    source?: string;
    course?: string;
    formId?: string;
    title?: string;
    subtitle?: string;
    className?: string;
    onSuccess?: () => void;
    apiEndpoint?: string;
    layout?: "stack" | "grid";
    successMessage?: string;
    submitButtonText?: string;
    defaultFields?: FormField[];
}

export const UniversalLeadForm: React.FC<UniversalLeadFormProps> = ({
    source = "website_lead_form",
    course,
    formId,
    title,
    subtitle,
    className = "",
    onSuccess,
    apiEndpoint = "/api/leads",
    layout = "stack",
    successMessage,
    submitButtonText = "Get Started Now",
    defaultFields // New Prop
}) => {
    // Default fallback fields if API fails
    const fallbackFields: FormField[] = [
        { id: 1, name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true, order: 1, enabled: true, options: null },
        { id: 2, name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true, order: 2, enabled: true, options: null },
        { id: 3, name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: true, order: 3, enabled: true, options: null },
        { id: 4, name: "city", label: "City", type: "text", placeholder: "Mumbai", required: true, order: 4, enabled: true, options: null },
    ];

    const [formFields, setFormFields] = useState<FormField[]>(defaultFields || []);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [courses, setCourses] = useState<Course[]>([]);

    // SECURITY: Honeypot field for bot detection (Phase 5)
    const [honeypot, setHoneypot] = useState("");

    // WhatsApp OTP Inline Verification
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [verificationToken, setVerificationToken] = useState("");
    const [whatsAppEnabled, setWhatsAppEnabled] = useState(true);

    useEffect(() => {
        // Fetch Settings for WhatsApp
        fetch("/api/settings").then(r => r.json()).then(data => {
            setWhatsAppEnabled(data?.enableWhatsApp ?? false);
        }).catch(() => { });

        // Fetch Courses for dropdown
        fetch("/api/courses").then(r => r.json()).then(data => {
            if (Array.isArray(data)) setCourses(data.filter(c => c.status === "published"));
        }).catch(() => { });

        // Fetch Form Fields
        const fieldsUrl = formId ? `/api/formfields?form=${formId}` : "/api/formfields";
        fetch(fieldsUrl).then(r => r.json()).then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const enabled = data.filter(f => f.enabled).sort((a, b) => a.order - b.order);
                setFormFields(enabled);
                // Initialize form data
                const initial: Record<string, string> = {
                    source: source,
                    course: course || ""
                };
                enabled.forEach(f => initial[f.name] = "");
                setFormData(prev => ({ ...prev, ...initial }));
            } else {
                // Use fallback if API returns empty
                setFormFields(fallbackFields);
                const initial: Record<string, string> = { source: source, course: course || "" };
                fallbackFields.forEach(f => initial[f.name] = "");
                setFormData(prev => ({ ...prev, ...initial }));
            }
        }).catch(() => {
            // Use fallback on error
            setFormFields(fallbackFields);
            const initial: Record<string, string> = { source: source, course: course || "" };
            fallbackFields.forEach(f => initial[f.name] = "");
            setFormData(prev => ({ ...prev, ...initial }));
        });
    }, [source, course, formId]); // removed fallbackFields from dependency to avoid infinite loop if defined inline

    // Phone verification is only required if WhatsApp is enabled
    const requiresVerification = whatsAppEnabled && !!formData.phone && !isPhoneVerified;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // SECURITY: Honeypot check - bots fill hidden fields
        if (honeypot) {
            console.log("[SECURITY] Bot detected via honeypot");
            setFormStatus("success"); // Fake success to not alert bot
            return;
        }

        if (requiresVerification) {
            return;
        }
        submitFinalData(verificationToken);
    };

    const submitFinalData = async (token: string) => {
        setFormStatus("submitting");
        try {
            const res = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, verification_token: token }),
            });

            if (res.ok) {
                setFormStatus("success");
                if (onSuccess) onSuccess();
            } else {
                setFormStatus("error");
            }
        } catch {
            setFormStatus("error");
        }
    };

    if (formStatus === "success") {
        return (
            <div className={`bg-white dark:bg-[#1e2832] p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center ${className} h-full`}>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-[#111318] dark:text-white mb-2">{successMessage || "Thank You!"}</h3>
                <p className="text-[#616f89] dark:text-gray-400 mb-8">
                    Your request has been received. Our team will contact you shortly.
                </p>
                <button
                    onClick={() => {
                        setFormStatus("idle");
                        // Reset form
                        const reset: Record<string, string> = { source: source, course: course || "" };
                        formFields.forEach(f => reset[f.name] = "");
                        setFormData(reset);
                        setIsPhoneVerified(false);
                        setVerificationToken("");
                    }}
                    className="text-[#135bec] font-bold hover:underline"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <div className={`bg-white dark:bg-[#1e2832] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 ${className}`}>
            {(title || subtitle) && (
                <div className="mb-6">
                    {title && <h3 className="text-xl md:text-2xl font-bold text-[#111318] dark:text-white mb-2">{title}</h3>}
                    {subtitle && <p className="text-[#616f89] dark:text-gray-400 text-sm md:text-base">{subtitle}</p>}
                </div>
            )}

            {formFields.length === 0 ? (
                <div className="flex justify-center py-10">
                    <div className="w-8 h-8 border-4 border-[#135bec] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={`flex flex-col gap-5 ${layout === "grid" ? "md:grid md:grid-cols-2" : ""}`}>
                    {/* SECURITY: Honeypot field - invisible to users, bots fill it */}
                    <input
                        type="text"
                        name="website_url"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        autoComplete="off"
                        tabIndex={-1}
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            left: "-9999px",
                            opacity: 0,
                            height: 0,
                            width: 0,
                            pointerEvents: "none"
                        }}
                    />
                    {formFields.map((field) => (
                        <div key={field.id} className={`${layout === "grid" && (field.type === 'textarea' || field.type === 'text' && field.name === 'message' || field.label.length > 30) ? "md:col-span-2" : "col-span-1"}`}>
                            <label className="block text-sm font-bold text-[#111318] dark:text-white mb-2 ml-1">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>

                            {field.type === 'select' ? (
                                <div className="relative">
                                    <select
                                        required={field.required}
                                        value={formData[field.name] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        className="w-full min-h-[52px] px-4 bg-slate-50 dark:bg-[#111a21] border border-slate-200 dark:border-slate-700 rounded-xl text-[#111318] dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#135bec] transition-all text-base"
                                    >
                                        <option value="">{field.placeholder || "Select an option"}</option>
                                        {field.options?.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                        {field.name === "course" && courses.length > 0 && !field.options && courses.map(c => (
                                            <option key={c.id} value={c.title}>{c.title}</option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">expand_more</span>
                                </div>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    required={field.required}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    rows={layout === 'grid' ? 4 : 3}
                                    placeholder={field.placeholder}
                                    className="w-full p-4 bg-slate-50 dark:bg-[#111a21] border border-slate-200 dark:border-slate-700 rounded-xl text-[#111318] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#135bec] transition-all resize-none"
                                />
                            ) : (
                                <div className="relative">
                                    <input
                                        type={field.type}
                                        required={field.required}
                                        value={formData[field.name] || ""}
                                        onChange={(e) => {
                                            setFormData({ ...formData, [field.name]: e.target.value });
                                            if (field.name === 'phone') setIsPhoneVerified(false);
                                        }}
                                        placeholder={field.placeholder}
                                        className="w-full min-h-[52px] px-4 bg-slate-50 dark:bg-[#111a21] border border-slate-200 dark:border-slate-700 rounded-xl text-[#111318] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#135bec] transition-all text-base"
                                    />
                                    {/* Icon or extra UI could go here */}
                                </div>
                            )}

                            {/* Verification UI specifically for phone field */}
                            {(field.name === 'phone' || field.type === 'tel') && formData[field.name] && !isPhoneVerified && (
                                <div className="mt-2">
                                    <InlineWhatsAppVerify
                                        phone={formData[field.name]}
                                        onVerifySuccess={() => setIsPhoneVerified(true)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="pt-2 flex flex-col gap-3">
                        <button
                            className={`w-full py-3.5 px-6 font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${!requiresVerification
                                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/25'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }`}
                            type="submit"
                            disabled={formStatus === "submitting" || requiresVerification}
                        >
                            {formStatus === "submitting" ? "Submitting..." : requiresVerification ? "Verify Phone First" : isPhoneVerified ? "Submit Application ✓" : "Enroll Now"}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
