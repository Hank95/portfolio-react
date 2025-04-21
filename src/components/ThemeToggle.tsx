// src/components/ThemeToggle.tsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!themeContext) {
    throw new Error("ThemeToggle must be used within a ThemeProvider");
  }

  const { theme, setTheme } = themeContext;

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  text-gray-700 dark:text-gray-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
      >
        {theme === "system" ? (
          <FaDesktop />
        ) : theme === "light" ? (
          <FaSun />
        ) : (
          <FaMoon />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded shadow-lg z-10">
          <button
            className="flex items-center w-full px-4 py-2 text-sm rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => handleThemeChange("light")}
          >
            <FaSun className="mr-2" /> Light Mode
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => handleThemeChange("dark")}
          >
            <FaMoon className="mr-2" /> Dark Mode
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => handleThemeChange("system")}
          >
            <FaDesktop className="mr-2" /> System Theme
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
