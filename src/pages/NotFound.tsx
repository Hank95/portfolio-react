import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Henry Pendleton</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main id="main" className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-6">
          <p className="text-8xl font-bold text-accent mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-text mb-3">
            Page not found
          </h1>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
