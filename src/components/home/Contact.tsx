import { Section } from '@/components/layout';
import { contact, siteConfig } from '@/data/content';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  return (
    <Section id="contact" className="pb-32" mileMarker={62}>
      <h2 className="text-title text-text">Contact</h2>

      <div className="mt-6 max-w-xl">
        {/* Primary email */}
        <a
          href={`mailto:${contact.email}`}
          className="text-subtitle text-accent hover:text-accent-muted transition-colors"
        >
          {contact.email}
        </a>

        {/* Availability */}
        <p className="mt-4 text-body text-text-muted">
          {contact.availability}
        </p>
        <p className="mt-1 text-small text-text-subtle">
          {contact.locationNote}
        </p>

        {/* Social links */}
        <div className="mt-6 flex items-center gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
