"use client";

import { useState, useEffect } from "react";

interface Analytics {
    id: number;
    metric: string; // e.g., "pageViews", "signUps"
    value: number;
    date: string;
}

export default function AnalyticsPage() {
    const [data, setData] = useState<Analytics[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const initialForm = { metric: "", value: 0, date: "" };
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/analytics");
            if (res.ok) setData(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/analytics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const newItem = await res.json();
                setData([...data, newItem]);
                setShowModal(false);
                setFormData(initialForm);
            }
        } catch (e) { console.error(e); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
                    <p className="text-gray-400">Track site metrics.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2">
                    <i className="fas fa-plus"></i> Add Metric
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
            ) : (
                <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1a1d21] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Metric</th>
                                    <th className="px-6 py-4 font-semibold">Value</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {data.map(item => (
                                    <tr key={item.id} className="hover:bg-[#2a2e35] transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{item.metric}</td>
                                        <td className="px-6 py-4 text-white">{item.value}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6">Add Metric</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Metric</label>
                                <input type="text" required value={formData.metric} onChange={e => setFormData({ ...formData, metric: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="e.g. pageViews" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Value</label>
                                <input type="number" required value={formData.value} onChange={e => setFormData({ ...formData, value: Number(e.target.value) })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="0" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Date</label>
                                <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-800">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all font-medium">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
