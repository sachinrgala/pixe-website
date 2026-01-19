'use client';

import React, { useEffect } from 'react';
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";

interface LocationLeadFormProps {
    city?: string;
    title?: string;
    subtitle?: string;
    showCountrySelect?: boolean;
    showTimezoneSelect?: boolean;
}

export const LocationLeadForm: React.FC<LocationLeadFormProps> = ({
    city,
    title = "Quick Apply",
    subtitle = "Get a callback from our academic counselor.",
}) => {
    const [formData, setFormData] = React.useState<Record<string, string>>({});
    const [formFields, setFormFields] = React.useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isPhoneVerified, setIsPhoneVerified] = React.useState(false);

    const [verificationToken, setVerificationToken] = React.useState("");

    React.useEffect(() => {
        // Fetch dynamic form fields
        fetch("/api/formfields?form=location-lead-form")
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const enabledFields = data
                        .filter((f: any) => f.enabled)
                        .sort((a: any, b: any) => a.order - b.order);
                    setFormFields(enabledFields);

                    const initialData: Record<string, string> = {
                        course: `${city || 'General'} Location Inquiry`,
                        source: 'location_page'
                    };
                    enabledFields.forEach((f: any) => {
                        initialData[f.name] = "";
                    });
                    setFormData(prev => ({ ...prev, ...initialData }));
                }
            })
            .catch(err => console.error("Failed to fetch location form fields", err));
    }, [city]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (formData.phone && !isPhoneVerified) {
            setErrorMessage("Please verify your phone number first.");
            return;
        }

        submitFinalData();
    };

    const submitFinalData = async () => {
        setIsSubmitting(true);
        setStatus('idle');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    verification_token: verificationToken
                })
            });

            if (res.ok) {
                setStatus('success');
                const resetData: Record<string, string> = {
                    course: `${city || 'General'} Location Inquiry`,
                    source: 'location_page'
                };
                formFields.forEach(f => resetData[f.name] = "");
                setFormData(resetData);
                setIsPhoneVerified(false);
            } else {
                const data = await res.json();
                setStatus('error');
                setErrorMessage(data.error || 'Submission failed. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Network error. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (formFields.length === 0) {
        return (
            <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-8 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 w-1/2 mb-4 rounded"></div>
                <div className="space-y-4">
                    <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-700 p-6 lg:p-8">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-[#111318] dark:text-white">{title}</h3>
                <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1">{subtitle}</p>
            </div>

            {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fadeIn">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="material-symbols-outlined text-green-600">check</span>
                    </div>
                    <h4 className="text-green-800 font-bold mb-1">Received!</h4>
                    <p className="text-green-700 text-sm">Our counselor will contact you shortly.</p>
                </div>
            ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {status === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    {formFields.map(field => (
                        <div key={field.id}>
                            <label className="block text-sm font-medium text-[#111318] dark:text-gray-300 mb-1.5">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {field.type === 'select' ? (
                                <div className="relative">
                                    <select
                                        value={formData[field.name] || ''}
                                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                        required={field.required}
                                        className="w-full h-11 px-3 rounded-lg bg-[#f0f2f4] dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary text-sm dark:text-white appearance-none cursor-pointer"
                                    >
                                        <option value="">{field.placeholder || "Select Option"}</option>
                                        {field.options?.map((opt: string) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-gray-500 text-sm">expand_more</span>
                                </div>
                            ) : (
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">
                                        {field.type === 'email' ? 'mail' : field.type === 'tel' ? 'call' : 'person'}
                                    </span>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        onChange={e => {
                                            const newVal = e.target.value;
                                            setFormData({ ...formData, [field.name]: newVal });
                                            // Reset verification if phone changes
                                            if (field.name === 'phone') setIsPhoneVerified(false);
                                        }}
                                        className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#f0f2f4] dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary text-sm dark:text-white placeholder-gray-500"
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    <InlineWhatsAppVerify
                        phone={formData.phone}
                        onVerified={(token) => {
                            setIsPhoneVerified(true);
                        }}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting || (!!formData.phone && !isPhoneVerified)}
                        className={`mt-2 w-full h-12 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed ${(!formData.phone || isPhoneVerified) ? 'bg-primary hover:bg-blue-600 text-white' : 'bg-gray-400 text-gray-200'}`}
                    >
                        {isSubmitting ? 'Submitting...' : (isPhoneVerified || !formData.phone ? (city ? `Get ${city} Brochure` : 'Download Brochure') : 'Verify Phone to Continue')}
                        {!isSubmitting && (isPhoneVerified || !formData.phone) && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-2">
                        By clicking, you agree to our Terms & Privacy Policy.
                    </p>
                </form>
            )}
        </div>
    );
};
