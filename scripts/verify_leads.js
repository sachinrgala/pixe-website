
const fs = require('fs');

const FRONTEND_URL = 'http://localhost:3002/api/leads';
const BACKEND_URL = 'http://localhost:8080/api/v1/leads';

const LEAD_SOURCES = [
    { source: 'homepage', name: 'Home Hero' },
    { source: 'contact_page', name: 'Contact Inquiry' },
    { source: 'advance_dm_course', name: 'Advance Course' },
    { source: 'masterclass', name: 'Masterclass Reg' },
    { source: 'free_counseling', name: 'Counseling Booking' },
    { source: 'corporate_training', name: 'Corporate Training' },
    { source: 'hire_talent', name: 'Hire Talent' },
    { source: 'internships_page', name: 'Internship App' },
    { source: 'scholarships_page', name: 'Scholarship App' },
    { source: 'pricing_advisor', name: 'Pricing Advisor' },
    { source: 'career_guide_magnet', name: 'Career Guide' },
    { source: 'tools_lead_magnet', name: 'Tools Magnet' },
    { source: 'newsletter_footer', name: 'Newsletter' }, // Representing resources
    { source: 'location_page', name: 'City Page Lead' },
    { source: 'course_details_slug', name: 'Course Details' }, // Fallback for slug pages
    { source: 'course_quick_apply', name: 'Quick Apply Template' }
];

async function runVerification() {
    console.log("🚀 Starting Lead Verification Suite...\n");
    console.log(`Frontend Target: ${FRONTEND_URL}`);
    console.log(`Backend Target:  ${BACKEND_URL}\n`);

    // 0. Login to get Token
    process.stdout.write("🔑 Authenticating as Admin... ");
    let token = '';
    try {
        const loginRes = await fetch('http://localhost:3002/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@pixe.com', password: 'admin123' })
        });
        if (!loginRes.ok) throw new Error('Login failed');
        const data = await loginRes.json();
        token = data.token;
        console.log("\x1b[32m✔ SUCCESS\x1b[0m\n");
    } catch (e) {
        console.log("\x1b[31m✘ FAILED TO LOGIN\x1b[0m");
        console.error(e);
        return;
    }

    let passed = 0;
    let failed = 0;

    for (const item of LEAD_SOURCES) {
        const testEmail = `verify_${item.source}_${Date.now()}@test.com`;
        const payload = {
            name: `AutoTest ${item.name}`,
            email: testEmail,
            phone: '9999999999',
            source: item.source,
            message: 'Automated verification script'
        };

        process.stdout.write(`Testing [${item.name}] (${item.source})... `);

        try {
            // 1. Submit Lead
            const res = await fetch(FRONTEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`Submission Failed: ${res.status}`);
            }

            // 2. Verify in Backend (immediately)
            // Giving a slight buffer for async processing if any
            await new Promise(r => setTimeout(r, 500));

            const checkRes = await fetch(BACKEND_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const leads = await checkRes.json();

            // Handle case where leads might be wrapped or null
            // Based on Go backend, it likely returns just the slice, but let's be safe
            const leadsArray = Array.isArray(leads) ? leads : (leads.leads || []);

            // Go struct fields are Capitalized (Email, Source)
            // But JSON response usually lowercases them unless struct tags say otherwise.
            // Let's check both or normalize.

            const found = leadsArray.find(l =>
                (l.email === testEmail || l.Email === testEmail) &&
                (l.source === item.source || l.Source === item.source)
            );

            if (found) {
                console.log("\x1b[32m✔ PASSED\x1b[0m");
                passed++;
            } else {
                console.log("\x1b[31m✘ FAILED (Not found in Backend)\x1b[0m");
                // console.log("Debug leads:", JSON.stringify(leadsArray[0])); 
                failed++;
            }

        } catch (e) {
            console.log(`\x1b[31m✘ ERROR: ${e.message}\x1b[0m`);
            failed++;
        }
    }

    console.log("\n========================================");
    console.log(`TOTAL: ${LEAD_SOURCES.length}`);
    console.log(`\x1b[32mPASSED: ${passed}\x1b[0m`);
    console.log(`\x1b[31mFAILED: ${failed}\x1b[0m`);
    console.log("========================================");

    if (passed === LEAD_SOURCES.length) {
        console.log("\n✅ ALL SYSTEMS GREEN. Dashboard should populate correctly.");
    } else {
        console.log("\n⚠ SOME CHECKS FAILED. See logs.");
    }
}

runVerification();
