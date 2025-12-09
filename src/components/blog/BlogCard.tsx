import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { BlogPostListItem } from "@/types/blog";
import BlogPostMeta from "./BlogPostMeta";
import BlogTagBadge from "./BlogTagBadge";

interface BlogCardProps {
  post: BlogPostListItem;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <Card className="h-full border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {post.cover_image_url && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba] group-hover:underline underline-offset-4">
            {post.title}
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            <BlogPostMeta
              publishedAt={post.published_at}
              readingTimeMinutes={post.reading_time_minutes}
              category={post.category}
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <BlogTagBadge key={tag.id} tag={tag} linked={false} />
              ))}
              {post.tags.length > 3 && (
                <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
