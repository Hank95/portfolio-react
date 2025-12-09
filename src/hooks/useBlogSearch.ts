import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { BlogPostListItem, BlogTag } from "@/types/blog";
import { BLOG_CONFIG } from "@/data/blogConfig";

interface UseBlogSearchResult {
  results: BlogPostListItem[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
}

export const useBlogSearch = (): UseBlogSearchResult => {
  const [results, setResults] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, BLOG_CONFIG.searchDebounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Execute search when debounced query changes
  useEffect(() => {
    const executeSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
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
          `
          )
          .eq("published", true)
          .textSearch("search_vector", debouncedQuery, { type: "websearch" })
          .order("published_at", { ascending: false })
          .limit(10);

        if (fetchError) throw fetchError;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedResults: BlogPostListItem[] = (data || []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (post: any) => ({
            ...post,
            category: Array.isArray(post.category) ? post.category[0] : post.category,
            tags: post.blog_post_tags?.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (pt: any) => (Array.isArray(pt.tag) ? pt.tag[0] : pt.tag)
            ) as BlogTag[],
          })
        );

        setResults(transformedResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    executeSearch();
  }, [debouncedQuery]);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return { results, loading, error, search };
};
