import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate, type BlogPost } from '@/data/blog';

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
}

const cardStyles = cn(
  'group block p-6 rounded-lg border border-border',
  'bg-bg-subtle hover:bg-bg-muted',
  'hover:border-border-hover',
  'transition-all duration-150',
  'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
);

function CardContent({ post }: { post: BlogPost }) {
  const isSubstack = post.source === 'substack';

  return (
    <article className="flex flex-col h-full">
      {/* Date and source */}
      <div className="flex items-center gap-2 text-xs text-text-subtle">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {isSubstack && (
          <>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              Substack
              <ExternalLink className="w-3 h-3" />
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2 text-subtitle text-text group-hover:text-accent transition-colors">
        {post.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-small text-text-muted flex-1 line-clamp-2">
        {post.description}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-text-subtle bg-bg-muted px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  if (post.source === 'substack' && post.substackUrl) {
    return (
      <a
        href={post.substackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(cardStyles, className)}
      >
        <CardContent post={post} />
      </a>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className={cn(cardStyles, className)}>
      <CardContent post={post} />
    </Link>
  );
}
