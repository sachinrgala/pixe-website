"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    status: 'draft' | 'published';
}

export default function PostEditor() {
    const params = useParams();
    const router = useRouter();
    const postId = params.id as string;

    const [post, setPost] = useState<Post>({
        id: '',
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        status: 'draft'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetch(`/api/posts?id=${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setPost(data);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [postId]);

    const handleSave = async (newStatus?: 'draft' | 'published') => {
        setIsSaving(true);
        setMessage(null);

        const saveData = {
            ...post,
            status: newStatus || post.status
        };

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveData)
            });

            if (res.ok) {
                const data = await res.json();
                setPost({ ...post, status: newStatus || post.status, slug: data.slug });
                setMessage({ type: 'success', text: newStatus === 'published' ? 'Post published!' : 'Post saved!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save post.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">
                    <i className="fas fa-circle-notch fa-spin text-2xl"></i>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/posts" className="text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Edit Post</h1>
                        <p className="text-gray-400 text-sm">
                            Status: <span className={post.status === 'published' ? 'text-green-400' : 'text-yellow-400'}>{post.status}</span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handleSave('draft')}
                        disabled={isSaving}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSave('published')}
                        disabled={isSaving}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <i className="fas fa-spinner fa-spin"></i> : post.status === 'published' ? 'Update' : 'Publish'}
                    </button>
                </div>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    {message.text}
                </div>
            )}

            {/* Editor */}
            <div className="space-y-6">
                {/* Title */}
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-6">
                    <input
                        type="text"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                        placeholder="Post title"
                        className="w-full text-3xl font-bold bg-transparent text-white outline-none placeholder-gray-600"
                    />
                </div>

                {/* Meta */}
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-6 grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Slug</label>
                        <input
                            type="text"
                            value={post.slug}
                            onChange={(e) => setPost({ ...post, slug: e.target.value })}
                            placeholder="post-url-slug"
                            className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Featured Image URL</label>
                        <input
                            type="text"
                            value={post.featuredImage || ''}
                            onChange={(e) => setPost({ ...post, featuredImage: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>

                {/* Excerpt */}
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt</label>
                    <textarea
                        value={post.excerpt}
                        onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                        placeholder="Brief summary of the post..."
                        rows={2}
                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Content */}
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Content (HTML supported)</label>
                    <textarea
                        value={post.content}
                        onChange={(e) => setPost({ ...post, content: e.target.value })}
                        placeholder="<p>Write your post content here...</p>"
                        rows={15}
                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Tip: Use HTML tags for formatting. Example: &lt;h2&gt;Heading&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;, &lt;strong&gt;Bold&lt;/strong&gt;
                    </p>
                </div>

                {/* Preview Link */}
                {post.slug && (
                    <div className="flex justify-end">
                        <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                        >
                            <i className="fas fa-external-link-alt"></i> Preview Post
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
