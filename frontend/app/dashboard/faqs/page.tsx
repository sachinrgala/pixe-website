"use client";

import { useEffect, useState } from "react";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export default function FAQManager() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<FAQ>>({
        question: '',
        answer: ''
    });

    const fetchFaqs = async () => {
        try {
            const res = await fetch("/api/faqs");
            if (res.ok) {
                setFaqs(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch FAQs", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleCreateOpen = () => {
        setFormData({
            question: '',
            answer: ''
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.question || !formData.answer) return;
        setIsSaving(true);

        try {
            const res = await fetch('/api/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                fetchFaqs();
            } else {
                alert('Failed to save FAQ');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving FAQ');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
            fetchFaqs();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h1>
                    <p className="text-gray-400">Manage FAQs shown on the landing page.</p>
                </div>
                <button
                    onClick={handleCreateOpen}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add FAQ
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center text-gray-500 py-12">
                        <i className="fas fa-circle-notch fa-spin text-3xl mb-4"></i>
                        <p>Loading FAQs...</p>
                    </div>
                ) : faqs.length === 0 ? (
                    <div className="text-center py-12 bg-[#25282e] rounded-xl border border-gray-800">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-question text-gray-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No FAQs found</h3>
                        <p className="text-gray-400 mb-6">Add questions to help your students.</p>
                    </div>
                ) : (
                    faqs.map((faq) => (
                        <div key={faq.id} className="bg-[#25282e] border border-gray-800 rounded-xl p-6 relative group transition-all hover:border-blue-500/30">
                            <button
                                onClick={() => handleDelete(faq.id)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <i className="fas fa-trash"></i>
                            </button>

                            <h3 className="font-bold text-lg text-white mb-2 flex items-start gap-3">
                                <span className="text-blue-500 mt-1"><i className="fas fa-question-circle"></i></span>
                                {faq.question}
                            </h3>
                            <p className="text-gray-400 pl-8">{faq.answer}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#25282e] rounded-xl w-full max-w-lg border border-gray-800">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Add FAQ</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Question</label>
                                <input
                                    type="text"
                                    value={formData.question}
                                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="e.g. What is the refund policy?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Answer</label>
                                <textarea
                                    value={formData.answer}
                                    onChange={e => setFormData({ ...formData, answer: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Detailed answer..."
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || !formData.question}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save FAQ'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
