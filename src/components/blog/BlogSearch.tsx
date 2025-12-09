import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useBlogSearch } from "@/hooks/useBlogSearch";
import { Search, X } from "lucide-react";

export default function BlogSearch() {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { results, loading, search } = useBlogSearch();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    search(inputValue);
  }, [inputValue, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (slug: string) => {
    navigate(`/blog/${slug}`);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleClear = () => {
    setInputValue("");
    setShowDropdown(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="pl-10 pr-10 border-[#4d6e5e] dark:border-[#a8d5ba] focus:ring-[#4d6e5e] dark:focus:ring-[#a8d5ba]"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && inputValue && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-[#4d6e5e] dark:border-[#a8d5ba] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((post) => (
                <li key={post.id}>
                  <button
                    onClick={() => handleResultClick(post.slug)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="font-medium text-[#4d6e5e] dark:text-[#a8d5ba]">
                      {post.title}
                    </div>
                    {post.excerpt && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                        {post.excerpt}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No posts found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
