import { Link } from "react-router-dom";
import type { BlogCategory } from "@/types/blog";

interface BlogCategoryBadgeProps {
  category: BlogCategory;
  linked?: boolean;
}

export default function BlogCategoryBadge({
  category,
  linked = true,
}: BlogCategoryBadgeProps) {
  const badgeClasses =
    "px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e] text-white dark:bg-[#a8d5ba] dark:text-gray-800 transition-colors";

  if (linked) {
    return (
      <Link
        to={`/blog/category/${category.slug}`}
        className={`${badgeClasses} hover:bg-[#4d6e5e]/80 dark:hover:bg-[#a8d5ba]/80`}
      >
        {category.name}
      </Link>
    );
  }

  return <span className={badgeClasses}>{category.name}</span>;
}
