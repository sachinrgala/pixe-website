"use client";

import { useEffect } from 'react';
import { useWhatsAppContext } from '@/context/WhatsAppContext';

/**
 * Hook to set a custom WhatsApp message for a specific page.
 * Reverts to default on unmount.
 * @param message The custom message to display
 */
export function useWhatsAppMessage(message: string) {
    const { setMessage } = useWhatsAppContext();

    useEffect(() => {
        setMessage(message);
        // Optional: revert to default on unmount? 
        // For now, next page will overwrite, or it stays until changed.
        return () => {
            setMessage("Hi, I'm interested in Pixe Education classes."); // Reset to default
        };
    }, [message, setMessage]);
}
