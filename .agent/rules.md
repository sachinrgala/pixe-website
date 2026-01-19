# Project Design Rules

## Global Layout Compliance
- **Unified Header/Footer**: All pages (including landing pages, inner pages, and CMS templates) MUST use the global `Navbar` and `Footer` components defined in `components/layout/`.
- **Consistency**: Do not implement custom headers or footers for specific pages unless explicitly authorized as an exception (e.g., specific Landing Pages for campaigns).
- **Design Source**: The visual design of the Header and Footer is based on the "About Us" wireframe and has been standardized across the application.
- **Import Path**: Always use `import { Navbar } from "@/components/layout/Navbar"` and `import { Footer } from "@/components/layout/Footer"`.

## Universal Font
- **Primary Font**: Inter is the universal font across the entire website.
- **Display Font**: Lexend is available via `.font-display` class for special headings if needed.
- **Configuration**: Font is loaded in `app/layout.tsx` via Next.js font optimization and applied globally in `app/globals.css`.
- **Font Stack**: `var(--font-sans)` which resolves to `Inter, ui-sans-serif, system-ui`.
- **Usage**: All text elements use Inter by default. Use `.font-display` utility class for Lexend if needed.

## Semantic Color Variables
Use these CSS variables for consistent theming:
- `--primary` / `--primary-dark`: Primary brand colors
- `--background`: Page background
- `--surface` / `--surface-deep`: Card/section backgrounds
- `--foreground`: Main text color
- `--text-muted`: Secondary text color
- `--border-color`: Border color

These automatically switch between light and dark mode.

## Page Structure Template
All public-facing pages should follow this structure:
```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PageName() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-foreground">
            <Navbar />
            {/* Page content with pt-32 for fixed navbar */}
            <main className="pt-32">
                {/* Content */}
            </main>
            <Footer />
        </div>
    );
}
```

## Exceptions
- **Dashboard pages**: Use their own admin layout (`app/dashboard/layout.tsx`)
- **Editor pages**: Use their own layout for the visual builder
- **Login page**: Standalone page without global header/footer (intentional)
- **Thank-you page**: Minimal confirmation page design

## Pages Updated (December 2025)
The following pages have been updated to use the global Navbar and Footer:
- Homepage (`/`)
- About (`/about`)
- Blog listing (`/blog`)
- Blog post (`/blog/[slug]`)
- Success Stories (`/success-stories`)
- Hire Talent (`/hire-talent`)
- Masterclass (`/masterclass`)
- Internships (`/internships`)
- Scholarships (`/scholarships`)
- Resources listing (`/resources`)
- Resources post (`/resources/[slug]`)
- Location pages (`/locations/[city]`)
- Privacy Policy (`/privacy`, `/legal/privacy`)
- Terms of Service (`/terms`, `/legal/terms`)
- Refund Policy (`/refund`, `/legal/refund`)
- Course Detail (`/courses/[slug]`)
