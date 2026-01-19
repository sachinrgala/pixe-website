"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FileText,
    ArrowRight,
    GraduationCap,
    Database,
    Plus,
    Upload,
    UserPlus,
    Settings,
    Globe,
    Activity
} from "lucide-react";

interface ServiceStatus {
    database: 'checking' | 'connected' | 'disconnected';

    pages: number;
    courses: number;
}

export default function DashboardOverview() {
    const [status, setStatus] = useState<ServiceStatus>({
        database: 'checking',
        pages: 0,
        courses: 0
    });

    useEffect(() => {
        // Check database status
        fetch("/api/database/setup")
            .then(res => res.json())
            .then(data => {
                setStatus(prev => ({
                    ...prev,
                    database: data.status === 'connected' ? 'connected' : 'disconnected'
                }));
            })
            .catch(() => setStatus(prev => ({ ...prev, database: 'disconnected' })));


        // Get page count
        fetch("/api/pages")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStatus(prev => ({ ...prev, pages: data.length }));
                }
            })
            .catch(console.error);

        // Get course count
        fetch("/api/courses")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStatus(prev => ({ ...prev, courses: data.length }));
                }
            })
            .catch(console.error);
    }, []);

    const StatusIndicator = ({ status: s }: { status: 'checking' | 'connected' | 'disconnected' }) => (
        <div className={`w-2 h-2 rounded-full ${s === 'connected' ? 'bg-green-500' :
            s === 'checking' ? 'bg-yellow-500 animate-pulse' :
                'bg-red-500'
            }`}></div>
    );

    return (
        <div className="w-full max-w-full">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome back! Here's your system overview.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#25282e] p-6 rounded-xl border border-gray-800 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Total Pages</h3>
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <FileText className="text-blue-500 w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{status.pages}</div>
                    <Link href="/dashboard/pages" className="text-blue-400 text-sm mt-2 flex items-center gap-1 hover:text-blue-300">
                        Manage Pages <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                <div className="bg-[#25282e] p-6 rounded-xl border border-gray-800 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Total Courses</h3>
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <GraduationCap className="text-green-500 w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{status.courses}</div>
                    <Link href="/dashboard/courses" className="text-green-400 text-sm mt-2 flex items-center gap-1 hover:text-green-300">
                        Manage Courses <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                <div className="bg-[#25282e] p-6 rounded-xl border border-gray-800 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Database</h3>
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <Database className="text-purple-500 w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusIndicator status={status.database} />
                        <span className={`text-xl font-bold ${status.database === 'connected' ? 'text-green-400' :
                            status.database === 'checking' ? 'text-yellow-400' :
                                'text-red-400'
                            }`}>
                            {status.database === 'connected' ? 'Connected' :
                                status.database === 'checking' ? 'Checking...' :
                                    'Disconnected'}
                        </span>
                    </div>
                    <Link href="/dashboard/database" className="text-purple-400 text-sm mt-2 flex items-center gap-1 hover:text-purple-300">
                        Configure <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>


            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#25282e] rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="font-bold text-white text-lg">Quick Actions</h3>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <Link href="/dashboard/pages" className="p-4 bg-[#1a1d21] hover:bg-[#32363e] rounded-lg border border-gray-700 hover:border-blue-500 transition-all group text-center block">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <Plus className="text-white w-5 h-5" />
                            </div>
                            <div className="font-medium text-white">Create Page</div>
                            <div className="text-xs text-gray-500 mt-1">Start a new landing page</div>
                        </Link>

                        <Link href="/dashboard/media" className="p-4 bg-[#1a1d21] hover:bg-[#32363e] rounded-lg border border-gray-700 hover:border-purple-500 transition-all group text-center block">
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="text-white w-5 h-5" />
                            </div>
                            <div className="font-medium text-white">Upload Media</div>
                            <div className="text-xs text-gray-500 mt-1">Add images or files</div>
                        </Link>

                        <Link href="/dashboard/users" className="p-4 bg-[#1a1d21] hover:bg-[#32363e] rounded-lg border border-gray-700 hover:border-green-500 transition-all group text-center block">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <UserPlus className="text-white w-5 h-5" />
                            </div>
                            <div className="font-medium text-white">Add User</div>
                            <div className="text-xs text-gray-500 mt-1">Invite team members</div>
                        </Link>

                        <Link href="/dashboard/settings" className="p-4 bg-[#1a1d21] hover:bg-[#32363e] rounded-lg border border-gray-700 hover:border-orange-500 transition-all group text-center block">
                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <Settings className="text-white w-5 h-5" />
                            </div>
                            <div className="font-medium text-white">Settings</div>
                            <div className="text-xs text-gray-500 mt-1">Configure your site</div>
                        </Link>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-[#25282e] rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-800">
                        <h3 className="font-bold text-white text-lg">System Health</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[#1a1d21] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                                    <Globe className="text-blue-500 w-4 h-4" />
                                </div>
                                <span className="text-white">Frontend</span>
                            </div>
                            <span className="text-green-400 text-sm flex items-center gap-2">
                                <StatusIndicator status="connected" /> Running
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-[#1a1d21] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                                    <Database className="text-purple-500 w-4 h-4" />
                                </div>
                                <span className="text-white">PostgreSQL</span>
                            </div>
                            <span className={`text-sm flex items-center gap-2 ${status.database === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
                                <StatusIndicator status={status.database} />
                                {status.database === 'connected' ? 'Connected' : 'Not configured'}
                            </span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
