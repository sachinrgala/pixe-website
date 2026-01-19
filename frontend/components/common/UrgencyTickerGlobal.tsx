"use client";

import React from "react";
import { usePathname } from "next/navigation";
import UrgencyTicker from "./UrgencyTicker";

interface TickerConfig {
    text: string;
    color: string;
    icon: string;
}

interface UrgencyTickerGlobalProps {
    pageTickers?: Record<string, TickerConfig>;
}

export default function UrgencyTickerGlobal({ pageTickers: initialPageTickers }: UrgencyTickerGlobalProps) {
    const pathname = usePathname();
    const [pageTickers, setPageTickers] = React.useState<Record<string, TickerConfig> | undefined>(initialPageTickers);
    const [globalTicker, setGlobalTicker] = React.useState<TickerConfig | undefined>(undefined);

    React.useEffect(() => {
        // Always fetch latest to get Global Ticker
        fetch("/api/settings")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch settings");
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }
                return res.json();
            })
            .then(data => {
                if (data.pageTickers) setPageTickers(data.pageTickers);
                if (data.globalTicker) setGlobalTicker(data.globalTicker);
            })
            .catch(err => console.error("Failed to fetch tickers:", err));
    }, []);

    // Hide on CMS/Dashboard pages
    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) {
        return null;
    }

    // Priority: 1. Page Specific Ticker  2. Global Ticker
    const config = pageTickers?.[pathname] || globalTicker;

    if (!config) return null;

    return (
        <UrgencyTicker
            text={config.text}
            color={config.color}
            icon={config.icon}
        />
    );
}
