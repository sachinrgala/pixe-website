"use client";

import { useState, useEffect } from "react";
import LeadForm from "./LeadForm";

interface ExitIntentPopupProps {
    title?: string;
    description?: string;
    buttonText?: string;
    course?: string;
    delay?: number; // ms before popup can show
    onClose?: () => void;
    targetId?: string; // ID to scroll to when confirmed
}

export default function ExitIntentPopup({
    title = "Wait! Don't leave yet.",
    description = "Get the detailed Curriculum & Career Guide delivered to your email.",
    buttonText = "Download Syllabus",
    course = "",
    delay = 5000,
    onClose,
    targetId,
}: ExitIntentPopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        if (sessionStorage.getItem(`exitPopupShown_${course || 'general'}`)) {
            setHasShown(true);
            return;
        }

        let timeoutId: NodeJS.Timeout;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem(`exitPopupShown_${course || 'general'}`, "true");
            }
        };

        // Only enable after delay
        timeoutId = setTimeout(() => {
            document.addEventListener("mouseleave", handleMouseLeave);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [delay, hasShown, course]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-300">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl text-blue-500">download</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 mb-8 whitespace-pre-line">{description}</p>

                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                if (targetId) {
                                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                                }
                                setIsVisible(false);
                            }}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {buttonText}
                        </button>

                        <button
                            onClick={handleClose}
                            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            No thanks, I'll miss out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
