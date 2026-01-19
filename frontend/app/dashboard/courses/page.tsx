"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    duration: string;
    price: number;
    status: string;
}

export default function CoursesManager() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Course>>({
        title: '',
        slug: '',
        description: '',
        duration: '',
        price: 0,
        status: 'published'
    });

    const fetchCourses = async () => {
        try {
            const res = await fetch("/api/courses");
            if (res.ok) {
                setCourses(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreateOpen = () => {
        setEditingId(null);
        setFormData({
            title: '',
            slug: '',
            description: '',
            duration: '',
            price: 0,
            status: 'published'
        });
        setShowModal(true);
    };

    const handleEditOpen = (course: Course) => {
        setEditingId(course.id);
        setFormData({ ...course });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.title) return;
        setIsSaving(true);

        try {
            const url = editingId ? `/api/courses/${editingId}` : '/api/courses';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                fetchCourses();
            } else {
                const errData = await res.json();
                alert(`Failed: ${errData.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            alert(`Error saving course: ${err}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this course?')) return;
        try {
            await fetch(`/api/courses/${id}`, { method: 'DELETE' });
            fetchCourses();
        } catch (err) {
            console.error(err);
        }
    };

    const handleGenerateAI = async () => {
        if (!formData.title) {
            alert("Please enter a course title first.");
            return;
        }
        setIsGenerating(true);
        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: `Write a compelling description for a course titled "${formData.title}"` })
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, description: data.text }));
            } else {
                alert("Failed to generate content. Is the AI service running?");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Courses</h1>
                    <p className="text-gray-400">Manage your educational programs and curriculum.</p>
                </div>
                <button
                    onClick={handleCreateOpen}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add Course
                </button>
            </div>

            {/* Courses List */}
            <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">
                        <i className="fas fa-circle-notch fa-spin text-3xl mb-4"></i>
                        <p>Loading courses...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-graduation-cap text-gray-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                        <p className="text-gray-400 mb-6">Create your first course to get started.</p>
                        <button onClick={handleCreateOpen} className="text-blue-500 hover:text-blue-400 font-bold">Create Course →</button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#1a1d21] border-b border-gray-700">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Course Title</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Duration</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Price</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-[#2a2e35] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                                    <i className="fas fa-book text-blue-400"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{course.title}</div>
                                                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{course.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{course.duration}</td>
                                        <td className="px-6 py-4 text-white font-mono">${course.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === 'published'
                                                ? 'bg-green-100/10 text-green-400 border border-green-500/20'
                                                : 'bg-yellow-100/10 text-yellow-400 border border-yellow-500/20'
                                                }`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditOpen(course)}
                                                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course.id)}
                                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#25282e] rounded-xl w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Course' : 'Add New Course'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Course Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="e.g. Advanced React Patterns"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="e.g. advanced-react"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-400">Description</label>
                                    <button
                                        type="button" // Prevent form submission
                                        onClick={handleGenerateAI}
                                        disabled={isGenerating || !formData.title}
                                        className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                                    >
                                        {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                                        Generate with AI
                                    </button>
                                </div>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Brief summary of the course..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="e.g. 8 Weeks"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || !formData.title}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save Course'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
