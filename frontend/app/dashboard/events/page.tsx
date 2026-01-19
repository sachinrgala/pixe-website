"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    instructor: string;
    status: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Initial Form State
    const initialForm = {
        title: "",
        slug: "",
        description: "",
        date: "",
        time: "",
        duration: "60 Minutes",
        instructor: "",
        status: "upcoming"
    };
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/events");
            if (res.ok) {
                setEvents(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
            if (res.ok) {
                setEvents(events.filter((e) => e.id !== id));
            } else {
                const err = await res.json();
                alert(`Failed to delete: ${err.error || res.statusText}`);
            }
        } catch (error) {
            console.error("Failed to delete event", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const newEvent = await res.json();
                setEvents([...events, newEvent]);
                setShowModal(false);
                setFormData(initialForm);
            } else {
                const err = await res.json();
                alert(`Failed to create: ${err.error || res.statusText}`);
            }
        } catch (error) {
            console.error("Failed to create event", error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Events & Webinars</h1>
                    <p className="text-gray-400">Manage your live masterclasses and workshops.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Schedule Event
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden flex flex-col group hover:border-blue-500/30 transition-all">
                            <div className="p-6 flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${event.status === 'upcoming' ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'
                                        }`}>
                                        {event.status}
                                    </span>
                                    <span className="text-xs text-gray-500">{event.date} • {event.time}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                    {event.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <i className="fas fa-user-tie"></i> {event.instructor}
                                    <span className="mx-1">•</span>
                                    <i className="fas fa-clock"></i> {event.duration}
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-[#1a1d21] border-t border-gray-800 flex justify-end">
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="text-gray-500 hover:text-red-400 text-sm flex items-center gap-2"
                                >
                                    <i className="fas fa-trash-alt"></i> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {events.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-[#25282e]/50 rounded-xl border border-gray-800 border-dashed">
                            <p>No upcoming events defined.</p>
                        </div>
                    )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-[#25282e] border border-gray-800 rounded-xl w-full max-w-lg p-6 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
                        <h2 className="text-xl font-bold text-white mb-6">Schedule New Event</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Event Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Time</label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="e.g. 60 Minutes"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Instructor</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.instructor}
                                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="e.g. Alex Doe"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-[#1a1d21] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="What will attendees learn?"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all font-medium"
                                >
                                    Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
