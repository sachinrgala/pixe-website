"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Page {
    slug: string;
}

interface Version {
    id: number | string;
    created_at: string;
    created_by?: string;
}

interface VersionDetail extends Version {
    html: string;
    css: string;
}

export default function VersionsManager() {
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPage, setSelectedPage] = useState<string>('');
    const [versions, setVersions] = useState<Version[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<VersionDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRestoring, setIsRestoring] = useState(false);
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
            setSelectedVersion(null);
            fetch(`/api/versions?slug=${selectedPage}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setVersions(data);
                    } else {
                        setVersions([]);
                    }
                })
                .catch(console.error);
        }
    }, [selectedPage]);

    const viewVersion = async (versionId: number | string) => {
        try {
            const res = await fetch(`/api/versions?slug=${selectedPage}&version=${versionId}`);
            const data = await res.json();
            if (data.html !== undefined) {
                setSelectedVersion(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const restoreVersion = async () => {
        if (!selectedVersion) return;

        setIsRestoring(true);
        setMessage(null);

        try {
            const res = await fetch('/api/grapesjs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: selectedPage,
                    html: selectedVersion.html,
                    css: selectedVersion.css,
                    components: (selectedVersion as any).components || [],
                    styles: (selectedVersion as any).styles || []
                })
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Page restored successfully!' });
                // Refresh versions
                const versionsRes = await fetch(`/api/versions?slug=${selectedPage}`);
                const versionsData = await versionsRes.json();
                if (Array.isArray(versionsData)) {
                    setVersions(versionsData);
                }
            } else {
                setMessage({ type: 'error', text: 'Failed to restore version.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred.' });
        } finally {
            setIsRestoring(false);
        }
    };

    return (
        <div className="w-full max-w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Version History</h1>
                <p className="text-gray-400">View and restore previous versions of your pages.</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    {message.text}
                </div>
            )}

            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : pages.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400">No pages found. Create a page first.</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Page & Versions List */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-[#25282e] border border-gray-800 rounded-xl p-4">
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

                        <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-gray-800">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <i className="fas fa-history text-blue-500"></i> Versions
                                </h3>
                            </div>

                            {versions.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    <p>No versions saved yet.</p>
                                    <p className="text-sm mt-1">Versions are created when you save a page.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto">
                                    {versions.map((version, index) => (
                                        <button
                                            key={version.id}
                                            onClick={() => viewVersion(version.id)}
                                            className={`w-full p-4 text-left hover:bg-[#2a2e35] transition-colors ${selectedVersion?.id === version.id ? 'bg-blue-500/10 border-l-2 border-blue-500' : ''}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-white font-medium">
                                                        {index === 0 ? 'Latest' : `Version ${versions.length - index}`}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(version.created_at).toLocaleString()}
                                                    </div>
                                                </div>
                                                <i className="fas fa-chevron-right text-gray-600"></i>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Version Preview */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                                <h3 className="font-bold text-white">
                                    {selectedVersion ? 'Preview' : 'Select a version to preview'}
                                </h3>
                                {selectedVersion && (
                                    <button
                                        onClick={restoreVersion}
                                        disabled={isRestoring}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isRestoring ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-undo"></i>}
                                        Restore This Version
                                    </button>
                                )}
                            </div>

                            {selectedVersion ? (
                                <div className="bg-white">
                                    <style dangerouslySetInnerHTML={{ __html: selectedVersion.css || '' }} />
                                    <div
                                        className="min-h-[400px] p-4"
                                        dangerouslySetInnerHTML={{ __html: selectedVersion.html || '<p>No content</p>' }}
                                    />
                                </div>
                            ) : (
                                <div className="min-h-[400px] flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <i className="fas fa-eye-slash text-4xl mb-4"></i>
                                        <p>Click a version to preview</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
