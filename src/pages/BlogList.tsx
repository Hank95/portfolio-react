import { Helmet } from 'react-helmet-async';
import { Section } from '@/components/layout';
import { BlogPostCard } from '@/components/blog';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { siteConfig } from '@/data/content';

export default function BlogList() {
  const { posts, loading, error } = useBlogPosts();

  return (
    <>
      <Helmet>
        <title>Blog - {siteConfig.name}</title>
        <meta
          name="description"
          content="Thoughts on software engineering, MarTech, and occasionally ultrarunning."
        />
        <meta property="og:title" content={`Blog - ${siteConfig.name}`} />
        <meta
          property="og:description"
          content="Thoughts on software engineering, MarTech, and occasionally ultrarunning."
        />
      </Helmet>

      <main id="main" className="flex-1 pt-24">
        <Section>
          <h1 className="text-display text-text">Blog</h1>
          <p className="mt-4 text-body text-text-muted max-w-xl">
            Thoughts on software engineering, MarTech, and occasionally ultrarunning.
          </p>
        </Section>

        <Section className="pt-0">
          {loading && (
            <div className="text-center py-12">
              <p className="text-text-muted">Loading posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-text-muted">
                Couldn't load external posts. Showing local posts only.
              </p>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-muted">No posts yet. Check back soon.</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Section>
      </main>
    </>
  );
}
