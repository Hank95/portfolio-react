import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { BlogCategory } from "@/types/blog";

interface UseBlogCategoriesResult {
  categories: BlogCategory[];
  loading: boolean;
  error: string | null;
}

export const useBlogCategories = (): UseBlogCategoriesResult => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("blog_categories")
          .select("*")
          .order("name");

        if (fetchError) throw fetchError;

        setCategories(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
