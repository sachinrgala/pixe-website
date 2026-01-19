"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Download,
    Mail,
    Users,
    Globe,
    Calendar,
    Trash2,
    CheckCircle
} from "lucide-react";

interface Subscriber {
    id: number;
    email: string;
    source: string;
    date: string;
}

// Get initials from email
const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.slice(0, 2).toUpperCase();
};

// Get avatar color from email
const getAvatarColor = (email: string) => {
    const colors = [
        'from-blue-500 to-indigo-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-red-600',
        'from-violet-500 to-purple-600',
        'from-cyan-500 to-blue-600',
        'from-rose-500 to-pink-600',
    ];
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

// Get source badge color
const getSourceColor = (source: string) => {
    const src = source?.toLowerCase() || '';
    if (src.includes('homepage') || src.includes('home')) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    if (src.includes('blog')) return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    if (src.includes('course')) return 'bg-green-500/10 text-green-400 border-green-500/30';
    if (src.includes('footer')) return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
};

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubs, setSelectedSubs] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const res = await fetch("/api/subscribers");
            if (res.ok) {
                setSubscribers(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch subscribers", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelectAll = () => {
        if (selectedSubs.size === filteredSubs.length) {
            setSelectedSubs(new Set());
        } else {
            setSelectedSubs(new Set(filteredSubs.map(s => s.id)));
        }
    };

    const toggleSelectOne = (id: number) => {
        const newSet = new Set(selectedSubs);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedSubs(newSet);
    };

    const handleExport = () => {
        const subsToExport = selectedSubs.size > 0
            ? filteredSubs.filter(s => selectedSubs.has(s.id))
            : filteredSubs;

        const csv = [
            ['Email', 'Source', 'Date'].join(','),
            ...subsToExport.map(s => [`"${s.email}"`, `"${s.source}"`, s.date].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    // Filter subscribers
    const filteredSubs = subscribers.filter(sub => {
        if (!searchQuery) return true;
        return sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.source?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Get unique sources for stats
    const sources = [...new Set(subscribers.map(s => s.source))].filter(Boolean);

    return (
        <div className="p-6 max-w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Newsletter Subscribers</h1>
                <p className="text-gray-400 text-sm">Manage your email list and export for campaigns</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-white">{subscribers.length}</p>
                            <p className="text-xs text-gray-500">Total Subscribers</p>
                        </div>
                        <Users className="w-8 h-8 text-gray-700" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-white">{sources.length}</p>
                            <p className="text-xs text-white/80">Sources</p>
                        </div>
                        <Globe className="w-8 h-8 text-white/30" />
                    </div>
                </div>
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-green-400">
                                {subscribers.filter(s => {
                                    const d = new Date(s.date);
                                    const now = new Date();
                                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                                }).length}
                            </p>
                            <p className="text-xs text-gray-500">This Month</p>
                        </div>
                        <Calendar className="w-8 h-8 text-gray-700" />
                    </div>
                </div>
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-purple-400">
                                {subscribers.filter(s => {
                                    const d = new Date(s.date);
                                    const week = new Date();
                                    week.setDate(week.getDate() - 7);
                                    return d >= week;
                                }).length}
                            </p>
                            <p className="text-xs text-gray-500">This Week</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-gray-700" />
                    </div>
                </div>
            </div>

            {/* Search & Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by email or source..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#25282e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                            ×
                        </button>
                    )}
                </div>
                <div className="flex gap-2">
                    {selectedSubs.size > 0 && (
                        <button
                            onClick={() => setSelectedSubs(new Set())}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Clear ({selectedSubs.size})
                        </button>
                    )}
                    <button
                        onClick={handleExport}
                        disabled={subscribers.length === 0}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#25282e] hover:bg-[#2a2e35] text-gray-300 border border-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        <Download className="w-4 h-4" />
                        {selectedSubs.size > 0 ? `Export (${selectedSubs.size})` : 'Export All'}
                    </button>
                </div>
            </div>

            {/* Results Info */}
            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Showing {filteredSubs.length} of {subscribers.length} subscribers
                </p>
            </div>

            {/* Table */}
            <div className="bg-[#1a1d21] border border-gray-800 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-8">
                        <div className="animate-pulse space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-800 rounded w-1/3" />
                                        <div className="h-3 bg-gray-800 rounded w-1/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : filteredSubs.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">
                            {searchQuery ? 'No subscribers found' : 'No subscribers yet'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {searchQuery
                                ? 'Try adjusting your search'
                                : 'Subscribers will appear here when visitors sign up'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="px-4 py-3 w-12">
                                        <input
                                            type="checkbox"
                                            checked={filteredSubs.length > 0 && selectedSubs.size === filteredSubs.length}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filteredSubs.map((sub) => {
                                    const isSelected = selectedSubs.has(sub.id);

                                    return (
                                        <tr
                                            key={sub.id}
                                            className={`transition-colors ${isSelected ? 'bg-blue-500/5' : 'hover:bg-[#25282e]'}`}
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelectOne(sub.id)}
                                                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(sub.email)} flex items-center justify-center text-white text-xs font-bold`}>
                                                        {getInitials(sub.email)}
                                                    </div>
                                                    <span className="font-medium text-white">{sub.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getSourceColor(sub.source)}`}>
                                                    {sub.source || 'Direct'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(sub.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end">
                                                    <a
                                                        href={`mailto:${sub.email}`}
                                                        className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                                                        title="Send Email"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
