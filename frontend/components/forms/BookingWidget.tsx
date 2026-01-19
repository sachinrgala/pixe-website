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

export const BookingWidget = () => {
    const [formData, setFormData] = useState<Record<string, string>>({
        source: 'free_counseling'
    });
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetch("/api/formfields?form=free-counseling")
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const enabledFields = data
                        .filter((f: FormField) => f.enabled)
                        .sort((a: FormField, b: FormField) => a.order - b.order);
                    setFormFields(enabledFields);

                    const initialData: Record<string, string> = { source: 'free_counseling' };
                    enabledFields.forEach((f: FormField) => {
                        initialData[f.name] = "";
                    });
                    setFormData(prev => ({ ...prev, ...initialData }));
                }
            })
            .catch(err => console.error("Failed to fetch form fields", err));

    }, []);

    // WhatsApp OTP Inline Verification
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [verificationToken, setVerificationToken] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone && !isPhoneVerified) {
            return;
        }
        submitFinalData(verificationToken);
    };

    const submitFinalData = async (token: string) => {
        setStatus('submitting');
        const submitData: any = { ...formData, verification_token: token };

        // Map date to message if present
        if (submitData.date) {
            submitData.message = `Preferred Date: ${submitData.date}`;
        }
        submitData.course = "Counseling Session";

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                setStatus('success');
                const resetData: Record<string, string> = { source: 'free_counseling' };
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
            <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-300">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Booking Confirmed!</h3>
                <p className="text-center text-green-700 dark:text-green-400">
                    Our team will contact you shortly to confirm your slot.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-blue-600 hover:underline"
                >
                    Book Another
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 flex flex-col gap-5">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-[#111318] dark:text-white">Instant Scheduling</h3>
                    <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1">Book your slot in less than 2 minutes</p>
                </div>
                <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                    4 slots left
                </div>
            </div>
            {formFields.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm">Loading slots...</div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {formFields.map(field => (
                        <div key={field.id} className="w-full">
                            <label className="sr-only">{field.label}</label>
                            <div className="relative">
                                {field.name === 'email' && <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">mail</span>}
                                {field.name === 'phone' && <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">call</span>}
                                {field.name === 'date' && <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">calendar_today</span>}

                                {field.type === 'select' ? (
                                    <select
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                        className={`w-full h-11 px-4 rounded-lg bg-[#f0f2f4] dark:bg-[#2d3748] border-none text-sm focus:ring-2 focus:ring-[#135bec] dark:text-white appearance-none ${field.name !== 'name' ? 'pl-10' : ''}`}
                                    >
                                        <option value="">{field.placeholder || "Select"}</option>
                                        {field.options?.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <>
                                        <input
                                            required={field.required}
                                            className={`w-full h-11 px-4 rounded-lg bg-[#f0f2f4] dark:bg-[#2d3748] border-none text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[#135bec] dark:text-white ${['email', 'phone', 'date'].includes(field.name) ? 'pl-10' : ''}`}
                                            placeholder={field.placeholder || field.label}
                                            type={field.type}
                                            value={formData[field.name] || ''}
                                            onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
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
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={status === 'submitting' || (!!formData.phone && !isPhoneVerified)}
                        className={`w-full h-12 font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 mt-2 ${isPhoneVerified || !formData.phone
                                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20'
                                : 'bg-gray-300 text-gray-500'
                            }`}
                    >
                        {status === 'submitting' ? 'Booking...' : isPhoneVerified ? 'Confirm Booking ✓' : formData.phone ? 'Verify Phone First' : 'Confirm Booking'}
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-2">
                        Free consultation worth $50
                    </p>
                </form>
            )}
        </div>
    );
};
