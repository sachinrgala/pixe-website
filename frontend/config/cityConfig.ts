
export interface CityConfig {
    name: string;
    slug: string;
    description_override?: string; // Optional: Override default description
    address?: string; // Optional: Specific branch address
    map_url?: string; // Optional: Google Maps Embed URL
    status: "active" | "online_only" | "upcoming";
    country?: "India" | string; // For grouping in UI
}

// The "Brain" of your location data. 
// You can just add a new line here to "launch" a new city.
export const cityConfigs: Record<string, CityConfig> = {
    // INDIA
    "mumbai": {
        name: "Mumbai",
        slug: "mumbai",
        status: "online_only",
        description_override: "Join India's financial capital's top marketing leaders.",
        country: "India"
    },
    "delhi": {
        name: "Delhi",
        slug: "delhi",
        status: "online_only",
        description_override: "Master AI marketing in the heart of NCR.",
        country: "India"
    },
    "bangalore": {
        name: "Bangalore",
        slug: "bangalore",
        address: "HSR Layout, Sector 1, Bangalore - 560102",
        status: "online_only",
        description_override: "Join our advanced AI-driven online cohorts from Bangalore.",
        country: "India"
    },
    "pune": {
        name: "Pune",
        slug: "pune",
        status: "online_only",
        country: "India"
    },
    "hyderabad": {
        name: "Hyderabad",
        slug: "hyderabad",
        status: "online_only",
        country: "India"
    },
    "chennai": {
        name: "Chennai",
        slug: "chennai",
        status: "online_only",
        country: "India"
    },

    // TIER 2 - Major Cities
    "ahmedabad": {
        name: "Ahmedabad",
        slug: "ahmedabad",
        status: "online_only",
        country: "India"
    },
    "kolkata": {
        name: "Kolkata",
        slug: "kolkata",
        status: "online_only",
        country: "India"
    },
    "jaipur": {
        name: "Jaipur",
        slug: "jaipur",
        status: "online_only",
        country: "India"
    },
    "lucknow": {
        name: "Lucknow",
        slug: "lucknow",
        status: "online_only",
        country: "India"
    },
    "chandigarh": {
        name: "Chandigarh",
        slug: "chandigarh",
        status: "online_only",
        country: "India"
    },
    "kochi": {
        name: "Kochi",
        slug: "kochi",
        status: "online_only",
        country: "India"
    },
    "indore": {
        name: "Indore",
        slug: "indore",
        status: "online_only",
        country: "India"
    },
    "nagpur": {
        name: "Nagpur",
        slug: "nagpur",
        status: "online_only",
        country: "India"
    },
    "coimbatore": {
        name: "Coimbatore",
        slug: "coimbatore",
        status: "online_only",
        country: "India"
    },
    "vadodara": {
        name: "Vadodara",
        slug: "vadodara",
        status: "online_only",
        country: "India"
    },
    "surat": {
        name: "Surat",
        slug: "surat",
        status: "online_only",
        country: "India"
    },
    "visakhapatnam": {
        name: "Visakhapatnam",
        slug: "visakhapatnam",
        status: "online_only",
        country: "India"
    },
    "mangalore": {
        name: "Mangalore",
        slug: "mangalore",
        status: "online_only",
        country: "India"
    },
    "thiruvananthapuram": {
        name: "Thiruvananthapuram",
        slug: "thiruvananthapuram",
        status: "online_only",
        country: "India"
    },
    "bhopal": {
        name: "Bhopal",
        slug: "bhopal",
        status: "online_only",
        country: "India"
    },

    // TIER 3 - Emerging Cities
    "patna": {
        name: "Patna",
        slug: "patna",
        status: "online_only",
        country: "India"
    },
    "bhubaneswar": {
        name: "Bhubaneswar",
        slug: "bhubaneswar",
        status: "online_only",
        country: "India"
    },
    "guwahati": {
        name: "Guwahati",
        slug: "guwahati",
        status: "online_only",
        country: "India"
    },
    "ranchi": {
        name: "Ranchi",
        slug: "ranchi",
        status: "online_only",
        country: "India"
    },
    "mysore": {
        name: "Mysore",
        slug: "mysore",
        status: "online_only",
        country: "India"
    },
    "goa": {
        name: "Goa",
        slug: "goa",
        status: "online_only",
        country: "India"
    },
    "dehradun": {
        name: "Dehradun",
        slug: "dehradun",
        status: "online_only",
        country: "India"
    },
    "agra": {
        name: "Agra",
        slug: "agra",
        status: "online_only",
        country: "India"
    },
    "varanasi": {
        name: "Varanasi",
        slug: "varanasi",
        status: "online_only",
        country: "India"
    },
    "amritsar": {
        name: "Amritsar",
        slug: "amritsar",
        status: "online_only",
        country: "India"
    },
    "noida": {
        name: "Noida",
        slug: "noida",
        status: "online_only",
        country: "India"
    },
    "gurugram": {
        name: "Gurugram",
        slug: "gurugram",
        status: "online_only",
        country: "India"
    },
    "faridabad": {
        name: "Faridabad",
        slug: "faridabad",
        status: "online_only",
        country: "India"
    },
    "ghaziabad": {
        name: "Ghaziabad",
        slug: "ghaziabad",
        status: "online_only",
        country: "India"
    },

    // ==========================================
    // INTERNATIONAL - NORTH AMERICA
    // ==========================================

    // USA - Major Cities
    "new-york": {
        name: "New York",
        slug: "new-york",
        status: "online_only",
        description_override: "Master AI Marketing in the heart of NYC.",
        country: "USA"
    },
    "los-angeles": {
        name: "Los Angeles",
        slug: "los-angeles",
        status: "online_only",
        country: "USA"
    },
    "chicago": {
        name: "Chicago",
        slug: "chicago",
        status: "online_only",
        country: "USA"
    },
    "houston": {
        name: "Houston",
        slug: "houston",
        status: "online_only",
        country: "USA"
    },
    "phoenix": {
        name: "Phoenix",
        slug: "phoenix",
        status: "online_only",
        country: "USA"
    },
    "san-francisco": {
        name: "San Francisco",
        slug: "san-francisco",
        status: "online_only",
        description_override: "Silicon Valley's choice for AI Marketing Training.",
        country: "USA"
    },
    "seattle": {
        name: "Seattle",
        slug: "seattle",
        status: "online_only",
        country: "USA"
    },
    "boston": {
        name: "Boston",
        slug: "boston",
        status: "online_only",
        country: "USA"
    },
    "miami": {
        name: "Miami",
        slug: "miami",
        status: "online_only",
        country: "USA"
    },
    "atlanta": {
        name: "Atlanta",
        slug: "atlanta",
        status: "online_only",
        country: "USA"
    },
    "denver": {
        name: "Denver",
        slug: "denver",
        status: "online_only",
        country: "USA"
    },
    "san-diego": {
        name: "San Diego",
        slug: "san-diego",
        status: "online_only",
        country: "USA"
    },
    "austin": {
        name: "Austin",
        slug: "austin",
        status: "online_only",
        description_override: "Texas' tech hub for AI Marketing.",
        country: "USA"
    },
    "dallas": {
        name: "Dallas",
        slug: "dallas",
        status: "online_only",
        country: "USA"
    },

    // Canada
    "toronto": {
        name: "Toronto",
        slug: "toronto",
        status: "online_only",
        description_override: "Canada's #1 AI Marketing Course.",
        country: "Canada"
    },
    "vancouver": {
        name: "Vancouver",
        slug: "vancouver",
        status: "online_only",
        country: "Canada"
    },
    "montreal": {
        name: "Montreal",
        slug: "montreal",
        status: "online_only",
        country: "Canada"
    },
    "calgary": {
        name: "Calgary",
        slug: "calgary",
        status: "online_only",
        country: "Canada"
    },

    // ==========================================
    // INTERNATIONAL - EUROPE
    // ==========================================

    // UK & Ireland
    "london": {
        name: "London",
        slug: "london",
        status: "online_only",
        description_override: "London's premier AI Marketing training.",
        country: "UK"
    },
    "manchester": {
        name: "Manchester",
        slug: "manchester",
        status: "online_only",
        country: "UK"
    },
    "birmingham": {
        name: "Birmingham",
        slug: "birmingham",
        status: "online_only",
        country: "UK"
    },
    "edinburgh": {
        name: "Edinburgh",
        slug: "edinburgh",
        status: "online_only",
        country: "UK"
    },
    "dublin": {
        name: "Dublin",
        slug: "dublin",
        status: "online_only",
        description_override: "Ireland's tech hub for AI Marketing.",
        country: "UK"
    },

    // Germany
    "berlin": {
        name: "Berlin",
        slug: "berlin",
        status: "online_only",
        description_override: "Germany's startup capital for AI Marketing.",
        country: "Germany"
    },
    "munich": {
        name: "Munich",
        slug: "munich",
        status: "online_only",
        country: "Germany"
    },
    "frankfurt": {
        name: "Frankfurt",
        slug: "frankfurt",
        status: "online_only",
        country: "Germany"
    },

    // France
    "paris": {
        name: "Paris",
        slug: "paris",
        status: "online_only",
        description_override: "Master AI Marketing in the City of Light.",
        country: "Europe"
    },

    // Netherlands
    "amsterdam": {
        name: "Amsterdam",
        slug: "amsterdam",
        status: "online_only",
        country: "Europe"
    },

    // Spain
    "barcelona": {
        name: "Barcelona",
        slug: "barcelona",
        status: "online_only",
        country: "International"
    },
    "madrid": {
        name: "Madrid",
        slug: "madrid",
        status: "online_only",
        country: "International"
    },

    // Italy
    "milan": {
        name: "Milan",
        slug: "milan",
        status: "online_only",
        country: "International"
    },
    "rome": {
        name: "Rome",
        slug: "rome",
        status: "online_only",
        country: "International"
    },

    // Nordic
    "stockholm": {
        name: "Stockholm",
        slug: "stockholm",
        status: "online_only",
        country: "International"
    },
    "copenhagen": {
        name: "Copenhagen",
        slug: "copenhagen",
        status: "online_only",
        country: "International"
    },
    "oslo": {
        name: "Oslo",
        slug: "oslo",
        status: "online_only",
        country: "International"
    },

    // Other Europe
    "vienna": {
        name: "Vienna",
        slug: "vienna",
        status: "online_only",
        country: "International"
    },
    "brussels": {
        name: "Brussels",
        slug: "brussels",
        status: "online_only",
        country: "International"
    },
    "zurich": {
        name: "Zurich",
        slug: "zurich",
        status: "online_only",
        country: "International"
    },

    // ==========================================
    // INTERNATIONAL - AUSTRALIA & NEW ZEALAND
    // ==========================================

    "sydney": {
        name: "Sydney",
        slug: "sydney",
        status: "online_only",
        description_override: "Australia's #1 AI Marketing Course.",
        country: "Australia"
    },
    "melbourne": {
        name: "Melbourne",
        slug: "melbourne",
        status: "online_only",
        country: "Australia"
    },
    "brisbane": {
        name: "Brisbane",
        slug: "brisbane",
        status: "online_only",
        country: "Australia"
    },
    "perth": {
        name: "Perth",
        slug: "perth",
        status: "online_only",
        country: "Australia"
    },
    "adelaide": {
        name: "Adelaide",
        slug: "adelaide",
        status: "online_only",
        country: "Australia"
    },
    "auckland": {
        name: "Auckland",
        slug: "auckland",
        status: "online_only",
        description_override: "New Zealand's leading AI Marketing training.",
        country: "Australia"
    },
    "wellington": {
        name: "Wellington",
        slug: "wellington",
        status: "online_only",
        country: "Australia"
    },
    "christchurch": {
        name: "Christchurch",
        slug: "christchurch",
        status: "online_only",
        country: "Australia"
    },

    // ==========================================
    // MIDDLE EAST
    // ==========================================

    "dubai": {
        name: "Dubai",
        slug: "dubai",
        status: "online_only",
        description_override: "Dubai's premier AI Digital Marketing Course.",
        country: "UAE"
    },
    "abu-dhabi": {
        name: "Abu Dhabi",
        slug: "abu-dhabi",
        status: "online_only",
        country: "UAE"
    },
    "singapore": {
        name: "Singapore",
        slug: "singapore",
        status: "online_only",
        description_override: "Southeast Asia's AI Marketing hub.",
        country: "International"
    },

    "default": {
        name: "India",
        slug: "india",
        status: "online_only",
        country: "India"
    }
};

export function getCityConfig(slug: string): CityConfig {
    if (!slug) return cityConfigs["default"];
    const key = slug.toLowerCase();
    return cityConfigs[key] || {
        ...cityConfigs["default"],
        name: slug.charAt(0).toUpperCase() + slug.slice(1), // Fallback: Just capitalize the slug
        slug: slug
    };
}

export function isValidLocation(slug: string): boolean {
    if (!slug) return false;
    return !!cityConfigs[slug.toLowerCase()];
}
