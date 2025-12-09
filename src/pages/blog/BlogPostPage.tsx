import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useBlogPost } from "@/hooks/useBlogPost";
import { useFadeUp } from "@/hooks/useScrollAnimation";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostMeta from "@/components/blog/BlogPostMeta";
import BlogTagBadge from "@/components/blog/BlogTagBadge";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft } from "lucide-react";
import type { RefObject } from "react";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug || "");
  const headerRef = useFadeUp() as RefObject<HTMLDivElement>;
  const contentRef = useFadeUp() as RefObject<HTMLDivElement>;

  if (loading) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Helmet>
          <title>Post Not Found - Henry Pendleton</title>
        </Helmet>
        <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-[#4d6e5e] dark:text-[#a8d5ba] mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {error || "The post you're looking for doesn't exist."}
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
        <title>{post.title} - Henry Pendleton</title>
        <meta
          name="description"
          content={post.excerpt || `Read ${post.title} by Henry Pendleton`}
        />
        <meta property="og:title" content={`${post.title} - Henry Pendleton`} />
        <meta
          property="og:description"
          content={post.excerpt || `Read ${post.title} by Henry Pendleton`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://henrypendleton.netlify.app/blog/${post.slug}`}
        />
        {post.cover_image_url && (
          <meta property="og:image" content={post.cover_image_url} />
        )}
        {post.published_at && (
          <meta property="article:published_time" content={post.published_at} />
        )}
        <meta property="article:author" content="Henry Pendleton" />
      </Helmet>

      <main className="flex-1 bg-gray-50 dark:bg-gray-800">
        <article className="w-full py-12 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#4d6e5e] dark:text-[#a8d5ba] hover:underline mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <header ref={headerRef} className="mb-8">
              {post.cover_image_url && (
                <div className="aspect-video overflow-hidden rounded-lg mb-8">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4d6e5e] dark:text-[#a8d5ba] mb-4">
                {post.title}
              </h1>

              <BlogPostMeta
                publishedAt={post.published_at}
                readingTimeMinutes={post.reading_time_minutes}
                category={post.category}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <BlogTagBadge key={tag.id} tag={tag} />
                  ))}
                </div>
              )}
            </header>

            <div ref={contentRef} className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-8 xl:gap-12">
              <div className="min-w-0">
                <BlogPostContent content={post.content} />
              </div>

              <aside className="hidden lg:block min-w-0 overflow-hidden">
                <BlogTableOfContents content={post.content} />
              </aside>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
