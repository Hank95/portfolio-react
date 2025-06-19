import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  webpSrc?: string;
  sizes?: string;
  srcSet?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  webpSrc,
  sizes,
  srcSet,
  loading = 'lazy',
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, loading]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcSet if not provided
  const generateSrcSet = (baseSrc: string) => {
    if (srcSet) return srcSet;
    
    // Generate common responsive sizes
    const breakpoints = [480, 768, 1024, 1200, 1920];
    return breakpoints
      .map(bp => {
        const ext = baseSrc.split('.').pop();
        const name = baseSrc.replace(`.${ext}`, '');
        return `${name}-${bp}w.${ext} ${bp}w`;
      })
      .join(', ');
  };

  // Generate sizes attribute if not provided
  const generateSizes = () => {
    if (sizes) return sizes;
    return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
  };

  // Placeholder component
  const PlaceholderComponent = () => (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={`Loading ${alt}`}
    >
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover opacity-50 blur-sm"
          aria-hidden="true"
        />
      )}
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div 
      className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={`Failed to load ${alt}`}
    >
      <span className="text-gray-500 dark:text-gray-400 text-sm">
        Image failed to load
      </span>
    </div>
  );

  // If image hasn't entered viewport yet, show placeholder
  if (!isInView) {
    return <PlaceholderComponent />;
  }

  // If image failed to load, show error state
  if (hasError) {
    return <ErrorComponent />;
  }

  return (
    <div className="relative">
      {/* Show placeholder while loading */}
      {!isLoaded && <PlaceholderComponent />}
      
      {/* Optimized picture element with WebP support */}
      <picture className={isLoaded ? '' : 'invisible absolute inset-0'}>
        {webpSrc && (
          <source
            srcSet={generateSrcSet(webpSrc)}
            sizes={generateSizes()}
            type="image/webp"
          />
        )}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          srcSet={generateSrcSet(src)}
          sizes={generateSizes()}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          // Performance optimizations
          {...(priority && { fetchPriority: 'high' as any })}
        />
      </picture>
    </div>
  );
};

// Hook for preloading images
export const useImagePreloader = () => {
  const preloadImage = (src: string, webpSrc?: string) => {
    return new Promise<boolean>((resolve) => {
      // Try WebP first if available
      if (webpSrc && supportsWebP()) {
        const webpImg = new Image();
        webpImg.onload = () => resolve(true);
        webpImg.onerror = () => {
          // Fallback to original format
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        };
        webpImg.src = webpSrc;
      } else {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      }
    });
  };

  const preloadImages = (images: Array<{ src: string; webpSrc?: string }>) => {
    return Promise.allSettled(
      images.map(img => preloadImage(img.src, img.webpSrc))
    );
  };

  return { preloadImage, preloadImages };
};

// Utility to check WebP support
const supportsWebP = (() => {
  let supported: boolean | null = null;
  
  return () => {
    if (supported !== null) return supported;
    
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      supported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch {
      supported = false;
    }
    
    return supported;
  };
})();

export default OptimizedImage;