"use client";

import { useEffect, useState } from "react";
import { Trash2, UserCheck, UserX } from "lucide-react";

interface User {
    id: number;
    email: string;
    role: string;
    status: string;
    createdAt: string;
}

export default function UsersManager() {
    const [users, setUsers] = useState<User[]>([]);
    const [isInviting, setIsInviting] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            if (res.ok) setUsers(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInviting(true);
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, role: "Admin" })
            });
            if (res.ok) {
                setEmail("");
                fetchUsers();
                alert("User invited successfully!");
            }
        } catch (err) {
            alert("Failed to invite user");
        } finally {
            setIsInviting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure? This user will lose access immediately.")) return;
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        fetchUsers();
    };

    const handleStatusToggle = async (id: number, currentStatus: string) => {
        const newStatus = currentStatus === "active" ? "invited" : "active";
        await fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        fetchUsers();
    };

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Team Management</h1>
                    <p className="text-gray-400">Manage admin access and roles.</p>
                </div>
                <div className="bg-[#25282e] p-1 rounded-lg border border-gray-700 flex">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="new@pixe.com"
                        className="bg-transparent px-4 py-2 outline-none text-white w-64 text-sm"
                    />
                    <button
                        onClick={handleInvite}
                        disabled={!email || isInviting}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm disabled:opacity-50"
                    >
                        {isInviting ? "Inviting..." : "Invite Admin"}
                    </button>
                </div>
            </div>

            <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#1a1d21] border-b border-gray-700">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-[#2a2e35]">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs">
                                                {user.email.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="text-white font-medium">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active'
                                            ? 'bg-green-100/10 text-green-400'
                                            : 'bg-yellow-100/10 text-yellow-400'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm font-mono">{user.createdAt}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleStatusToggle(user.id, user.status)}
                                                className={`p-2 rounded transition-colors ${user.status === 'invited'
                                                        ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                                                        : 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10'
                                                    }`}
                                                title={user.status === 'invited' ? 'Activate User' : 'Set as Invited'}
                                            >
                                                {user.status === 'invited' ? (
                                                    <UserCheck className="w-4 h-4" />
                                                ) : (
                                                    <UserX className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded transition-colors"
                                                title="Remove User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
