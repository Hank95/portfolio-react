import { Helmet } from 'react-helmet-async';
import { Intro, SelectedWork, MoreProjects, About, Contact } from '@/components/home';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Henry Pendleton - Full Stack Engineer</title>
        <meta
          name="description"
          content="Full stack engineer building web apps, native iOS apps, and data tools. React, TypeScript, Python, SwiftUI."
        />
        <meta
          name="keywords"
          content="Henry Pendleton, full stack engineer, software engineer, React, TypeScript, SwiftUI, Python, Charleston SC"
        />
        <meta property="og:title" content="Henry Pendleton - Full Stack Engineer" />
        <meta
          property="og:description"
          content="Full stack engineer building web apps, native iOS apps, and data tools."
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
