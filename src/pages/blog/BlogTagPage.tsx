import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabaseClient";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useFadeUp } from "@/hooks/useScrollAnimation";
import type { BlogTag } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogPagination from "@/components/blog/BlogPagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft } from "lucide-react";

export default function BlogTagPage() {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const [tag, setTag] = useState<BlogTag | null>(null);
  const [tagLoading, setTagLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, pagination, loading, error } = useBlogPosts({
    tagSlug,
    page: currentPage,
  });
  const headerRef = useFadeUp();
  const contentRef = useFadeUp();

  useEffect(() => {
    const fetchTag = async () => {
      if (!tagSlug) return;

      setTagLoading(true);
      try {
        const { data } = await supabase
          .from("blog_tags")
          .select("*")
          .eq("slug", tagSlug)
          .single();

        setTag(data);
      } catch {
        setTag(null);
      } finally {
        setTagLoading(false);
      }
    };

    fetchTag();
  }, [tagSlug]);

  if (tagLoading) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Helmet>
          <title>Tag Not Found - Henry Pendleton</title>
        </Helmet>
        <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-[#4d6e5e] dark:text-[#a8d5ba] mb-4">
            Tag Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The tag you're looking for doesn't exist.
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
        <title>#{tag.name} - Blog - Henry Pendleton</title>
        <meta
          name="description"
          content={`Browse posts tagged with "${tag.name}" on Henry Pendleton's blog.`}
        />
        <meta
          property="og:title"
          content={`#${tag.name} - Blog - Henry Pendleton`}
        />
        <meta
          property="og:description"
          content={`Browse posts tagged with "${tag.name}" on Henry Pendleton's blog.`}
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
                #{tag.name}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Posts tagged with "{tag.name}"
              </p>
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
                  No posts with this tag yet.
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
