"use client";

import { useEffect, useState } from "react";

interface Partner {
    id: number;
    name: string;
    logo: string;
}

export default function PartnerManager() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Partner>>({
        name: ''
    });

    const fetchPartners = async () => {
        try {
            const res = await fetch("/api/partners");
            if (res.ok) {
                setPartners(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch partners", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleCreateOpen = () => {
        setFormData({ name: '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name) return;
        setIsSaving(true);

        try {
            const res = await fetch('/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                fetchPartners();
            } else {
                alert('Failed to save partner');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving partner');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this partner?')) return;
        try {
            await fetch(`/api/partners/${id}`, { method: 'DELETE' });
            fetchPartners();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hiring Partners</h1>
                    <p className="text-gray-400">Manage companies that hire your students.</p>
                </div>
                <button
                    onClick={handleCreateOpen}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add Partner
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        <i className="fas fa-circle-notch fa-spin text-3xl mb-4"></i>
                        <p>Loading partners...</p>
                    </div>
                ) : partners.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-[#25282e] rounded-xl border border-gray-800">
                        <p className="text-gray-400">No partners added yet.</p>
                    </div>
                ) : (
                    partners.map((partner) => (
                        <div key={partner.id} className="bg-[#25282e] border border-gray-800 rounded-xl p-6 relative group flex flex-col items-center justify-center min-h-[120px]">
                            <button
                                onClick={() => handleDelete(partner.id)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <i className="fas fa-trash"></i>
                            </button>

                            {partner.logo && (
                                <div className="h-12 flex items-center justify-center mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                                </div>
                            )}

                            <h3 className="font-bold text-lg text-gray-300 group-hover:text-white transition-colors">{partner.name}</h3>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#25282e] rounded-xl w-full max-w-sm border border-gray-800">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Add Partner</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="e.g. Netflix"
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
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
