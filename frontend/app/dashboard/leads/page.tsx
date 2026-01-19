"use client";

import { useEffect, useState } from "react";
import {
    Search,
    Phone,
    Download,
    Trash2,
    Users,
    UserPlus,
    MessageCircle,
    CheckCircle,
    XCircle,
    TrendingUp,
    MoreHorizontal,
    Filter
} from "lucide-react";

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    course?: string;
    source?: string;
    utm_source?: string;
    utm_campaign?: string;
    status: string;
    created_at: string;
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; icon: typeof Users }> = {
    new: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: UserPlus },
    contacted: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: MessageCircle },
    qualified: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', icon: TrendingUp },
    enrolled: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle },
    lost: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', icon: XCircle },
};

// Get initials from name
const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Get avatar color from name
const getAvatarColor = (name: string) => {
    const colors = [
        'from-blue-500 to-purple-600',
        'from-green-500 to-teal-600',
        'from-orange-500 to-red-600',
        'from-pink-500 to-rose-600',
        'from-indigo-500 to-blue-600',
        'from-cyan-500 to-blue-600',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export default function LeadsManager() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, enrolled: 0 });
    const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());

    // Selection Handlers
    const toggleSelectAll = () => {
        if (selectedLeads.size === filteredLeads.length) {
            setSelectedLeads(new Set());
        } else {
            setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
        }
    };

    const toggleSelectOne = (id: number) => {
        const newSet = new Set(selectedLeads);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedLeads(newSet);
    };

    const bulkDelete = async () => {
        if (!confirm(`Delete ${selectedLeads.size} leads? This cannot be undone.`)) return;

        try {
            await fetch('/api/leads', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: Array.from(selectedLeads) })
            });
            setSelectedLeads(new Set());
            await fetchLeads();
        } catch (err) {
            console.error("Bulk delete failed", err);
        }
    };

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/leads');
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
                setStats({
                    total: data.length,
                    new: data.filter((l: Lead) => l.status === 'new').length,
                    contacted: data.filter((l: Lead) => l.status === 'contacted').length,
                    qualified: data.filter((l: Lead) => l.status === 'qualified').length,
                    enrolled: data.filter((l: Lead) => l.status === 'enrolled').length,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const updateStatus = async (id: number, status: string) => {
        try {
            await fetch('/api/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            await fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const callLead = (phone: string) => {
        window.open(`tel:${phone}`, '_self');
    };

    const whatsappLead = (phone: string, name: string) => {
        const message = encodeURIComponent(`Hi ${name}, thank you for your interest in our courses!`);
        window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
    };

    const exportCSV = () => {
        const leadsToExport = selectedLeads.size > 0
            ? filteredLeads.filter(l => selectedLeads.has(l.id))
            : filteredLeads;

        const csv = [
            ['Name', 'Email', 'Phone', 'Course', 'Source', 'Status', 'Date'].join(','),
            ...leadsToExport.map(l => [
                `"${l.name}"`, `"${l.email}"`, l.phone, `"${l.course || ''}"`,
                l.source || '', l.status, new Date(l.created_at).toLocaleDateString()
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    // Filter leads by status and search query
    const filteredLeads = leads.filter(lead => {
        const matchesStatus = !filter || lead.status === filter;
        const matchesSearch = !searchQuery ||
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.phone.includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    const statCards = [
        { key: '', label: 'Total', count: stats.total, icon: Users, color: 'from-gray-600 to-gray-700', textColor: 'text-white' },
        { key: 'new', label: 'New', count: stats.new, icon: UserPlus, color: 'from-blue-500 to-blue-600', textColor: 'text-blue-400' },
        { key: 'contacted', label: 'Contacted', count: stats.contacted, icon: MessageCircle, color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-400' },
        { key: 'qualified', label: 'Qualified', count: stats.qualified, icon: TrendingUp, color: 'from-purple-500 to-purple-600', textColor: 'text-purple-400' },
        { key: 'enrolled', label: 'Enrolled', count: stats.enrolled, icon: CheckCircle, color: 'from-green-500 to-emerald-600', textColor: 'text-green-400' },
    ];

    return (
        <div className="p-6 max-w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Lead Management</h1>
                <p className="text-gray-400 text-sm">Track, manage, and convert your leads efficiently</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    const isActive = filter === stat.key;
                    return (
                        <button
                            key={stat.key}
                            onClick={() => setFilter(stat.key)}
                            className={`relative overflow-hidden rounded-xl p-4 text-left transition-all duration-200 ${isActive
                                    ? `bg-gradient-to-br ${stat.color} shadow-lg scale-[1.02]`
                                    : 'bg-[#25282e] hover:bg-[#2a2e35] border border-gray-800'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-2xl font-bold ${isActive ? 'text-white' : stat.textColor}`}>
                                        {stat.count}
                                    </p>
                                    <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                                        {stat.label}
                                    </p>
                                </div>
                                <Icon className={`w-8 h-8 ${isActive ? 'text-white/30' : 'text-gray-700'}`} />
                            </div>
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Search & Actions Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
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

                {/* Actions */}
                <div className="flex gap-2">
                    {selectedLeads.size > 0 && (
                        <button
                            onClick={bulkDelete}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete ({selectedLeads.size})
                        </button>
                    )}
                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#25282e] hover:bg-[#2a2e35] text-gray-300 border border-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        {selectedLeads.size > 0 ? `Export (${selectedLeads.size})` : 'Export All'}
                    </button>
                </div>
            </div>

            {/* Results Info */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing {filteredLeads.length} of {leads.length} leads
                    {filter && <span className="ml-2 text-blue-400">• Filtered by: {filter}</span>}
                </p>
                {filter && (
                    <button
                        onClick={() => setFilter('')}
                        className="text-sm text-blue-400 hover:text-blue-300"
                    >
                        Clear filter
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-[#1a1d21] border border-gray-800 rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="p-8">
                        <div className="animate-pulse space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-800 rounded w-1/4" />
                                        <div className="h-3 bg-gray-800 rounded w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">
                            {searchQuery || filter ? 'No leads found' : 'No leads yet'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {searchQuery || filter
                                ? 'Try adjusting your search or filter criteria'
                                : 'Leads will appear here when visitors fill your forms'}
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
                                            checked={filteredLeads.length > 0 && selectedLeads.size === filteredLeads.length}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filteredLeads.map((lead) => {
                                    const statusConfig = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                                    const isSelected = selectedLeads.has(lead.id);

                                    return (
                                        <tr
                                            key={lead.id}
                                            className={`transition-colors ${isSelected ? 'bg-blue-500/5' : 'hover:bg-[#25282e]'}`}
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelectOne(lead.id)}
                                                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(lead.name)} flex items-center justify-center text-white text-xs font-bold`}>
                                                        {getInitials(lead.name)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-white truncate">{lead.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-sm text-gray-300">{lead.phone}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-gray-400 truncate block max-w-[150px]">
                                                    {lead.course || '—'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-gray-500 truncate block max-w-[120px]">
                                                    {lead.utm_campaign || lead.source || '—'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                    className={`px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} bg-transparent focus:outline-none`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="qualified">Qualified</option>
                                                    <option value="enrolled">Enrolled</option>
                                                    <option value="lost">Lost</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => callLead(lead.phone)}
                                                        className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                                                        title="Call"
                                                    >
                                                        <Phone className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => whatsappLead(lead.phone, lead.name)}
                                                        className="p-2 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors"
                                                        title="WhatsApp"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                    </button>
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
