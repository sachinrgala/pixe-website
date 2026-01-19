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
};

import GoogleTagManager from "@/components/GoogleTagManager";
import DebugAssistant from "@/components/dev/DebugAssistant";
import { WhatsAppProvider } from "@/context/WhatsAppContext";
import WhatsAppGlobal from "@/components/common/WhatsAppGlobal";

import ContentWrapper from "@/components/layout/ContentWrapper";

async function getSettings() {
  try {
    const res = await fetch("http://localhost:8080/api/v1/settings", {
      next: { revalidate: 0 }, // No cache
      cache: 'no-store'
    });
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
        {/* Inline script to prevent FOUC - sets dark class immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  // Default to dark if no preference saved
                  if (theme === 'dark' || (!theme && true)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
