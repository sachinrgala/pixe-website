"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    category: string;
    authorId: number;
    status: string;
    publishedAt: string;
}

interface Author {
    id: number;
    name: string;
}

export default function BlogPostsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Initial Form State
    const initialForm = {
        title: "",
        slug: "",
        content: "",
        category: "General",
        authorId: "",
        status: "published"
    };
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [postsRes, authorsRes] = await Promise.all([
                fetch("/api/posts"),
                fetch("/api/authors")
            ]);

            if (postsRes.ok) setPosts(await postsRes.json());
            if (authorsRes.ok) setAuthors(await authorsRes.json());
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPosts(posts.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                authorId: parseInt(formData.authorId)
            };

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const newPost = await res.json();
                setPosts([...posts, newPost]);
                setShowModal(false);
                setFormData(initialForm);
            }
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Blog Posts</h1>
                    <p className="text-gray-400">Manage your content hub articles.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> New Post
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#1a1d21] border-b border-gray-800 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="px-6 py-4">Article</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-[#2a2e35] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{post.title}</div>
                                            <div className="text-xs text-gray-500 mt-1">/{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {authors.find(a => a.id === post.authorId)?.name || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${post.status === 'published'
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                            </span>
                                            <div className="text-xs text-gray-500 mt-1">{post.publishedAt}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-gray-500 hover:text-red-400 transition-colors p-2"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No posts found. Start writing your first article!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl w-full max-w-2xl p-6 shadow-2xl h-[80vh] flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6 flex-shrink-0">Create New Post</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="e.g. 5 SEO Tips for 2024"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Slug (URL)</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    >
                                        <option>Analytics</option>
                                        <option>SEO</option>
                                        <option>Social Media</option>
                                        <option>Content Strategy</option>
                                        <option>Email Marketing</option>
                                        <option>General</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Author</label>
                                    <select
                                        required
                                        value={formData.authorId}
                                        onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    >
                                        <option value="">Select Author...</option>
                                        {authors.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Content</label>
                                    <textarea
                                        required
                                        rows={8}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="Write your article content here..."
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-800 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all font-medium"
                            >
                                Publish Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
