"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { PixeLogo } from "@/components/ui/PixeLogo";
import { cityConfigs } from "@/config/cityConfig";

interface NavItem {
    id: number;
    label: string;
    url: string;
    order: number;
}

export function Navbar() {
    // Force Hydration Sync
    const [scrolled, setScrolled] = useState(false);
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [courses, setCourses] = useState<{ title: string, slug: string }[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAllLocations, setShowAllLocations] = useState(false);
    const [openCountry, setOpenCountry] = useState<string | null>(null);
    const [showInternational, setShowInternational] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);

        // Fetch Navigation
        fetch("/api/navigation")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch navigation");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setNavItems(data.sort((a, b) => a.order - b.order));
                }
            })
            .catch(err => {
                console.error("Navigation fetch error:", err);
                setNavItems([]);
            });

        // Fetch Courses for Dropdown
        fetch("/api/courses")
            .then(res => res.json())
            .then(data => {
                let activeCourses: { title: string, slug: string }[] = [];
                if (Array.isArray(data)) {
                    activeCourses = data.filter((c: any) => c.status === 'published').map((c: any) => ({
                        title: c.title,
                        slug: c.slug
                    }));
                }

                // Manually inject WordPress Course if missing
                if (!activeCourses.some(c => c.slug === 'wordpress-development-course')) {
                    activeCourses.push({
                        title: "WordPress Development",
                        slug: "wordpress-development-course"
                    });
                }
                // Manually inject Affiliate Marketing Course if missing
                if (!activeCourses.some(c => c.slug === 'affiliate-email-marketing-course')) {
                    activeCourses.push({
                        title: "Affiliate & Email Marketing",
                        slug: "affiliate-email-marketing-course"
                    });
                }

                setCourses(activeCourses);
            })
            .catch(err => {
                console.error("Courses fetch error:", err);
                setCourses([{ title: "WordPress Development", slug: "wordpress-development-course" }]);
            });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Toggle Mobile Menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (!mobileMenuOpen) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <>
            {/* Navbar - simple static header, positioning handled by ContentWrapper */}
            <header
                suppressHydrationWarning
                className="w-full bg-background border-b border-border-color shadow-sm relative"
            >
                <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-foreground">
                        <Link href="/" className="flex items-center gap-3">
                            <PixeLogo className="size-10 text-primary" />
                            <h2 className="text-xl font-display font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Pixe</h2>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="/about">About Us</Link>

                            {/* Courses Dropdown */}
                            <div className="relative group h-full flex items-center">
                                <Link href="/courses" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                                    Courses
                                </Link>
                                <div className="absolute top-full left-0 mt-2 w-[400px] bg-surface border border-border-color rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-[100] translate-y-2 group-hover:translate-y-0 overflow-hidden ring-1 ring-border-color/20">
                                    <div className="p-2 grid gap-1">
                                        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1 h-4 bg-primary rounded-full"></span>
                                            Specialized Programs
                                        </div>
                                        {courses.length > 0 ? (
                                            courses.filter(c => !c.slug.includes('ui') && !c.slug.includes('ux')).map((course, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={course.slug === 'advance-digital-marketing-course' ? `/${course.slug}` : `/courses/${course.slug}`}
                                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item"
                                                >
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            {course.slug.includes('seo') ? 'search' :
                                                                course.slug.includes('social') ? 'share' :
                                                                    course.slug.includes('analytics') ? 'analytics' :
                                                                        course.slug.includes('affiliate') ? 'monetization_on' :
                                                                            course.slug.includes('wordpress') ? 'language' : 'school'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">{course.title}</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Professional Certification • Live Classes</div>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            // Fallback
                                            <>
                                                <Link href="/advance-digital-marketing-course" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">school</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Advance Digital Marketing</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Flagship Program • 11 Months</div>
                                                    </div>
                                                </Link>
                                                <Link href="/courses/ppc-course" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">ads_click</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Performance Marketing</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Ads & Analytics Mastery</div>
                                                    </div>
                                                </Link>
                                                <Link href="/courses/seo-course" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">SEO & Content Strategy</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Rank #1 on Google</div>
                                                    </div>
                                                </Link>
                                                <Link href="/courses/social-media-marketing-course" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">share</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Social Media Marketing</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Instagram & LinkedIn Growth</div>
                                                    </div>
                                                </Link>
                                                <Link href="/courses/analytics-course" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">analytics</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Analytics & Data Science</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">GA4, Looker & Python</div>
                                                    </div>
                                                </Link>
                                                <Link href="/courses/affiliate-email-marketing-course" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">monetization_on</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Affiliate & Email Marketing</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Passive Income Mastery</div>
                                                    </div>
                                                </Link>
                                                <Link href="/courses/wordpress-development-course" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                                    <div className="shrink-0 size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[20px]">language</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">WordPress Development</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">No-Code Web Design</div>
                                                    </div>
                                                </Link>
                                            </>
                                        )}
                                        <div className="p-2 border-t border-border-color bg-surface-deep rounded-b-xl mt-1">
                                            <Link href="/courses" className="flex items-center justify-center gap-2 w-full py-2.5 bg-surface border border-border-color rounded-lg text-sm font-bold text-foreground hover:bg-background hover:text-primary transition-all shadow-sm">
                                                View All Courses
                                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* Career Dropdown */}
                            <div className="relative group h-full flex items-center">
                                <Link href="/career" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                                    Career
                                </Link>
                                <div className="absolute top-full left-0 mt-2 w-[400px] bg-surface border border-border-color rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-[100] translate-y-2 group-hover:translate-y-0 overflow-hidden ring-1 ring-border-color/20">
                                    <div className="p-2 grid gap-1">
                                        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                                            Career & Growth
                                        </div>

                                        <Link href="/career" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">trending_up</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Career Outcomes</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Placement Stats & Salaries</div>
                                            </div>
                                        </Link>

                                        <Link href="/career/career-guide" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">map</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Career Guide</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Roadmap to Success</div>
                                            </div>
                                        </Link>

                                        <Link href="/career/hire-talent" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">person_search</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Hire Talent</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Recruit Our Graduates</div>
                                            </div>
                                        </Link>

                                        <Link href="/corporate-training" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">business</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Corporate Training</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Upskill Your Workforce</div>
                                            </div>
                                        </Link>

                                        <Link href="/internships" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">badge</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Internships</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Real-world Experience</div>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            </div>

                            {/* Locations Dropdown (Dynamic pSEO) */}
                            <div className="relative group h-full flex items-center">
                                <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-default py-2">
                                    Locations
                                </span>
                                <div className="absolute top-full left-0 mt-2 w-[400px] bg-surface border border-border-color rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-[100] translate-y-2 group-hover:translate-y-0 overflow-hidden ring-1 ring-border-color/20">
                                    <div className="p-2 grid gap-1 max-h-[80vh] overflow-y-auto custom-scrollbar">

                                        {/* India Section */}
                                        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                                            India Centers
                                        </div>
                                        {/* Mumbai */}
                                        <Link href="/india/mumbai" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Mumbai</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Financial Capital</div>
                                            </div>
                                        </Link>

                                        {/* Delhi */}
                                        <Link href="/india/delhi" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">policy</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Delhi</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">National Capital Region</div>
                                            </div>
                                        </Link>

                                        {/* Bangalore */}
                                        <Link href="/india/bangalore" className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item">
                                            <div className="shrink-0 size-10 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">code</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Bangalore</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">Silicon Valley of India</div>
                                            </div>
                                        </Link>

                                        {/* View More India Cities */}
                                        <div className="px-1">
                                            <button
                                                onClick={(e) => { e.preventDefault(); setShowAllLocations(!showAllLocations); }}
                                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-deep transition-colors group/btn"
                                            >
                                                <span className="text-xs font-bold text-muted-foreground group-hover/btn:text-primary transition-colors">Other Indian Cities</span>
                                                <span className={`material-symbols-outlined text-muted-foreground group-hover/btn:text-primary text-sm transition-transform duration-200 ${showAllLocations ? 'rotate-180' : ''}`}>expand_more</span>
                                            </button>

                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAllLocations ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                                <div className="grid grid-cols-2 gap-1 p-1">
                                                    {Object.values(cityConfigs)
                                                        .filter(city => city.country === 'India' && city.slug !== 'india' && !['mumbai', 'delhi', 'bangalore'].includes(city.slug))
                                                        .map(city => (
                                                            <Link
                                                                key={city.slug}
                                                                href={`/india/${city.slug}`}
                                                                className="block px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-surface-deep hover:text-primary rounded-md transition-colors truncate"
                                                            >
                                                                {city.name}
                                                            </Link>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="my-1 border-t border-border-color"></div>

                                        {/* International Section */}
                                        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                                            Global
                                        </div>

                                        {/* International Toggle */}
                                        <div className="px-1">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowInternational(!showInternational);
                                                }}
                                                className="w-full flex items-start gap-4 p-3 rounded-xl hover:bg-surface-deep transition-all group/item text-left"
                                            >
                                                <div className="shrink-0 size-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-[20px]">public</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">International</div>
                                                        <span className={`material-symbols-outlined text-muted-foreground group-hover/item:text-primary text-sm transition-transform duration-200 ${showInternational ? 'rotate-180' : ''}`}>expand_more</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-80">USA, UK, Canada & More</div>
                                                </div>
                                            </button>

                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showInternational ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="pl-14 pr-2 pb-2 space-y-1">
                                                    {Array.from(new Set(Object.values(cityConfigs)
                                                        .filter(c => c.country !== 'India' && c.slug !== 'india')
                                                        .map(c => c.country || 'Other')))
                                                        .sort()
                                                        .map(country => (
                                                            <div key={country} className="rounded-lg overflow-hidden border border-border-color/50">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setOpenCountry(openCountry === country ? null : country);
                                                                    }}
                                                                    className="w-full flex items-center justify-between px-3 py-2 bg-surface hover:bg-surface-deep transition-colors"
                                                                >
                                                                    <span className="text-xs font-bold text-foreground">{country}</span>
                                                                    <span className={`material-symbols-outlined text-[10px] text-muted-foreground transition-transform duration-200 ${openCountry === country ? 'rotate-180' : ''}`}>expand_more</span>
                                                                </button>

                                                                <div className={`bg-surface-deep/30 transition-all duration-200 ease-in-out ${openCountry === country ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                                    <div className="grid grid-cols-2 gap-px p-1">
                                                                        {Object.values(cityConfigs)
                                                                            .filter(city => city.country === country)
                                                                            .map(city => (
                                                                                <Link
                                                                                    key={city.slug}
                                                                                    href={`/locations/${city.slug}`}
                                                                                    className="block px-2 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors truncate"
                                                                                >
                                                                                    {city.name}
                                                                                </Link>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="/faq">FAQ</Link>

                            <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="/contact">Contact</Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <Link href="/free-counseling">
                                <button className="bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold h-10 px-6 rounded-lg transition-colors border border-primary/20">
                                    Free Counseling
                                </button>
                            </Link>

                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <span className="material-symbols-outlined cursor-pointer text-foreground" onClick={toggleMobileMenu}>menu</span>
                    </div>
                </div >
            </header >

            {/* Mobile Menu Overlay - REDESIGNED */}
            < div className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl transform transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'} md:hidden overflow-hidden`
            }>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border-color">
                        <Link href="/" className="flex items-center gap-3 text-foreground" onClick={toggleMobileMenu}>
                            <PixeLogo className="size-10" />
                            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">Pixe</h2>
                        </Link>
                        <button
                            onClick={toggleMobileMenu}
                            className="size-10 flex items-center justify-center text-muted-foreground hover:bg-surface-deep rounded-xl transition-colors"
                        >
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                        {/* Quick Links */}
                        <Link
                            href="/about"
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-deep active:scale-[0.98] transition-all"
                            onClick={toggleMobileMenu}
                        >
                            <div className="size-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-500">info</span>
                            </div>
                            <span className="text-base font-semibold text-foreground">About Us</span>
                            <span className="material-symbols-outlined text-muted-foreground ml-auto">chevron_right</span>
                        </Link>

                        {/* Courses Section */}
                        <details className="group">
                            <summary className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-deep cursor-pointer transition-all list-none">
                                <div className="size-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-purple-500">school</span>
                                </div>
                                <span className="text-base font-semibold text-foreground">Courses</span>
                                <span className="material-symbols-outlined text-muted-foreground ml-auto transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="ml-4 mt-2 pl-4 border-l-2 border-primary/20 space-y-1">

                                {courses
                                    .filter(c => !c.slug.includes('ui') && !c.slug.includes('ux'))
                                    .map((c, i) => (
                                        <Link
                                            key={i}
                                            href={c.slug === 'advance-digital-marketing-course' ? `/${c.slug}` : `/courses/${c.slug}`}
                                            className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-deep/50 transition-colors"
                                            onClick={toggleMobileMenu}
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                {c.slug.includes('seo') ? 'search' :
                                                    c.slug.includes('social') ? 'share' :
                                                        c.slug.includes('analytics') ? 'analytics' :
                                                            c.slug.includes('ppc') ? 'ads_click' : 'school'}
                                            </span>
                                            <span>{c.title}</span>
                                        </Link>
                                    ))}
                                <Link href="/courses" className="flex items-center gap-3 py-3 px-3 rounded-lg text-primary font-semibold hover:bg-primary/10 transition-colors" onClick={toggleMobileMenu}>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    <span>View All Courses</span>
                                </Link>
                            </div>
                        </details>

                        {/* Career Section */}
                        <details className="group">
                            <summary className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-deep cursor-pointer transition-all list-none">
                                <div className="size-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-500">work</span>
                                </div>
                                <span className="text-base font-semibold text-foreground">Career</span>
                                <span className="material-symbols-outlined text-muted-foreground ml-auto transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="ml-4 mt-2 pl-4 border-l-2 border-green-500/20 space-y-1">
                                <Link href="/career" className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-deep/50 transition-colors" onClick={toggleMobileMenu}>
                                    <span className="material-symbols-outlined text-lg">trending_up</span>
                                    <span>Career Outcomes</span>
                                </Link>
                                <Link href="/career/career-guide" className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-deep/50 transition-colors" onClick={toggleMobileMenu}>
                                    <span className="material-symbols-outlined text-lg">map</span>
                                    <span>Career Guide</span>
                                </Link>
                                <Link href="/career/hire-talent" className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-deep/50 transition-colors" onClick={toggleMobileMenu}>
                                    <span className="material-symbols-outlined text-lg">person_search</span>
                                    <span>Hire Talent</span>
                                </Link>
                                <Link href="/internships" className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-deep/50 transition-colors" onClick={toggleMobileMenu}>
                                    <span className="material-symbols-outlined text-lg">badge</span>
                                    <span>Internships</span>
                                </Link>
                            </div>
                        </details>

                        {/* Locations Section */}
                        <details className="group">
                            <summary className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-deep cursor-pointer transition-all list-none">
                                <div className="size-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-orange-500">location_on</span>
                                </div>
                                <span className="text-base font-semibold text-foreground">Locations</span>
                                <span className="material-symbols-outlined text-muted-foreground ml-auto transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="ml-4 mt-2 pl-4 border-l-2 border-orange-500/20 space-y-1">
                                {Object.values(cityConfigs)
                                    .filter(city => city.country === 'India' && city.slug !== 'india')
                                    .slice(0, 4)
                                    .map(city => (
                                        <Link
                                            key={city.slug}
                                            href={`/india/${city.slug}`}
                                            className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-deep/50 transition-colors"
                                            onClick={toggleMobileMenu}
                                        >
                                            <span className="material-symbols-outlined text-lg">apartment</span>
                                            <span>{city.name}</span>
                                            {city.status === 'active' && (
                                                <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full font-bold ml-auto">OPEN</span>
                                            )}
                                        </Link>
                                    ))}
                            </div>
                        </details>

                        {/* Simple Links */}
                        <Link
                            href="/corporate-training"
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-deep active:scale-[0.98] transition-all"
                            onClick={toggleMobileMenu}
                        >
                            <div className="size-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-indigo-500">business</span>
                            </div>
                            <span className="text-base font-semibold text-foreground">Corporate Training</span>
                            <span className="material-symbols-outlined text-muted-foreground ml-auto">chevron_right</span>
                        </Link>

                        <Link
                            href="/faq"
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-deep active:scale-[0.98] transition-all"
                            onClick={toggleMobileMenu}
                        >
                            <div className="size-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-cyan-500">help</span>
                            </div>
                            <span className="text-base font-semibold text-foreground">FAQ</span>
                            <span className="material-symbols-outlined text-muted-foreground ml-auto">chevron_right</span>
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-deep active:scale-[0.98] transition-all"
                            onClick={toggleMobileMenu}
                        >
                            <div className="size-10 bg-pink-500/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-pink-500">mail</span>
                            </div>
                            <span className="text-base font-semibold text-foreground">Contact</span>
                            <span className="material-symbols-outlined text-muted-foreground ml-auto">chevron_right</span>
                        </Link>
                    </div>

                    {/* Bottom Actions - Fixed */}
                    <div className="p-4 border-t border-border-color bg-background space-y-3 safe-area-bottom">
                        <Link href="/free-counseling" onClick={toggleMobileMenu} className="block">
                            <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-bold h-14 rounded-xl border border-primary/20 active:scale-[0.98] transition-all">
                                <span className="material-symbols-outlined">calendar_today</span>
                                Free Career Counseling
                            </button>
                        </Link>

                    </div>
                </div>
            </div >
        </>
    );
}
