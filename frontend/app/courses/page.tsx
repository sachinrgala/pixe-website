// Navbar import removed
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";

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

// Helper to fetch courses from the API
async function getCourses(): Promise<Course[]> {
    try {
        const res = await fetch('http://localhost:8080/api/v1/courses', {
            next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
        });

        if (!res.ok) {
            console.error('Failed to fetch courses:', res.status, res.statusText);
            return []; // Return empty array on failure
        }

        const data = await res.json();
        // Enrich data with fallbacks if needed
        // Hardcoded courses to always include (in case they're missing from API)
        const hardcodedCourses: Course[] = [
            {
                id: 9001,
                title: "WordPress & Web Development",
                slug: "wordpress-development-course",
                description: "Master no-code web development. Build professional websites in 4-6 weeks using WordPress, Elementor & Divi.",
                image: "/images/courses/wordpress/hero.png",
                duration: "4-6 Weeks",
                level: "Beginner",
                tags: ["No-Code", "Freelance"],
                badge: "Popular"
            }
        ];

        const filteredData = data
            // Filter out UX/UI courses
            .filter((course: Course) =>
                !course.title.toLowerCase().includes('ux') &&
                !course.title.toLowerCase().includes('ui') &&
                !course.slug.toLowerCase().includes('ux') &&
                !course.slug.toLowerCase().includes('ui')
            )
            .map((course: Course, index: number) => ({
                ...course,
                image: course.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
                tags: course.tags || ["Online", "Certification"],
                badge: index === 0 ? "Bestseller" : (index === 2 ? "Fast Filling" : undefined)
            }));

        // Merge hardcoded courses (avoid duplicates by slug)
        const existingSlugs = new Set(filteredData.map((c: Course) => c.slug));
        const mergedCourses = [
            ...filteredData,
            ...hardcodedCourses.filter(hc => !existingSlugs.has(hc.slug))
        ];

        return mergedCourses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

export default async function DigitalMarketingCoursesPage() {
    const courses = await getCourses();

    return (
        <>
            {/* Navbar handled globally */}
            <main className="bg-[#F9FAFB] text-[#111827] font-body antialiased selection:bg-[#135bec]/20 selection:text-[#135bec] pb-24 md:pb-0">

                {/* Hero Section - Mobile Optimized */}
                <section className="relative py-6 lg:py-16 bg-[#F9FAFB] overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                        <h1 className="font-display text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 lg:mb-8">
                            Digital Marketing Courses
                        </h1>
                        <div className="max-w-2xl mx-auto relative group mb-6">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#135bec] to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative flex items-center bg-white rounded-xl shadow-lg ring-1 ring-slate-900/5">
                                <span className="material-symbols-outlined text-slate-400 ml-5 text-2xl">search</span>
                                <input className="w-full py-4 px-4 bg-transparent border-none text-slate-900 placeholder-slate-400 focus:ring-0 text-base md:text-lg focus:outline-none" placeholder="Search for Python, MBA, Data Science..." type="search" />
                                <button className="mr-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors hidden sm:block">
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
                            <span className="font-medium">Popular:</span>
                            <button className="hover:text-[#135bec] underline decoration-slate-300 underline-offset-4 decoration-1 hover:decoration-[#135bec] transition-all">SEO</button>
                            <span className="text-slate-300">•</span>
                            <button className="hover:text-[#135bec] underline decoration-slate-300 underline-offset-4 decoration-1 hover:decoration-[#135bec] transition-all">Content Strategy</button>
                            <span className="text-slate-300">•</span>
                            <button className="hover:text-[#135bec] underline decoration-slate-300 underline-offset-4 decoration-1 hover:decoration-[#135bec] transition-all">Social Media Marketing</button>
                        </div>
                    </div>
                </section>

                {/* Course Listing */}
                <section className="py-6 lg:py-8 bg-white min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap gap-2 lg:gap-3 mb-8 lg:mb-10 items-center">
                            <span className="text-sm font-semibold text-slate-900 mr-2">Filter by:</span>
                            <button className="px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:border-[#135bec] hover:text-[#135bec] hover:bg-blue-50 transition-colors shadow-sm">
                                Certification
                            </button>
                            <button className="px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:border-[#135bec] hover:text-[#135bec] hover:bg-blue-50 transition-colors shadow-sm">
                                Weekend Batches
                            </button>
                            <button className="px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:border-[#135bec] hover:text-[#135bec] hover:bg-blue-50 transition-colors shadow-sm">
                                Online
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
                            {courses && courses.length > 0 ? (
                                courses.map((course) => (
                                    <div key={course.id || course.slug} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full border border-gray-100">
                                        <div className="aspect-[16/9] bg-slate-200 relative overflow-hidden">
                                            {course.image ? (
                                                <img alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={course.image} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                                    <span className="material-symbols-outlined text-6xl">image</span>
                                                </div>
                                            )}
                                            {course.badge && (
                                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-orange-600 shadow-sm border border-orange-100 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span> {course.badge}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {course.tags && course.tags.map(tag => (
                                                    <span key={tag} className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wide border border-blue-100">{tag}</span>
                                                ))}
                                                {/* Fallback tags if none provided */}
                                                {(!course.tags || course.tags.length === 0) && (
                                                    <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wide border border-blue-100">Online</span>
                                                )}
                                            </div>
                                            <h3 className="font-display text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-[#135bec] transition-colors">{course.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 mt-auto">
                                                <span className="material-symbols-outlined text-lg text-slate-400">schedule</span>
                                                <span>{course.duration || "Self Paced"}</span>
                                            </div>
                                            <div className="pt-5 flex gap-3 border-t border-slate-100 mt-auto">
                                                <Link
                                                    href={course.slug === 'advance-digital-marketing-course' ? `/${course.slug}` : `/courses/${course.slug}`}
                                                    className="flex-1 py-2.5 bg-[#135bec] hover:bg-blue-700 text-white text-center text-sm font-bold rounded-lg transition-colors shadow-sm"
                                                >
                                                    Enroll Now
                                                </Link>
                                                <Link
                                                    href={course.slug === 'advance-digital-marketing-course' ? `/${course.slug}` : `/courses/${course.slug}`}
                                                    className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-center text-sm font-semibold rounded-lg transition-colors"
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-slate-500">
                                    <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">school</span>
                                    <p>No courses found. Check back soon!</p>
                                </div>
                            )}
                        </div>

                        {/* Recommended For You */}
                        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-blue-100 overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                                <div className="flex items-start gap-4 max-w-2xl">
                                    <div className="p-3 bg-white rounded-full shadow-sm text-[#135bec] shrink-0">
                                        <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">Recommended for You</h3>
                                        <p className="text-sm text-slate-600">
                                            Based on your interest in "SEO" and location (New York), we think these courses align perfectly with your career goals.
                                        </p>
                                        <div className="mt-4 flex gap-2">
                                            <div className="h-2 w-24 bg-blue-200 rounded-full animate-pulse"></div>
                                            <div className="h-2 w-16 bg-blue-200 rounded-full animate-pulse delay-75"></div>
                                        </div>
                                    </div>
                                </div>
                                <button className="whitespace-nowrap px-6 py-2.5 bg-white text-[#135bec] font-bold text-sm rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all">
                                    View Recommendations
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-8 lg:py-16 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Placement Outcomes */}
                            <div className="bg-[#F9FAFB] rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2.5 bg-green-100 rounded-xl text-green-700">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Placement Outcomes</h3>
                                </div>
                                <div className="mb-10 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex items-end gap-3 mb-3">
                                        <span className="text-4xl font-display font-bold text-slate-900">₹8.5 LPA</span>
                                        <span className="text-sm font-medium text-slate-500 mb-1.5 pb-0.5">Average Package</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                                        <div className="bg-green-500 h-full rounded-full" style={{ width: "75%" }}></div>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-green-600">trending_up</span>
                                        Highest package recorded: ₹24 LPA this quarter.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Our Alumni Work At</p>
                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="h-12 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 font-bold grayscale opacity-70 hover:opacity-100 transition-opacity">GOOGLE</div>
                                        <div className="h-12 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 font-bold grayscale opacity-70 hover:opacity-100 transition-opacity">META</div>
                                        <div className="h-12 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 font-bold grayscale opacity-70 hover:opacity-100 transition-opacity">AMAZON</div>
                                        <div className="h-12 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 font-bold grayscale opacity-70 hover:opacity-100 transition-opacity">UBER</div>
                                    </div>
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
                <section className="bg-slate-900 text-white py-10 lg:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#135bec] rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white mb-8 backdrop-blur-sm border border-white/10 shadow-glow">
                            <span className="material-symbols-outlined text-3xl">menu_book</span>
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Get the Full Syllabus</h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Receive detailed curriculum &amp; career path guidance directly in your inbox to help you make the right choice.</p>
                        <UniversalLeadForm
                            formId="syllabus-download"
                            source="courses_syllabus"
                            course="Digital Marketing Course"
                            apiEndpoint="/api/leads"
                            submitButtonText="Download Brochure"
                            successMessage="Syllabus sent to your email!"
                            className="max-w-md mx-auto"
                        />
                        <p className="text-xs text-slate-600 mt-6">*Triggers automated email nurture sequence.</p>
                    </div>
                </section>

                {/* Demo CTA */}
                <section className="py-8 lg:py-16 bg-gradient-to-b from-orange-50/5 to-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="bg-white rounded-2xl lg:rounded-3xl p-6 md:p-14 shadow-lg border border-orange-100 relative overflow-hidden">
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
