"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"; // Adjust the import path as needed

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string>("light");

    // Load theme from localStorage or set default
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
        document.body.classList.add(storedTheme);
    }, []);

    // Toggle theme handler
    const toggleTheme = (isDark: boolean) => {
        const newTheme = isDark ? "dark" : "light";

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
        <div className="flex items-center space-x-2">
            <span>Light</span>
            <Switch
                checked={theme === "dark"}
                onCheckedChange={(isChecked) => toggleTheme(isChecked)}
            />
            <span>Dark</span>
        </div>
    );
}
