"use client";

import React from "react";
import WhatsAppButton from "./WhatsAppButton";
import { useWhatsAppContext } from "@/context/WhatsAppContext";
import { usePathname } from "next/navigation";

interface WhatsAppGlobalProps {
    phoneNumber: string;
    enabled: boolean;
    pageMessages?: Record<string, string>;
}

export default function WhatsAppGlobal({ phoneNumber, enabled, pageMessages }: WhatsAppGlobalProps) {
    const { message: contextMessage } = useWhatsAppContext();
    const pathname = usePathname();

    const cmsMessage = pageMessages?.[pathname];
    // Hide on CMS/Dashboard pages
    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) {
        return null;
    }

    const finalMessage = cmsMessage || contextMessage;

    return (
        <WhatsAppButton
            phoneNumber={phoneNumber}
            enabled={enabled}
            message={finalMessage}
        />
    );
}
