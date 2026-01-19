// Import wireframe and save to GrapesJS backend
// Run with: node scripts/import-wireframe.js
// This copies EXACT wireframe HTML - no modifications
// Handles both <main> tags and wrapper <div> structures
// V3.0 - Complete list of ALL 39+ wireframe pages

const fs = require('fs');
const path = require('path');

const BACKEND_URL = 'http://localhost:8080/api/v1';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBpeGUuY29tIiwiZXhwIjoxNzY3NjE3MjI4LCJyb2xlIjoiYWRtaW4ifQ.v99hr1ZaQl2VpRyfUlmNG_Lv1EtUF0hvNg4rEX8KTPc';

const WIREFRAME_BASE = '/home/Sachin/pixe website/wireframe/light';

// COMPLETE mapping of ALL wireframe folders to page slugs (39 pages)
const PAGE_MAPPINGS = [
    // Core Pages (4)
    { folder: 'about_us_page', slug: 'about' },
    { folder: 'home page', slug: 'home' },
    { folder: 'faq_page', slug: 'faq' },
    { folder: 'sitemap_page', slug: 'sitemap' },

    // Policies (3)
    { folder: 'privacy_policy_page', slug: 'privacy' },
    { folder: 'terms_&_conditions_page', slug: 'terms' },
    { folder: 'refund_&_cancellation_policy_page', slug: 'refund' },

    // Main Courses (7)
    { folder: 'Advance digital marketing course', slug: 'courses/advance-digital-marketing' },
    { folder: 'digital marketing multi course page', slug: 'digital-marketing-courses' },
    { folder: 'seo course page', slug: 'courses/seo' },
    { folder: 'PPC page', slug: 'courses/ppc' },
    { folder: 'social media page', slug: 'courses/social-media' },
    { folder: 'anaytics page', slug: 'courses/analytics' },
    { folder: 'affilate & email page', slug: 'courses/affiliate-email' },

    // Location Pages - India (4)
    { folder: 'bangalore_digital_marketing_course_page', slug: 'locations/bangalore' },
    { folder: 'delhi_digital_marketing_course_page', slug: 'locations/delhi' },
    { folder: 'mumbai_digital_marketing_course_page', slug: 'locations/mumbai' },
    { folder: 'pune_digital_marketing_course_page', slug: 'locations/pune' },

    // Location Pages - International (2) - NESTED FOLDERS
    { folder: 'uae/gcc_digital_marketing_course_page', slug: 'locations/uae' },
    { folder: 'us/uk_digital_marketing_course_page', slug: 'locations/us' },

    // Pricing & Enrollment (2)
    { folder: 'pricing_&_emi_page', slug: 'pricing' },
    { folder: 'scholarships_&_financial_aid_page', slug: 'scholarships' },

    // Free Events (2) - NESTED FOLDERS
    { folder: 'free_counseling/demo_page', slug: 'free-counseling' },
    { folder: 'free_webinar/masterclass_event_page', slug: 'masterclass' },

    // Career Pages (5)
    { folder: 'hire_talent_page', slug: 'hire-talent' },
    { folder: 'internship_page', slug: 'internships' },
    { folder: 'digital_marketing_career_guide_page', slug: 'resources/career-guide' },
    { folder: 'career_outcomes_page_1', slug: 'career-outcomes' },
    { folder: 'career_outcomes_page_2', slug: 'career-outcomes/page-2' },

    // Success Stories & Reviews (2)
    { folder: 'student_success_stories_page', slug: 'success-stories' },
    { folder: 'testimonials_&_reviews_page', slug: 'testimonials' },

    // Resources (4)
    { folder: 'content_hub_page', slug: 'resources' },
    { folder: 'free_tools_&_templates_page', slug: 'resources/tools' },
    { folder: 'certifications_page', slug: 'certifications' },
    { folder: 'corporate_training_page', slug: 'corporate-training' },
];

function extractContent(html) {
    // Try <main> first (most wireframes have this)
    let mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) {
        return { content: mainMatch[1], method: 'main' };
    }

    // For pages without <main>, extract body content excluding header/footer
    let bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
        let bodyContent = bodyMatch[1];

        // Remove header
        bodyContent = bodyContent.replace(/<header[\s\S]*?<\/header>/i, '');

        // Remove footer
        bodyContent = bodyContent.replace(/<footer[\s\S]*?<\/footer>/i, '');

        // Remove any sticky bottom bars (mobile CTAs)
        bodyContent = bodyContent.replace(/<div[^>]*class="[^"]*fixed bottom[^"]*"[\s\S]*?<\/div>/gi, '');

        // Remove spacer divs for sticky bars
        bodyContent = bodyContent.replace(/<div[^>]*class="[^"]*h-\d+[^"]*md:hidden[^"]*"[\s\S]*?<\/div>/gi, '');

        return { content: bodyContent.trim(), method: 'body' };
    }

    return null;
}

async function importWireframe(wireframePath, slug) {
    try {
        const html = fs.readFileSync(wireframePath, 'utf-8');

        const extracted = extractContent(html);
        if (!extracted) {
            console.error(`   ❌ Could not extract content from: ${wireframePath}`);
            return false;
        }

        console.log(`📦 Importing: ${slug}`);
        console.log(`   Method: ${extracted.method} | Content: ${extracted.content.length} chars`);

        const response = await fetch(`${BACKEND_URL}/pages/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                html: extracted.content,
                css: ''
            })
        });

        if (response.ok) {
            console.log(`   ✅ SUCCESS\n`);
            return true;
        } else {
            const error = await response.text();
            // Try creating the page if it doesn't exist
            if (error.includes('not found')) {
                console.log(`   ⚠️ Page not in DB, attempting to create...`);
                const createRes = await fetch(`${BACKEND_URL}/pages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${TOKEN}`
                    },
                    body: JSON.stringify({
                        slug: slug,
                        title: slug.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        html: extracted.content,
                        css: ''
                    })
                });
                if (createRes.ok) {
                    console.log(`   ✅ CREATED & IMPORTED\n`);
                    return true;
                }
            }
            console.error(`   ❌ FAILED: ${error}\n`);
            return false;
        }
    } catch (err) {
        console.error(`   ❌ ERROR: ${err.message}\n`);
        return false;
    }
}

async function importAll() {
    console.log('========================================================');
    console.log('🚀 WIREFRAME IMPORTER V3.0 - COMPLETE (39 PAGES)');
    console.log('========================================================\n');

    let success = 0;
    let failed = 0;
    let skipped = 0;

    for (const mapping of PAGE_MAPPINGS) {
        const wirePath = path.join(WIREFRAME_BASE, mapping.folder, 'code.html');
        if (fs.existsSync(wirePath)) {
            const result = await importWireframe(wirePath, mapping.slug);
            if (result) success++; else failed++;
        } else {
            console.log(`⚠️ Skipping ${mapping.slug}: file not found at ${mapping.folder}`);
            skipped++;
        }
    }

    console.log('========================================================');
    console.log(`📊 FINAL RESULTS: ${success} success, ${failed} failed, ${skipped} skipped`);
    console.log(`📊 TOTAL PAGES: ${PAGE_MAPPINGS.length}`);
    console.log('========================================================');
}

// Run imports
importAll();
