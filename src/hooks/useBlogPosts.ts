import { useState, useEffect } from 'react';
import { localPosts, getAllPosts, type BlogPost } from '@/data/blog';

// Substack RSS endpoint - uncomment and update when you create your publication
// const SUBSTACK_RSS_URL = import.meta.env.VITE_SUBSTACK_RSS_URL;

interface UseBlogPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch and merge blog posts from local data and Substack RSS.
 *
 * Phase 1: Returns local posts only (immediately available)
 * Phase 2: Will fetch from Supabase Edge Function that proxies Substack RSS
 *
 * Usage:
 * const { posts, loading, error } = useBlogPosts();
 */
export function useBlogPosts(): UseBlogPostsResult {
  const [substackPosts, _setSubstackPosts] = useState<BlogPost[]>([]);
  const [loading, _setLoading] = useState(false);
  const [error, _setError] = useState<Error | null>(null);

  // Suppress unused variable warnings - these will be used when Substack integration is enabled
  void _setSubstackPosts;
  void _setLoading;
  void _setError;

  useEffect(() => {
    // Phase 2: Uncomment this block when Substack integration is ready
    /*
    async function fetchSubstackPosts() {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) return;

      setLoading(true);
      try {
        const response = await fetch(
          `${supabaseUrl}/functions/v1/fetch-rss`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Substack posts');
        }

        const data = await response.json();
        setSubstackPosts(data.posts || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchSubstackPosts();
    */
  }, []);

  // Merge local posts with Substack posts, sorted by date
  const allPosts = getAllPosts([...localPosts, ...substackPosts]);

  return {
    posts: allPosts,
    loading,
    error,
  };
}
