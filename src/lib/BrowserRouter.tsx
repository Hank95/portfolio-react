import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/errorPage';
import PageLoader from '../components/PageLoader';

const Home = lazy(() => import('../pages/Home'));
const ResumePage = lazy(() => import('../pages/ResumePage'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));

// Keep legacy routes for backwards compatibility (can remove later)
const GlobePage = lazy(() => import('@/pages/GlobePage'));

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
      // Legacy route - hidden easter egg
      {
        path: 'globe',
        element: (
          <Suspense fallback={<PageLoader text="Loading globe..." />}>
            <GlobePage />
          </Suspense>
        ),
      },
    ],
  },
]);
