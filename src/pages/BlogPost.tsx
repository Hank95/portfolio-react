import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Section } from '@/components/layout';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { formatDate } from '@/data/blog';
import { siteConfig } from '@/data/content';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading } = useBlogPosts();
  const post = slug ? posts.find((p) => p.slug === slug) : undefined;

  // Show loading state while fetching
  if (loading) {
    return (
      <main id="main" className="flex-1 pt-24">
        <div className="content-container">
          <p className="text-text-muted">Loading...</p>
        </div>
      </main>
    );
  }

  // Redirect to blog list if post not found
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // For Substack posts, redirect to the external URL
  if (post.source === 'substack' && post.substackUrl) {
    window.location.href = post.substackUrl;
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - {siteConfig.name}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} - ${siteConfig.name}`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author} />
      </Helmet>

      <main id="main" className="flex-1 pt-24">
        {/* Back link */}
        <div className="content-container">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <Section className="pt-8 pb-8">
          <div className="max-w-2xl">
            {/* Date */}
            <time
              dateTime={post.publishedAt}
              className="text-small text-text-subtle"
            >
              {formatDate(post.publishedAt)}
            </time>

            {/* Title */}
            <h1 className="mt-2 text-display text-text">{post.title}</h1>

            {/* Description */}
            <p className="mt-4 text-subtitle text-text-muted">
              {post.description}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-text-subtle bg-bg-muted px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Substack link if available */}
            {post.substackUrl && (
              <a
                href={post.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-small text-accent hover:text-accent-muted transition-colors"
              >
                Also on Substack
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </Section>

        {/* Content */}
        <Section className="pt-0">
          <article
            className="prose prose-neutral dark:prose-invert max-w-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Section>

        {/* Bottom navigation */}
        <Section className="pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </Section>
      </main>
    </>
  );
}
