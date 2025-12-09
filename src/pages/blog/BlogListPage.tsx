import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useBlogCategories } from "@/hooks/useBlogCategories";
import { useFadeUp } from "@/hooks/useScrollAnimation";
import BlogCard from "@/components/blog/BlogCard";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogCategoryBadge from "@/components/blog/BlogCategoryBadge";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, pagination, loading, error } = useBlogPosts({
    page: currentPage,
  });
  const { categories } = useBlogCategories();
  const headerRef = useFadeUp();
  const contentRef = useFadeUp();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Helmet>
        <title>Blog - Henry Pendleton</title>
        <meta
          name="description"
          content="Read articles about web development, software engineering, and technology from Henry Pendleton."
        />
        <meta property="og:title" content="Blog - Henry Pendleton" />
        <meta
          property="og:description"
          content="Read articles about web development, software engineering, and technology from Henry Pendleton."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://henrypendleton.netlify.app/blog"
        />
      </Helmet>

      <main className="flex-1 bg-gray-50 dark:bg-gray-800">
        <section
          ref={headerRef}
          className="w-full py-12 md:py-24 px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
                Blog
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Thoughts, tutorials, and insights from my journey in software
                development.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <BlogSearch />
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <BlogCategoryBadge key={category.id} category={category} />
                  ))}
                </div>
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
                  No posts yet. Check back soon!
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
