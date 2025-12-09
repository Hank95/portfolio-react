import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { BlogTag } from "@/types/blog";

interface UseBlogTagsResult {
  tags: BlogTag[];
  loading: boolean;
  error: string | null;
}

export const useBlogTags = (): UseBlogTagsResult => {
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("blog_tags")
          .select("*")
          .order("name");

        if (fetchError) throw fetchError;

        setTags(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tags");
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};
