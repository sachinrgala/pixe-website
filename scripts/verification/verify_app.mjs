import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function run() {
    console.log("Launching browser...");
    // Launch browser (headless for speed/stability in this env)
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote',
            '--single-process'
        ]
    });
    const page = await browser.newPage();

    // Directory for artifacts
    const artifactDir = '/home/Sachin/.gemini/antigravity/brain/9b0c94df-1ffc-4e0c-9349-0d37b803e61b';

    try {
        // 1. Visit Homepage
        console.log("Navigating to Homepage...");
        await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });
        const title = await page.title();
        console.log(`Homepage Title: ${title}`);
        await page.screenshot({ path: path.join(artifactDir, 'homepage.png') });

        // 2. Visit Contact Page
        console.log("Navigating to Contact Page...");
        await page.goto('http://localhost:3002/contact', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: path.join(artifactDir, 'contact_page.png') });

        // 3. Find Form
        console.log("Looking for form elements...");
        // Generic selectors that might match inputs
        const inputs = await page.$$('input');
        console.log(`Found ${inputs.length} input fields.`);

        if (inputs.length > 0) {
            // Try to fill data if inputs exist
            // This is a "best effort" attempt to fill likely fields
            const filled = [];
            for (const input of inputs) {
                const name = await input.evaluate(el => el.name || el.placeholder || el.type);
                if (name && (name.includes('name') || name.includes('Name'))) {
                    await input.type('Test User');
                    filled.push('name');
                } else if (name && (name.includes('email') || name.includes('Email'))) {
                    await input.type('test@example.com');
                    filled.push('email');
                } else if (name && (name.includes('phone') || name.includes('tel'))) {
                    await input.type('1234567890');
                    filled.push('phone');
                }
            }
            console.log(`Filled fields: ${filled.join(', ')}`);
            await page.screenshot({ path: path.join(artifactDir, 'contact_filled.png') });

            // 4. Try to submit
            console.log("Attempting submission...");
            const submitBtn = await page.$('button[type="submit"]') || await page.$('button');
            if (submitBtn) {
                // Click and wait for navigation or network activity
                await Promise.all([
                    submitBtn.click(),
                    new Promise(resolve => setTimeout(resolve, 3000)) // Wait 3s for any JS to handle it
                ]);
                console.log("Submitted form.");
                await page.screenshot({ path: path.join(artifactDir, 'contact_submitted.png') });
            } else {
                console.log("No submit button found.");
            }
        } else {
            console.log("No inputs found on Contact page.");
        }

    } catch (error) {
        console.error("Error during verification:", error);
    } finally {
        await browser.close();
        console.log("Browser closed.");
    }
}

run();
