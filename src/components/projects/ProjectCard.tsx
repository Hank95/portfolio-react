import { Link } from 'react-router-dom';
import { ExternalLink, Github, Apple } from 'lucide-react';
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

          {/* Links + Status */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick links */}
            {(project.links.live || project.links.github || project.links.appStore) && (
              <div className="flex items-center gap-2">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-subtle hover:text-accent transition-colors"
                    aria-label="View live site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-subtle hover:text-text transition-colors"
                    aria-label="View source on GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.links.appStore && (
                  <a
                    href={project.links.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-subtle hover:text-text transition-colors"
                    aria-label="View on App Store"
                  >
                    <Apple className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Status badge */}
            <StatusBadge status={project.status} />
          </div>
        </div>
      </article>
    </Link>
  );
}
