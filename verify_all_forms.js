
const fs = require('fs');
const http = require('http');

const baseUrl = 'http://localhost:3002';
// Reusing admin token for consistency, though most forms are public
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBpeGUuY29tIiwiZXhwIjoxNzY3Nzc1NTg1LCJyb2xlIjoiYWRtaW4ifQ.opkTXMqM1l9K8cTiIX6ifbbpQ_onKFHkuuNldSGq9y0';

const FORMS_TO_TEST = [
    // Location Pages (LeadForm)
    { url: '/locations/bangalore', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/locations/delhi', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/locations/mumbai', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/locations/pune', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/locations/uae', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/locations/us', type: 'lead', required: ['name', 'email', 'phone'] },

    // Career & Education
    { url: '/internships', type: 'registration', required: ['name', 'email', 'phone', 'course'] },
    { url: '/masterclass', type: 'registration', required: ['name', 'email', 'phone', 'course'] },
    { url: '/scholarships', type: 'registration', required: ['name', 'email', 'phone', 'course'] },
    { url: '/advance-digital-marketing-course', type: 'registration', required: ['name', 'email', 'phone', 'course'] },

    // Resources
    { url: '/career/career-guide', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/career/career-guide', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/pricing', type: 'lead', required: ['name', 'email', 'phone'] },
    { url: '/resources', type: 'subscriber', required: ['email'] },
    { url: '/resources/tools', type: 'lead', required: ['name', 'email', 'phone'] },

    // Corporate
    { url: '/corporate-training', type: 'corporate', required: ['company_name', 'name', 'email', 'phone'] },
    { url: '/career/hire-talent', type: 'corporate', required: ['company_name', 'name', 'email', 'phone'] },

    // Service
    { url: '/contact', type: 'lead', required: ['name', 'email', 'phone', 'message'] },
    { url: '/free-counseling', type: 'lead', required: ['name', 'email', 'phone'] },

    // Newly Discovered
    { url: '/career', type: 'registration', required: ['name', 'email', 'phone'] },
    { url: '/login', type: 'auth', required: ['email', 'password'] }
];

async function submitForm(page) {
    const timestamp = Date.now();
    const testEmail = `auto_test_${timestamp}@example.com`;

    let payload = {};

    if (page.type === 'lead' || page.type === 'registration') {
        payload = {
            name: "Auto Tester",
            email: testEmail,
            phone: "9999999999",
            source: "manual_verification_script_" + page.url,
            course: "Automated Testing Course", // Default
            message: "Automated verification test."
        };
    } else if (page.type === 'corporate') {
        payload = {
            name: "Auto Corp Tester",
            email: testEmail,
            phone: "8888888888",
            company_name: "Test Corp Inc",
            requirements: "Automated verification test.",
            source: "corporate_" + page.url.replace('/', '')
        };
    } else if (page.type === 'auth') {
        payload = {
            email: "admin@pixe.com",
            password: "admin123"
        };
    } else if (page.type === 'subscriber') {
        payload = {
            email: testEmail
        };
    }

    // Determine endpoint based on type
    let endpoint = '/api/leads';
    if (page.type === 'corporate') endpoint = '/api/corporate-leads';
    if (page.type === 'auth') endpoint = '/api/login';
    if (page.type === 'subscriber') endpoint = '/api/subscribers';

    const postData = JSON.stringify(payload);

    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3002,
            path: endpoint,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'Cookie': `auth-token=${authToken}`
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    url: page.url,
                    status: res.statusCode,
                    response: data,
                    type: page.type
                });
            });
        });

        req.on('error', (e) => {
            resolve({ url: page.url, status: 'ERROR', response: e.message });
        });

        req.write(postData);
        req.end();
    });
}

async function run() {
    console.log("Starting Manual Form Verification Simulation...");
    console.log("---------------------------------------------");

    for (const page of FORMS_TO_TEST) {
        process.stdout.write(`Testing ${page.url} (${page.type})... `);
        const result = await submitForm(page);

        if (result.status === 200 || result.status === 201) {
            console.log(`✅ PASS (${result.status})`);
        } else {
            console.log(`❌ FAIL (${result.status})`);
            console.log(`   Response: ${result.response}`);
        }
    }
    console.log("---------------------------------------------");
    console.log("Verification Complete.");
}

run();
