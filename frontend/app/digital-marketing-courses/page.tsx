// Navbar import removed
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";
import { FilteredCourseList } from "../../components/courses/FilteredCourseList";

// Define the interface for the Course data
interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string; // API returns 'image'
    duration: string;
    level?: string;
    tags?: string[];
    badge?: string;
    rating?: number;
    price?: number;
    enrollmentStatus?: string;
}

const FALLBACK_IMAGES = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDQLaGM_ccOGBvYbq290Vxvs7iYbDfH6v28nRMfOziGh4eeu4ZkfMMHgPl33SnQzwj4np16GitDMnwWSUH7-3NaAtDXJPYLR-0woa-4Musg9-Ww6AcO0PA7MkbfRwiRaffdQSQUCLMcRBtEUkT4pA0lXvfMdlMPhZEFMV3XZ_ojhFgUvdzR9SazkrXhcp6xjCyHJPWcgDJCJ-Iahc0eYtCgsNRhfmcWLIQQh8pVS4bzH-LpkGuX6LYzSKQPZ6AFFLgusDPF6lZhpP0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxViNsT1kDC22m6zgVLL_4llNR3wK0IWD9zVfJgjmpWcBuPdclhfiTempgsEHoH5JXSmhnzsWSMqXejsWMOKunrWHrXAwznxoEhRCf81Dc_otYu5v94QFaDA0GjkyEI7C3dDiK2OHgEnT35jr3bKYxFroEdkjs_eqn7bLlkU5S67mK73_xtrZhfWd7y40MWZGooFpqmmALVJkf4iyWqu_NCfmEnEP1-49KZsrOHff5rOnJP7F3JuWhO5leQn8EV9q23m1VPqAiGZw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC3UMw7HZBMv3Wt5jQCDnCMZHy1UuG4uMQ6V4MExLnR4z1h0JQECSJeibF8R1sPqKyGROpaWfcVb9vT7WUUALrtCyyPLiKEyZUpRJzh8ZNVZkgSX0kcxFIQ7UO7O0kRLGG4Mdn_ph8EwO5_xGNsmP0uipc63DtSV0X1Mq_sjigyRvO1RrePvlsJMHPxvYiEVHSfgnFynV0lN9J8458lZcpZNWWgjUJ5QWr5rC-ZzvTsJCHzeBsiGyTS7_IT6IA9CXqol_imcaQrYyI",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2931&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop"
];

const DEFAULT_COURSES: Course[] = [
    {
        id: 1,
        title: "Advance Digital Marketing & AI Agency Simulation",
        slug: "advance-digital-marketing-course",
        description: "Master the entire digital landscape with our flagship agency-simulation program. Learn SEO, PPC, and AI tools.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
        duration: "11 Months",
        tags: ["Agency Simulation", "AI-Integrated", "100% Placement"],
        badge: "Best Seller"
    },
    {
        id: 2,
        title: "Performance Marketing & Analytics Specialization",
        slug: "ppc-course",
        description: "Scale with paid ads. Deep dive into Google Ads, Facebook (Meta) Ads, and programmatic advertising.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        duration: "4 Months",
        tags: ["Data-Driven", "Advanced Analytics"],
        badge: "High Demand"
    },
    {
        id: 3,
        title: "SEO & Content Strategy Masterclass",
        slug: "seo-course",
        description: "Learn to rank #1. Comprehensive training in Technical SEO, Content Marketing, and Link Building strategies.",
        image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2940&auto=format&fit=crop",
        duration: "3 Months",
        tags: ["Organic Growth", "Content Strategy"],
        badge: undefined
    },
    {
        id: 4,
        title: "Social Media Marketing & Personal Branding",
        slug: "social-media-marketing-course",
        description: "Build viral brands. Master Instagram, LinkedIn, and Influencer Marketing to grow organic communities.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2940&auto=format&fit=crop",
        duration: "3 Months",
        tags: ["Viral Growth", "Personal Branding"],
        badge: "Trending"
    },
    {
        id: 5,
        title: "Analytics & Data Science for Marketers",
        slug: "analytics-course",
        description: "Turn data into decisions. seamless integration of GA4, Looker Studio, and Python for marketing insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
        duration: "3 Months",
        tags: ["GA4 Mastery", "Data Visualization"],
        badge: undefined
    },
    {
        id: 6,
        title: "Affiliate & Email Marketing Automation",
        slug: "affiliate-email-marketing-course",
        description: "Generate passive income. Learn high-ticket affiliate strategies and advanced email automation flows.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2940&auto=format&fit=crop",
        duration: "2 Weeks",
        tags: ["Passive Income", "Automation"],
        badge: "Short Course"
    }
];

// Helper to fetch courses from the API
async function getCourses(): Promise<Course[]> {
    try {
        const res = await fetch('http://localhost:8080/api/v1/courses', {
            next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
        });

        if (!res.ok) {
            console.error('Failed to fetch courses:', res.status, res.statusText);
            return DEFAULT_COURSES;
        }

        const data = await res.json();

        if (!data || !Array.isArray(data) || data.length === 0) {
            return DEFAULT_COURSES;
        }

        // Enrich data with fallbacks if needed
        return data.map((course: Course, index: number) => ({
            ...course,
            image: course.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
            tags: course.tags || ["Online", "Certification"], // Ensure tags exist
            badge: index === 0 ? "Bestseller" : (index === 2 ? "Fast Filling" : undefined) // Mock badges for demo
        }));
    } catch (error) {
        console.error('Error fetching courses:', error);
        return DEFAULT_COURSES;
    }

}

export default async function DigitalMarketingCoursesPage() {
    const courses = await getCourses();

    return (
        <>
            {/* Navbar handled globally */}
            <main className="bg-[#F9FAFB] text-[#111827] font-body antialiased selection:bg-[#135bec]/20 selection:text-[#135bec] pb-24 md:pb-0">

                {/* Hero Section */}
                <section className="relative py-12 lg:py-20 bg-[#F9FAFB] overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
                            Admissions Open for 2026 Batch
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                            India’s Most Industry-Aligned <br className="hidden md:block" /> Digital Marketing Programs
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            Master the tools top agencies use. From basics to AI-driven strategies, find the perfect course to launch your career.
                        </p>
                        <div className="max-w-2xl mx-auto relative group mb-8">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#135bec] to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative flex items-center bg-white rounded-xl shadow-lg ring-1 ring-slate-900/5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
                                <span className="material-symbols-outlined text-slate-400 ml-5 text-2xl">search</span>
                                <input className="w-full py-4 px-4 bg-transparent border-none text-slate-900 placeholder-slate-400 focus:ring-0 text-base md:text-lg focus:outline-none" placeholder="What skill do you want to master today? (e.g., SEO, AI)" type="search" />
                                <button className="mr-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors hidden sm:block">
                                    Find Course
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
                            <span className="font-medium text-slate-700">Trending:</span>
                            <button className="hover:text-[#135bec] hover:underline transition-all">AI Marketing</button>
                            <span className="text-slate-300">•</span>
                            <button className="hover:text-[#135bec] hover:underline transition-all">Performance Marketing</button>
                            <span className="text-slate-300">•</span>
                            <button className="hover:text-[#135bec] hover:underline transition-all">Agency Simulation</button>
                        </div>
                    </div>
                </section>

                {/* Course Listing */}
                <section className="py-8 bg-white min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FilteredCourseList courses={courses} />

                        {/* Recommended For You - Enhanced */}
                        {/* Recommended For You - Enhanced */}
                        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden mb-16 ring-1 ring-white/20">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 rounded-full blur-[80px] opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-semibold text-xs border border-white/20 mb-6 backdrop-blur-md shadow-sm">
                                        <span className="material-symbols-outlined text-sm text-yellow-300">stars</span>
                                        <span>Personalized Career Path</span>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 leading-tight">
                                        Confused about which course to pick?
                                    </h3>
                                    <p className="text-blue-50 text-lg leading-relaxed mb-0 opacity-95 font-medium">
                                        Take our 2-minute AI assessment. We'll match your personality and career goals to the perfect digital marketing specialization.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                                    <Link href="/career" className="px-8 py-4 bg-white text-blue-700 font-bold text-base rounded-xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 transform hover:-translate-y-1 whitespace-nowrap text-center flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">psychology</span>
                                        Take Career Quiz
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust & Outcomes Section */}
                <section className="py-16 lg:py-24 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Outcome Stats */}
                            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 md:p-10 border border-slate-200">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-green-100 rounded-xl text-green-700 shadow-sm border border-green-200">
                                        <span className="material-symbols-outlined text-2xl">trending_up</span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-slate-900">Outcome-Driven Success</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="text-3xl font-display font-bold text-slate-900 mb-1">70%</div>
                                        <div className="text-sm font-semibold text-slate-500">Avg. Salary Hike</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="text-3xl font-display font-bold text-slate-900 mb-1">500+</div>
                                        <div className="text-sm font-semibold text-slate-500">Hiring Partners</div>
                                    </div>
                                </div>

                                <div className="mb-8 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex items-end gap-3 mb-3">
                                        <span className="text-4xl font-display font-bold text-slate-900">₹8.5 LPA</span>
                                        <span className="text-sm font-medium text-slate-500 mb-1.5 pb-0.5">Average Package</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                                        <div className="bg-green-500 h-full rounded-full" style={{ width: "85%" }}></div>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                                        Placement stats verified by third-party audit.
                                    </p>
                                </div>
                            </div>


                            {/* Student Success */}
                            <div className="bg-[#F9FAFB] rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2.5 bg-blue-100 rounded-xl text-blue-700">
                                        <span className="material-symbols-outlined">groups</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Student Success</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-5 h-full content-start">
                                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                                        <span className="block text-4xl font-bold text-[#135bec] mb-2">15k+</span>
                                        <span className="text-sm text-slate-500 font-medium">Alumni Network</span>
                                    </div>
                                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                                        <span className="block text-4xl font-bold text-[#135bec] mb-2">92%</span>
                                        <span className="text-sm text-slate-500 font-medium">Placement Rate</span>
                                    </div>
                                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                                        <span className="block text-4xl font-bold text-[#135bec] mb-2">4.8</span>
                                        <span className="text-sm text-slate-500 font-medium flex items-center gap-1 justify-center">
                                            <span className="material-symbols-outlined text-yellow-400 text-sm">star</span> Rating
                                        </span>
                                    </div>
                                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                                        <span className="block text-4xl font-bold text-[#135bec] mb-2">500+</span>
                                        <span className="text-sm text-slate-500 font-medium">Hiring Partners</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Syllabus Download (Dark Section) */}
                <section className="bg-[#0F172A] text-white py-16 lg:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#135bec] rounded-full blur-[100px] opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                                Updated for 2026
                            </span>
                            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Get the 2026 Industry-Ready Curriculum</h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Don't learn outdated tactics. See exactly what tools (<span className="text-white font-medium">ChatGPT, Midjourney, Semrush</span>) you'll master in our week-by-week breakdown.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="material-symbols-outlined text-green-400">check</span> 12+ Modules
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="material-symbols-outlined text-green-400">check</span> Tool Access
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="material-symbols-outlined text-green-400">check</span> Fee Structure
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                            <UniversalLeadForm
                                formId="syllabus-download"
                                source="courses_syllabus"
                                course="Digital Marketing Course"
                                apiEndpoint="/api/leads"
                                submitButtonText="Download Syllabus PDF"
                                successMessage="Syllabus sent to your email!"
                                className="w-full"
                            />
                            <p className="text-xs text-slate-500 mt-4 text-center">
                                By downloading, you agree to receive career guidance tips.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SEO Text Block */}
                <section className="py-12 bg-[#F8FAFC] border-t border-slate-200">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Why Study with Pixe?</h2>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            In today's digital-first economy, theory isn't enough. Pixe Education offers the <strong>best digital marketing courses in India</strong> designed for the AI era. Whether you are in <strong>Mumbai, Bangalore, or Delhi</strong>, our remote-first Agency Simulation model allows you to work on live projects for real brands. Unlike traditional institutes, we don't just teach modules; we simulate the pressure and performance of a top-tier ad agency. Master <strong>SEO, PPC, and Social Media Marketing</strong> with a curriculum that updates every quarter to include the latest AI tools.
                        </p>
                    </div>
                </section>

                {/* Demo CTA */}
                <section className="py-10 lg:py-16 bg-gradient-to-b from-orange-50/5 to-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="bg-white rounded-3xl p-6 md:p-14 shadow-lg border border-orange-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full -mr-20 -mt-20 blur-3xl opacity-60"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full -ml-20 -mb-20 blur-3xl opacity-60"></div>
                            <div className="relative z-10">
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3">Attend a Free Demo Class</h3>
                                <p className="text-slate-600 mb-8 text-lg">Experience our live teaching methodology before you commit to a course.</p>
                                <Link href="/free-counseling" className="inline-flex items-center justify-center gap-3 py-3.5 px-8 bg-slate-900 text-white text-base font-bold rounded-full hover:bg-slate-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                    <span className="material-symbols-outlined text-orange-400">play_circle</span>
                                    Book Free Workshop
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile Sticky Bottom CTA */}
                <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 md:hidden">
                    <Link href="/free-counseling" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors">
                        <span className="material-symbols-outlined">chat</span>
                        Talk to Counselor
                    </Link>
                </div>
                {/* Desktop Sticky Bottom CTA */}
                <div className="hidden md:block fixed bottom-8 right-8 z-50">
                    <Link href="/free-counseling" className="group py-4 px-8 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-2xl flex items-center gap-3 transform hover:-translate-y-1 transition-all">
                        <span className="bg-white/20 p-1 rounded-full"><span className="material-symbols-outlined text-xl">support_agent</span></span>
                        Talk to Counselor
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
