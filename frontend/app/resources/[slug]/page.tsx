"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import React from "react";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    category: string;
    authorId: number;
    image: string;
    publishedAt: string;
}

interface Author {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const [postsRes, authorsRes] = await Promise.all([
                    fetch("/api/posts"),
                    fetch("/api/authors")
                ]);

                if (postsRes.ok && authorsRes.ok) {
                    const posts: BlogPost[] = await postsRes.json();
                    const authors: Author[] = await authorsRes.json();

                    const foundPost = posts.find(p => p.slug === slug);
                    if (foundPost) {
                        setPost(foundPost);
                        setAuthor(authors.find(a => a.id === foundPost.authorId) || null);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch blog post", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center text-foreground gap-4">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="text-text-muted">Article not found.</p>
                <Link href="/resources" className="text-primary hover:underline">Back to Content Hub</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-foreground">

            <main className="flex-grow pt-24 pb-16">
                {/* Hero Header */}
                <div className="bg-surface dark:bg-surface-deep border-b border-border-color dark:border-gray-800 py-16 px-4 md:px-20">
                    <div className="max-w-[800px] mx-auto text-center">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full uppercase tracking-wider border border-primary/20">
                                {post.category}
                            </span>
                            <span className="text-text-muted">•</span>
                            <span className="text-text-muted text-sm">{post.publishedAt}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8">
                            {post.title}
                        </h1>

                        {author && (
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold text-white ring-2 ring-background-light dark:ring-background-dark">
                                    {author.avatar || author.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-bold">{author.name}</p>
                                    <p className="text-sm text-text-muted">{author.role}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Body */}
                <article className="max-w-[800px] mx-auto px-4 md:px-8 py-12">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {post.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-6 text-text-muted leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>

                {/* CTA */}
                <div className="max-w-[1000px] mx-auto px-4 py-16">
                    <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Ready to master these skills?</h3>
                            <p className="text-text-muted">Join our next cohort and fast-track your career.</p>
                        </div>
                        <Link href="/#courses" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition-all whitespace-nowrap">
                            Explore Courses
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
