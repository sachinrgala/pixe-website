"use client";

import { useEffect, useState } from "react";

interface NavItem {
    id: number;
    label: string;
    url: string;
    order: number;
}

export default function NavigationManager() {
    const [items, setItems] = useState<NavItem[]>([]);
    const [newItem, setNewItem] = useState({ label: "", url: "", order: 1 });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchNav();
    }, []);

    const fetchNav = async () => {
        try {
            const res = await fetch("/api/navigation");
            if (res.ok) setItems(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch("/api/navigation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem)
            });
            if (res.ok) {
                setNewItem({ label: "", url: "", order: items.length + 2 });
                fetchNav();
            }
        } catch (err) {
            alert("Failed to add Item");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Remove this menu item?")) return;
        await fetch(`/api/navigation/${id}`, { method: "DELETE" });
        fetchNav();
    };

    // Sort items by order
    const sortedItems = [...items].sort((a, b) => a.order - b.order);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Menu Builder</h1>
                    <p className="text-gray-400">Manage main navigation links.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form */}
                <div className="md:col-span-1">
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl p-6 sticky top-8">
                        <h3 className="text-lg font-bold text-white mb-4">Add Menu Item</h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Label</label>
                                <input
                                    type="text"
                                    required
                                    value={newItem.label}
                                    onChange={e => setNewItem({ ...newItem, label: e.target.value })}
                                    className="w-full bg-[#1a1d21] border border-gray-800 rounded p-2 text-white outline-none focus:border-blue-500"
                                    placeholder="e.g. Careers"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL / Path</label>
                                <input
                                    type="text"
                                    required
                                    value={newItem.url}
                                    onChange={e => setNewItem({ ...newItem, url: e.target.value })}
                                    className="w-full bg-[#1a1d21] border border-gray-800 rounded p-2 text-white outline-none focus:border-blue-500"
                                    placeholder="/careers"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Order</label>
                                <input
                                    type="number"
                                    required
                                    value={newItem.order}
                                    onChange={e => setNewItem({ ...newItem, order: parseInt(e.target.value) })}
                                    className="w-full bg-[#1a1d21] border border-gray-800 rounded p-2 text-white outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
                            >
                                {isSaving ? "Saving..." : "Add to Menu"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="md:col-span-2 space-y-3">
                    {sortedItems.map((item) => (
                        <div key={item.id} className="bg-[#25282e] border border-gray-800 rounded-lg p-4 flex items-center gap-4 group hover:border-blue-500/30 transition-colors">
                            <div className="w-8 h-8 bg-[#1a1d21] rounded flex items-center justify-center text-gray-500 font-mono text-sm">
                                {item.order}
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-medium">{item.label}</div>
                                <div className="text-sm text-gray-500">{item.url}</div>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-400/10 rounded transition-all"
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    ))}

                    {sortedItems.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No menu items defined.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
