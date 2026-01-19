"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Phone,
    Download,
    Building2,
    Users,
    UserPlus,
    MessageCircle,
    CheckCircle,
    Clock,
    Mail,
    Briefcase,
    TrendingUp
} from "lucide-react";

interface CorporateLead {
    id: number;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    requirements: string;
    status: string;
    date: string;
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; label: string }> = {
    new: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', label: 'New' },
    contacted: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Contacted' },
    closed: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Closed' },
};

// Get initials from company name
const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Get avatar color from name
const getAvatarColor = (name: string) => {
    const colors = [
        'from-blue-500 to-indigo-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-red-600',
        'from-violet-500 to-purple-600',
        'from-cyan-500 to-blue-600',
        'from-rose-500 to-pink-600',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export default function CorporatePage() {
    const [leads, setLeads] = useState<CorporateLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/corporate-leads");
            if (res.ok) {
                setLeads(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/corporate-leads/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const exportCSV = () => {
        const csv = [
            ['Company', 'Contact', 'Email', 'Phone', 'Requirements', 'Status', 'Date'].join(','),
            ...filteredLeads.map(l => [
                `"${l.companyName}"`, `"${l.contactName}"`, `"${l.email}"`, l.phone,
                `"${l.requirements?.replace(/"/g, '""') || ''}"`, l.status, l.date
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `corporate-leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    // Filter leads
    const filteredLeads = leads.filter(lead => {
        const matchesStatus = !filter || lead.status === filter;
        const matchesSearch = !searchQuery ||
            lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        closed: leads.filter(l => l.status === 'closed').length,
    };

    const statCards = [
        { key: '', label: 'Total', count: stats.total, icon: Building2, color: 'from-gray-600 to-gray-700', textColor: 'text-white' },
        { key: 'new', label: 'New', count: stats.new, icon: UserPlus, color: 'from-blue-500 to-blue-600', textColor: 'text-blue-400' },
        { key: 'contacted', label: 'Contacted', count: stats.contacted, icon: MessageCircle, color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-400' },
        { key: 'closed', label: 'Closed', count: stats.closed, icon: CheckCircle, color: 'from-green-500 to-emerald-600', textColor: 'text-green-400' },
    ];

    return (
        <div className="p-6 max-w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Corporate Partners</h1>
                <p className="text-gray-400 text-sm">Manage hiring requests and corporate partnerships</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

            {/* Search & Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by company, contact, or email..."
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
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#25282e] hover:bg-[#2a2e35] text-gray-300 border border-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Results Info */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing {filteredLeads.length} of {leads.length} partners
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
                {loading ? (
                    <div className="p-8">
                        <div className="animate-pulse space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-lg" />
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
                            <Building2 className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">
                            {searchQuery || filter ? 'No partners found' : 'No corporate requests yet'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {searchQuery || filter
                                ? 'Try adjusting your search or filter'
                                : 'Corporate hiring requests will appear here'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filteredLeads.map((lead) => {
                                    const statusConfig = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;

                                    return (
                                        <tr key={lead.id} className="hover:bg-[#25282e] transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getAvatarColor(lead.companyName)} flex items-center justify-center text-white text-xs font-bold`}>
                                                        {getInitials(lead.companyName)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-white truncate">{lead.companyName}</p>
                                                        <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="min-w-0">
                                                    <p className="text-sm text-gray-300">{lead.contactName}</p>
                                                    <p className="text-xs text-gray-500 font-mono">{lead.phone}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 max-w-[250px]">
                                                <p className="text-sm text-gray-400 line-clamp-2" title={lead.requirements}>
                                                    {lead.requirements || '—'}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                                                    className={`px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} bg-transparent focus:outline-none`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="text-sm text-gray-500">{lead.date}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <a
                                                        href={`mailto:${lead.email}`}
                                                        className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                                                        title="Email"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </a>
                                                    <a
                                                        href={`tel:${lead.phone}`}
                                                        className="p-2 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors"
                                                        title="Call"
                                                    >
                                                        <Phone className="w-4 h-4" />
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
