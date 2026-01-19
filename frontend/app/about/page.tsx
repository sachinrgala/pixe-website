"use client";

import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {

    // Leadership Data with verified Indian Images
    const leaders = [
        {
            name: "Abhishek Sharma",
            role: "Founder & CEO",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            bio: "12+ Years in Performance Marketing. Managed $50M+ Ad Spend for brands like Flipkart & Myntra."
        },
        {
            name: "Priya Menon",
            role: "Head of Education",
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
            bio: "Ex-Google Strategist. Passionate about bridging the gap between academic theory and agency reality."
        },
        {
            name: "Vikram Singh",
            role: "Chief Strategy Officer",
            img: "/images/amit_patel.png",
            bio: "Brand Consultant for 50+ Startups. Specialist in scaling D2C brands via paid acquisition."
        },
        {
            name: "Sanya Kapoor",
            role: "Social Media Lead",
            img: "/images/courses/smm/mentors/priya.png",
            bio: "Viral Content Architect. Her campaigns have generated over 100M organic views across platforms."
        }
    ];

    // Infrastructure Images
    const campusImages = [
        { src: "/images/about/campus-lab.png", label: "AI-Powered Live Labs" },
        { src: "/images/about/campus-collaboration.png", label: "Agency-Style Workspaces" },
        { src: "/images/about/campus-classroom.png", label: "Corporate Training Halls" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-body selection:bg-orange-500/20 selection:text-orange-600">
            <ExitIntentPopup
                course="general"
                title="Don't compromise on your career."
                description="Download our latest placement report and see where our alumni are working."
                buttonText="View Placement Report"
            />

            <main className="pb-20">
                {/* Hero / Mission Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-surface">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-6 border border-orange-200 dark:border-orange-800">
                            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                            Our Mission
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 font-display tracking-tight leading-tight">
                            We Don&apos;t Just Teach Marketing. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">We Build Marketers.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
                            Pixe Education was born from a simple frustration: Graduates were learning <i>definitions</i>, but agencies needed <i>decisions</i>. We exist to fix that gap.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-muted-foreground">
                            {["Agency-Simulation Model", "10,000+ Alumni", "350+ Hiring Partners"].map((tag, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-background border border-border-color rounded-full shadow-sm">
                                    <span className="material-symbols-outlined text-orange-500 text-lg">check_circle</span>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Brand Story / Timeline */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">The Pixe Story</h2>
                                <div className="space-y-8 border-l-2 border-orange-200 dark:border-orange-900/50 pl-8 ml-4">
                                    <div className="relative">
                                        <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-orange-600 border-4 border-white dark:border-slate-900"></span>
                                        <h3 className="text-xl font-bold text-foreground">2018: The Inception</h3>
                                        <p className="text-muted-foreground mt-2">Started as a boutique digital agency. We realized freshers lacked practical skills, so we began training them internally.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-orange-400 border-4 border-white dark:border-slate-900"></span>
                                        <h3 className="text-xl font-bold text-foreground">2020: The Pilot Batch</h3>
                                        <p className="text-muted-foreground mt-2">Launched our first public cohort with 50 students. 100% placed within 45 days. The "Agency-Simulation" model was born.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900"></span>
                                        <h3 className="text-xl font-bold text-foreground">2023: Going National</h3>
                                        <p className="text-muted-foreground mt-2">Partnered with 250+ corporates. Expanded infrastructure to state-of-the-art labs in Bangalore & Mumbai.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-orange-600 border-4 border-white dark:border-slate-900 animate-pulse"></span>
                                        <h3 className="text-xl font-bold text-foreground">2025: AI Integration</h3>
                                        <p className="text-muted-foreground mt-2">Became India's first institute to integrate Generative AI (ChatGPT, Midjourney) into every marketing module.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="/images/about/campus-collaboration.png"
                                    alt="Students Collaborating"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-2">Our Culture</p>
                                    <h3 className="text-3xl font-bold">Collaborate. Create. Conquer.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership Section */}
                <section className="py-20 bg-surface">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Meet The Mentors</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Learn from the people who have actually built the brands you love. No academic theorists here.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {leaders.map((leader, i) => (
                                <div key={i} className="group bg-background rounded-2xl overflow-hidden border border-border-color hover:border-orange-500/50 hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[4/5] relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        {/* Fallback to generic if image fails load (handled by Next/Image mostly, but source logic ensures existence) */}
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                                            <span className="material-symbols-outlined text-4xl">person</span>
                                        </div>
                                        <Image
                                            src={leader.img}
                                            alt={leader.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <p className="text-white text-sm leading-relaxed mb-4 opacity-0 group-hover:animate-fade-in-up delay-100">
                                                "{leader.bio}"
                                            </p>
                                            <div className="flex gap-3">
                                                <a href="#" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-orange-600 flex items-center justify-center transition-colors"><span className="text-xs font-bold">in</span></a>
                                                <a href="#" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-orange-600 flex items-center justify-center transition-colors"><span className="text-xs font-bold">X</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-6 border-t border-border-color relative bg-background">
                                        <h3 className="text-base md:text-xl font-bold text-foreground group-hover:text-orange-600 transition-colors">{leader.name}</h3>
                                        <p className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wide mt-1">{leader.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-5"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">The Pixe DNA</h2>
                            <p className="text-muted-foreground">What drives our curriculum, our mentors, and our students.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-surface p-8 rounded-2xl border border-border-color hover:border-orange-500/30 transition-all group">
                                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">psychology</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Agency-First Mindset</h3>
                                <p className="text-muted-foreground leading-relaxed">We don't teach from textbooks. We teach from live ad accounts. If it doesn't work in an agency, it's not in our syllabus.</p>
                            </div>
                            <div className="bg-surface p-8 rounded-2xl border border-border-color hover:border-orange-500/30 transition-all group">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Radical Transparency</h3>
                                <p className="text-muted-foreground leading-relaxed">No hidden fees. No fake placement promises. We show you exactly what to expect and deliver more than we promise.</p>
                            </div>
                            <div className="bg-surface p-8 rounded-2xl border border-border-color hover:border-orange-500/30 transition-all group">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">groups</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Community for Life</h3>
                                <p className="text-muted-foreground leading-relaxed">Graduation isn't the end. It's the beginning of lifetime access to our mentor network, job board, and alumni events.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact / Stats Section */}
                <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-white/10">
                            <div className="p-4">
                                <div className="text-4xl md:text-5xl font-black mb-2 text-orange-500">10k+</div>
                                <div className="text-white/80 font-bold uppercase tracking-wider text-xs">Careers Launched</div>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl md:text-5xl font-black mb-2 text-orange-500">₹4.5L</div>
                                <div className="text-white/80 font-bold uppercase tracking-wider text-xs">Avg. Starter Package</div>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl md:text-5xl font-black mb-2 text-orange-500">350+</div>
                                <div className="text-white/80 font-bold uppercase tracking-wider text-xs">Hiring Partners</div>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl md:text-5xl font-black mb-2 text-orange-500">4.9/5</div>
                                <div className="text-white/80 font-bold uppercase tracking-wider text-xs">Student Rating</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Accreditations & Trust */}
                <section className="py-16 bg-surface">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10">Accredited & Recognized By</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Using trusted logos from assets */}
                            <img src="/images/about/google-logo.svg" alt="Google Partner" className="h-10 hover:scale-110 transition-transform" />
                            <img src="/images/about/microsoft-logo.svg" alt="Microsoft" className="h-10 hover:scale-110 transition-transform" />
                            <img src="/images/about/amazon-logo.svg" alt="Amazon AWS" className="h-10 hover:scale-110 transition-transform" />
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold text-slate-800 dark:text-white">ISO</span>
                                <span className="text-xs font-bold text-muted-foreground border-l border-border-color pl-2 ml-2">9001:2015<br />Certified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold text-slate-800 dark:text-white">MSME</span>
                                <span className="text-xs font-bold text-muted-foreground border-l border-border-color pl-2 ml-2">Govt of<br />India</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Strip */}
                <section className="py-24 bg-background relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">Ready to Start Your Journey?</h2>
                        <p className="text-xl text-muted-foreground mb-10">
                            Join 10,000+ students who have transformed their careers with Pixe.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/free-counseling" className="px-8 py-4 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 hover:bg-orange-700 hover:scale-105 transition-all text-lg flex items-center justify-center gap-2">
                                Book Free Counseling
                                <span className="material-symbols-outlined">calendar_today</span>
                            </Link>
                            <Link href="/courses" className="px-8 py-4 bg-surface border border-border-color text-foreground font-bold rounded-xl hover:bg-surface-deep transition-all text-lg flex items-center justify-center gap-2">
                                Explore Courses
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
