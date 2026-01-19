"use client";

import { useEffect, useState } from "react";

interface Page {
    slug: string;
}

interface SEOData {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    ogImage: string;
}

export default function SEOManager() {
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPage, setSelectedPage] = useState<string>('');
    const [seoData, setSeoData] = useState<SEOData>({
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        ogImage: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetch('/api/pages')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPages(data);
                    if (data.length > 0) {
                        setSelectedPage(data[0].slug);
                    }
                }
                setIsLoading(false);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedPage) {
            fetch(`/api/seo?slug=${selectedPage}`)
                .then(res => res.json())
                .then(data => {
                    setSeoData({
                        seoTitle: data.seo_title || data.seoTitle || '',
                        seoDescription: data.seo_description || data.seoDescription || '',
                        seoKeywords: data.seo_keywords || data.seoKeywords || '',
                        ogImage: data.og_image || data.ogImage || ''
                    });
                })
                .catch(console.error);
        }
    }, [selectedPage]);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/seo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: selectedPage, ...seoData })
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'SEO settings saved successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save SEO settings.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">SEO Manager</h1>
                <p className="text-gray-400">Optimize your pages for search engines.</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    {message.text}
                </div>
            )}

            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading pages...</div>
            ) : pages.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400">No pages found. Create a page first.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Page Selector */}
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl p-6">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Select Page</label>
                        <select
                            value={selectedPage}
                            onChange={(e) => setSelectedPage(e.target.value)}
                            className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            {pages.map((page, index) => (
                                <option key={`${page.slug}-${index}`} value={page.slug}>/{page.slug}</option>
                            ))}
                        </select>
                    </div>

                    {/* SEO Fields */}
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl p-6 space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <i className="fas fa-search text-blue-500"></i> SEO Settings for /{selectedPage}
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                SEO Title <span className="text-gray-600">(60 chars recommended)</span>
                            </label>
                            <input
                                type="text"
                                value={seoData.seoTitle}
                                onChange={(e) => setSeoData({ ...seoData, seoTitle: e.target.value })}
                                placeholder="Page title for search engines"
                                maxLength={70}
                                className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <div className="text-xs text-gray-500 mt-1">{seoData.seoTitle.length}/70 characters</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Meta Description <span className="text-gray-600">(160 chars recommended)</span>
                            </label>
                            <textarea
                                value={seoData.seoDescription}
                                onChange={(e) => setSeoData({ ...seoData, seoDescription: e.target.value })}
                                placeholder="Brief description for search results"
                                maxLength={200}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <div className="text-xs text-gray-500 mt-1">{seoData.seoDescription.length}/200 characters</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Keywords</label>
                            <input
                                type="text"
                                value={seoData.seoKeywords}
                                onChange={(e) => setSeoData({ ...seoData, seoKeywords: e.target.value })}
                                placeholder="keyword1, keyword2, keyword3"
                                className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">OG Image URL</label>
                            <input
                                type="text"
                                value={seoData.ogImage}
                                onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Preview */}
                        <div className="pt-6 border-t border-gray-800">
                            <h3 className="text-sm font-medium text-gray-400 mb-4">Google Search Preview</h3>
                            <div className="bg-white rounded-lg p-4 max-w-xl">
                                <div className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                                    {seoData.seoTitle || `${selectedPage} | Your Website`}
                                </div>
                                <div className="text-green-700 text-sm">
                                    yourwebsite.com/{selectedPage}
                                </div>
                                <div className="text-gray-600 text-sm line-clamp-2">
                                    {seoData.seoDescription || 'Add a meta description to appear here...'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                            Save SEO Settings
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
