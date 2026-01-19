"use client";

import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

type LogType = "info" | "warn" | "error" | "log";
type Tab = "console" | "network" | "resources" | "ui_audit";

interface LogEntry {
    id: number;
    type: LogType;
    message: string;
    timestamp: string;
    details?: any;
}

interface NetworkEntry {
    id: number;
    method: string;
    url: string;
    status: number | "pending";
    duration?: number;
    timestamp: string;
}

interface ResourceEntry {
    name: string;
    type: string;
    duration: number;
    timestamp: string;
}

export default function DebugAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("console");

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const logsRef = useRef<LogEntry[]>([]);

    const [network, setNetwork] = useState<NetworkEntry[]>([]);
    const networkRef = useRef<NetworkEntry[]>([]);

    const [resources, setResources] = useState<ResourceEntry[]>([]);
    const [auditResults, setAuditResults] = useState<any[]>([]);

    const [hasNewError, setHasNewError] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    const addLog = (type: LogType, message: string, details?: any) => {
        const newLog: LogEntry = {
            id: Date.now() + Math.random(),
            type,
            message,
            timestamp: new Date().toLocaleTimeString(),
            details
        };
        setLogs(prev => [...prev.slice(-100), newLog]);
        logsRef.current.push(newLog);
        if (type === "error") setHasNewError(true);
    };

    const addNetwork = (entry: NetworkEntry) => {
        setNetwork(prev => [...prev.slice(-50), entry]);
        networkRef.current.push(entry);
    };

    const updateNetwork = (id: number, status: number, duration: number) => {
        setNetwork(prev => prev.map(n => n.id === id ? { ...n, status, duration } : n));
    };

    const performAudit = () => {
        const results = [];
        const body = document.body;

        // 1. Structural Checks
        if (!document.querySelector('header')) results.push({ type: 'warn', msg: "⚠️ Missing <header> tag. Top Navigation might not be visible." });
        else results.push({ type: 'pass', msg: "✅ <header> tag found." });

        if (!document.querySelector('main')) results.push({ type: 'info', msg: "ℹ️ Missing <main> tag. Semantic structure could be improved." });
        if (!document.querySelector('footer')) results.push({ type: 'warn', msg: "⚠️ Missing <footer> tag." });

        // 2. Asset Checks
        const images = document.querySelectorAll('img');
        let brokenImages = 0;
        images.forEach(img => {
            if (!img.src || img.src === window.location.href) brokenImages++;
            if (img.naturalWidth === 0 && img.complete) brokenImages++;
        });
        if (brokenImages > 0) results.push({ type: 'error', msg: `❌ Found ${brokenImages} broken or empty images.` });
        else results.push({ type: 'pass', msg: `✅ All ${images.length} images appear valid.` });

        // 3. Link Checks
        const links = document.querySelectorAll('a');
        let emptyLinks = 0;
        links.forEach(a => {
            if (!a.getAttribute('href') || a.getAttribute('href') === '#') emptyLinks++;
        });
        if (emptyLinks > 0) results.push({ type: 'warn', msg: `⚠️ Found ${emptyLinks} links with empty or placeholder hrefs.` });

        setAuditResults(results);
    };

    useEffect(() => {
        if (activeTab === 'ui_audit') performAudit();
    }, [activeTab]);

    useEffect(() => {
        if (endRef.current && isOpen && activeTab === 'console') {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs, isOpen, activeTab]);

    useEffect(() => {
        // 1. Console Intercept
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args) => {
            addLog("log", args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(" "));
            originalLog.apply(console, args);
        };

        console.error = (...args) => {
            addLog("error", args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(" "));
            originalError.apply(console, args);
        };

        console.warn = (...args) => {
            addLog("warn", args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(" "));
            originalWarn.apply(console, args);
        };

        // 2. Fetch Intercept (Network)
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const id = Date.now() + Math.random();
            const start = performance.now();
            const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
            const method = typeof args[0] === 'object' && (args[0] as any).method ? (args[0] as any).method : (args[1]?.method || "GET");

            addNetwork({ id, method, url, status: "pending", timestamp: new Date().toLocaleTimeString() });

            try {
                const response = await originalFetch(...args);
                updateNetwork(id, response.status, Math.round(performance.now() - start));
                return response;
            } catch (error) {
                updateNetwork(id, 0, Math.round(performance.now() - start));
                throw error;
            }
        };

        // 2.1 Patch performance.measure (Fix for WSL Negative Timestamp Error)
        const originalMeasure = performance.measure;
        performance.measure = function (measureName: string, startOrOptions?: string | PerformanceMeasureOptions, endMark?: string) {
            try {
                if (typeof startOrOptions === 'string' && performance.getEntriesByName(startOrOptions).length === 0) {
                    // If mark doesn't exist, generic fallback to avoid crash
                    return originalMeasure.call(this, measureName, undefined, endMark);
                }
                // @ts-ignore - Argument spread matching
                return originalMeasure.apply(this, arguments);
            } catch (e) {
                // Suppress "negative time stamp" error silently
                // console.warn("Suppressed performance.measure crash:", e);
                return {} as PerformanceMeasure;
            }
        };

        // 3. Resource Observer
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'resource') {
                    setResources(prev => [...prev.slice(-50), {
                        name: entry.name,
                        type: (entry as any).initiatorType,
                        duration: Math.round(entry.duration),
                        timestamp: new Date().toLocaleTimeString()
                    }]);
                }
            });
        });
        observer.observe({ entryTypes: ['resource'] });

        // 4. Window Errors
        const handleError = (event: ErrorEvent) => addLog("error", event.message);
        window.addEventListener("error", handleError);
        window.addEventListener("unhandledrejection", (e) => addLog("error", String(e.reason)));

        console.log("🐞 Debug Assistant: Enhanced Mode Active");

        return () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            window.fetch = originalFetch; // Restore fetch
            window.removeEventListener("error", handleError);
            observer.disconnect();
        };
    }, []);

    if (!isOpen) {
        return (
            <button
                onClick={() => { setIsOpen(true); setHasNewError(false); }}
                className={`fixed bottom-4 left-4 z-[9999] w-12 h-12 rounded-full shadow-2xl flex items-center justify-center font-black text-xl transition-all hover:scale-110 
        ${hasNewError ? "bg-red-600 animate-pulse text-white" : "bg-black text-green-400 border border-green-500"}`}
                title="Open Debugger"
            >
                D
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 pointer-events-none">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-green-900/50 text-green-400 flex items-center justify-center font-bold border border-green-800">D</div>
                        <div>
                            <h3 className="font-bold text-white">System Debugger</h3>
                            <p className="text-xs text-slate-400">monitoring active</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-slate-800 rounded p-1 gap-1">
                        {(['console', 'network', 'resources', 'ui_audit'] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-xs font-bold rounded uppercase transition ${activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                            >
                                {tab.replace('_', ' ')}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button onClick={async (e) => {
                            const button = e.currentTarget;
                            if (button) button.innerText = "Processing...";

                            let screenshot = "SKIPPED";
                            try {
                                button.innerText = "📸 Capturing...";
                                // 1. Capture Screenshot (Best Effort)
                                // html2canvas fails on some modern CSS (like lab() colors)
                                try {
                                    const canvas = await html2canvas(document.body, {
                                        ignoreElements: (element) => element.tagName === 'IFRAME', // Avoid iframe CORS issues if possible
                                        logging: false
                                    });
                                    screenshot = canvas.toDataURL("image/png");
                                } catch (screenErr: any) {
                                    console.error("Screenshot failed:", screenErr);
                                    screenshot = "FAILED: " + screenErr.message;
                                }

                                // 2. Identify Failed Resources
                                const failedResources = network.filter(n => n.status !== 200 && n.status !== "pending");

                                const report = {
                                    timestamp: new Date().toISOString(),
                                    logs,
                                    network,
                                    resources,
                                    failed_resources: failedResources,
                                    audit: auditResults, // Include audit results if any
                                    storage: {
                                        localStorage: JSON.stringify(localStorage),
                                        sessionStorage: JSON.stringify(sessionStorage),
                                        cookie: document.cookie
                                    },
                                    screenshot
                                };

                                // 3. Send to Agent
                                if (button) button.innerText = "📤 Sending...";

                                const res = await fetch('/api/debug/save', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(report)
                                });
                                const data = await res.json();

                                if (data.success) alert("✅ Sent to Agent! " + (screenshot.startsWith("data") ? "(With Screenshot)" : "(Screenshot Failed but Data Sent)"));
                                else alert("❌ Send failed: " + data.error);
                            } catch (err: any) {
                                alert("❌ Error: " + err.message);
                            } finally {
                                if (button) button.innerText = "SEND TO AGENT";
                            }
                        }} className="px-3 py-1 text-xs font-bold text-white bg-green-600 rounded hover:bg-green-700 shadow-lg animate-pulse min-w-[120px]">SEND TO AGENT</button>

                        <button onClick={() => {
                            const report = { timestamp: new Date().toISOString(), logs, network, resources };
                            navigator.clipboard.writeText(JSON.stringify(report, null, 2))
                                .then(() => alert("✅ Copied!"))
                                .catch(err => alert("❌ Copy Failed"));
                        }} className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-white bg-blue-900/30 rounded hover:bg-blue-900">COPY</button>
                        <button onClick={() => { setLogs([]); setNetwork([]); setResources([]); }} className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded hover:bg-slate-700">CLEAR</button>
                        <button onClick={() => setIsOpen(false)} className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-white bg-red-900/30 rounded hover:bg-red-900">CLOSE</button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-900 font-mono text-sm">

                    {/* CONSOLE TAB */}
                    {activeTab === 'console' && (
                        <div className="space-y-2">
                            {logs.map((log) => (
                                <div key={log.id} className={`p-2 rounded border-l-4 break-all ${log.type === 'error' ? 'bg-red-900/20 border-red-500 text-red-200' :
                                    log.type === 'warn' ? 'bg-yellow-900/20 border-yellow-500 text-yellow-200' :
                                        'bg-slate-800/50 border-blue-500/50 text-slate-300'
                                    }`}>
                                    <div className="flex gap-2 text-[10px] opacity-50 mb-1 uppercase tracking-wider">
                                        <span>{log.timestamp}</span><span>•</span><span>{log.type}</span>
                                    </div>
                                    <div>{log.message}</div>
                                    {log.details && <pre className="mt-2 text-[10px] bg-black/30 p-2 rounded overflow-x-auto text-slate-400">{JSON.stringify(log.details, null, 2)}</pre>}
                                </div>
                            ))}
                            <div ref={endRef} />
                        </div>
                    )}

                    {/* NETWORK TAB */}
                    {activeTab === 'network' && (
                        <table className="w-full text-left border-collapse">
                            <thead className="text-xs text-slate-500 border-b border-slate-800">
                                <tr>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Method</th>
                                    <th className="p-2">URL</th>
                                    <th className="p-2">Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {network.map((entry) => (
                                    <tr key={entry.id} className="border-b border-slate-800/50 hover:bg-slate-800/50">
                                        <td className={`p-2 font-bold ${entry.status === 200 ? 'text-green-400' : entry.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>{entry.status}</td>
                                        <td className="p-2">{entry.method}</td>
                                        <td className="p-2 break-all text-slate-300 truncate max-w-xs">{entry.url}</td>
                                        <td className="p-2 text-slate-500">{entry.duration ? `${entry.duration}ms` : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* RESOURCES TAB */}
                    {activeTab === 'resources' && (
                        <table className="w-full text-left border-collapse">
                            <thead className="text-xs text-slate-500 border-b border-slate-800">
                                <tr>
                                    <th className="p-2">Type</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {resources.map((res, i) => (
                                    <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/50">
                                        <td className="p-2 text-blue-400 uppercase text-[10px]">{res.type}</td>
                                        <td className="p-2 break-all text-slate-300 truncate max-w-md" title={res.name}>{res.name.split('/').pop()} <span className="text-slate-600 text-[10px] ml-1 opacity-50">{res.name}</span></td>
                                        <td className="p-2 text-slate-500">{res.duration}ms</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* UI AUDIT TAB */}
                    {activeTab === 'ui_audit' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
                                <h4 className="font-bold text-white">Visual & Structural Audit</h4>
                                <button onClick={performAudit} className="text-xs bg-blue-600 px-2 py-1 rounded text-white hover:bg-blue-500">Re-Run Audit</button>
                            </div>
                            {auditResults.map((res, i) => (
                                <div key={i} className={`p-3 rounded border flex items-center gap-3 ${res.type === 'error' ? 'bg-red-900/20 border-red-500/50 text-red-200' :
                                    res.type === 'warn' ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-200' :
                                        res.type === 'pass' ? 'bg-green-900/20 border-green-500/50 text-green-200' :
                                            'bg-slate-800 border-slate-700 text-slate-400'
                                    }`}>
                                    <div className="text-xl">
                                        {res.type === 'error' ? '❌' : res.type === 'warn' ? '⚠️' : res.type === 'pass' ? '✅' : 'ℹ️'}
                                    </div>
                                    <div>{res.msg}</div>
                                </div>
                            ))}
                            {auditResults.length === 0 && <div className="text-slate-500 text-center py-4">Checking elements...</div>}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
