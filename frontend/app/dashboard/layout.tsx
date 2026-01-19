"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    UserPlus,
    Building2,
    ClipboardList,
    FileText,
    Users,
    Download,
    Search,
    Settings,
    LogOut,
    Loader2,
    Layers
} from "lucide-react";

interface User {
    email: string;
    role: string;
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        // Check for OAuth token in URL and save to cookie
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            if (token) {
                // Set auth-token cookie
                document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;
                // Remove token from URL
                window.history.replaceState({}, '', '/dashboard');
            }
        }

        // Fetch current user
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setUser(data.user);
                }
            })
            .catch(console.error);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/krishna");
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#1a1d21]">
            {/* Font Awesome */}


            {/* Sidebar */}
            <aside className="w-44 bg-[#25282e] border-r border-gray-800 hidden md:flex flex-col fixed h-full z-20 overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex items-center gap-3 flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Layers className="text-white w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">Pixe CMS</span>
                </div>

                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto min-h-0 scrollbar-none">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2 px-3">Main</div>

                    <Link href="/dashboard" prefetch={false} onClick={() => console.log('Navigating to Overview')} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <LayoutDashboard className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        Overview
                    </Link>

                    <Link href="/dashboard/leads" prefetch={false} onClick={() => console.log('Navigating to Leads')} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <UserPlus className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
                        Leads
                    </Link>

                    <Link href="/dashboard/corporate" prefetch={false} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <Building2 className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        Corporate
                    </Link>

                    <Link href="/dashboard/forms" prefetch={false} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <ClipboardList className="w-4 h-4 text-gray-400 group-hover:text-teal-400 transition-colors" />
                        Forms
                    </Link>

                    <Link href="/dashboard/pages" prefetch={false} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        Pages
                    </Link>

                    <Link href="/dashboard/subscribers" prefetch={false} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <Users className="w-4 h-4 text-gray-400 group-hover:text-pink-400 transition-colors" />
                        Subscribers
                    </Link>

                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-3">Content</div>

                    <Link href="/dashboard/downloads" prefetch={false} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
                        Downloads
                    </Link>

                    <Link href="/dashboard/seo" prefetch={false} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <Search className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                        SEO
                    </Link>

                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-3">System</div>
                    <Link href="/dashboard/users" prefetch={false} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <Users className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        Users
                    </Link>
                    <Link href="/dashboard/settings" prefetch={false} onClick={() => console.log('Navigating to Settings')} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#32363e] rounded-lg transition-colors group">
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        Settings
                    </Link>
                </nav>

                {/* User Info & Logout */}
                <div className="p-3 border-t border-gray-800 flex-shrink-0 bg-[#25282e] z-10 mt-auto">
                    {user && (
                        <div className="flex items-center gap-3 px-2 py-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                {user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-white truncate">{user.email}</div>
                                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50 text-sm"
                    >
                        {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-0 md:ml-44 p-6 min-w-0 overflow-x-hidden">
                {children}
            </main>


            <style jsx global>{`
                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent; 
                }
                ::-webkit-scrollbar-thumb {
                    background: #3d4148; 
                    border-radius: 3px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #4b5563; 
                }
                
                /* Sidebar specific - hide unless hovering */
                aside nav::-webkit-scrollbar-thumb {
                    background-color: transparent;
                }
                aside nav:hover::-webkit-scrollbar-thumb {
                    background-color: #3d4148;
                }
            `}</style>
        </div >
    );
}
