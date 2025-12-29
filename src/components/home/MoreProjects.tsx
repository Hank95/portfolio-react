import { Section } from '@/components/layout';
import { ProjectRow } from '@/components/projects';
import { moreProjects } from '@/data/projects';

export function MoreProjects() {
  if (moreProjects.length === 0) return null;

  return (
    <Section className="pt-0">
      <h2 className="text-title text-text">More Projects</h2>

      <div className="mt-6 divide-y divide-border">
        {moreProjects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
