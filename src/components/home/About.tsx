import { Section } from '@/components/layout';
import { about } from '@/data/content';

export function About() {
  return (
    <Section id="about" mileMarker={45}>
      <h2 className="text-title text-text">About</h2>

      <div className="mt-6 space-y-4 max-w-2xl">
        {about.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-body text-text-muted leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
