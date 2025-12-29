import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'group block p-6 rounded-lg border border-border',
        'bg-bg-subtle hover:bg-bg-muted',
        'hover:border-border-hover',
        'transition-all duration-150',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        className
      )}
    >
      <article className="flex flex-col h-full">
        {/* Title */}
        <h3 className="text-subtitle text-text group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-small text-text-muted flex-1">
          {project.subtitle}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex items-center justify-between gap-4">
          {/* Tech stack */}
          <span className="text-xs font-mono text-text-subtle truncate">
            {project.techStack.join(' · ')}
          </span>

          {/* Status badge */}
          <StatusBadge status={project.status} />
        </div>
      </article>
    </Link>
  );
}
