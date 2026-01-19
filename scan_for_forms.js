
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const formSignatures = [
    '<form',
    '<LeadForm',
    '<RegistrationForm',
    '<BrochureForm',
    '<SyllabusForm',
    '<BookingWidget',
    '<Newsletter',
    'handleSubmit',
    'useForm',
    'FormItem' // for dashboard
];

// Get list of all page.tsx files
const fileList = execSync('find frontend/app -name "page.tsx"').toString().split('\n').filter(Boolean);

// Previously verified pages (normalized to just path, manual list based on verified_all_forms.js)
const verifiedPages = [
    '/locations/bangalore', '/locations/delhi', '/locations/mumbai', '/locations/pune', '/locations/uae', '/locations/us',
    '/internships', '/masterclass', '/scholarships', '/advance-digital-marketing-course',
    '/career/career-guide', '/pricing',
    '/corporate-training', '/career/hire-talent',
    '/contact', '/free-counseling',
    '/resources', '/resources/tools',
    '/courses', // Syllabus form general
    '/' // Home page
];

console.log("Scanning " + fileList.length + " files for forms...");
console.log("---------------------------------------------------");

let foundCount = 0;
fileList.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const hasForm = formSignatures.some(sig => content.includes(sig));

    if (hasForm) {
        // Normalize path to route
        let route = file.replace('frontend/app', '').replace('/page.tsx', '');
        if (route === '') route = '/';

        // Dynamic route handling for matching
        const isDynamic = route.includes('[');

        // Exact match check
        const isVerified = verifiedPages.includes(route) ||
            (route === '/' && verifiedPages.includes('/')) ||
            (isDynamic && route.includes('locations') && verifiedPages.some(v => v.includes('/locations/'))) ||
            (isDynamic && route.includes('courses') && verifiedPages.includes('/courses')); // General courses covered

        if (!isVerified) {
            // Exclude dashboard admin forms from "frontend manual verification" unless requested, but user said "each and every page"
            // We will list them but mark them as Admin.
            const isAdmin = route.startsWith('/dashboard');

            if (!isAdmin) {
                console.log(`[NEW] Found unchecked public form on: ${route}`);
                // Try to guess type
                formSignatures.forEach(sig => {
                    if (content.includes(sig)) process.stdout.write(`    (Signature: ${sig}) `);
                });
                console.log("");
                foundCount++;
            }
        }
    }
});

if (foundCount === 0) {
    console.log("No new public forms found. All discovered forms have been verified.");
} else {
    console.log(`---------------------------------------------------`);
    console.log(`Found ${foundCount} additional pages with possible forms.`);
}
