import { Helmet } from 'react-helmet-async';
import { Intro, SelectedWork, MoreProjects, About, Contact } from '@/components/home';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Henry Pendleton - Frontend Engineer</title>
        <meta
          name="description"
          content="Frontend engineer specializing in data-rich interfaces, dashboards, and interactive visualizations. React, TypeScript, and modern web development."
        />
        <meta
          name="keywords"
          content="Henry Pendleton, frontend engineer, React developer, TypeScript, data visualization, Charleston SC"
        />
        <meta property="og:title" content="Henry Pendleton - Frontend Engineer" />
        <meta
          property="og:description"
          content="Frontend engineer specializing in data-rich interfaces, dashboards, and interactive visualizations."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main id="main" className="flex-1">
        <Intro />
        <SelectedWork />
        <MoreProjects />
        <About />
        <Contact />
      </main>
    </>
  );
}
