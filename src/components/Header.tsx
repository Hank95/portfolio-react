import { Link } from "react-router-dom";
import { HPLogoIcon } from "./Icons";
export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[#4d6e5e] text-white">
      <Link className="flex items-center justify-center" to="/">
        <HPLogoIcon className="h-12 w-12" />
        <span className="sr-only">Henry Pendleton's Portfolio</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/globe"
        >
          Pin Map
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/contact"
        >
          Contact
        </Link>
        {/* <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="#"
        >
          Education
        </Link> */}
      </nav>
    </header>
  );
}
