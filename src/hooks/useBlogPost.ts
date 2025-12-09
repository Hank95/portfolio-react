import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { BlogPost, BlogTag } from "@/types/blog";

interface UseBlogPostResult {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
}

export const useBlogPost = (slug: string): UseBlogPostResult => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("blog_posts")
          .select(
            `
            *,
            category:blog_categories(id, name, slug, description),
            blog_post_tags(tag:blog_tags(id, name, slug))
          `
          )
          .eq("slug", slug)
          .eq("published", true)
          .single();

        if (fetchError) {
          if (fetchError.code === "PGRST116") {
            throw new Error("Post not found");
          }
          throw fetchError;
        }

        // Transform the data to flatten tags
        const transformedPost: BlogPost = {
          ...data,
          category: data.category || undefined,
          tags: data.blog_post_tags?.map(
            (pt: { tag: BlogTag }) => pt.tag
          ) as BlogTag[],
        };

        setPost(transformedPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch post");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};
