"use client";

import { useState, useEffect } from "react";

interface Props {
    phone?: string;
    onVerified?: (token: string) => void;
    onVerifySuccess?: () => void;
}

type VerifyState = "idle" | "sending" | "pending" | "verifying" | "verified" | "error";

export function InlineWhatsAppVerify({ phone, onVerified, onVerifySuccess }: Props) {
    const [state, setState] = useState<VerifyState>("idle");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [enabled, setEnabled] = useState<boolean | null>(null); // null = loading

    // Fetch settings to check if WhatsApp is enabled
    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => setEnabled(data.enableWhatsApp ?? false))
            .catch(() => setEnabled(false));
    }, []);

    // While loading settings, don't render anything
    if (enabled === null) return null;

    // If WhatsApp is disabled in settings, don't show the component
    if (!enabled) return null;

    const sendOTP = async () => {
        setState("sending");
        setError("");
        try {
            const res = await fetch("/api/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });
            if (res.ok) {
                setState("pending");
            } else {
                setError("Failed to send OTP. Try again.");
                setState("idle");
            }
        } catch {
            setError("Network error. Try again.");
            setState("idle");
        }
    };

    const verifyOTP = async () => {
        if (!otp || otp.length < 4) {
            setError("Enter a valid OTP");
            return;
        }
        setState("verifying");
        setError("");
        try {
            const res = await fetch("/api/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, code: otp }),
            });
            const data = await res.json();
            console.log("OTP Verify Response:", data); // DEBUG
            if (res.ok && data.verification_token) {
                setState("verified");
                if (onVerified) onVerified(data.verification_token);
                if (onVerifySuccess) onVerifySuccess();
            } else {
                setError(data.error || "Invalid OTP. Try again.");
                setState("pending");
            }
        } catch {
            setError("Verification failed. Try again.");
            setState("pending");
        }
    };

    // Already verified
    if (state === "verified") {
        return (
            <div className="mt-2 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800 shadow-sm">
                    <div className="bg-green-600 rounded-full p-0.5 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-sm font-bold">Verified</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Number verified successfully</span>
            </div>
        );
    }

    // Show OTP input after sending
    if (state === "pending" || state === "verifying") {
        return (
            <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Enter code sent to WhatsApp
                    </p>
                    <button
                        type="button"
                        onClick={() => setState("idle")}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        Change Number
                    </button>
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="000 000"
                        className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-center text-lg font-mono tracking-[0.2em] focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] outline-none transition-all placeholder:tracking-normal placeholder:opacity-50"
                        onKeyDown={(e) => e.key === "Enter" && verifyOTP()}
                        disabled={state === "verifying"}
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={verifyOTP}
                        disabled={state === "verifying" || otp.length < 4}
                        className="px-6 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center justify-center min-w-[100px]"
                    >
                        {state === "verifying" ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Verify"}
                    </button>
                </div>

                <div className="flex justify-between items-center mt-3">
                    {error ? (
                        <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {error}
                        </p>
                    ) : <span></span>}

                    <button
                        type="button"
                        onClick={sendOTP}
                        className="text-slate-500 hover:text-[#25D366] text-xs font-medium transition-colors"
                    >
                        Resend Code
                    </button>
                </div>
            </div>
        );
    }

    // Initial state - show verify button
    return (
        <div className="mt-2">
            <button
                type="button"
                onClick={sendOTP}
                disabled={state === "sending" || !phone || phone.length < 10}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366] text-[#075e54] dark:text-[#25D366] font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
                {state === "sending" ? (
                    <svg className="animate-spin h-5 w-5 text-[#25D366]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                )}
                <span className="tracking-wide">{state === "sending" ? "Sending Code..." : "Verify via WhatsApp"}</span>
            </button>
            {error && <p className="text-red-500 text-xs mt-2 pl-1">{error}</p>}
        </div>
    );
}
