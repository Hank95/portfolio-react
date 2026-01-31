import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/errorPage';
import PageLoader from '../components/PageLoader';

const Home = lazy(() => import('../pages/Home'));
const ResumePage = lazy(() => import('../pages/ResumePage'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const BlogList = lazy(() => import('../pages/BlogList'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader text="Loading..." />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'resume',
        element: (
          <Suspense fallback={<PageLoader text="Loading resume..." />}>
            <ResumePage />
          </Suspense>
        ),
      },
      {
        path: 'projects/:slug',
        element: (
          <Suspense fallback={<PageLoader text="Loading project..." />}>
            <ProjectDetail />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<PageLoader text="Loading blog..." />}>
            <BlogList />
          </Suspense>
        ),
      },
      {
        path: 'blog/:slug',
        element: (
          <Suspense fallback={<PageLoader text="Loading post..." />}>
            <BlogPost />
          </Suspense>
        ),
      },
      // Catch-all 404 route
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader text="Loading..." />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
