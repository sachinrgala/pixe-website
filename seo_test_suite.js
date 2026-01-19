
const { getCityConfig } = require('./frontend/config/cityConfig');

// Mock next/link since we're running in a standalone Node script
// We don't need real React components for this logic test
const mockParams = [
    { city: 'mumbai' },
    { city: 'delhi' },
    { city: 'bangalore' },
    { city: 'unknown_city' } // Test fallback
];

console.log("----------------------------------------------------------------");
console.log("🤖 INTELLIGENT pSEO MECHANISM: AUTOMATED TEST SUITE");
console.log("----------------------------------------------------------------");

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ PASS: ${message}`);
        passed++;
    } else {
        console.log(`❌ FAIL: ${message}`);
        failed++;
    }
}

// 1. Test Configuration Loading
console.log("\n[TEST 1] Configuration Logic");
mockParams.forEach(param => {
    const config = getCityConfig(param.city);
    console.log(`   Input: "${param.city}" -> Output: "${config.name}" (Status: ${config.status})`);

    if (param.city === 'mumbai') {
        assert(config.name === "Mumbai", "Mumbai config loaded correctly");
        assert(config.status === "online_only", "Mumbai status is online_only");
    }
    if (param.city === 'bangalore') {
        assert(config.status === "online_only", "Bangalore status is online_only");
        assert(!!config.address, "Bangalore has address");
    }
    if (param.city === 'unknown_city') {
        assert(config.name === "Unknown_city", "Fallback capitalization works");
        assert(config.slug === "unknown_city", "Slug preserved in fallback");
    }
});

// 2. Test Content Injection Logic (Simulating Component Logic)
console.log("\n[TEST 2] Content Injection Simulation");

const testInjection = (citySlug) => {
    const config = getCityConfig(citySlug);
    const locationName = config.name;

    // Simulate FAQ Logic
    const faqAnswer = config.status === "active"
        ? `Yes! We have an active center in ${locationName}`
        : `We currently operate via our HQ in Bangalore, but we have a strong online community in ${locationName}`;

    // Simulate Home Hero Logic
    const homeHeadline = config.slug === 'india'
        ? "India's Only Agency-Style Digital Marketing Institute"
        : `Best Digital Marketing Institute in ${locationName}`;

    return { faqAnswer, homeHeadline };
}

const mumbaiResult = testInjection('mumbai');
assert(mumbaiResult.faqAnswer.includes("operate via our HQ"), "Mumbai gets Online/Remote FAQ Answer");
assert(mumbaiResult.homeHeadline.includes("Institute in Mumbai"), "Mumbai Home Headline Correct");

const defaultResult = testInjection('india'); // Default simulation
assert(defaultResult.homeHeadline.includes("Agency-Style"), "Default Home Headline Correct");

const bangaloreResult = testInjection('bangalore');
assert(bangaloreResult.faqAnswer.includes("operate via our HQ"), "Bangalore gets Online/Remote FAQ Answer"); // Changed to Online

const usaResult = testInjection('usa');
assert(usaResult.faqAnswer.includes("operate via our HQ"), "USA gets Online/Remote FAQ Answer");
assert(usaResult.homeHeadline.includes("Institute in USA"), "USA Home Headline Correct");

const ukResult = testInjection('uk');
assert(ukResult.faqAnswer.includes("operate via our HQ"), "UK gets Online/Remote FAQ Answer");
assert(ukResult.homeHeadline.includes("Institute in UK"), "UK Home Headline Correct");

const uaeResult = testInjection('uae');
assert(uaeResult.faqAnswer.includes("operate via our HQ"), "UAE gets Online/Remote FAQ Answer");
assert(uaeResult.homeHeadline.includes("Institute in UAE"), "UAE Home Headline Correct");

const delhiResult = testInjection('delhi');
assert(delhiResult.faqAnswer.includes("operate via our HQ"), "Delhi gets Online/Remote FAQ Answer");
assert(delhiResult.homeHeadline.includes("Institute in Delhi"), "Delhi Home Headline Correct");

const puneResult = testInjection('pune');
assert(puneResult.faqAnswer.includes("operate via our HQ"), "Pune gets Online/Remote FAQ Answer");
assert(puneResult.homeHeadline.includes("Institute in Pune"), "Pune Home Headline Correct");

const hyderabadResult = testInjection('hyderabad');
assert(hyderabadResult.faqAnswer.includes("operate via our HQ"), "Hyderabad gets Online/Remote FAQ Answer");
assert(hyderabadResult.homeHeadline.includes("Institute in Hyderabad"), "Hyderabad Home Headline Correct");

const chennaiResult = testInjection('chennai');
assert(chennaiResult.faqAnswer.includes("operate via our HQ"), "Chennai gets Online/Remote FAQ Answer");
assert(chennaiResult.homeHeadline.includes("Institute in Chennai"), "Chennai Home Headline Correct");

// Test for invalid location (should fallback to default behavior)
const invalidResult = testInjection('narnia');
assert(invalidResult.homeHeadline.includes("Institute in Narnia"), "Invalid City Fallback Headline Works");

// Test isValidLocation function
console.log("\n[TEST 3] Strict 404 Validation (isValidLocation)");
const { isValidLocation } = require('./frontend/config/cityConfig.ts');
assert(isValidLocation('mumbai') === true, "Mumbai is valid location");
assert(isValidLocation('bangalore') === true, "Bangalore is valid location");
assert(isValidLocation('usa') === true, "USA is valid location");
assert(isValidLocation('narnia') === false, "Narnia is NOT valid location");
assert(isValidLocation('mars') === false, "Mars is NOT valid location");

console.log("\n----------------------------------------------------------------");
console.log(`TEST RESULTS: ${passed} Passed, ${failed} Failed`);
console.log("----------------------------------------------------------------");

if (failed === 0) {
    console.log("🚀 ALL SYSTEMS GO. Ready for Deployment.");
} else {
    console.error("⚠️ SYSTEM FAILURE. Do not deploy.");
    process.exit(1);
}
