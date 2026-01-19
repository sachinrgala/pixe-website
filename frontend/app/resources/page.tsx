"use client";

import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FormField {
    id: number;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    options?: string[];
}

export default function ContentHubPage() {
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    // Filters State
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        // Reuse 'newsletter' form key for this sidebar subscription
        fetch("/api/formfields?form=newsletter")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setFormFields(data);
                    const initialData: Record<string, any> = {};
                    data.forEach(field => {
                        initialData[field.name] = "";
                    });
                    setFormData(initialData);
                }
            })
            .catch(err => console.error("Failed to fetch form fields:", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch("/api/subscribers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus("success");
                alert("Subscribed successfully!");
                setFormData(prev => {
                    const reset: Record<string, any> = {};
                    Object.keys(prev).forEach(key => reset[key] = "");
                    return reset;
                });
            } else {
                setStatus("error");
                alert("Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            alert("Connection failed.");
        } finally {
            setStatus("idle");
        }
    };

    // --- Exit Intent Logic ---
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [hasShownPopup, setHasShownPopup] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShownPopup) {
                setShowExitPopup(true);
                setHasShownPopup(true);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [hasShownPopup]);

    // Search Handler
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const query = (e.target as HTMLInputElement).value;
            window.location.href = `/courses?q=${encodeURIComponent(query)}`;
        }
    };

    // Static Article Data for Filtering
    const articles = [
        {
            id: 1,
            title: "Mastering GA4: The Ultimate Guide for Digital Marketers in 2024",
            category: "Analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            href: "/courses/analytics-course",
            type: "featured"
        },
        {
            id: 2,
            title: "5 Technical SEO Wins You Can Implement Today",
            category: "SEO",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            href: "/courses/seo-course",
            type: "grid"
        },
        {
            id: 3,
            title: "TikTok vs. Reels: Where Should Brands Focus in 2024?",
            category: "Social Media",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
            href: "/courses/social-media-marketing-course",
            type: "grid"
        },
        {
            id: 4,
            title: "HTML5 Semantics: Why It Matters for SEO?",
            category: "Development", // Mapped to 'Tools' or 'SEO' generically if needed, or keep discrete
            image: "/images/resources/html5_coding.png",
            href: "/courses/wordpress-development-course",
            type: "feed"
        },
        {
            id: 5,
            title: "Google Tag Manager: A Beginner's Guide to Tracking Everything",
            category: "Analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            href: "/courses/analytics-course",
            type: "feed"
        },
        {
            id: 6,
            title: "Digital Marketing Salary Report 2024: What Should You Be Earning?",
            category: "Careers",
            image: "/images/resources/salary_growth.png",
            href: "/career/career-guide",
            type: "feed"
        }
    ];

    // Filter Logic
    const filteredArticles = activeFilter === "All"
        ? articles
        : articles.filter(article =>
            article.category === activeFilter ||
            (activeFilter === "Tools" && article.category === "Development") // Mapping Development to Tools for simplicity
        );

    return (
        <div className="bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-white font-sans min-h-screen relative selection:bg-orange-500/30">
            {/* Extended JSON-LD Schema for SEO & AI */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "CollectionPage",
                                "@id": "https://pixe.education/resources",
                                "url": "https://pixe.education/resources",
                                "name": "Digital Marketing Resources & Guides",
                                "description": "Master digital marketing with our curated articles, expert tutorials, and industry insights.",
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "Pixe Education",
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://pixe.education/logo.png"
                                    }
                                }
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://pixe.education"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Resources",
                                        "item": "https://pixe.education/resources"
                                    }
                                ]
                            },
                            {
                                "@type": "ItemList",
                                "itemListElement": articles.map((article, index) => ({
                                    "@type": "ListItem",
                                    "position": index + 1,
                                    "url": `https://pixe.education${article.href}`,
                                    "name": article.title,
                                    "image": article.image,
                                    "description": `${article.category} Guide`
                                }))
                            }
                        ]
                    })
                }}
            />

            {/* Exit Intent Popup */}
            {showExitPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-[#151b26] rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden border border-gray-100 dark:border-gray-800 transform scale-100 transition-all">
                        <button
                            onClick={() => setShowExitPopup(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
                            aria-label="Close popup"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="p-8 text-center flex flex-col gap-6">
                            <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
                                <span className="material-symbols-outlined text-4xl text-white">rocket_launch</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Wait! Accelerate Your Career</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Get a <strong>Free Career Counseling</strong> session with our experts. Discover the roadmap to your first ₹10LPA job.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <Link href="/free-counseling" className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                                    Book Free Session
                                </Link>
                                <button
                                    onClick={() => setShowExitPopup(false)}
                                    className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2"
                                >
                                    Maybe later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1 flex flex-col items-center w-full">
                {/* Modern Hero & Nav */}
                <div className="w-full bg-white dark:bg-[#0B0F19] sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800/50 backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80 supports-[backdrop-filter]:bg-opacity-60">
                    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
                        {/* Header Top Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-orange-500 tracking-wider uppercase mb-1">Pixe Resources</span>
                                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Explorer</h1>
                            </div>
                            <div className="hidden md:flex items-center border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 bg-gray-50 dark:bg-[#151b26] min-w-[300px] focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
                                <span className="material-symbols-outlined text-gray-400 mr-2">search</span>
                                <input
                                    className="bg-transparent outline-none text-sm w-full text-gray-900 dark:text-white placeholder:text-gray-400"
                                    placeholder="Search guides, tools, trends..."
                                    onKeyDown={handleSearch}
                                />
                                <span className="text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">⌘K</span>
                            </div>
                            <Link href="/free-counseling" className="hidden md:flex items-center gap-2 text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full transition-all shadow-lg shadow-orange-600/20">
                                <span>Get Hired</span>
                                <span className="material-symbols-outlined text-sm">arrow_outward</span>
                            </Link>
                        </div>

                        {/* Scrollable Filters */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            {["All", "SEO", "PPC", "Social Media", "Analytics", "Design", "Trends", "Careers", "Tools"].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeFilter === filter
                                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md"
                                        : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Feed (8 Cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-12">

                        {/* Featured Hero Card - Only show if Analytics or All is selected (since it's an Analytics post) */}
                        {(activeFilter === 'All' || activeFilter === 'Analytics') && (
                            <Link href="/courses/analytics-course" className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer block">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center blur-xl scale-110 transition-transform duration-700"></div>
                                <div className="absolute inset-0 bg-black/50 opacity-10"></div>
                                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:max-w-3xl flex flex-col gap-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">Featured</span>
                                        <span className="text-gray-300 text-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 8 min read</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight group-hover:text-orange-400 transition-colors">
                                        Mastering GA4: The Ultimate Guide for Digital Marketers in 2024
                                    </h2>
                                    <p className="text-gray-300 text-base md:text-lg line-clamp-2 md:line-clamp-none max-w-2xl">
                                        Learn how to set up custom events, track conversions, and interpret the new data model to drive actionable insights from Day 1.
                                    </p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-3">
                                            <img alt="Author" src="/images/reviews/priya.png" className="w-10 h-10 rounded-full border-2 border-white/20" />
                                            <div>
                                                <p className="text-white text-sm font-bold">Priya Verma</p>
                                                <p className="text-gray-400 text-xs">Head of Analytics</p>
                                            </div>
                                        </div>
                                        <div className="h-8 w-[1px] bg-white/20"></div>
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1.5 text-gray-300 text-xs font-bold"><span className="material-symbols-outlined text-sm">thumb_up</span> 2.4k</span>
                                            <span className="flex items-center gap-1.5 text-gray-300 text-xs font-bold"><span className="material-symbols-outlined text-sm">visibility</span> 12k</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Bento Grid layout for Recent Posts */}
                        <div className={(filteredArticles.filter(a => a.type === 'grid').length === 0) ? 'hidden' : ''}>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-orange-500">flash_on</span>
                                Freshly Pressed
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredArticles.filter(a => a.type === 'grid').map(article => (
                                    <Link key={article.id} href={article.href!} className="bg-white dark:bg-[#151b26] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer">
                                        <div className="h-52 w-full overflow-hidden relative">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${article.image}')` }}></div>
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">{article.category} Strategy</div>
                                        </div>
                                        <div className="p-6 flex flex-col gap-3 flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-orange-600 transition-colors">{article.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">Boost your site speed and crawlability with these simple yet effective technical adjustments.</p>
                                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/50">
                                                <span className="text-xs font-medium text-gray-400">Oct 24, 2023</span>
                                                <div className="flex items-center gap-3">
                                                    <button type="button" onClick={(e) => { e.preventDefault(); alert("Added to favorites!") }} className="text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">favorite</span></button>
                                                    <button type="button" onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(window.location.href); alert("Link copied!") }} className="text-gray-400 hover:text-blue-500 transition-colors"><span className="material-symbols-outlined text-lg">share</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Inline Lead Magnet */}
                        <div className="relative w-full rounded-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900"></div>
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                                <div className="flex flex-col gap-4 max-w-xl">
                                    <div className="inline-flex items-center gap-2 self-center md:self-start bg-blue-800/50 rounded-full px-3 py-1 border border-blue-700/50">
                                        <span className="material-symbols-outlined text-blue-300 text-sm">download</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Free Career Guide</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white">The 2024 Digital Marketing Roadmap</h3>
                                    <p className="text-blue-200 text-sm md:text-base leading-relaxed">
                                        Stop guessing. Download the exact step-by-step roadmap our students use to go from zero to hired in 90 days. Includes salary guides and interview checklists.
                                    </p>
                                </div>
                                <div className="shrink-0 relative">
                                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                                    <Link href="/career/career-guide" className="relative bg-white text-blue-900 font-black text-lg py-4 px-8 rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                        Download Now
                                        <span className="material-symbols-outlined">arrow_downward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Recent Article List (Feed Style) */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400">article</span>
                                Latest Reads
                            </h3>

                            {filteredArticles.filter(a => a.type === 'feed').length > 0 ? (
                                filteredArticles.filter(a => a.type === 'feed').map(article => (
                                    <Link key={article.id} href={article.href!} className="bg-white dark:bg-[#151b26] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-6 hover:border-orange-200 dark:hover:border-orange-900/30 transition-colors group cursor-pointer">
                                        <div className="w-full sm:w-48 h-32 shrink-0 rounded-xl overflow-hidden relative">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" style={{ backgroundImage: `url('${article.image}')` }}></div>
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                        </div>
                                        <div className="flex flex-col gap-2 justify-center flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">{article.category}</span>
                                                <span className="text-[10px] font-medium text-gray-400">• 5 min read</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">{article.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Structuring your content correctly isn't just about code cleanliness—it's a critical ranking factor in 2024.</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">No articles found for this category.</div>
                            )}
                        </div>

                        <div className="text-center mt-4">
                            <Link href="/courses" className="inline-block bg-white dark:bg-[#1e2532] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold py-3 px-8 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                                View All Resources
                            </Link>
                        </div>
                    </div>

                    {/* Right Sidebar (4 Cols) */}
                    <aside className="lg:col-span-4 flex flex-col gap-8 h-fit lg:sticky lg:top-24">

                        {/* Instructor Profile / Trust Signal */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white text-center shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <img src="/images/reviews/rahul.png" className="w-20 h-20 rounded-full border-4 border-gray-800 mx-auto mb-4 object-cover" />
                            <h3 className="text-lg font-black tracking-tight">Expert Review</h3>
                            <p className="text-gray-400 text-sm mb-4">"The industry changes daily. Our resources are updated weekly by practicing experts."</p>
                            <div className="flex justify-center gap-2 items-center text-xs font-bold text-orange-400">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                <span>Verified by Pixe Faculty</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-white dark:bg-[#151b26] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                            <div className="mb-4">
                                <span className="text-orange-500 font-bold text-xs uppercase tracking-wide">Weekly Digest</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Join 20,000+ Marketers</h3>
                            </div>
                            {formFields.length > 0 ? (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    {formFields.map((field) => (
                                        <input
                                            key={field.id}
                                            name={field.name}
                                            required={field.required}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border-transparent focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
                                        />
                                    ))}
                                    <button
                                        disabled={status === 'submitting'}
                                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 mt-2"
                                        type="submit"
                                    >
                                        {status === 'submitting' ? 'Subscribing...' : 'Subscribe Free'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-4 text-gray-500 text-xs">Loading form...</div>
                            )}
                            <p className="text-[10px] text-gray-400 mt-4 text-center">Unsubscribe anytime. We hate spam too.</p>
                        </div>

                        {/* Popular Topics Tags */}
                        <div className="bg-transparent">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Popular Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {["SEO", "PPC", "Analytics", "Social Media", "Careers", "Tools"].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveFilter(tag === "Social Media" ? "Social Media" : tag)}
                                        className="text-xs bg-gray-100 dark:bg-[#1e2532] text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/20 hover:text-orange-600 cursor-pointer transition-colors"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Career Quiz Mini */}
                        <Link href="/free-counseling" className="relative overflow-hidden rounded-3xl bg-indigo-600 text-white p-6 group cursor-pointer shadow-lg shadow-indigo-600/20 block">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur mb-3">
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <h3 className="text-lg font-bold mb-1">Career Quiz</h3>
                                <p className="text-indigo-100 text-xs mb-3">Find your perfect digital marketing niche in 2 minutes.</p>
                                <span className="inline-flex items-center text-xs font-bold bg-white text-indigo-600 px-3 py-1.5 rounded-full">Start Quiz</span>
                            </div>
                        </Link>

                    </aside>
                </div>

            </main>
            <Footer />
        </div>
    );
}
