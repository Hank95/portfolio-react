import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  text = 'Loading page...', 
  fullScreen = false 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white dark:bg-gray-900 z-50' 
    : 'min-h-[400px]';

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} />
        <div className="mt-6">
          <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;