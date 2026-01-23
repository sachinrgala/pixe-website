import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
// import { Render } from "@measured/puck"; // REMOVED PUCK
// import config from "@/puck.config"; // REMOVED PUCK
// import "@measured/puck/puck.css"; // REMOVED PUCK
import { CourseTemplate, Course } from "@/components/templates/CourseTemplate";
import { getSupplement } from "@/data/course_content";
import { getApiUrl } from "@/lib/api";

// Force dynamic rendering to ensure fresh data from CMS
export const dynamic = "force-dynamic";

// Reserved paths to protect - these have their own page.tsx files
const RESERVED_PATHS = [
    "api", "dashboard", "_next", "static", "assets", "manifest.json", "manifest.webmanifest", "robots.txt", "sitemap.xml", "favicon.ico",
    "digital-marketing-courses",
    "login",
];

interface PageData {
    title: string;
    description?: string;
    hero?: {
        title: string;
        subtitle?: string;
        backgroundImage?: string;
    };
    sections: {
        content: string; // HTML content from WYSIWYG
    };
    html?: string;
    css?: string;
    updated_at: string;
    // SEO Fields
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    ogImage?: string;
    // puckData?: any; // IGNORED
}

// Fetch helper for courses (Fall back if page not found)
async function getCourse(slug: string): Promise<Course | null> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(getApiUrl("/courses"), {
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) return null;
        const courses: Course[] = await res.json();
        if (!Array.isArray(courses)) return null;
        return courses.find(c => c.slug === slug) || null;
    } catch (e) {
        console.error("Fetch error:", e);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug;

    // Skip reserved paths
    if (RESERVED_PATHS.includes(slugPath[0])) {
        return {
            title: 'Page Not Found'
        };
    }

    const slug = slugPath.join("-");

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(getApiUrl(`/pages/${slug}`), {
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) return { title: 'Page Not Found' };

        const data: PageData = await res.json();

        return {
            title: data.seoTitle || data.title || 'Pixe Education',
            description: data.seoDescription || data.hero?.subtitle || 'Transform your career with Pixe Education.',
            keywords: data.seoKeywords ? data.seoKeywords.split(',') : ['education', 'learning', 'courses'],
            openGraph: {
                title: data.seoTitle || data.title,
                description: data.seoDescription || data.hero?.subtitle,
                images: data.ogImage ? [{ url: data.ogImage }] : (data.hero?.backgroundImage ? [{ url: data.hero.backgroundImage }] : []),
            },
        };
    } catch (e) {
        const course = await getCourse(slug);
        if (course) {
            return {
                title: `${course.title} | Pixe Education`,
                description: course.description,
            };
        }
        return { title: 'Page Not Found' };
    }
}

export default async function DynamicCMSPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug;

    if (RESERVED_PATHS.includes(slugPath[0])) {
        notFound();
    }

    const slug = slugPath.join("-");

    // FORCE OVERRIDE for known courses to ensure CourseTemplate is used
    // This allows us to have a CMS page for content backup but use the rigorous Template for display
    const COURSE_SLUGS = [
        "seo-course", "ui-ux-design", "advance-digital-marketing-course",
        "ppc-course", "analytics-course", "affiliate-email-marketing-course", "social-media-marketing-course"
    ];

    if (COURSE_SLUGS.includes(slug)) {
        const course = await getCourse(slug);
        if (course) {
            const supplement = getSupplement(slug);
            return <CourseTemplate course={course} supplement={supplement} />;
        }
    }

    // Fetch Page Content
    let pageData: PageData | null = null;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(getApiUrl(`/pages/${slug}`), {
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
            pageData = await res.json();
        } else {
            // Try fetching as a course
            const course = await getCourse(slug);
            if (course) {
                const supplement = getSupplement(slug);
                return <CourseTemplate course={course} supplement={supplement} />;
            }
            notFound();
        }
    } catch (e) {
        const course = await getCourse(slug);
        if (course) {
            const supplement = getSupplement(slug);
            return <CourseTemplate course={course} supplement={supplement} />;
        }
        notFound();
    }

    if (!pageData) notFound();

    return (
        <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white font-body selection:bg-blue-500/20 selection:text-blue-500">
            <main className="">
                {/* GrapesJS / Full HTML Render */}
                {pageData.html ? (
                    <>
                        {pageData.css && (
                            <style dangerouslySetInnerHTML={{ __html: pageData.css }} />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: pageData.html }} />
                    </>
                ) : (
                    <>
                        {/* Legacy / Standard Page Render */}
                        <section className="relative py-20 lg:py-28 bg-slate-50 dark:bg-[#020617] overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5"></div>

                            {pageData.hero?.backgroundImage && (
                                <div className="absolute inset-0 z-0">
                                    <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply z-10"></div>
                                    <img src={pageData.hero.backgroundImage} alt="" className="w-full h-full object-cover opacity-50" />
                                </div>
                            )}

                            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display dark:text-white">
                                    {pageData.hero?.title || pageData.title}
                                </h1>
                                {pageData.hero?.subtitle && (
                                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                                        {pageData.hero.subtitle}
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="py-20 px-4">
                            <div className="max-w-4xl mx-auto">
                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 
                                               prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white 
                                               prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                               prose-img:rounded-2xl prose-img:shadow-xl"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageData.sections.content || "") }}
                                />

                                <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-400 text-center">
                                    Last updated: {new Date(pageData.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
