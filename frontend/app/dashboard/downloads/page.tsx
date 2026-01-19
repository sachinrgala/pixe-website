"use client";

import { useState, useEffect } from "react";

interface Download {
    id: number;
    title: string;
    type: string;
    url: string;
    isGated: boolean;
}

export default function DownloadsPage() {
    const [downloads, setDownloads] = useState<Download[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Initial Form State
    const initialForm = { title: "", type: "brochure", url: "", isGated: true };
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            const res = await fetch("/api/downloads");
            if (res.ok) {
                setDownloads(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch downloads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/downloads/${id}`, { method: "DELETE" });
            if (res.ok) {
                setDownloads(downloads.filter(d => d.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/downloads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const newItem = await res.json();
                setDownloads([...downloads, newItem]);
                setShowModal(false);
                setFormData(initialForm);
            }
        } catch (error) {
            console.error("Failed to create", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Resource Downloads</h1>
                    <p className="text-gray-400">Manage syllabus files, brochures, and ebooks.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add Resource
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#1a1d21] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Access</th>
                                <th className="px-6 py-4 font-semibold">URL</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {downloads.map((item) => (
                                <tr key={item.id} className="hover:bg-[#2a2e35] transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300 uppercase">{item.type}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.isGated ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                                            {item.isGated ? 'Gated (Form)' : 'Public'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-blue-400 max-w-[200px] truncate">{item.url}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(item.id)} className="text-gray-500 hover:text-red-400">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {downloads.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No resources added yet.
                        </div>
                    )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6">Add New Resource</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="e.g. Data Science Course Syllabus"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="brochure">Brochure</option>
                                    <option value="syllabus">Syllabus</option>
                                    <option value="ebook">E-Book</option>
                                    <option value="cheatsheet">Cheatsheet</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">File URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isGated"
                                    checked={formData.isGated}
                                    onChange={(e) => setFormData({ ...formData, isGated: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-800 bg-[#1a1d21] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#1a1d21]"
                                />
                                <label htmlFor="isGated" className="text-sm text-gray-300">
                                    Require email to download (Gated Content)
                                </label>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all font-medium"
                                >
                                    Add Resource
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
