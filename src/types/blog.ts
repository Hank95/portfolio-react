export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image_url?: string;
  category_id?: string;
  category?: BlogCategory;
  tags?: BlogTag[];
  published: boolean;
  published_at?: string;
  reading_time_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPostListItem extends Omit<BlogPost, "content"> {
  // Lighter version without full content for listings
}

export interface BlogSearchParams {
  query?: string;
  categorySlug?: string;
  tagSlug?: string;
  page?: number;
  limit?: number;
}

export interface BlogPaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
