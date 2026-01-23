import type { Metadata, Viewport } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

// Only load Inter font (reduces font payload)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});



export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Pixe Education | Transform Your Career",
  description: "Join thousands of students who transformed their careers. Get job-ready skills with industry-recognized certifications.",
  twitter: {
    card: "summary_large_image",
    title: "Pixe Education | Transform Your Career",
    description: "Join thousands of students who transformed their careers.",
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: '/pixe-icon.ico', type: 'image/x-icon' },
      { url: '/pixe-icon-light.ico', media: '(prefers-color-scheme: light)', type: 'image/x-icon' },
      { url: '/pixe-icon-dark.ico', media: '(prefers-color-scheme: dark)', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

import GoogleTagManager from "@/components/GoogleTagManager";
import DebugAssistant from "@/components/dev/DebugAssistant";
import { WhatsAppProvider } from "@/context/WhatsAppContext";
import WhatsAppGlobal from "@/components/common/WhatsAppGlobal";

import ContentWrapper from "@/components/layout/ContentWrapper";

import { getApiUrl } from "@/lib/api";

async function getSettings() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(getApiUrl("/settings"), {
      next: { revalidate: 0 }, // No cache
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("theme");var isDark=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(isDark)document.documentElement.classList.add("dark");var f=document.getElementById("favicon");if(f)f.href=isDark?"/pixe-icon-dark.ico":"/pixe-icon-light.ico"}catch(e){}})();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /><link rel="dns-prefetch" href="https://www.googletagmanager.com" /><link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <link rel="shortcut icon" id="favicon" href="/pixe-icon.ico" type="image/x-icon" /><link rel="icon" href="/pixe-icon.ico" type="image/x-icon" sizes="any" /><link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${lexend.variable} antialiased bg-background text-foreground transition-colors duration-300`}
        suppressHydrationWarning
      >
        <GoogleTagManager />
        <WhatsAppProvider>
          <ContentWrapper settings={settings}>
            {children}
          </ContentWrapper>
          <WhatsAppGlobal
            phoneNumber={settings?.phoneNumber || ""}
            enabled={settings?.enableWhatsApp ?? true}
            pageMessages={settings?.pageMessages}
          />
        </WhatsAppProvider>
        <DebugAssistant />
      </body>
    </html>
  );
}
