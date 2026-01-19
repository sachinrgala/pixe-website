import { getPool, query } from "@/lib/db";
import fs from "fs";
import path from "path";
import TrustBadges, { HiringPartners } from "@/components/TrustBadges";
import DOMPurify from "isomorphic-dompurify";

// Cloud Run is stateless, so we must use 'force-dynamic' for the route to fetch fresh data.
// However, we optimize the DB call itself using our in-memory cache to handle high traffic.
export const dynamic = "force-dynamic";

export default async function Home() {
  let html = "";
  let css = "";

  try {
    const pool = getPool();

    // 1. Try fetching from Database (Primary Source) with CACHING
    if (pool) {
      // Use useCache=true to serve cached content for 60 seconds
      // This protects the DB from being hammered by 1000s of concurrent visitors.
      const result = await query(
        'SELECT html, css FROM pages WHERE slug = $1',
        ['home'],
        true // useCache
      );

      if (result.rows.length > 0) {
        html = result.rows[0].html || "";
        css = result.rows[0].css || "";
      }
    }

    // 2. Fallback to Filesystem (Only useful for local dev, will be empty in Cloud Run)
    // We keep this for developers who might not have DB setup locally yet.
    if (!html) {
      const CONTENT_DIR = path.join(process.cwd(), "content", "grapesjs");
      const DATA_FILE = path.join(CONTENT_DIR, "home.json");

      if (fs.existsSync(DATA_FILE)) {
        const content = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
        html = content.html || "";
        css = content.css || "";
      }
    }

  } catch (e) {
    console.error("Failed to fetch home page content:", e);
  }

  // If no content exists, show a placeholder
  if (!html) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="text-center text-white max-w-2xl mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Pixe
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Start building your homepage by opening the visual editor.
            <br />
            <span className="text-sm opacity-70 mt-2 block">(Cloud Mode: Active)</span>
          </p>
          <a
            href="/editor/builder?slug=home"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg"
          >
            Open Page Editor →
          </a>
        </div>
      </div>
    );
  }

  // Fetch Dynamic Data from our Go Backend

  // Fetch Dynamic Data from our Go Backend
  let statsData = [];
  let partnersData = [];

  try {
    const [statsRes, partnersRes] = await Promise.all([
      fetch("http://localhost:8080/api/v1/stats", { next: { revalidate: 60 } }),
      fetch("http://localhost:8080/api/v1/partners", { next: { revalidate: 60 } })
    ]);
    if (statsRes.ok) statsData = await statsRes.json();
    if (partnersRes.ok) partnersData = await partnersRes.json();
  } catch (err) {
    console.warn("Failed to fetch dynamic stats/partners");
  }

  // Render the GrapesJS content + Dynamic React Sections
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Include Tailwind and Font Awesome for the rendered content */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />

      {/* Inject the CSS from GrapesJS */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Render the HTML from GrapesJS */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />

      {/* DYNAMIC SECTIONS (React) */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Trusted by Learners & Leaders</h2>
          {/* Map Backend Data to Component Props */}
          <TrustBadges
            stats={statsData.map((s: any) => ({
              icon: s.icon,
              label: s.label,
              sublabel: s.sublabel
            }))}
            variant="light"
          />
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <HiringPartners
            partners={partnersData.map((p: any) => p.name)}
            className="opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </section>
    </div>
  );
}
