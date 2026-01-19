"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import UrgencyTickerGlobal from "@/components/common/UrgencyTickerGlobal";

interface ContentWrapperProps {
    children: React.ReactNode;
    settings?: any;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = React.useState(true);
    const [allowOverflow, setAllowOverflow] = React.useState(true);

    // Explicitly exclude dashboard and login paths
    const isDashboard = pathname?.startsWith("/dashboard");
    const isLogin = pathname === "/krishna";
    const hideHeader = isDashboard || isLogin;

    React.useEffect(() => {
        const handleScroll = () => {
            // Threshold: Hide after 80% of viewport height (approx crossing hero)
            // or minimum 600px to ensure usability on short screens
            const threshold = Math.min(window.innerHeight * 0.8, 800);

            if (window.scrollY > threshold) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Manage overflow state to allow dropdowns when visible
    React.useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isVisible) {
            // Wait for transition (500ms) before allowing overflow
            timeout = setTimeout(() => setAllowOverflow(true), 500);
        } else {
            // Immediately hide overflow when collapsing
            setAllowOverflow(false);
        }
        return () => clearTimeout(timeout);
    }, [isVisible]);

    if (hideHeader) {
        return <>{children}</>;
    }

    return (
        <>
            {/* Global Header: Ticker + Navbar */}
            <div className="sticky top-0 z-[9999] bg-background">
                <UrgencyTickerGlobal />
                <div
                    className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                    style={{ gridTemplateRows: isVisible ? '1fr' : '0fr' }}
                >
                    <div style={{ overflow: allowOverflow ? 'visible' : 'hidden' }}>
                        <Navbar />
                    </div>
                </div>
            </div>
            {children}
        </>
    );
}
