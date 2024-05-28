import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import Home from "../pages/Home";

import GlobePage from "@/pages/GlobePage";
import Contact from "@/pages/ContactsPage";
export const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "globe", element: <GlobePage /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
