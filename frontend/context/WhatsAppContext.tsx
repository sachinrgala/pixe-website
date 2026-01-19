"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WhatsAppContextType {
    message: string;
    setMessage: (msg: string) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState("Hi, I'm interested in Pixe Education classes.");

    return (
        <WhatsAppContext.Provider value={{ message, setMessage }}>
            {children}
        </WhatsAppContext.Provider>
    );
}

export function useWhatsAppContext() {
    const context = useContext(WhatsAppContext);
    if (!context) {
        throw new Error('useWhatsAppContext must be used within a WhatsAppProvider');
    }
    return context;
}
