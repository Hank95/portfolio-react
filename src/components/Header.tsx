import { Link } from "react-router-dom";
import { HPLogoIconWhite } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[#4d6e5e] text-white dark:bg-gray-900 dark:text-gray-50">
      <Link className="flex items-center justify-center" to="/">
        <HPLogoIconWhite className="h-12 w-12" />
        <span className="sr-only">Henry Pendleton's Portfolio</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 hover:text-gray-200 dark:hover:text-gray-300"
          to="/"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 hover:text-gray-200 dark:hover:text-gray-300"
          to="/globe"
        >
          Pin Map
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 hover:text-gray-200 dark:hover:text-gray-300"
          to="/contact"
        >
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
