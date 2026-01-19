"use client";

import { useState, useEffect } from "react";
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";

interface LeadFormProps {
    course?: string;
    source?: string;
    buttonText?: string;
    successMessage?: string;
    className?: string;
    compact?: boolean;
}

interface Course {
    id: number;
    title: string;
    slug: string;
    status: string;
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

export default function LeadForm({
    course = "",
    source = "website",
    buttonText = "Get Free Counseling",
    successMessage = "Thank you! Our counselor will call you within 24 hours.",
    className = "",
    compact = false,
}: LeadFormProps) {
    // Dynamic form data state
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [formFields, setFormFields] = useState<FormField[]>([]);

    // System state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);

    // Get UTM parameters from URL
    const [utmParams, setUtmParams] = useState({
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
    });

    // WhatsApp OTP Inline Verification
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [verificationToken, setVerificationToken] = useState("");
    const [whatsAppEnabled, setWhatsAppEnabled] = useState(true); // Default to true, fetch from settings

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setUtmParams({
                utm_source: params.get("utm_source") || "",
                utm_medium: params.get("utm_medium") || "",
                utm_campaign: params.get("utm_campaign") || "",
                utm_content: params.get("utm_content") || "",
            });
        }

        // Fetch settings to check if WhatsApp verification is enabled
        fetch("/api/settings")
            .then(r => r.json())
            .then(data => setWhatsAppEnabled(data.enableWhatsApp ?? false))
            .catch(() => setWhatsAppEnabled(false));

        // Fetch courses from CMS
        fetch("/api/courses")
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCourses(data.filter(c => c.status === "published"));
                }
            })
            .catch(() => { });

        // Fetch dynamic form fields
        fetch("/api/formfields")
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Filter enabled and sort by order
                    const enabledFields = data
                        .filter((f: FormField) => f.enabled)
                        .sort((a: FormField, b: FormField) => a.order - b.order);
                    setFormFields(enabledFields);

                    // Initialize form data with empty strings for each field
                    const initialData: Record<string, string> = {};
                    enabledFields.forEach((f: FormField) => {
                        initialData[f.name] = "";
                    });
                    // Initialize course if provided
                    if (course) initialData.course = course;

                    setFormData(prev => ({ ...prev, ...initialData }));
                }
            })
            .catch(err => console.error("Failed to fetch form fields", err));
    }, [course]);

    // Phone verification is only required if WhatsApp is enabled
    const requiresVerification = whatsAppEnabled && !!formData.phone && !isPhoneVerified;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Basic validation for phone if it exists in the form
        if (formData.phone) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
                setError("Please enter a valid 10-digit phone number");
                return;
            }
            // Only require verification if WhatsApp is enabled
            if (whatsAppEnabled && !isPhoneVerified) {
                setError("Please verify your phone number first");
                return;
            }
        }
        submitFinalData(verificationToken);
    };

    const submitFinalData = async (token: string) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    source,
                    ...utmParams,
                    page_url: typeof window !== "undefined" ? window.location.href : "",
                    verification_token: token
                }),
            });

            if (res.ok) {
                setIsSubmitted(true);
                // Track conversion (for GA, FB Pixel, etc.)
                if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "lead", {
                        event_category: "form",
                        event_label: course || "general",
                    });
                }
            } else {
                const data = await res.json();
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={`bg-green-50 border border-green-200 rounded-2xl p-8 text-center ${className}`}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Application Received!</h3>
                <p className="text-green-700">{successMessage}</p>
                <a
                    href={`https://wa.me/91XXXXXXXXXX?text=Hi, I just submitted an enquiry for ${course || 'your courses'}`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                </a>
            </div>
        );
    }

    // Loading state for form fields
    if (formFields.length === 0) {
        return (
            <div className={`p-8 text-center text-gray-400 ${className}`}>
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-10 bg-gray-100 rounded"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <div className={compact ? "grid grid-cols-2 gap-3" : "space-y-4"}>
                    {formFields.map(field => (
                        <div key={field.id} className={compact && field.type !== 'email' ? "" : "col-span-2"}>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    required={field.required}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">{field.placeholder || `Select ${field.label}`}</option>
                                    {field.options?.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    placeholder={`${field.placeholder || field.label} ${field.required ? "*" : ""}`}
                                    required={field.required}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    rows={4}
                                />
                            ) : (
                                <>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        placeholder={`${field.placeholder || field.label} ${field.required ? "*" : ""}`}
                                        required={field.required}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    {(field.type === "tel" || field.name === "phone") && formData[field.name] && !isPhoneVerified && (
                                        <InlineWhatsAppVerify
                                            phone={formData[field.name]}
                                            onVerified={(token) => {
                                                setIsPhoneVerified(true);
                                                setVerificationToken(token);
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Special Course Selection (if not pre-filled) */}
                {!course && !compact && (
                    <div>
                        <select
                            value={formData.course || ""}
                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option value="">Select Course (Optional)</option>
                            {courses.length > 0 ? (
                                courses.map(c => (
                                    <option key={c.id} value={c.slug}>{c.title}</option>
                                ))
                            ) : (
                                <>
                                    <option value="data-science">Data Science</option>
                                    <option value="ux-design">UX/UI Design</option>
                                    <option value="full-stack">Full Stack Development</option>
                                </>
                            )}
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || requiresVerification}
                    className={`w-full py-4 font-bold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg ${!requiresVerification
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/30'
                        : 'bg-gray-300 text-gray-500 shadow-gray-300/30 cursor-not-allowed'
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting...
                        </span>
                    ) : requiresVerification ? (
                        "Verify Phone First"
                    ) : isPhoneVerified ? (
                        `${buttonText} ✓`
                    ) : (
                        buttonText
                    )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our Terms & Privacy Policy
                </p>
            </form>
        </>
    );
}
