import { Link, useLocation } from "react-router-dom";
import { trackNavigation } from "@/lib/analytics";
import { HPLogoIconWhite } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import RoutePreloader from "./RoutePreloader";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavClick = (destination: string) => {
    trackNavigation(destination);
  };

  const linkClasses = (path: string) =>
    `text-sm font-medium hover:underline underline-offset-4 ${
      currentPath === path
        ? "text-yellow-400 dark:text-yellow-300 underline"
        : "text-gray-200 dark:text-gray-300 hover:text-gray-200 dark:hover:text-gray-300"
    }`;

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[#4d6e5e] text-white dark:bg-gray-900 dark:text-gray-50">
      <Link className="flex items-center justify-center" to="/">
        <HPLogoIconWhite className="h-12 w-12" />
        <span className="sr-only">Henry Pendleton's Portfolio</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <RoutePreloader to="/" hoverPreload={true}>
          <Link className={linkClasses("/")} to="/" onClick={() => handleNavClick("home")}>
            About
          </Link>
        </RoutePreloader>
        <RoutePreloader to="/globe" hoverPreload={true}>
          <Link className={linkClasses("/globe")} to="/globe" onClick={() => handleNavClick("globe")}>
            Pin Map
          </Link>
        </RoutePreloader>
        <RoutePreloader to="/contact" hoverPreload={true}>
          <Link className={linkClasses("/contact")} to="/contact" onClick={() => handleNavClick("contact")}>
            Contact
          </Link>
        </RoutePreloader>
        <ThemeToggle />
      </nav>
    </header>
  );
}
