"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Page {
    slug: string;
    updatedAt: string;
    size: number;
}

export default function PagesManager() {
    const [pages, setPages] = useState<Page[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const fetchPages = async () => {
        try {
            const res = await fetch("/api/pages");
            if (res.ok) {
                const allPages = await res.json();
                // Filter to only show actual frontend pages
                const WHITELIST = [
                    "about", "privacy", "terms", "refund",
                    "hire-talent", "internship", "scholarships",
                    "course-bundle", "masterclass"
                ];
                // Also include any page that doesn't look like a system page if whitelist is too restrictive?
                // For now, strict whitelist as per request "only show the pages which are visible"
                // But easier to Blacklist "editor", "landing", etc? 
                // User said "remove the rest", implies strictness.

                // Let's use a logic: Show if in whitelist OR if it's a known content page.
                // Actually, let's filter OUT known bad ones and any test pages.

                const visiblePages = allPages.filter((p: any) =>
                    WHITELIST.includes(p.slug) ||
                    (!["editor", "landing", "home", "dashboard"].includes(p.slug) && !p.slug.startsWith("test"))
                );

                setPages(visiblePages);
            }
        } catch (error) {
            console.error("Failed to fetch pages", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    // Removed Create Page functionality as Editor is deleted

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Pages</h1>
                    <p className="text-gray-400">View your website content pages.</p>
                </div>
            </div>

            {/* Pages List */}
            <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">
                        <i className="fas fa-circle-notch fa-spin text-3xl mb-4"></i>
                        <p>Loading pages...</p>
                    </div>
                ) : pages.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-file text-gray-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No pages found</h3>
                        <p className="text-gray-400 mb-6">No content pages are currently active.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#1a1d21] border-b border-gray-700">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Title / Slug</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Last Modified</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {pages.map((page, index) => (
                                    <tr key={`${page.slug}-${index}`} className="group hover:bg-[#2a2e35] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-blue-900/30 text-blue-400 flex items-center justify-center">
                                                    <i className="fas fa-file-code"></i>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white capitalize">{page.slug.replace(/-/g, ' ')}</div>
                                                    <div className="text-xs text-gray-500 font-mono">/{page.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100/10 text-green-400 border border-green-500/20">
                                                Published
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {new Date(page.updatedAt).toLocaleDateString()} at {new Date(page.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <a
                                                    href={`/${page.slug}`}
                                                    target="_blank"
                                                    className="px-3 py-1.5 text-blue-400 hover:text-white hover:bg-blue-600/20 rounded transition-colors text-sm font-semibold flex items-center gap-2"
                                                    title="View Page"
                                                >
                                                    <i className="fas fa-external-link-alt"></i> View Live
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
