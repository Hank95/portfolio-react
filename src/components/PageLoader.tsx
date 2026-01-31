interface PageLoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export default function PageLoader({
  text = 'Loading...',
  fullScreen = false,
}: PageLoaderProps) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-bg z-50'
    : 'min-h-[400px]';

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <div className="text-center">
        {/* Simple loading spinner */}
        <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin mx-auto" />
        {text && (
          <p className="mt-4 text-small text-text-muted">{text}</p>
        )}
      </div>
    </div>
  );
}
