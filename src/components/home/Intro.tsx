import { Section } from '@/components/layout';
import { TopographicBackground } from '@/components/ui/TopographicBackground';
import { intro } from '@/data/content';
import { ArrowDown, Mail, Mountain } from 'lucide-react';

export function Intro() {
  return (
    <Section id="intro" className="pt-32 md:pt-40 pb-16 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Subtle topographic background */}
      <TopographicBackground
        className="top-0 left-0 right-0 h-full"
        opacity={0.035}
        lineCount={8}
      />

      <div className="max-w-2xl relative w-full">
        {/* Training badge - links to the journey bar concept */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-bg-subtle border border-border text-xs font-mono text-text-muted">
          <Mountain className="w-3.5 h-3.5 text-accent" />
          <span>Training for Black Canyon 100k</span>
          <span className="text-text-subtle">·</span>
          <span className="text-text-subtle">Feb 2025</span>
        </div>

        {/* Name */}
        <h1 className="text-display text-text text-balance">
          {intro.headline}
        </h1>

        {/* Title */}
        <p className="mt-3 text-subtitle text-text-muted">
          {intro.subtitle}
        </p>

        {/* Description */}
        <p className="mt-8 text-body text-text-muted leading-relaxed">
          {intro.description}
        </p>

        {/* Current role */}
        <p className="mt-4 text-body text-text-muted leading-relaxed">
          {intro.currentRole}
        </p>

        {/* Location */}
        <p className="mt-4 text-small text-text-subtle">
          {intro.location}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 text-small font-medium
                       text-bg bg-text rounded-lg
                       hover:bg-text-muted transition-all duration-200
                       shadow-lg shadow-white/5"
          >
            View Work
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-small font-medium
                       text-text border border-border rounded-lg
                       hover:bg-bg-subtle hover:border-border-hover transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute -bottom-8 left-0 text-xs text-text-subtle flex items-center gap-2 opacity-60">
          <span>Scroll to explore</span>
          <span className="text-accent">↓</span>
        </div>
      </div>
    </Section>
  );
}
