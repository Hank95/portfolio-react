import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import type { Project } from '@/data/projects';

interface ProjectRowProps {
  project: Project;
  className?: string;
}

export function ProjectRow({ project, className }: ProjectRowProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4',
        'py-4 px-4 -mx-4 rounded-lg',
        'hover:bg-bg-subtle transition-colors duration-150',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        className
      )}
    >
      {/* Left side: Title and description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="text-body font-medium text-text group-hover:text-accent transition-colors truncate">
            {project.title}
          </h3>
        </div>
        <p className="text-small text-text-subtle truncate">
          {project.subtitle}
        </p>
      </div>

      {/* Right side: Tech stack and status */}
      <div className="flex items-center gap-4 sm:flex-shrink-0">
        <span className="text-xs font-mono text-text-subtle hidden md:block">
          {project.techStack.slice(0, 3).join(' · ')}
        </span>
        <StatusBadge status={project.status} />
      </div>
    </Link>
  );
}
