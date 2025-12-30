import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Section } from '@/components/layout';
import { StatusBadge } from '@/components/projects';
import { getProject } from '@/data/projects';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { caseStudy, links } = project;

  return (
    <>
      <Helmet>
        <title>{project.title} - Henry Pendleton</title>
        <meta name="description" content={project.subtitle} />
        <meta property="og:title" content={`${project.title} - Henry Pendleton`} />
        <meta property="og:description" content={project.subtitle} />
      </Helmet>

      <main id="main" className="flex-1 pt-24">
        {/* Back link */}
        <div className="content-container">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
        </div>

        {/* Header */}
        <Section className="pt-8 pb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-display text-text">{project.title}</h1>
              <p className="mt-2 text-subtitle text-text-muted">{project.subtitle}</p>
            </div>
            <StatusBadge status={project.status} className="mt-2" />
          </div>

          {/* Tech stack */}
          <div className="mt-6">
            <span className="text-small font-mono text-text-subtle">
              {project.techStack.join(' · ')}
            </span>
          </div>

          {/* Links */}
          {(links.live || links.github || links.appStore || links.website) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-small font-medium
                             text-bg bg-text rounded-md hover:bg-text-muted transition-colors"
                >
                  View Live
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-small font-medium
                             text-text border border-border rounded-md
                             hover:bg-bg-subtle hover:border-border-hover transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Source
                </a>
              )}
              {links.appStore && (
                <a
                  href={links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-small font-medium
                             text-text border border-border rounded-md
                             hover:bg-bg-subtle hover:border-border-hover transition-colors"
                >
                  App Store
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {links.website && (
                <a
                  href={links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-small font-medium
                             text-text border border-border rounded-md
                             hover:bg-bg-subtle hover:border-border-hover transition-colors"
                >
                  Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </Section>

        {/* Project images */}
        {project.images && project.images.length > 0 && (
          <Section className="pt-0 pb-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.images.map((image, index) => (
                <figure key={index} className="group">
                  <div className="overflow-hidden rounded-lg border border-border bg-bg-subtle">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="mt-2 text-xs text-text-subtle">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </Section>
        )}

        {/* Case study content */}
        {caseStudy && (
          <Section className="pt-0">
            <div className="max-w-2xl space-y-12">
              {/* Overview */}
              {caseStudy.overview && (
                <div>
                  <h2 className="text-title text-text">Overview</h2>
                  <p className="mt-4 text-body text-text-muted leading-relaxed">
                    {caseStudy.overview}
                  </p>
                </div>
              )}

              {/* The Problem */}
              {caseStudy.problem && (
                <div>
                  <h2 className="text-title text-text">The Problem</h2>
                  <p className="mt-4 text-body text-text-muted leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>
              )}

              {/* What I Built */}
              {caseStudy.whatIBuilt && caseStudy.whatIBuilt.length > 0 && (
                <div>
                  <h2 className="text-title text-text">What I Built</h2>
                  <ul className="mt-4 space-y-3">
                    {caseStudy.whatIBuilt.map((item, index) => (
                      <li key={index} className="flex gap-3 text-body text-text-muted">
                        <span className="text-text-subtle shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Decisions */}
              {caseStudy.keyDecisions && (
                <div>
                  <h2 className="text-title text-text">Key Decisions</h2>
                  <p className="mt-4 text-body text-text-muted leading-relaxed">
                    {caseStudy.keyDecisions}
                  </p>
                </div>
              )}

              {/* Results */}
              {caseStudy.results && (
                <div>
                  <h2 className="text-title text-text">Results</h2>
                  <p className="mt-4 text-body text-text-muted leading-relaxed">
                    {caseStudy.results}
                  </p>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Bottom navigation */}
        <Section className="pt-8">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all projects
          </Link>
        </Section>
      </main>
    </>
  );
}
