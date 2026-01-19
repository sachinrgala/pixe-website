"use client";

import { useState, useEffect } from "react";

interface SocialProofProps {
    names?: string[];
    locations?: string[];
    courses?: string[];
    interval?: number; // ms between notifications
}

const defaultNames = [
    "Rahul", "Priya", "Amit", "Sneha", "Vikram", "Anjali", "Karthik", "Divya",
    "Arjun", "Meera", "Rohit", "Pooja", "Aditya", "Kavya", "Suresh", "Neha"
];

const defaultLocations = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune",
    "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi"
];

const defaultCourses = [
    "Full Stack Development", "Data Science", "Digital Marketing", "UI/UX Design"
];

const timeAgo = () => {
    const minutes = Math.floor(Math.random() * 30) + 1;
    return `${minutes} min ago`;
};

export default function SocialProof({
    names = defaultNames,
    locations = defaultLocations,
    courses = defaultCourses,
    interval = 8000,
}: SocialProofProps) {
    const [notification, setNotification] = useState<{
        name: string;
        location: string;
        course: string;
        time: string;
    } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showNotification = () => {
            const name = names[Math.floor(Math.random() * names.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const course = courses[Math.floor(Math.random() * courses.length)];

            setNotification({ name, location, course, time: timeAgo() });
            setIsVisible(true);

            // Hide after 4 seconds
            setTimeout(() => setIsVisible(false), 4000);
        };

        // Show first notification after 3 seconds
        const initialTimeout = setTimeout(showNotification, 3000);

        // Then show every interval
        const intervalId = setInterval(showNotification, interval);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(intervalId);
        };
    }, [names, locations, courses, interval]);

    if (!notification) return null;

    return (
        <div
            className={`fixed bottom-24 left-4 md:bottom-6 md:left-6 z-40 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
        >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                        <span className="font-semibold">{notification.name}</span> from{" "}
                        <span className="font-medium">{notification.location}</span> enrolled in
                    </p>
                    <p className="text-sm text-blue-600 font-medium truncate">{notification.course}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
            </div>
        </div>
    );
}
