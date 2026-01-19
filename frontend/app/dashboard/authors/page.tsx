"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Author {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", role: "", avatar: "" });
    const router = useRouter();

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const res = await fetch("/api/authors");
            if (res.ok) {
                const data = await res.json();
                setAuthors(data);
            }
        } catch (error) {
            console.error("Failed to fetch authors", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this author?")) return;
        try {
            const res = await fetch(`/api/authors/${id}`, { method: "DELETE" });
            if (res.ok) {
                setAuthors(authors.filter((a) => a.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete author", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/authors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const newAuthor = await res.json();
                setAuthors([...authors, newAuthor]);
                setShowModal(false);
                setFormData({ name: "", role: "", avatar: "" });
            }
        } catch (error) {
            console.error("Failed to add author", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Authors</h1>
                    <p className="text-gray-400">Manage blog post authors and their profiles.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add Author
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {authors.map((author) => (
                        <div key={author.id} className="bg-[#25282e] border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl font-bold text-blue-400 mb-4 ring-2 ring-blue-500/20 overflow-hidden">
                                {author.avatar && (author.avatar.startsWith('/') || author.avatar.startsWith('http')) ? (
                                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                ) : (
                                    author.avatar || author.name.charAt(0)
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-white">{author.name}</h3>
                            <p className="text-sm text-gray-400 mb-6">{author.role}</p>
                            <button
                                onClick={() => handleDelete(author.id)}
                                className="mt-auto text-sm text-red-400 hover:text-red-300 flex items-center gap-2 px-3 py-1.5 hover:bg-red-400/10 rounded-lg transition-colors"
                            >
                                <i className="fas fa-trash-alt"></i> Delete
                            </button>
                        </div>
                    ))}

                    {authors.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-[#25282e]/50 rounded-xl border border-gray-800 border-dashed">
                            <p>No authors found. Add one to get started.</p>
                        </div>
                    )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6">Add New Author</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="e.g. Sarah Jenkins"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Role / Job Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="e.g. Head of Content"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Initials (Avatar)</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={2}
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value.toUpperCase() })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="e.g. SJ"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
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
                                    Add Author
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
