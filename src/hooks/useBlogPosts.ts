import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type {
  BlogPostListItem,
  BlogSearchParams,
  BlogPaginationInfo,
  BlogTag,
} from "@/types/blog";
import { BLOG_CONFIG } from "@/data/blogConfig";

interface UseBlogPostsResult {
  posts: BlogPostListItem[];
  pagination: BlogPaginationInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBlogPosts = (
  params: BlogSearchParams = {}
): UseBlogPostsResult => {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [pagination, setPagination] = useState<BlogPaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { query, categorySlug, tagSlug, page = 1, limit = BLOG_CONFIG.postsPerPage } = params;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;

      // Build the base query
      let postsQuery = supabase
        .from("blog_posts")
        .select(
          `
          id,
          title,
          slug,
          excerpt,
          cover_image_url,
          category_id,
          published,
          published_at,
          reading_time_minutes,
          created_at,
          updated_at,
          category:blog_categories(id, name, slug),
          blog_post_tags(tag:blog_tags(id, name, slug))
        `,
          { count: "exact" }
        )
        .eq("published", true)
        .order("published_at", { ascending: false });

      // Filter by category if provided
      if (categorySlug) {
        const { data: category } = await supabase
          .from("blog_categories")
          .select("id")
          .eq("slug", categorySlug)
          .single();

        if (category) {
          postsQuery = postsQuery.eq("category_id", category.id);
        }
      }

      // Filter by search query using full-text search
      if (query) {
        postsQuery = postsQuery.textSearch("search_vector", query, {
          type: "websearch",
        });
      }

      // Apply pagination
      postsQuery = postsQuery.range(offset, offset + limit - 1);

      const { data, error: fetchError, count } = await postsQuery;

      if (fetchError) throw fetchError;

      // Transform the data to flatten tags
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let transformedPosts: BlogPostListItem[] = (data || []).map((post: any) => ({
        ...post,
        category: Array.isArray(post.category) ? post.category[0] : post.category,
        tags: post.blog_post_tags?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (pt: any) => (Array.isArray(pt.tag) ? pt.tag[0] : pt.tag)
        ) as BlogTag[],
      }));

      // Filter by tag if provided (done client-side since it's a junction table)
      if (tagSlug) {
        transformedPosts = transformedPosts.filter((post) =>
          post.tags?.some((tag) => tag.slug === tagSlug)
        );
      }

      setPosts(transformedPosts);

      const totalPosts = count || 0;
      const totalPages = Math.ceil(totalPosts / limit);

      setPagination({
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [query, categorySlug, tagSlug, page, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, pagination, loading, error, refetch: fetchPosts };
};
