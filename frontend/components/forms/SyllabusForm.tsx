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

export const SyllabusForm = () => {
    const [formData, setFormData] = useState<Record<string, string>>({
        source: 'courses_syllabus',
        course: 'Digital Marketing Course'
    });
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // WhatsApp OTP Inline Verification
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [verificationToken, setVerificationToken] = useState("");
    const [whatsAppEnabled, setWhatsAppEnabled] = useState(true);

    useEffect(() => {
        // Fetch settings to check if WhatsApp is enabled
        fetch("/api/settings")
            .then(r => r.json())
            .then(data => setWhatsAppEnabled(data.enableWhatsApp ?? false))
            .catch(() => setWhatsAppEnabled(false));

        fetch("/api/formfields?form=syllabus-download")
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const enabledFields = data
                        .filter((f: FormField) => f.enabled)
                        .sort((a: FormField, b: FormField) => a.order - b.order);
                    setFormFields(enabledFields);

                    const initialData: Record<string, string> = {
                        source: 'courses_syllabus',
                        course: 'Digital Marketing Course'
                    };
                    enabledFields.forEach((f: FormField) => {
                        initialData[f.name] = "";
                    });
                    setFormData(prev => ({ ...prev, ...initialData }));
                }
            })
            .catch(err => console.error("Failed to fetch form fields", err));

    }, []);

    // Phone verification is only required if WhatsApp is enabled
    const requiresVerification = whatsAppEnabled && !!formData.phone && !isPhoneVerified;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Only require verification if WhatsApp is enabled
        if (whatsAppEnabled && formData.phone && !isPhoneVerified) {
            return;
        }
        submitFinalData(verificationToken);
    };

    const submitFinalData = async (token: string) => {
        setStatus('submitting');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    verification_token: token
                })
            });

            if (res.ok) {
                setStatus('success');
                alert('Syllabus sent to your email!');
                const resetData: Record<string, string> = {
                    source: 'courses_syllabus',
                    course: 'Digital Marketing Course'
                };
                formFields.forEach(f => resetData[f.name] = "");
                setFormData(resetData);
                setStatus('idle');
            } else {
                setStatus('error');
                alert('Something went wrong.');
            }
        } catch (error) {
            setStatus('error');
            alert('Network error.');
        } finally {
            setStatus('idle');
        }
    };

    if (formFields.length === 0) {
        return <div className="text-white/50 text-sm">Loading...</div>;
    }

    // Adapt layout based on field count. If 1 field, try horizontal. If more, stack.
    const isSingleField = formFields.length === 1;

    return (
        <>
            <form onSubmit={handleSubmit} className={`flex ${isSingleField ? 'flex-col sm:flex-row' : 'flex-col'} gap-4 max-w-md mx-auto relative`}>
                {formFields.map(field => (
                    <div key={field.id} className="w-full">
                        {field.type === 'select' ? (
                            <select
                                required={field.required}
                                value={formData[field.name] || ''}
                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all font-medium backdrop-blur-sm appearance-none"
                            >
                                <option value="" className="text-gray-800">{field.placeholder || "Select"}</option>
                                {field.options?.map(opt => (
                                    <option key={opt} value={opt} className="text-gray-800">{opt}</option>
                                ))}
                            </select>
                        ) : (
                            <>
                                <input
                                    required={field.required}
                                    type={field.type}
                                    value={formData[field.name] || ''}
                                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all font-medium backdrop-blur-sm"
                                    placeholder={field.placeholder || field.label}
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

                <button
                    className={`px-8 py-4 font-bold rounded-xl shadow-lg transition-all whitespace-nowrap ${isSingleField ? '' : 'w-full'} ${!requiresVerification
                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        }`}
                    type="submit"
                    disabled={status === 'submitting' || requiresVerification}
                >
                    {status === 'submitting' ? 'Sending...' : requiresVerification ? 'Verify Phone First' : isPhoneVerified ? 'Download Brochure ✓' : 'Download Brochure'}
                </button>
            </form>
        </>
    );
};
