import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "standalone",

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
            value: 'DENY', // STRICT SECURITY: Prevent any iframing of the site
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://api.pixe.education " + (process.env.NODE_ENV !== 'production' ? "http://localhost:8080 http://127.0.0.1:8080" : "") + "; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
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
        destination: "http://127.0.0.1:8080/api/v1/courses",
      },
      {
        source: "/api/courses/:path*",
        destination: "http://127.0.0.1:8080/api/v1/courses/:path*",
      },
      {
        source: "/api/stories",
        destination: "http://127.0.0.1:8080/api/v1/stories",
      },
      {
        source: "/api/stories/:path*",
        destination: "http://127.0.0.1:8080/api/v1/stories/:path*",
      },
      {
        source: "/api/faqs",
        destination: "http://127.0.0.1:8080/api/v1/faqs",
      },
      {
        source: "/api/faqs/:path*",
        destination: "http://127.0.0.1:8080/api/v1/faqs/:path*",
      },
      {
        source: "/api/partners",
        destination: "http://127.0.0.1:8080/api/v1/partners",
      },
      {
        source: "/api/partners/:path*",
        destination: "http://127.0.0.1:8080/api/v1/partners/:path*",
      },
      {
        source: "/api/stats",
        destination: "http://127.0.0.1:8080/api/v1/stats",
      },
      {
        source: "/api/stats/:path*",
        destination: "http://127.0.0.1:8080/api/v1/stats/:path*",
      },
      {
        source: "/api/settings",
        destination: "http://127.0.0.1:8080/api/v1/settings",
      },
      {
        source: "/api/saml/:path*",
        destination: "http://127.0.0.1:8080/api/v1/saml/:path*",
      },
      {
        source: "/api/admin/settings",
        destination: "http://127.0.0.1:8080/api/v1/admin/settings",
      },
      {
        source: "/api/admin/sync-status",
        destination: "http://127.0.0.1:8080/api/v1/admin/sync-status",
      },
      {
        source: "/api/admin/sync-data",
        destination: "http://127.0.0.1:8080/api/v1/admin/sync-data",
      },
      // TOTP 2FA routes
      {
        source: "/api/totp/setup",
        destination: "http://127.0.0.1:8080/api/v1/totp/setup",
      },
      {
        source: "/api/totp/enable",
        destination: "http://127.0.0.1:8080/api/v1/totp/enable",
      },
      {
        source: "/api/totp/disable",
        destination: "http://127.0.0.1:8080/api/v1/totp/disable",
      },
      {
        source: "/api/totp/validate",
        destination: "http://127.0.0.1:8080/api/v1/totp/validate",
      },
      {
        source: "/api/authors",
        destination: "http://127.0.0.1:8080/api/v1/authors",
      },
      {
        source: "/api/authors/:path*",
        destination: "http://127.0.0.1:8080/api/v1/authors/:path*",
      },
      {
        source: "/api/posts",
        destination: "http://127.0.0.1:8080/api/v1/posts",
      },
      {
        source: "/api/posts/:path*",
        destination: "http://127.0.0.1:8080/api/v1/posts/:path*",
      },
      {
        source: "/api/events",
        destination: "http://127.0.0.1:8080/api/v1/events",
      },
      {
        source: "/api/events/:path*",
        destination: "http://127.0.0.1:8080/api/v1/events/:path*",
      },
      {
        source: "/api/corporate-leads",
        destination: "http://127.0.0.1:8080/api/v1/corporate-leads",
      },
      {
        source: "/api/corporate-leads",
        destination: "http://127.0.0.1:8080/api/v1/corporate-leads",
      },
      {
        source: "/api/corporate-leads/:path*",
        destination: "http://127.0.0.1:8080/api/v1/corporate-leads/:path*",
      },
      {
        source: "/api/leads",
        destination: "http://127.0.0.1:8080/api/v1/leads",
      },
      {
        source: "/api/leads/:path*",
        destination: "http://127.0.0.1:8080/api/v1/leads/:path*",
      },
      {
        source: "/api/formfields",
        has: [{ type: 'query', key: 'form' }],
        destination: "http://127.0.0.1:8080/api/v1/formfields?form=:form",
      },
      {
        source: "/api/formfields",
        destination: "http://127.0.0.1:8080/api/v1/formfields",
      },
      {
        source: "/api/formfields/:path*",
        destination: "http://127.0.0.1:8080/api/v1/formfields/:path*",
      },
      {
        source: "/api/downloads",
        destination: "http://127.0.0.1:8080/api/v1/downloads",
      },
      {
        source: "/api/downloads/:path*",
        destination: "http://127.0.0.1:8080/api/v1/downloads/:path*",
      },
      {
        source: "/api/subscribers",
        destination: "http://127.0.0.1:8080/api/v1/subscribers",
      },
      {
        source: "/api/downloads",
        destination: "http://127.0.0.1:8080/api/v1/downloads",
      },
      {
        source: "/api/downloads/:path*",
        destination: "http://127.0.0.1:8080/api/v1/downloads/:path*",
      },
      {
        source: "/api/subscribers",
        destination: "http://127.0.0.1:8080/api/v1/subscribers",
      },
      {
        source: "/api/analytics",
        destination: "http://127.0.0.1:8080/api/v1/analytics",
      },
      {
        source: "/api/analytics/:path*",
        destination: "http://127.0.0.1:8080/api/v1/analytics/:path*",
      },
      {
        source: "/api/ppc",
        destination: "http://127.0.0.1:8080/api/v1/ppc",
      },
      {
        source: "/api/database/:path*",
        destination: "http://127.0.0.1:8080/api/v1/database/:path*",
      },
      {
        source: "/api/ppc/:path*",
        destination: "http://127.0.0.1:8080/api/v1/ppc/:path*",
      },
      // HEALTH CHECK
      {
        source: "/api/v1/health",
        destination: "http://127.0.0.1:8080/api/v1/health",
      },
      // AUTH & AI
      {
        source: "/api/login",
        destination: "http://127.0.0.1:8080/api/v1/login",
      },
      {
        source: "/api/ai/generate",
        destination: "http://127.0.0.1:8080/api/v1/ai/generate",
      },
      // OAUTH (Google OAuth)
      {
        source: "/api/oauth/:path*",
        destination: "http://127.0.0.1:8080/api/v1/oauth/:path*",
      },
      // OAuth callback with /api/v1/ prefix (for Google redirect URL)
      {
        source: "/api/v1/oauth/:path*",
        destination: "http://127.0.0.1:8080/api/v1/oauth/:path*",
      },
      // GAP MODULES
      {
        source: "/api/media",
        destination: "http://127.0.0.1:8080/api/v1/media",
      },
      {
        source: "/api/media/:path*",
        destination: "http://127.0.0.1:8080/api/v1/media/:path*",
      },
      {
        source: "/api/users",
        destination: "http://127.0.0.1:8080/api/v1/users",
      },
      {
        source: "/api/users/:path*",
        destination: "http://127.0.0.1:8080/api/v1/users/:path*",
      },
      {
        source: "/api/navigation",
        destination: "http://127.0.0.1:8080/api/v1/navigation",
      },
      {
        source: "/api/navigation/:path*",
        destination: "http://127.0.0.1:8080/api/v1/navigation/:path*",
      },
      {
        source: "/api/pages",
        destination: "http://127.0.0.1:8080/api/v1/pages",
      },
      {
        source: "/api/pages/:path*",
        destination: "http://127.0.0.1:8080/api/v1/pages/:path*",
      },
      {
        source: "/api/seo",
        destination: "http://127.0.0.1:8080/api/v1/seo",
      },
      // STATIC UPLOADS
      // STATIC UPLOADS
      {
        source: "/uploads/:path*",
        destination: "http://127.0.0.1:8080/uploads/:path*",
      },
      // LLM/GEO
      {
        source: "/llm-context",
        destination: "http://127.0.0.1:8080/api/v1/context",
      },
      // META WEBHOOK
      {
        source: "/api/v1/meta/webhook",
        destination: "http://127.0.0.1:8080/api/v1/meta/webhook",
      },
      // OTP
      {
        source: "/api/otp/:path*",
        destination: "http://127.0.0.1:8080/api/v1/otp/:path*",
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
