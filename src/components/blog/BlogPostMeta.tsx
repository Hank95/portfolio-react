import { formatBlogDate } from "@/lib/blogUtils";
import type { BlogCategory } from "@/types/blog";
import BlogCategoryBadge from "./BlogCategoryBadge";

interface BlogPostMetaProps {
  publishedAt?: string;
  readingTimeMinutes: number;
  category?: BlogCategory;
  showCategory?: boolean;
}

export default function BlogPostMeta({
  publishedAt,
  readingTimeMinutes,
  category,
  showCategory = true,
}: BlogPostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
      {publishedAt && <time dateTime={publishedAt}>{formatBlogDate(publishedAt)}</time>}
      <span className="hidden sm:inline">·</span>
      <span>{readingTimeMinutes} min read</span>
      {showCategory && category && (
        <>
          <span className="hidden sm:inline">·</span>
          <BlogCategoryBadge category={category} />
        </>
      )}
    </div>
  );
}
