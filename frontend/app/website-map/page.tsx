import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function SitemapPage() {
    const sections = [
        {
            title: "Main Pages",
            links: [
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Pricing", href: "/pricing" },
                { name: "Free Counseling", href: "/free-counseling" },
                { name: "Success Stories", href: "/success-stories" },
                { name: "Reviews", href: "/reviews" },
            ]
        },
        {
            title: "Courses",
            links: [
                { name: "All Courses", href: "/courses" },
                { name: "Digital Marketing Masterclass", href: "/advance-digital-marketing-course" },
                { name: "SEO Specialization", href: "/seo-course" },
                { name: "PPC & Performance", href: "/ppc-course" },
                { name: "Social Media Marketing", href: "/social-media-marketing-course" },
                { name: "Web Analytics", href: "/analytics-course" },
                { name: "Affiliate & Email Marketing", href: "/affiliate-email-marketing-course" },
                { name: "UI/UX Design", href: "/ui-ux-design" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Resource Hub", href: "/resources" },
                { name: "Free Tools", href: "/resources/tools" },
                { name: "Blog", href: "/resources" },
                { name: "Career Guide", href: "/resources" },
            ]
        },
        {
            title: "Locations",
            links: [
                { name: "All Locations", href: "/locations" },
                { name: "Bangalore", href: "/locations/bangalore" },
                { name: "Delhi NCR", href: "/locations/delhi" },
                { name: "Mumbai", href: "/locations/mumbai" },
                { name: "Pune", href: "/locations/pune" },
                { name: "UAE", href: "/locations/uae" },
                { name: "USA", href: "/locations/us" },
            ]
        },
        {
            title: "Corporate & Career",
            links: [
                { name: "Corporate Training", href: "/corporate-training" },
                { name: "Hire Talent", href: "/career/hire-talent" },
                { name: "Placements", href: "/career" },
                { name: "Internships", href: "/internships" },
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "/legal/privacy" },
                { name: "Terms & Conditions", href: "/legal/terms" },
                { name: "Refund Policy", href: "/legal/refund" },
            ]
        }
    ];

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#101622] min-h-screen font-display text-[#111318] dark:text-white">

            <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black mb-4">Sitemap</h1>
                    <p className="text-[#616f89] dark:text-gray-400 text-lg">
                        Overview of all pages on our website.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#1a202c] p-8 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 text-[#135bec] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#135bec]"></span>
                                {section.title}
                            </h2>
                            <ul className="space-y-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-[#616f89] dark:text-gray-400 hover:text-[#111318] dark:hover:text-white font-medium hover:underline transition-colors block py-0.5"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
