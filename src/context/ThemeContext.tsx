// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      // Ensure localStorage is accessed only if window is defined (safer for SSR/prerendering)
      if (typeof window !== "undefined" && window.localStorage) {
        const storedTheme = window.localStorage.getItem(
          storageKey
        ) as Theme | null;
        return storedTheme ?? defaultTheme;
      }
    } catch (e) {
      console.error("Failed to access localStorage:", e);
    }
    return defaultTheme;
  });

  useEffect(() => {
    // Ensure this effect runs only in the browser environment
    if (
      typeof window === "undefined" ||
      !window.document ||
      !window.document.documentElement
    ) {
      return;
    }

    try {
      const root = window.document.documentElement;

      // Extra check for classList and its methods
      if (
        !root.classList ||
        typeof root.classList.remove !== "function" ||
        typeof root.classList.add !== "function"
      ) {
        console.error(
          "ThemeContext effect: classList or its methods not available."
        );
        return;
      }

      // Remove previous theme classes safely
      root.classList.remove("light", "dark");

      let effectiveTheme = theme;
      if (theme === "system") {
        // Ensure matchMedia is available
        if (typeof window.matchMedia === "function") {
          const systemThemeQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
          );
          effectiveTheme = systemThemeQuery.matches ? "dark" : "light";
        } else {
          // Fallback if matchMedia is somehow unavailable (shouldn't happen with mock)
          effectiveTheme = "light";
        }
      }

      // Apply the effective theme class
      root.classList.add(effectiveTheme);

      // Update localStorage safely
      if (window.localStorage) {
        try {
          localStorage.setItem(storageKey, theme); // Store the selected theme ('system', 'light', or 'dark')
        } catch (e) {
          console.error("Failed to set localStorage:", e);
        }
      }
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [theme, storageKey]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
