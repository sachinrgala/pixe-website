"use client";

import { useState, useEffect } from "react";

interface LiveVisitorCountProps {
    baseCount?: number;
    className?: string;
}

export default function LiveVisitorCount({
    baseCount = 15,
    className = ""
}: LiveVisitorCountProps) {
    const [count, setCount] = useState(baseCount);

    useEffect(() => {
        // Simulate realistic visitor fluctuation
        const interval = setInterval(() => {
            setCount(prev => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const newCount = prev + change;
                return Math.max(5, Math.min(50, newCount)); // Keep between 5-50
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`inline-flex items-center gap-2 ${className}`}>
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm">
                <strong className="text-green-600">{count}</strong> people viewing this page
            </span>
        </div>
    );
}
