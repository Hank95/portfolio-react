import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import PageLoader from "../components/PageLoader";

const Home = lazy(() => import("../pages/Home"));
const ResumePage = lazy(() => import("../pages/ResumePage"));
const GlobePage = lazy(() => import("@/pages/GlobePage"));
const Contact = lazy(() => import("@/pages/ContactsPage"));
const BlogListPage = lazy(() => import("@/pages/blog/BlogListPage"));
const BlogPostPage = lazy(() => import("@/pages/blog/BlogPostPage"));
const BlogCategoryPage = lazy(() => import("@/pages/blog/BlogCategoryPage"));
const BlogTagPage = lazy(() => import("@/pages/blog/BlogTagPage"));

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
        path: "blog",
        element: (
          <Suspense fallback={<PageLoader text="Loading blog..." />}>
            <BlogListPage />
          </Suspense>
        ),
      },
      {
        path: "blog/:slug",
        element: (
          <Suspense fallback={<PageLoader text="Loading post..." />}>
            <BlogPostPage />
          </Suspense>
        ),
      },
      {
        path: "blog/category/:categorySlug",
        element: (
          <Suspense fallback={<PageLoader text="Loading category..." />}>
            <BlogCategoryPage />
          </Suspense>
        ),
      },
      {
        path: "blog/tag/:tagSlug",
        element: (
          <Suspense fallback={<PageLoader text="Loading tag..." />}>
            <BlogTagPage />
          </Suspense>
        ),
      },
    ],
  },
]);
