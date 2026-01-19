// using native fetch

async function checkCourseData() {
    try {
        console.log("Fetching /api/courses...");
        const res = await fetch('http://localhost:3002/api/courses');
        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText}`);
            console.error(await res.text());
            return;
        }

        const data = await res.json();
        const course = data.find(c => c.slug === 'seo-course');

        if (!course) {
            console.error("❌ Course 'seo-course' NOT FOUND in API response!");
            return;
        }

        console.log("✅ Course found:", course.title);

        // check required arrays
        const requiredArrays = ['highlights', 'curriculum', 'jobRoles', 'placementStats'];
        let hasError = false;

        requiredArrays.forEach(field => {
            if (!Array.isArray(course[field])) {
                console.error(`❌ Error: course.${field} is NOT an array! Value:`, course[field]);
                hasError = true;
            } else {
                console.log(`✅ course.${field} is an array (${course[field].length} items)`);
                // Check inner structure for curriculum
                if (field === 'curriculum') {
                    course.curriculum.forEach((mod, i) => {
                        // lessons can be null or array
                        if (mod.lessons !== null && !Array.isArray(mod.lessons)) {
                            console.error(`❌ Error: course.curriculum[${i}].lessons is neither null nor array!`, mod.lessons);
                            hasError = true;
                        }
                    });
                }
            }
        });

        // check required objects
        if (!course.title) { console.error("❌ Error: title missing"); hasError = true; }
        if (!course.description) { console.error("❌ Error: description missing"); hasError = true; }
        if (typeof course.price !== 'number') { console.error("❌ Error: price is not a number"); hasError = true; }

        if (!hasError) {
            console.log("\n🎉 DATA INTEGRITY CHECK PASSED. The data structure matches page.tsx expectations.");
        } else {
            console.log("\nDATA INTEGRITY CHECK FAILED.");
        }

    } catch (e) {
        console.error("Script failed:", e);
    }
}

checkCourseData();
