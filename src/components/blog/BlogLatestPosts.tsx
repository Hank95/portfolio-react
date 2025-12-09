import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BLOG_CONFIG } from "@/data/blogConfig";
import BlogCard from "./BlogCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowRight } from "lucide-react";

export default function BlogLatestPosts() {
  const { posts, loading, error } = useBlogPosts({
    limit: BLOG_CONFIG.latestPostsCount,
  });

  if (loading) {
    return (
      <div className="px-4 md:px-6">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
            Latest Posts
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Thoughts, tutorials, and insights from my journey in software
            development.
          </p>
        </div>
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || posts.length === 0) {
    return null; // Don't show section if no posts or error
  }

  return (
    <div className="px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
          Latest Posts
        </h2>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Thoughts, tutorials, and insights from my journey in software
          development.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md bg-[#4d6e5e] text-white hover:bg-[#4d6e5e]/90 dark:bg-[#a8d5ba] dark:text-gray-800 dark:hover:bg-[#a8d5ba]/90 transition-colors"
        >
          View All Posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
