import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#4d6e5e] text-white dark:bg-gray-900 dark:text-gray-50">
      <p className="text-xs">
        © {currentYear} Henry Pendleton. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4 hover:text-gray-200 dark:hover:text-gray-300"
          to="#"
        >
          Privacy
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 hover:text-gray-200 dark:hover:text-gray-300"
          to="#"
        >
          Terms of Use
        </Link>
      </nav>
    </footer>
  );
}
