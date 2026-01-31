import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border bg-bg-subtle">
      <p className="text-xs text-text-muted">
        © {currentYear} Henry Pendleton. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs text-text-muted hover:underline underline-offset-4 hover:text-text"
          to="#"
        >
          Privacy
        </Link>
        <Link
          className="text-xs text-text-muted hover:underline underline-offset-4 hover:text-text"
          to="#"
        >
          Terms of Use
        </Link>
      </nav>
    </footer>
  );
}
