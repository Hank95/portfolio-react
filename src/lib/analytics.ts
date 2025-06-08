declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, string | number | boolean>
    ) => void;
    dataLayer: unknown[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

// Initialize gtag if it doesn't exist
export const initGA = () => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title,
      page_location,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      ...(label && { event_label: label }),
      ...(value !== undefined && { value: value }),
    });
  }
};

// Track contact form submissions
export const trackContactSubmission = () => {
  trackEvent("submit", "contact", "contact_form");
};

// Track resume downloads
export const trackResumeDownload = () => {
  trackEvent("download", "resume", "pdf_download");
};

// Track globe pin interactions
export const trackGlobeInteraction = (
  action: "pin_created" | "pin_clicked"
) => {
  trackEvent(action, "globe", action);
};

// Track theme toggle
export const trackThemeToggle = (theme: "light" | "dark") => {
  trackEvent("toggle_theme", "ui", theme);
};

// Track navigation
export const trackNavigation = (destination: string) => {
  trackEvent("navigate", "navigation", destination);
};
