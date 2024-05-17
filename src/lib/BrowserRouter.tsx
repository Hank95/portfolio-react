import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import Home from "../pages/Home";
import ResumePage from "../pages/ResumePage";
import GlobePage from "@/pages/GlobePage";
export const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "resume", element: <ResumePage /> },
      { path: "globe", element: <GlobePage /> },
    ],
  },
]);
