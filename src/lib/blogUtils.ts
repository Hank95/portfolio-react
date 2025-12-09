import type { TableOfContentsItem } from "@/types/blog";

/**
 * Calculate reading time from markdown content
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Generate a slug matching rehype-slug's github-slugger behavior
 */
const generateSlug = (text: string, existingSlugs: Set<string>): string => {
  // Match github-slugger behavior:
  // 1. Convert to lowercase
  // 2. Remove special characters except spaces and hyphens
  // 3. Replace spaces with hyphens
  // 4. Remove leading/trailing hyphens
  let slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars except word chars, spaces, hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  // Handle duplicates by appending -1, -2, etc.
  const originalSlug = slug;
  let counter = 1;
  while (existingSlugs.has(slug)) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }
  existingSlugs.add(slug);

  return slug;
};

/**
 * Extract headings from markdown content for Table of Contents
 */
export const extractHeadings = (content: string): TableOfContentsItem[] => {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: TableOfContentsItem[] = [];
  const existingSlugs = new Set<string>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = generateSlug(text, existingSlugs);
    headings.push({ id, text, level });
  }

  return headings;
};

/**
 * Format date for display
 */
export const formatBlogDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Generate excerpt from content if not provided
 */
export const generateExcerpt = (
  content: string,
  maxLength: number = 160
): string => {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // headers
    .replace(/\*\*(.+?)\*\*/g, "$1") // bold
    .replace(/\*(.+?)\*/g, "$1") // italic
    .replace(/`(.+?)`/g, "$1") // inline code
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // links
    .replace(/!\[.*?\]\(.+?\)/g, "") // images
    .replace(/\n+/g, " ") // newlines
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.slice(0, maxLength).trim() + "...";
};
