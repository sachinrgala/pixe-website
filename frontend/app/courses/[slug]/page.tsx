import { Metadata } from 'next';
import Link from "next/link";
import { notFound } from "next/navigation";
// Navbar import removed
import { Footer } from "@/components/layout/Footer";
import { UniversalLeadForm } from "@/components/forms/UniversalLeadForm";

// Types
interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    duration: string;
    price: number;
    image: string;
    status: string;
}

// Fetch helper
async function getCourse(slug: string): Promise<Course | null> {
    try {
        // In a real app with slug endpoint: fetch(\`API/courses/\${slug}\`)
        // Here we fetch all and filter (fine for caching)
        const res = await fetch("http://localhost:8080/api/v1/courses", {
            next: { revalidate: 60 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        const courses: Course[] = Array.isArray(data) ? data : [];
        return courses.find(c => c.slug === slug) || null;
    } catch (e) {
        console.error("Fetch error:", e);
        return null;
    }
}

// 1. Dynamic Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const course = await getCourse(slug);

    if (!course) {
        return {
            title: 'Course Not Found',
        };
    }

    return {
        title: course.title,
        description: course.description,
        openGraph: {
            title: course.title + " | Pixe Education",
            description: course.description,
            type: 'article',
        },
    };
}

// 2. Server Component
export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const course = await getCourse(slug);

    if (!course) {
        return notFound();
    }

    // 3. JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.description,
        provider: {
            '@type': 'Organization',
            name: 'Pixe Education',
            sameAs: 'https://pixe.education'
        },
        offers: {
            '@type': 'Offer',
            price: course.price,
            priceCurrency: 'INR',
            category: 'Paid'
        },
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'Blended', // Online + Live
            courseWorkload: course.duration
        }
    };

    return (
        <div className="min-h-screen bg-[#111] text-white font-sans">
            {/* Inject Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Navbar handled globally */}

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 px-4 bg-gradient-to-b from-[#1a1d21] to-[#111]">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                Certification Program
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                {course.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                                <span className="flex items-center gap-2 bg-[#25282e] px-4 py-2 rounded-lg">
                                    <i className="far fa-clock text-blue-500"></i> {course.duration}
                                </span>
                                <span className="flex items-center gap-2 bg-[#25282e] px-4 py-2 rounded-lg">
                                    <i className="fas fa-video text-green-500"></i> Online + Live
                                </span>
                                <span className="flex items-center gap-2 bg-[#25282e] px-4 py-2 rounded-lg">
                                    <i className="fas fa-star text-yellow-500"></i> 4.8 Rating
                                </span>
                            </div>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <a href="#enroll" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 text-center">
                                    Enroll Now for ₹{course.price}
                                </a>
                                <a href="#enroll" className="px-8 py-4 bg-[#25282e] hover:bg-[#2f333a] text-white font-bold rounded-xl transition-all border border-gray-800 flex items-center justify-center">
                                    Download Syllabus
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-gray-800 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <i className="fas fa-layer-group text-6xl text-blue-500 mb-4 opacity-50"></i>
                                    <p className="text-gray-500">Course Preview</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What you'll learn */}
            <section className="py-10 lg:py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">What You'll Learn</h2>
                    <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto snap-x no-scrollbar pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center flex gap-4 p-6 bg-[#1a1d21] rounded-xl border border-gray-800">
                                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center shrink-0">
                                    <i className="fas fa-check text-blue-500"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Key Skill {i}</h3>
                                    <p className="text-gray-400 text-sm">Comprehensive mastery of industry relevant tools and frameworks.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Section */}
            <section id="enroll" className="py-20 bg-[#111] border-t border-gray-800">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="text-center mb-10">
                        <span className="text-blue-500 font-bold tracking-wide uppercase text-sm">Start Learning</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Enroll in {course.title}</h2>
                        <p className="text-gray-400">Get full access to the curriculum, live sessions, and placement support.</p>
                    </div>

                    <UniversalLeadForm
                        formId="registration"
                        source="course_slug_page"
                        course={course.title}
                        submitButtonText="Enroll Now"
                        successMessage="Registration successful! Check your email."
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
}
