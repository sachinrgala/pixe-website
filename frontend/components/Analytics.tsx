"use client";

import Script from "next/script";

interface AnalyticsProps {
    gaId?: string;        // Google Analytics 4 ID (G-XXXXXXXXXX)
    fbPixelId?: string;   // Facebook Pixel ID
}

export default function Analytics({ gaId, fbPixelId }: AnalyticsProps) {
    return (
        <>
            {/* Google Analytics 4 */}
            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
                    </Script>
                </>
            )}

            {/* Facebook Pixel */}
            {fbPixelId && (
                <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
                </Script>
            )}
        </>
    );
}

// Utility functions for tracking events
export function trackEvent(eventName: string, params?: Record<string, any>) {
    if (typeof window !== "undefined") {
        // Google Analytics
        if ((window as any).gtag) {
            (window as any).gtag("event", eventName, params);
        }
        // Facebook Pixel
        if ((window as any).fbq) {
            (window as any).fbq("track", eventName, params);
        }
    }
}

export function trackLead(value?: number, currency = "INR") {
    trackEvent("Lead", { value, currency });
    trackEvent("generate_lead", { value, currency });
}

export function trackPageView(pagePath: string) {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("config", "GA_MEASUREMENT_ID", {
            page_path: pagePath,
        });
    }
}
