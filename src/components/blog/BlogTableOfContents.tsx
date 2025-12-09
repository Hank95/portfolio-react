import { useState, useEffect } from "react";
import type { TableOfContentsItem } from "@/types/blog";
import { extractHeadings } from "@/lib/blogUtils";

interface BlogTableOfContentsProps {
  content: string;
}

export default function BlogTableOfContents({
  content,
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
      <h2 className="text-sm font-semibold text-[#4d6e5e] dark:text-[#a8d5ba] mb-4 uppercase tracking-wide">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`text-left text-sm transition-colors hover:text-[#4d6e5e] dark:hover:text-[#a8d5ba] line-clamp-2 w-full ${
                activeId === heading.id
                  ? "text-[#4d6e5e] dark:text-[#a8d5ba] font-medium"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
