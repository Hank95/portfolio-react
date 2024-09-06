import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";

const Home = lazy(() => import("../pages/Home"));
const ResumePage = lazy(() => import("../pages/ResumePage"));
const GlobePage = lazy(() => import("@/pages/GlobePage"));
const Contact = lazy(() => import("@/pages/ContactsPage"));

export const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "resume",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResumePage />
          </Suspense>
        ),
      },
      {
        path: "globe",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GlobePage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]);
