
const fs = require('fs');

const FRONTEND_SUBMIT_URL = 'http://localhost:3002/api/leads';
const FRONTEND_CHECK_URL = 'http://localhost:3002/api/leads';
const LOGIN_URL = 'http://localhost:3002/api/login';

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
    console.log("🚀 Starting CMS Dashboard Verification (Cookie Auth)...\n");
    console.log(`Submitting to: ${FRONTEND_SUBMIT_URL}`);
    console.log(`Verifying at:  ${FRONTEND_CHECK_URL}\n`);

    // 0. Login to get Token
    process.stdout.write("🔑 Authenticating as Admin... ");
    let cookie = '';
    try {
        const loginRes = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@pixe.com', password: 'admin123' })
        });
        if (!loginRes.ok) throw new Error('Login failed');

        const data = await loginRes.json();
        const token = data.token;

        if (!token) throw new Error('No token received in body');

        // Construct cookie manually
        cookie = `auth-token=${token}`;

        console.log("\x1b[32m✔ SUCCESS\x1b[0m\n");
    } catch (e) {
        console.log("\x1b[31m✘ FAILED TO LOGIN\x1b[0m");
        console.error(e);
        return;
    }

    let passed = 0;
    let failed = 0;

    for (const item of LEAD_SOURCES) {
        // Use lowercase email to match backend normalization often
        const testEmail = `verify_${item.source.toLowerCase()}_${Date.now()}@test.com`;
        const payload = {
            name: `AutoTest ${item.name}`,
            email: testEmail,
            phone: '9999999999',
            source: item.source,
            message: 'CMS Dashboard Verification'
        };

        process.stdout.write(`Testing [${item.name}]... `);

        try {
            // 1. Submit Lead
            const res = await fetch(FRONTEND_SUBMIT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`Submission Failed: ${res.status}`);
            }

            // 2. Verify in CMS Data
            await new Promise(r => setTimeout(r, 1000)); // Sync delay

            const checkRes = await fetch(FRONTEND_CHECK_URL, {
                headers: { 'Cookie': cookie }
            });

            if (!checkRes.ok) throw new Error(`Fetch CMS Data Failed: ${checkRes.status}`);

            const leads = await checkRes.json();
            const leadsArray = Array.isArray(leads) ? leads : (leads.leads || []);

            // Flexible matching
            const found = leadsArray.find(l => {
                const lEmail = (l.email || l.Email || '').toLowerCase();
                const lSource = (l.source || l.Source || '');
                return lEmail === testEmail.toLowerCase() && lSource === item.source;
            });

            if (found) {
                console.log("\x1b[32m✔ PASSED\x1b[0m");
                passed++;
            } else {
                console.log("\x1b[31m✘ FAILED (Not visible in Dashboard)\x1b[0m");
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
        console.log("\n✅ ALL LEADS SUCCESSFULLY VERIFIED IN CMS.");
    } else {
        console.log("\n⚠ SOME CHECKS FAILED. Dashboard is missing data.");
    }
}

runVerification();
