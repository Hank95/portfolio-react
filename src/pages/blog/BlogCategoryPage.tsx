import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabaseClient";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useFadeUp } from "@/hooks/useScrollAnimation";
import type { BlogCategory } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogPagination from "@/components/blog/BlogPagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft } from "lucide-react";

export default function BlogCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, pagination, loading, error } = useBlogPosts({
    categorySlug,
    page: currentPage,
  });
  const headerRef = useFadeUp();
  const contentRef = useFadeUp();

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categorySlug) return;

      setCategoryLoading(true);
      try {
        const { data } = await supabase
          .from("blog_categories")
          .select("*")
          .eq("slug", categorySlug)
          .single();

        setCategory(data);
      } catch {
        setCategory(null);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategory();
  }, [categorySlug]);

  if (categoryLoading) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Helmet>
          <title>Category Not Found - Henry Pendleton</title>
        </Helmet>
        <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-[#4d6e5e] dark:text-[#a8d5ba] mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#4d6e5e] dark:text-[#a8d5ba] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Helmet>
        <title>{category.name} - Blog - Henry Pendleton</title>
        <meta
          name="description"
          content={
            category.description ||
            `Browse ${category.name} posts on Henry Pendleton's blog.`
          }
        />
        <meta
          property="og:title"
          content={`${category.name} - Blog - Henry Pendleton`}
        />
        <meta
          property="og:description"
          content={
            category.description ||
            `Browse ${category.name} posts on Henry Pendleton's blog.`
          }
        />
      </Helmet>

      <main className="flex-1 bg-gray-50 dark:bg-gray-800">
        <section
          ref={headerRef}
          className="w-full py-12 md:py-24 px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#4d6e5e] dark:text-[#a8d5ba] hover:underline mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
                {category.name}
              </h1>
              {category.description && (
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section ref={contentRef} className="w-full pb-12 md:pb-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 dark:text-red-400">{error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No posts in this category yet.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {pagination && (
                  <BlogPagination
                    pagination={pagination}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
