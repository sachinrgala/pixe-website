"use client";

import { useState, useEffect, useRef } from "react";

export default function LogsPage() {
    const [logs, setLogs] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [autoScroll, setAutoScroll] = useState(true);
    const logContainerRef = useRef<HTMLDivElement>(null);

    const fetchLogs = async () => {
        try {
            const res = await fetch("/api/logs"); // We need to proxy this or call backend directly? 
            // Wait, I didn't create a frontend proxy for /api/logs yet!
            // I should fetch from backend directly? No, CORS/Auth. 
            // I need a proxy route /app/api/logs/route.ts or similar.
            // Assuming I'll create frontend proxy next.
            if (res.ok) {
                const text = await res.text();
                setLogs(text);
            }
        } catch (error) {
            console.error("Failed to fetch logs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 5000); // Polling every 5s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (autoScroll && logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs, autoScroll]);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">System Logs</h1>
                    <p className="text-gray-400 text-sm">Real-time backend logs for debugging.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => fetchLogs()}
                        className="px-3 py-1.5 bg-[#25282e] hover:bg-[#32363e] text-white rounded border border-gray-700 text-sm transition-colors"
                    >
                        <i className="fas fa-sync-alt mr-2"></i> Refresh
                    </button>
                    <button
                        onClick={() => setAutoScroll(!autoScroll)}
                        className={`px-3 py-1.5 rounded border text-sm transition-colors ${autoScroll ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#25282e] border-gray-700 text-gray-400'}`}
                    >
                        <i className="fas fa-arrow-down mr-2"></i> Auto-scroll
                    </button>
                </div>
            </div>

            <div
                ref={logContainerRef}
                className="flex-1 bg-[#0d1117] border border-gray-800 rounded-xl p-4 overflow-auto font-mono text-xs text-gray-300 custom-scrollbar shadow-inner"
            >
                {loading && !logs ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <i className="fas fa-circle-notch fa-spin text-2xl mr-3"></i> Loading logs...
                    </div>
                ) : (
                    <pre className="whitespace-pre-wrap">{logs || "No logs available."}</pre>
                )}
            </div>
        </div>
    );
}
