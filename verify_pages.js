
const fs = require('fs');
const http = require('http');

const pagesFile = 'all_static_pages.txt';
const baseUrl = 'http://localhost:3002';
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBpeGUuY29tIiwiZXhwIjoxNzY3Nzc1NTg1LCJyb2xlIjoiYWRtaW4ifQ.opkTXMqM1l9K8cTiIX6ifbbpQ_onKFHkuuNldSGq9y0';

const pages = fs.readFileSync(pagesFile, 'utf-8').trim().split('\n');

async function checkPage(pagePath) {
    let route = pagePath.replace('frontend/app', '').replace('/page.tsx', '');
    if (route === '/page.tsx') route = '/'; // Fix for home page logic if needed, but above replace usually leaves / for root page.tsx? 
    // Actually frontend/app/page.tsx -> /
    // frontend/app/about/page.tsx -> /about

    if (pagePath === 'frontend/app/page.tsx') route = '/';

    const url = baseUrl + route;

    return new Promise((resolve) => {
        const options = {
            method: 'GET',
            headers: {
                'Cookie': `auth-token=${authToken}`
            }
        };

        const req = http.request(url, options, (res) => {
            // Consume data to free memory
            res.resume();
            resolve({ route, status: res.statusCode });
        });

        req.on('error', (e) => {
            resolve({ route, status: 'ERROR: ' + e.message });
        });

        req.end();
    });
}

async function run() {
    console.log("Check Started...");
    const results = [];
    // Run in parallel chunks of 10 to avoid overwhelming server
    const chunkSize = 10;
    for (let i = 0; i < pages.length; i += chunkSize) {
        const chunk = pages.slice(i, i + chunkSize);
        const promises = chunk.map(p => checkPage(p));
        const chunkResults = await Promise.all(promises);
        results.push(...chunkResults);
    }

    console.log("Route,Status");
    results.forEach(r => {
        console.log(`${r.route},${r.status}`);
    });
}

run();
