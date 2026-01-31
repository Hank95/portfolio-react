import { Section } from '@/components/layout';
import { ProjectCard } from '@/components/projects';
import { selectedProjects } from '@/data/projects';

export function SelectedWork() {
  return (
    <Section id="work" mileMarker={20}>
      <h2 className="text-title text-text">Selected Work</h2>
      <p className="mt-2 text-body text-text-muted">
        Projects I've led or built from scratch.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {selectedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
