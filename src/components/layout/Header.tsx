import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { siteConfig, navLinks } from '@/data/content';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle hash links on the home page
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        return;
      }
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-bg/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="content-container">
          <nav className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <Link
              to="/"
              className="text-text font-medium hover:text-text-muted transition-colors"
            >
              {siteConfig.name}
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.href}
                    href={location.pathname === '/' ? link.href : `/${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-small text-text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-small text-text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
