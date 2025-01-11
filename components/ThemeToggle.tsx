"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string>("light");

    // Load theme from localStorage or set default
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
        document.getElementsByTagName('body')[0].classList.add(storedTheme);
    }, []);

    // Toggle theme handler
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        // Update state
        setTheme(newTheme);

        // Persist theme in localStorage
        localStorage.setItem("theme", newTheme);

        // Update the data-theme attribute
        document.documentElement.setAttribute("data-theme", newTheme);

        // Update body class: Remove the old theme and add the new one
        document.body.classList.remove(theme); // Remove current theme
        document.body.classList.add(newTheme); // Add new theme
    };

    return (
        <button
            onClick={toggleTheme}
        >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
}
