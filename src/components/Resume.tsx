import { resume } from "../data/resume";
import { trackResumeDownload } from "@/lib/analytics";
import { Download, Github, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

export default function Resume() {
  const handleDownload = () => {
    trackResumeDownload();
    window.print();
  };

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          /* Hide site header, footer, nav, and fixed elements */
          header:not(.resume-header),
          footer,
          nav,
          [class*="fixed"] {
            display: none !important;
          }
          .resume-container {
            background: white !important;
            color: #1a1a1a !important;
            box-shadow: none !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          .resume-container * {
            color: #1a1a1a !important;
            border-color: #e5e5e5 !important;
          }
          .resume-header {
            border-bottom-color: #e5e5e5 !important;
          }
          .resume-section-title {
            color: #1a1a1a !important;
            border-bottom-color: #e5e5e5 !important;
          }
          .resume-accent {
            color: #2563eb !important;
          }
          .resume-muted {
            color: #525252 !important;
          }
          .resume-subtle {
            color: #737373 !important;
          }
          .resume-skill-tag {
            background: #f5f5f5 !important;
            border-color: #e5e5e5 !important;
          }
          .resume-item {
            background: transparent !important;
            border-color: #e5e5e5 !important;
          }
          .no-print {
            display: none !important;
          }
          a {
            text-decoration: none !important;
          }
        }
      `}</style>

      <div className="resume-container max-w-4xl mx-auto bg-bg-subtle rounded-lg shadow-2xl shadow-black/20 overflow-hidden">
        {/* Header */}
        <header className="resume-header px-8 py-8 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Name and title */}
            <div>
              <h1 className="text-4xl font-bold text-text tracking-tight">
                {resume.name}
              </h1>
              <p className="mt-2 text-xl text-accent resume-accent font-medium">
                {resume.title}
              </p>
              <p className="mt-4 text-text-muted resume-muted max-w-lg leading-relaxed">
                {resume.summary}
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2 text-sm shrink-0">
              <a
                href={`mailto:${resume.email}`}
                className="flex items-center gap-2 text-text-muted resume-muted hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                {resume.email}
              </a>
              <a
                href={`tel:${resume.phone}`}
                className="flex items-center gap-2 text-text-muted resume-muted hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                {resume.phone}
              </a>
              <span className="flex items-center gap-2 text-text-muted resume-muted">
                <MapPin className="w-4 h-4" />
                {resume.location}
              </span>
              <a
                href={`https://github.com/${resume.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted resume-muted hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                github.com/{resume.github}
              </a>
            </div>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="no-print mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                       text-bg bg-text rounded-md hover:bg-text-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
        </header>

        {/* Main content */}
        <div className="px-8 py-8 space-y-10">
          {/* Technical Skills */}
          <section>
            <h2 className="resume-section-title text-lg font-semibold text-text uppercase tracking-wider border-b border-border pb-2 mb-6">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(resume.technicalSkills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-text-muted resume-muted uppercase tracking-wide mb-3">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="resume-skill-tag px-2 py-1 text-xs font-mono bg-bg-muted border border-border rounded text-text-muted resume-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="resume-section-title text-lg font-semibold text-text uppercase tracking-wider border-b border-border pb-2 mb-6">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resume.professionalExperience.map((exp, index) => (
                <div key={index} className="resume-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-text">
                        {exp.title}
                      </h3>
                      <p className="text-text-muted resume-muted">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-text-subtle resume-subtle shrink-0">
                      {exp.date}
                    </span>
                  </div>

                  {exp.projects.map((project, pIndex) => (
                    <div key={pIndex} className="mt-4 pl-4 border-l-2 border-border">
                      <h4 className="text-sm font-semibold text-accent resume-accent mb-2">
                        {project.name}
                      </h4>
                      <ul className="space-y-1">
                        {project.description.map((desc, dIndex) => (
                          <li
                            key={dIndex}
                            className="text-sm text-text-muted resume-muted leading-relaxed flex gap-2"
                          >
                            <span className="text-text-subtle resume-subtle shrink-0">—</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Technical Projects */}
          <section>
            <h2 className="resume-section-title text-lg font-semibold text-text uppercase tracking-wider border-b border-border pb-2 mb-6">
              Technical Projects
            </h2>
            <div className="space-y-6">
              {resume.technicalProjects.map((project, index) => (
                <div key={index} className="resume-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-text">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-text-muted resume-muted hover:text-accent transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Code</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-text-muted resume-muted hover:text-accent transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Live</span>
                        </a>
                      )}
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-text-muted resume-muted hover:text-accent transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Site</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-1 pl-4 border-l-2 border-border">
                    {project.description.map((desc, dIndex) => (
                      <li
                        key={dIndex}
                        className="text-sm text-text-muted resume-muted leading-relaxed flex gap-2"
                      >
                        <span className="text-text-subtle resume-subtle shrink-0">—</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Prior Experience */}
          <section>
            <h2 className="resume-section-title text-lg font-semibold text-text uppercase tracking-wider border-b border-border pb-2 mb-6">
              Prior Experience
            </h2>
            <div className="space-y-4">
              {resume.priorExperience.map((exp, index) => (
                <div key={index} className="resume-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-text">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-text-muted resume-muted">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-text-subtle resume-subtle shrink-0">
                      {exp.date}
                    </span>
                  </div>
                  <ul className="space-y-1 pl-4 border-l-2 border-border">
                    {exp.description.map((desc, dIndex) => (
                      <li
                        key={dIndex}
                        className="text-sm text-text-muted resume-muted leading-relaxed flex gap-2"
                      >
                        <span className="text-text-subtle resume-subtle shrink-0">—</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="resume-section-title text-lg font-semibold text-text uppercase tracking-wider border-b border-border pb-2 mb-6">
              Education
            </h2>
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index} className="resume-item flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      {edu.school}
                    </h3>
                    <p className="text-sm text-text-muted resume-muted">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-text-subtle resume-subtle">
                      {edu.location}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-text-subtle resume-subtle shrink-0">
                    {edu.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
