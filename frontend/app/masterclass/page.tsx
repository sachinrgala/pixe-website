"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    instructor: string;
    status: string;
}

export default function MasterclassPage() {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch("/api/events");
                if (res.ok) {
                    const events: Event[] = await res.json();
                    const nextEvent = events.find(e => e.status === "upcoming") || events[0];
                    setEvent(nextEvent || null);
                }
            } catch (error) {
                console.error("Failed to fetch masterclass", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, []);

    const displayEvent = event || {
        title: "Master Digital Marketing in 60 Minutes",
        description: "Join industry expert Alex Doe. Learn the exact TOFU, MOFU, and BOFU strategies used to scale SaaS brands to $10M ARR.",
        date: "October 24, 2023",
        time: "2:00 PM EST",
        duration: "60 Minutes",
        instructor: "Alex Doe"
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-foreground">

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <div className="px-4 md:px-20 lg:px-40 py-8 md:py-24 bg-gradient-to-b from-primary/5 to-transparent">
                    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider">Live Masterclass</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                                {displayEvent.title}
                            </h1>

                            <p className="text-lg text-text-muted mb-8 max-w-[600px] mx-auto lg:mx-0 leading-relaxed">
                                {displayEvent.description}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">
                                            <span className="material-symbols-outlined text-sm text-gray-500">person</span>
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-primary flex items-center justify-center text-xs font-bold text-white">
                                        +500
                                    </div>
                                </div>
                                <p className="text-sm text-text-muted font-medium">Marketers already registered</p>
                            </div>

                            <div className="mt-8 p-4 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/30 rounded-lg inline-flex items-center gap-3">
                                <span className="material-symbols-outlined text-orange-500">hourglass_top</span>
                                <p className="text-orange-700 dark:text-orange-300 font-bold text-sm">Only 12 spots left for this session!</p>
                            </div>
                        </div>

                        {/* Registration Form */}
                        <div className="w-full lg:w-[420px] bg-white dark:bg-surface rounded-2xl border border-border-color dark:border-gray-800 shadow-xl overflow-hidden">
                            <div className="bg-primary p-6 text-center">
                                <h3 className="text-white text-xl font-bold">Secure Your Free Spot</h3>
                                <p className="font-bold text-blue-100 text-sm mt-1">
                                    Limited seats available. Reserve yours now.
                                </p>
                            </div>
                            <RegistrationForm eventTitle={displayEvent.title} source="masterclass" formKey="masterclass-registration" />
                        </div>
                    </div>
                </div>

                {/* Event Details Bar */}
                <div className="border-y border-border-color dark:border-gray-800 bg-surface dark:bg-surface-deep">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-20 lg:px-40 py-8">
                        <div className="flex flex-wrap gap-8 justify-center md:justify-between text-center md:text-left">
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm font-medium">Date</p>
                                    <p className="text-xl font-bold">{displayEvent.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-xl">schedule</span>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm font-medium">Time</p>
                                    <p className="text-xl font-bold">{displayEvent.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-xl">hourglass_empty</span>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm font-medium">Duration</p>
                                    <p className="text-xl font-bold">{displayEvent.duration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructor Section */}
                <div className="px-4 md:px-20 lg:px-40 py-10 lg:py-16">
                    <div className="max-w-[960px] mx-auto">
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-surface p-8 md:p-12 rounded-2xl border border-border-color dark:border-gray-800 shadow-lg">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl font-bold text-white ring-4 ring-background-light dark:ring-background-dark">
                                {displayEvent.instructor.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-primary font-bold uppercase tracking-wider text-sm mb-1">Your Instructor</p>
                                <h2 className="text-3xl font-bold mb-2">{displayEvent.instructor}</h2>
                                <p className="text-text-muted text-lg leading-relaxed">
                                    Join {displayEvent.instructor} for this exclusive session. Learn the strategies that are working right now in 2024.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ExitIntentPopup
                    title="Wait! Don't miss this session."
                    description={`Get the full Masterclass Curriculum & Future Live Session Schedule for ${displayEvent.instructor}'s workshops.`}
                    buttonText="Get Session Schedule"
                    course="Masterclass_General"
                />
            </main>

            <Footer />
        </div>
    );
}
