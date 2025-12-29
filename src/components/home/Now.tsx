import { now } from '@/data/content';
import { Mountain, Code } from 'lucide-react';

export function Now() {
  return (
    <aside className="content-container py-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Training block */}
        {now.training && (
          <a
            href={now.training.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 rounded-lg bg-bg-subtle border border-border
                       hover:border-border-hover hover:bg-bg-muted transition-colors group flex-1"
          >
            <Mountain className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-mono text-text-subtle uppercase tracking-wider block mb-1">
                Training for
              </span>
              <span className="text-small text-text group-hover:text-accent transition-colors">
                {now.training.race}
              </span>
              <span className="text-xs text-text-subtle block mt-0.5">
                {now.training.date}
              </span>
            </div>
          </a>
        )}

        {/* Building block */}
        {now.building && now.building.length > 0 && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-subtle border border-border flex-1">
            <Code className="w-4 h-4 text-text-subtle mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-mono text-text-subtle uppercase tracking-wider block mb-1">
                Currently
              </span>
              <div className="text-small text-text-muted">
                {now.building.map((item, index) => (
                  <p key={index} className={index > 0 ? 'mt-1' : ''}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
