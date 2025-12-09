import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/github-dark.css";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[#4d6e5e] dark:prose-headings:text-[#a8d5ba] prose-a:text-[#4d6e5e] dark:prose-a:text-[#a8d5ba] prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-[#4d6e5e] dark:prose-code:text-[#a8d5ba] prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeHighlight,
        ]}
        components={{
          h2: ({ children, ...props }) => (
            <h2
              className="scroll-mt-24 text-2xl font-bold mt-8 mb-4"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="scroll-mt-24 text-xl font-semibold mt-6 mb-3"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="scroll-mt-24 text-lg font-medium mt-4 mb-2"
              {...props}
            >
              {children}
            </h4>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="underline underline-offset-4 hover:opacity-80 transition-opacity"
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ src, alt, ...props }) => (
            <figure className="my-6">
              <img
                src={src}
                alt={alt}
                className="rounded-lg shadow-md"
                loading="lazy"
                {...props}
              />
              {alt && (
                <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-[#4d6e5e] dark:border-[#a8d5ba] pl-4 italic my-4 text-gray-600 dark:text-gray-300"
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table
                className="min-w-full border border-gray-200 dark:border-gray-700"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold border-b border-gray-200 dark:border-gray-700"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
              {...props}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
