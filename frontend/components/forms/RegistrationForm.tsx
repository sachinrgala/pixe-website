"use client";

import React, { useState, useEffect } from 'react';
import { InlineWhatsAppVerify } from "@/components/ui/InlineWhatsAppVerify";

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

export const RegistrationForm = ({ eventTitle, source = 'web_lead', formKey = 'registration' }: { eventTitle?: string; source?: string; formKey?: string }) => {
    const [formData, setFormData] = useState<Record<string, string>>({
        source: source
    });
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetch(`/api/formfields?form=${formKey}`)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const enabledFields = data
                        .filter((f: FormField) => f.enabled)
                        .sort((a: FormField, b: FormField) => a.order - b.order);
                    setFormFields(enabledFields);

                    const initialData: Record<string, string> = { source: source };
                    enabledFields.forEach((f: FormField) => {
                        initialData[f.name] = "";
                    });
                    setFormData(prev => ({ ...prev, ...initialData }));
                }
            })
            .catch(err => console.error("Failed to fetch form fields", err));

    }, [source, formKey]);

    // WhatsApp OTP Inline Verification
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [verificationToken, setVerificationToken] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone && !isPhoneVerified) {
            return; // Don't submit if phone not verified
        }
        submitFinalData(verificationToken);
    };

    const submitFinalData = async (token: string) => {
        setStatus('submitting');
        const submitData: any = { ...formData, verification_token: token };

        // Normalize fields for backend
        if (submitData.full_name) submitData.name = submitData.full_name;

        // Override course if eventTitle is provided
        if (eventTitle) submitData.course = eventTitle;

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                setStatus('success');
                const resetData: Record<string, string> = { source: source };
                formFields.forEach(f => resetData[f.name] = "");
                setFormData(resetData);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="p-8 text-center bg-green-50 dark:bg-green-900/10 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-300">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">You're In!</h3>
                <p className="text-green-700 dark:text-green-400">Check your email for the join link.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-green-600 hover:underline"
                >
                    Register Another
                </button>
            </div>
        );
    }

    if (formFields.length === 0) {
        return <div className="p-8 text-center text-text-muted">Loading registration form...</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                {formFields.map(field => (
                    <label key={field.id} className="space-y-1.5">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </span>
                        {field.type === 'select' ? (
                            <select
                                required={field.required}
                                value={formData[field.name] || ''}
                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                className="w-full bg-surface dark:bg-surface-deep border border-border-color dark:border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                            >
                                <option value="">{field.placeholder || "Select an option"}</option>
                                {field.options?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : (
                            <>
                                <input
                                    type={field.type}
                                    required={field.required}
                                    value={formData[field.name] || ''}
                                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="w-full bg-surface dark:bg-surface-deep border border-border-color dark:border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                                    placeholder={field.placeholder}
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
                    </label>
                ))}

                <button
                    type="submit"
                    disabled={status === 'submitting' || (!!formData.phone && !isPhoneVerified)}
                    className={`mt-2 w-full py-3 font-bold rounded-lg shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed ${isPhoneVerified || !formData.phone
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-500'
                        }`}
                >
                    {status === 'submitting' ? 'Registering...' : isPhoneVerified ? 'Register Now ✓' : formData.phone ? 'Verify Phone First' : 'Register Now'}
                </button>

                {status === 'error' && (
                    <p className="text-sm text-center text-red-500">
                        Something went wrong. Please try again.
                    </p>
                )}
            </form>
        </>
    );
};
