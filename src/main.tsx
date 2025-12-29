import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "./lib/BrowserRouter.tsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { registerSW } from "./lib/serviceWorker";
import { performanceMonitor } from "./lib/performanceMonitor";

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Start performance monitoring
  performanceMonitor;

  // Register service worker only in production
  if (import.meta.env.PROD) {
    registerSW();
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={BrowserRouter} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
