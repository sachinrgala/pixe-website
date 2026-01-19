"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        setMounted(true);
        // Check local storage or system preference
        const savedTheme = localStorage.getItem("theme");

        // Default to dark to match wireframe design
        const initialTheme = (savedTheme === "dark" || savedTheme === "light")
            ? savedTheme
            : "dark";

        setTheme(initialTheme as "light" | "dark");

        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <button
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-200"
                aria-label="Toggle Theme"
            >
                <div className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle Theme"
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5" />
            ) : (
                <Sun className="w-5 h-5 text-orange-400" />
            )}
        </button>
    );
}
