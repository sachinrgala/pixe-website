"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const DEFAULT_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-5N5MKLHF";

export default function GoogleTagManager() {
    const [gtmId, setGtmId] = useState<string>(DEFAULT_GTM_ID);

    useEffect(() => {
        // Optional dynamic override from settings API if configured
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data.googleTagManagerId && data.googleTagManagerId !== gtmId) {
                    setGtmId(data.googleTagManagerId);
                }
            })
            .catch(() => {
                // Silently fallback to DEFAULT_GTM_ID
            });
    }, [gtmId]);

    if (!gtmId) return null;

    return (
        <>
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${gtmId}');
          `,
                }}
            />
            {/* NoScript fallback for disabled JS */}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>
        </>
    );
}
