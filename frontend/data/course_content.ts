export interface Mentor {
    name: string;
    role: string;
    description: string;
    image?: string;
}

export interface CaseStudy {
    name: string;
    result: string;
    initials: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface SuccessStory {
    name: string;
    role: string;
    quote: string;
    image?: string;
    videoThumbnail?: string;
}

export interface LearnByDoing {
    icon: string;
    title: string;
    description: string;
    colorClass: string;
}

export interface CourseSupplement {
    heroImage?: string;
    tools: string[];
    mentors: Mentor[];
    caseStudies?: CaseStudy[]; // Optional, specific to SEO
    successStories?: SuccessStory[];
    learnByDoing?: LearnByDoing[];
    faqs: FAQ[];
    workshop?: {
        title: string;
        description: string;
        cta: string;
    };
}

export const COURSE_CONTENT: Record<string, CourseSupplement> = {
    // 1. Advance Digital Marketing (Master)
    "advance-digital-marketing-course": {
        heroImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop",
        tools: ["GOOGLE", "META", "HUBSPOT", "SEMRUSH"],
        mentors: [
            { name: "Amit Patel", role: "Ex-Google, 10y Exp", description: "Specialist in SEO & Analytics" },
            { name: "Sarah John", role: "Meta Certified", description: "Social Media Strategist" },
            { name: "Vikram Singh", role: "CMO, TechStartup", description: "Brand Strategy Expert" }
        ],
        learnByDoing: [
            { icon: "work", title: "Internship Included", description: "2 months guaranteed internship with partner agencies.", colorClass: "blue" },
            { icon: "simulation", title: "Agency Simulation", description: "Run a virtual agency and handle client briefs.", colorClass: "orange" },
            { icon: "campaign", title: "Live Campaigns", description: "Spend real budget on ads and optimize ROI.", colorClass: "green" }
        ],
        successStories: [
            { name: "Priya Sharma", role: "Placed at Ogilvy", quote: "The live projects gave me the confidence to crack my interview at a top agency. Highly recommended!" },
            { name: "Rahul Verma", role: "Digital Marketing Manager", quote: "Best investment for my career. The mentors are industry leaders who know the current trends." }
        ],
        faqs: [
            { question: "Is this course suitable for beginners?", answer: "Yes, we start from the fundamentals and move to advanced topics." },
            { question: "Do you provide placement support?", answer: "Absolutely! We have a dedicated placement cell with 500+ hiring partners." },
            { question: "What if I miss a live class?", answer: "All sessions are recorded and available in your student dashboard for lifetime access." }
        ],
        workshop: { title: "Not sure yet?", description: "Join our free masterclass this Saturday to get a taste of learning.", cta: "Join Free Workshop" }
    },

    // 2. SEO Course
    "seo-course": {
        heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2000&auto=format&fit=crop",
        tools: ["SEMRUSH", "AHREFS", "MOZ", "GSC"],
        mentors: [
            { name: "Vikram Malhotra", role: "Head of SEO, Top Agency", description: "12+ Years in Technical SEO" },
            { name: "Sarah Jenkins", role: "Content Strategy Lead", description: "Ex-Moz, Link Building Pro" },
            { name: "Arjun Reddy", role: "Analytics Consultant", description: "GA4 & GTM Specialist" }
        ],
        caseStudies: [
            { name: "Ankit Singh", result: "300% Traffic Growth in 6 Months", initials: "AS" },
            { name: "Riya Mehra", result: "Cracked Page 1 for High Vol Keywords", initials: "RM" }
        ],
        successStories: [
            { name: "Kunal Shah", role: "SEO Executive", quote: "I learned technical SEO audits which no other institute teaches in depth." },
            { name: "Meera Nair", role: "Freelancer", quote: "Got my first international client within a month of completing this course." }
        ],
        learnByDoing: [
            { icon: "travel_explore", title: "Live Site Audits", description: "Audit real websites using paid tools like Semrush.", colorClass: "blue" },
            { icon: "link", title: "Link Building", description: "Execute a live outreach campaign for backlinks.", colorClass: "green" },
            { icon: "manage_search", title: "keyword Strategy", description: "Build a keyword map for an e-commerce giant.", colorClass: "orange" }
        ],
        faqs: [
            { question: "Do I need coding knowledge for Technical SEO?", answer: "Basic HTML/CSS knowledge is helpful, but we cover everything you need to know from scratch. You don't need to be a developer." },
            { question: "Will I learn how to use paid tools like Semrush?", answer: "Yes, we provide hands-on training on Semrush, Ahrefs, and Screaming Frog, along with free tools like GSC and GA4." },
            { question: "Does this course cover recent Google Algorithm updates?", answer: "Absolutely. Our curriculum is updated monthly to reflect the latest Core Updates, HCU, and AI Search changes." }
        ],
        workshop: { title: "Free SEO Workshop", description: "Join our 2-hour masterclass on \"SEO in the Age of AI\" this Saturday.", cta: "Reserve Free Seat" }
    },

    // 3. UI/UX Design
    "ui-ux-design": {
        heroImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop", // Creative designer workspace
        tools: ["FIGMA", "ADOBE XD", "MIRO", "ZEPLIN"],
        mentors: [
            { name: "Rohan Deshmukh", role: "Product Designer, Swiggy", description: "Expert in Mobile App UX" },
            { name: "Ananya Gupta", role: "UX Researcher, Microsoft", description: "Specialist in User Testing" },
            { name: "Kabir Bedi", role: "Visual Lead, Cred", description: "Master of UI Systems" }
        ],
        learnByDoing: [
            { icon: "design_services", title: "Wireframing", description: "Create low and high fidelity wireframes for a food delivery app.", colorClass: "blue" },
            { icon: "smartphone", title: "Prototyping", description: "Build interactive prototypes for user testing.", colorClass: "purple" },
            { icon: "person_search", title: "User Research", description: "Conduct user interviews and create personas.", colorClass: "orange" }
        ],
        successStories: [
            { name: "Ishaan Khattar", role: "UI Designer", quote: "The portfolio building sessions were a game changer. Got hired immediately." },
            { name: "Sana Khan", role: "Product Designer", quote: "Seamless transition from graphic design to UX thanks to the mentors." }
        ],
        faqs: [
            { question: "Do I need to know drawing or sketching?", answer: "No, UI/UX is about problem solving and logic. Sketching helps but isn't mandatory." },
            { question: "Will I build a portfolio?", answer: "Yes, you will finish the course with a Behance-ready portfolio containing 3 case studies." },
            { question: "Is software provided?", answer: "We use Figma which is free/browser-based, and guide you on Adobe setups." }
        ],
        workshop: { title: "Design Systems 101", description: "Learn how top companies build scalable design systems.", cta: "Watch Free Demo" }
    },

    // 4. PPC & Performance Marketing
    "ppc-course": {
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", // Data dashboard/analytics
        tools: ["GOOGLE ADS", "META ADS", "GTM", "GA4"],
        mentors: [
            { name: "Suresh Menon", role: "Performance Lead, MakeMyTrip", description: "Managing multi-crore ad spends" },
            { name: "Divya Sethi", role: "Media Buyer", description: "E-commerce scaling expert" }
        ],
        learnByDoing: [
            { icon: "ads_click", title: "Campaign Setup", description: "Launch live search and display campaigns.", colorClass: "blue" },
            { icon: "attach_money", title: "Budget Optimization", description: "Manage a dummy budget of ₹1 Lakh to maximize ROI.", colorClass: "green" },
            { icon: "insights", title: "A/B Testing", description: "Test ad creatives and landing pages for conversion.", colorClass: "red" }
        ],
        successStories: [
            { name: "Rajiv Malhotra", role: "PPC Specialist", quote: "I learned how to actually reduce CPA, not just run ads." }
        ],
        faqs: [
            { question: "Do I need a big budget to learn?", answer: "No, we provide demo accounts and simulation environments." },
            { question: "Is this covered in the Master course?", answer: "Yes, but this specialization goes much deeper into optimization frameworks." }
        ],
        workshop: { title: "Google Ads Masterclass", description: "Advanced bidding strategies for 2024.", cta: "Join Session" }
    },

    // 5. Analytics
    "analytics-course": {
        heroImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2000&auto=format&fit=crop", // Data analysis
        tools: ["GA4", "LOOKER", "PYTHON", "SQL"],
        mentors: [
            { name: "Aditya Roy", role: "Data Scientist", description: "Ex-Flipkart, SQL Expert" },
            { name: "Neha Bhasin", role: "Analytics Lead", description: "Visualization Specialist" }
        ],
        learnByDoing: [
            { icon: "dashboard", title: "Dashboard Creation", description: "Build automated client dashboards in Looker Studio.", colorClass: "blue" },
            { icon: "code", title: "Data Cleaning", description: "Prepare raw data for analysis using Python/Excel.", colorClass: "green" },
            { icon: "query_stats", title: "Funnel Analysis", description: "Identify drop-off points in user journeys.", colorClass: "orange" }
        ],
        successStories: [
            { name: "Varun Dhawan", role: "Marketing Analyst", quote: "Finally understood the difference between Universal Analytics and GA4." }
        ],
        faqs: [
            { question: "Is math required?", answer: "Basic statistical understanding helps, but we teach the logic needed." }
        ],
        workshop: { title: "Data Storytelling", description: "How to present data to stakeholders effectively.", cta: "Join Workshop" }
    },

    // 6. Affiliate & Email
    "affiliate-email-marketing-course": {
        heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop", // Freelancer/Laptop
        tools: ["MAILCHIMP", "CONVERTKIT", "AMAZON", "CLICKBANK"],
        mentors: [
            { name: "Karthik Gowda", role: "Super Affiliate", description: "Generates $5k/mo passively" }
        ],
        learnByDoing: [
            { icon: "email", title: "Drip Campaigns", description: "Set up a 5-day automated email sequence.", colorClass: "blue" },
            { icon: "link", title: "Niche Selection", description: "Find profitable affiliate niches with low competition.", colorClass: "green" }
        ],
        successStories: [
            { name: "Simran Kaur", role: "Email Marketer", quote: "The copywriting templates provided are gold." }
        ],
        faqs: [
            { question: "How long until I make money?", answer: "It varies, but students typically see results in 3-4 months of consistent effort." }
        ],
        workshop: { title: "Passive Income 101", description: "Roadmap to your first $1000 online.", cta: "Watch Video" }
    },

    // 7. Social Media
    "social-media-marketing-course": {
        heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop", // Content creation/Mobile
        tools: ["INSTAGRAM", "LINKEDIN", "CANVA", "HOOTSUITE"],
        mentors: [
            { name: "Aisha Kapoor", role: "Instagram Influencer", description: "100k+ Followers" },
            { name: "Zaid Khan", role: "Brand Manager", description: "Viral Strategy Expert" }
        ],
        learnByDoing: [
            { icon: "movie", title: "Reels Production", description: "Script, shoot, and edit a viral reel.", colorClass: "pink" },
            { icon: "calendar_month", title: "Content Calendar", description: "Plan 30 days of content for a brand.", colorClass: "blue" },
            { icon: "trending_up", title: "Trend Jacking", description: "Leverage current trends for brand visibility.", colorClass: "orange" }
        ],
        successStories: [
            { name: "Tara Sutaria", role: "SMM Executive", quote: "My reel views doubled after applying the hook strategies." }
        ],
        faqs: [
            { question: "Is this just for Instagram?", answer: "No, we cover LinkedIn, Twitter (X), and YouTube Shorts as well." }
        ],
        workshop: { title: "Viral Content Formula", description: "Decode the algorithm of 2024.", cta: "Join Live" }
    },

    "default": {
        heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
        tools: ["LIVE PROJECTS", "CERTIFICATION", "MENTORSHIP", "PLACEMENT"],
        mentors: [
            { name: "Industry Expert", role: "Senior Consultant", description: "10+ Years Experience" },
            { name: "Subject Matter Lead", role: "Technical Lead", description: "Hands-on Implementation Specialist" }
        ],
        learnByDoing: [
            { icon: "school", title: "Practical Learning", description: "Hands-on assignments in every module.", colorClass: "blue" }
        ],
        successStories: [],
        faqs: [
            { question: "Do you provide placement assistance?", answer: "Yes, we have a dedicated placement cell that helps you with resume building, mock interviews, and job referrals." },
            { question: "Is this course suitable for beginners?", answer: "Yes, our programs are designed to take you from basics to advanced levels." }
        ]
    }
};

export function getSupplement(slug: string): CourseSupplement {
    return COURSE_CONTENT[slug] || COURSE_CONTENT["default"];
}
