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
    <article className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 prose-headings:text-[#4d6e5e] dark:prose-headings:text-[#a8d5ba] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-a:text-[#4d6e5e] dark:prose-a:text-[#a8d5ba] prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-em:text-gray-700 dark:prose-em:text-gray-300">
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
              className="scroll-mt-24 text-2xl font-bold mt-8 mb-4 text-[#4d6e5e] dark:text-[#a8d5ba]"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="scroll-mt-24 text-xl font-semibold mt-6 mb-3 text-[#4d6e5e] dark:text-[#a8d5ba]"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="scroll-mt-24 text-lg font-medium mt-4 mb-2 text-[#4d6e5e] dark:text-[#a8d5ba]"
              {...props}
            >
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p
              className="text-gray-700 dark:text-gray-300 my-4 leading-relaxed"
              {...props}
            >
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul
              className="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li
              className="text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </li>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[#4d6e5e] dark:text-[#a8d5ba] underline underline-offset-4 hover:opacity-80 transition-opacity"
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
              className="border-l-4 border-[#4d6e5e] dark:border-[#a8d5ba] pl-4 italic my-4 text-gray-600 dark:text-gray-400"
              {...props}
            >
              {children}
            </blockquote>
          ),
          pre: ({ children, ...props }) => (
            <pre
              className="bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-600 rounded-lg p-4 overflow-x-auto my-6"
              {...props}
            >
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-[#4d6e5e] dark:text-[#a8d5ba] text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={`${className} text-sm`} {...props}>
                {children}
              </code>
            );
          },
          hr: () => (
            <hr className="my-8 border-gray-300 dark:border-gray-600" />
          ),
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
              className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
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
