"use client";

import { useEffect, useState } from "react";

interface Stat {
    id: number;
    icon: string;
    label: string;
    sublabel: string;
}

export default function StatsManager() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Stat>>({
        icon: '📊',
        label: '',
        sublabel: ''
    });

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/stats");
            if (res.ok) {
                setStats(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleCreateOpen = () => {
        setFormData({ icon: '📊', label: '', sublabel: '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.label || !formData.sublabel) return;
        setIsSaving(true);

        try {
            const res = await fetch('/api/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                fetchStats();
            } else {
                alert('Failed to save stat');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving stat');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this stat?')) return;
        try {
            await fetch(`/api/stats/${id}`, { method: 'DELETE' });
            fetchStats();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Key Statistics (Trust Badges)</h1>
                    <p className="text-gray-400">Manage the stats shown on the landing page hero section.</p>
                </div>
                <button
                    onClick={handleCreateOpen}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add Stat
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        <i className="fas fa-circle-notch fa-spin text-3xl mb-4"></i>
                        <p>Loading stats...</p>
                    </div>
                ) : stats.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-[#25282e] rounded-xl border border-gray-800">
                        <p className="text-gray-400">No stats available.</p>
                    </div>
                ) : (
                    stats.map((stat) => (
                        <div key={stat.id} className="bg-[#25282e] border border-gray-800 rounded-xl p-6 relative group text-center hover:border-blue-500/50 transition-colors">
                            <button
                                onClick={() => handleDelete(stat.id)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <i className="fas fa-trash"></i>
                            </button>

                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="font-bold text-lg text-white">{stat.label}</div>
                            <div className="text-xs text-gray-400">{stat.sublabel}</div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#25282e] rounded-xl w-full max-w-sm border border-gray-800">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Add Statistic</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="e.g. 🎓"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Value / Label</label>
                                <input
                                    type="text"
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="e.g. 10,000+"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Subtext</label>
                                <input
                                    type="text"
                                    value={formData.sublabel}
                                    onChange={e => setFormData({ ...formData, sublabel: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="e.g. Students Trained"
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || !formData.label}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
