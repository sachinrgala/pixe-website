import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080/api/v1";

const nextConfig: NextConfig = {
  // output: "standalone", // Removed for Cloud Run Source Deploy simplicity

  // Enable compression (gzip/brotli)
  compress: true,

  // Disable 'X-Powered-By: Next.js' header for cleaner responses and slight security
  poweredByHeader: false,

  // React Strict Mode helps uncover bugs during dev
  reactStrictMode: true,

  // Disable Next.js development indicator (N badge)
  devIndicators: false,

  // Image optimization - SECURITY: Restrict to trusted domains only
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    // SECURITY: Only allow images from trusted domains to prevent SSRF
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixe.education',
      },
      {
        protocol: 'https',
        hostname: '*.pixe.education',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Development only - remove in production
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache Next.js protected static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // API Routes: No caching by default (dynamic)
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // Global Security Headers
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // STRICT SECURITY: Prevent any iframing of the site
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://tagassistant.google.com https://*.gtm.saamvaani.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://api.pixe.education https://tagassistant.google.com https://*.gtm.saamvaani.com " + (process.env.NODE_ENV !== 'production' ? "http://localhost:8080 http://127.0.0.1:8080" : "") + "; frame-ancestors 'self' https://tagassistant.google.com; base-uri 'self'; form-action 'self';",
          },
          // SECURITY: Restrict browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/courses",
        destination: `${API_BASE}/courses`,
      },
      {
        source: "/api/courses/:path*",
        destination: `${API_BASE}/courses/:path*`,
      },
      {
        source: "/api/stories",
        destination: `${API_BASE}/stories`,
      },
      {
        source: "/api/stories/:path*",
        destination: `${API_BASE}/stories/:path*`,
      },
      {
        source: "/api/faqs",
        destination: `${API_BASE}/faqs`,
      },
      {
        source: "/api/faqs/:path*",
        destination: `${API_BASE}/faqs/:path*`,
      },
      {
        source: "/api/partners",
        destination: `${API_BASE}/partners`,
      },
      {
        source: "/api/partners/:path*",
        destination: `${API_BASE}/partners/:path*`,
      },
      {
        source: "/api/stats",
        destination: `${API_BASE}/stats`,
      },
      {
        source: "/api/stats/:path*",
        destination: `${API_BASE}/stats/:path*`,
      },
      {
        source: "/api/settings",
        destination: `${API_BASE}/settings`,
      },
      {
        source: "/api/saml/:path*",
        destination: `${API_BASE}/saml/:path*`,
      },
      {
        source: "/api/admin/settings",
        destination: `${API_BASE}/admin/settings`,
      },
      {
        source: "/api/admin/sync-status",
        destination: `${API_BASE}/admin/sync-status`,
      },
      {
        source: "/api/admin/sync-data",
        destination: `${API_BASE}/admin/sync-data`,
      },
      // TOTP 2FA routes
      {
        source: "/api/totp/setup",
        destination: `${API_BASE}/totp/setup`,
      },
      {
        source: "/api/totp/enable",
        destination: `${API_BASE}/totp/enable`,
      },
      {
        source: "/api/totp/disable",
        destination: `${API_BASE}/totp/disable`,
      },
      {
        source: "/api/totp/validate",
        destination: `${API_BASE}/totp/validate`,
      },
      {
        source: "/api/authors",
        destination: `${API_BASE}/authors`,
      },
      {
        source: "/api/authors/:path*",
        destination: `${API_BASE}/authors/:path*`,
      },
      {
        source: "/api/posts",
        destination: `${API_BASE}/posts`,
      },
      {
        source: "/api/posts/:path*",
        destination: `${API_BASE}/posts/:path*`,
      },
      {
        source: "/api/events",
        destination: `${API_BASE}/events`,
      },
      {
        source: "/api/events/:path*",
        destination: `${API_BASE}/events/:path*`,
      },
      {
        source: "/api/corporate-leads",
        destination: `${API_BASE}/corporate-leads`,
      },
      {
        source: "/api/corporate-leads",
        destination: `${API_BASE}/corporate-leads`,
      },
      {
        source: "/api/corporate-leads/:path*",
        destination: `${API_BASE}/corporate-leads/:path*`,
      },
      {
        source: "/api/leads",
        destination: `${API_BASE}/leads`,
      },
      {
        source: "/api/leads/:path*",
        destination: `${API_BASE}/leads/:path*`,
      },
      {
        source: "/api/formfields",
        has: [{ type: 'query', key: 'form' }],
        destination: `${API_BASE}/formfields?form=:form`,
      },
      {
        source: "/api/formfields",
        destination: `${API_BASE}/formfields`,
      },
      {
        source: "/api/formfields/:path*",
        destination: `${API_BASE}/formfields/:path*`,
      },
      {
        source: "/api/downloads",
        destination: `${API_BASE}/downloads`,
      },
      {
        source: "/api/downloads/:path*",
        destination: `${API_BASE}/downloads/:path*`,
      },
      {
        source: "/api/subscribers",
        destination: `${API_BASE}/subscribers`,
      },
      {
        source: "/api/downloads",
        destination: `${API_BASE}/downloads`,
      },
      {
        source: "/api/downloads/:path*",
        destination: `${API_BASE}/downloads/:path*`,
      },
      {
        source: "/api/subscribers",
        destination: `${API_BASE}/subscribers`,
      },
      {
        source: "/api/analytics",
        destination: `${API_BASE}/analytics`,
      },
      {
        source: "/api/analytics/:path*",
        destination: `${API_BASE}/analytics/:path*`,
      },
      {
        source: "/api/ppc",
        destination: `${API_BASE}/ppc`,
      },
      {
        source: "/api/database/:path*",
        destination: `${API_BASE}/database/:path*`,
      },
      {
        source: "/api/ppc/:path*",
        destination: `${API_BASE}/ppc/:path*`,
      },
      // HEALTH CHECK
      {
        source: "/api/v1/health",
        destination: `${API_BASE}/health`,
      },
      // AUTH & AI
      {
        source: "/api/login",
        destination: `${API_BASE}/login`,
      },
      {
        source: "/api/ai/generate",
        destination: `${API_BASE}/ai/generate`,
      },
      // OAUTH (Google OAuth)
      {
        source: "/api/oauth/:path*",
        destination: `${API_BASE}/oauth/:path*`,
      },
      // OAuth callback with /api/v1/ prefix (for Google redirect URL)
      {
        source: "/api/v1/oauth/:path*",
        destination: `${API_BASE}/oauth/:path*`,
      },
      // GAP MODULES
      {
        source: "/api/media",
        destination: `${API_BASE}/media`,
      },
      {
        source: "/api/media/:path*",
        destination: `${API_BASE}/media/:path*`,
      },
      {
        source: "/api/users",
        destination: `${API_BASE}/users`,
      },
      {
        source: "/api/users/:path*",
        destination: `${API_BASE}/users/:path*`,
      },
      {
        source: "/api/navigation",
        destination: `${API_BASE}/navigation`,
      },
      {
        source: "/api/navigation/:path*",
        destination: `${API_BASE}/navigation/:path*`,
      },
      {
        source: "/api/pages",
        destination: `${API_BASE}/pages`,
      },
      {
        source: "/api/pages/:path*",
        destination: `${API_BASE}/pages/:path*`,
      },
      {
        source: "/api/seo",
        destination: `${API_BASE}/seo`,
      },
      // STATIC UPLOADS
      // STATIC UPLOADS
      {
        source: "/uploads/:path*",
        destination: `${API_BASE.replace("/api/v1", "")}/uploads/:path*`,
      },
      // LLM/GEO
      {
        source: "/llm-context",
        destination: `${API_BASE}/context`,
      },
      // META WEBHOOK
      {
        source: "/api/v1/meta/webhook",
        destination: `${API_BASE}/meta/webhook`,
      },
      // OTP
      {
        source: "/api/otp/:path*",
        destination: `${API_BASE}/otp/:path*`,
      },
    ];
  },

  // Ensure lucide-react is transpiled for correct ESM usage
  transpilePackages: ['lucide-react'],

  // Optimize Package Imports (Tree Shaking)
  experimental: {
    optimizePackageImports: [
      'date-fns',
      'lodash',
      'grapesjs',

      'zod',
      'winston',
    ],
  },
  // Enable React Compiler for auto-memoization (New in Next.js 15/16)
  reactCompiler: false,
};

// Wrap with bundle analyzer for production analysis
export default withBundleAnalyzer(nextConfig);

// Forced rebuild due to file move structure change
