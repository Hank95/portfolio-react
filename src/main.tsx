import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "./lib/BrowserRouter.tsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={BrowserRouter} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
