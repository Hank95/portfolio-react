import { Helmet } from 'react-helmet-async';
import { Intro, SelectedWork, MoreProjects, About, Contact } from '@/components/home';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Henry Pendleton - MarTech Software Engineer</title>
        <meta
          name="description"
          content="MarTech Software Engineer building web and marketing technology solutions. React, TypeScript, Python, SwiftUI."
        />
        <meta
          name="keywords"
          content="Henry Pendleton, MarTech engineer, software engineer, marketing technology, React, TypeScript, SwiftUI, Python, Charleston SC"
        />
        <meta property="og:title" content="Henry Pendleton - MarTech Software Engineer" />
        <meta
          property="og:description"
          content="MarTech Software Engineer building web and marketing technology solutions."
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
