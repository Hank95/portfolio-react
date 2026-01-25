import { Helmet } from 'react-helmet-async';
import { Intro, SelectedWork, MoreProjects, About, Contact } from '@/components/home';
import { siteConfig } from '@/data/content';

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} - Portfolio`,
    url: "https://henrypendleton.com",
    description: "Personal portfolio and professional website",
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://henrypendleton.com/#person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: "https://henrypendleton.com",
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charleston",
      addressRegion: "SC",
      addressCountry: "US",
    },
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
    ],
  },
];

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
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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
