"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect when the user's mouse leaves the viewport (Exit Intent).
 * 
 * @param delay - Milliseconds to wait before enabling the detection.
 * @param storageKey - Unique key to prevent showing the popup multiple times.
 * @returns [isVisible, setIsVisible, hasShown]
 */
export function useExitIntent(delay: number = 5000, storageKey: string = "exit_intent_shown") {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        if (sessionStorage.getItem(storageKey)) {
            setHasShown(true);
            return;
        }

        let timeoutId: NodeJS.Timeout;

        const handleMouseLeave = (e: MouseEvent) => {
            // clientY <= 0 usually indicates mouse moving towards the tabs/address bar
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem(storageKey, "true");
            }
        };

        // Enable after a safety delay to prevent premature triggering
        timeoutId = setTimeout(() => {
            document.addEventListener("mouseleave", handleMouseLeave);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [delay, hasShown, storageKey]);

    return {
        isVisible,
        setIsVisible,
        hasShown
    };
}
