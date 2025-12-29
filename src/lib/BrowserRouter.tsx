import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import PageLoader from "../components/PageLoader";

const Home = lazy(() => import("../pages/Home"));
const ResumePage = lazy(() => import("../pages/ResumePage"));
const GlobePage = lazy(() => import("@/pages/GlobePage"));
const Contact = lazy(() => import("@/pages/ContactsPage"));
const StravaLocalPage = lazy(() => import("@/pages/StravaLocalPage"));

export const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader text="Loading home..." />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "resume",
        element: (
          <Suspense fallback={<PageLoader text="Loading resume..." />}>
            <ResumePage />
          </Suspense>
        ),
      },
      {
        path: "globe",
        element: (
          <Suspense fallback={<PageLoader text="Loading globe..." />}>
            <GlobePage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PageLoader text="Loading contact..." />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "projects/strava-local",
        element: (
          <Suspense fallback={<PageLoader text="Loading project..." />}>
            <StravaLocalPage />
          </Suspense>
        ),
      },
    ],
  },
]);
