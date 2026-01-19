"use client";

import { useEffect, useState } from "react";

interface Story {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    image: string; // Initials or URL
}

export default function StoriesManager() {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Story>>({
        name: '',
        role: '',
        company: '',
        quote: '',
        image: ''
    });

    const fetchStories = async () => {
        try {
            const res = await fetch("/api/stories");
            if (res.ok) {
                setStories(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch stories", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleCreateOpen = () => {
        setFormData({
            name: '',
            role: '',
            company: '',
            quote: '',
            image: ''
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.quote) return;
        setIsSaving(true);

        try {
            const res = await fetch('/api/stories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                fetchStories();
            } else {
                alert('Failed to save story');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving story');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this story?')) return;
        try {
            await fetch(`/api/stories/${id}`, { method: 'DELETE' });
            fetchStories();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Success Stories</h1>
                    <p className="text-gray-400">Manage student testimonials and reviews.</p>
                </div>
                <button
                    onClick={handleCreateOpen}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add Story
                </button>
            </div>

            {/* Stories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        <i className="fas fa-circle-notch fa-spin text-3xl mb-4"></i>
                        <p>Loading stories...</p>
                    </div>
                ) : stories.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-[#25282e] rounded-xl border border-gray-800">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-comment-dots text-gray-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No stories found</h3>
                        <p className="text-gray-400 mb-6">Add a success story to showcase social proof.</p>
                    </div>
                ) : (
                    stories.map((story) => (
                        <div key={story.id} className="bg-[#25282e] border border-gray-800 rounded-xl p-6 relative group">
                            <button
                                onClick={() => handleDelete(story.id)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <i className="fas fa-trash"></i>
                            </button>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                                    {story.image && (story.image.startsWith('/') || story.image.startsWith('http')) ? (
                                        <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                                    ) : (
                                        story.image || story.name.substring(0, 2).toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{story.name}</div>
                                    <div className="text-sm text-blue-400">{story.role}</div>
                                    <div className="text-xs text-gray-500">{story.company}</div>
                                </div>
                            </div>

                            <p className="text-gray-300 italic text-sm line-clamp-3">"{story.quote}"</p>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#25282e] rounded-xl w-full max-w-lg border border-gray-800">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Add Success Story</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Student Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="e.g. Software Engineer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="e.g. Google"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Quote / Testimonial</label>
                                <textarea
                                    value={formData.quote}
                                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="What did they say?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Image Initials (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    maxLength={2}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600 uppercase"
                                    placeholder="e.g. JD"
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || !formData.name}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save Story'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
