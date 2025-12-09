import { Link } from "react-router-dom";
import type { BlogTag } from "@/types/blog";

interface BlogTagBadgeProps {
  tag: BlogTag;
  linked?: boolean;
}

export default function BlogTagBadge({ tag, linked = true }: BlogTagBadgeProps) {
  const badgeClasses =
    "px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba] transition-colors";

  if (linked) {
    return (
      <Link
        to={`/blog/tag/${tag.slug}`}
        className={`${badgeClasses} hover:bg-[#4d6e5e]/20 dark:hover:bg-[#a8d5ba]/20`}
      >
        {tag.name}
      </Link>
    );
  }

  return <span className={badgeClasses}>{tag.name}</span>;
}
