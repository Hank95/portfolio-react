import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoutePreloaderProps {
  children: React.ReactNode;
  to: string;
  preloadDelay?: number;
  hoverPreload?: boolean;
  intersectionPreload?: boolean;
}

// Cache for preloaded routes
const preloadedRoutes = new Set<string>();

// Route component mapping for preloading
const routeComponents = {
  '/': () => import('../pages/Home'),
  '/resume': () => import('../pages/ResumePage'),
  '/globe': () => import('../pages/GlobePage'),
  '/contact': () => import('../pages/ContactsPage'),
};

// Don't preload globe route by default due to large Three.js bundle
const heavyRoutes = ['/globe'];

const RoutePreloader: React.FC<RoutePreloaderProps> = ({
  children,
  to,
  preloadDelay = 300,
  hoverPreload = true,
  intersectionPreload = false,
}) => {
  const navigate = useNavigate();
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();

  // Preload route function
  const preloadRoute = (route: string) => {
    if (preloadedRoutes.has(route)) return;

    // Skip heavy routes unless explicitly requested
    if (heavyRoutes.includes(route) && !hoverPreload) return;

    const importFunction = routeComponents[route as keyof typeof routeComponents];
    if (importFunction) {
      importFunction()
        .then(() => {
          preloadedRoutes.add(route);
          console.log(`Preloaded route: ${route}`);
        })
        .catch((error) => {
          console.warn(`Failed to preload route ${route}:`, error);
        });
    }
  };

  // Mouse enter handler
  const handleMouseEnter = () => {
    if (!hoverPreload) return;
    
    timeoutRef.current = setTimeout(() => {
      preloadRoute(to);
    }, preloadDelay);
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Set up intersection observer for viewport-based preloading
  useEffect(() => {
    if (!intersectionPreload || !elementRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadRoute(to);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [to, intersectionPreload]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Clone child element and add event handlers
  const enhancedChild = React.cloneElement(
    children as React.ReactElement,
    {
      ref: elementRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: (e: React.MouseEvent) => {
        // Call original onClick if it exists
        const originalOnClick = (children as React.ReactElement).props.onClick;
        if (originalOnClick) {
          originalOnClick(e);
        }
        
        // Navigate to route
        navigate(to);
      },
    }
  );

  return enhancedChild;
};

// Hook for manual route preloading
export const useRoutePreloader = () => {
  const preloadRoute = (route: string) => {
    const importFunction = routeComponents[route as keyof typeof routeComponents];
    if (importFunction && !preloadedRoutes.has(route)) {
      return importFunction()
        .then(() => {
          preloadedRoutes.add(route);
          return true;
        })
        .catch((error) => {
          console.warn(`Failed to preload route ${route}:`, error);
          return false;
        });
    }
    return Promise.resolve(preloadedRoutes.has(route));
  };

  const preloadAllRoutes = () => {
    return Promise.all(
      Object.keys(routeComponents).map(route => preloadRoute(route))
    );
  };

  const isRoutePreloaded = (route: string) => preloadedRoutes.has(route);

  return {
    preloadRoute,
    preloadAllRoutes,
    isRoutePreloaded,
  };
};

export default RoutePreloader;