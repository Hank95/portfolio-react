import { Helmet } from "react-helmet-async";
import Resume from "@/components/Resume";
import { resume } from "@/data/resume";

// Generate JSON-LD structured data from resume data
const generateStructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.name,
    jobTitle: resume.title,
    description: resume.summary,
    email: `mailto:${resume.email}`,
    telephone: resume.phone,
    url: "https://henrypendleton.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charleston",
      addressRegion: "SC",
      addressCountry: "US",
    },
    sameAs: [
      `https://github.com/${resume.github}`,
      "https://linkedin.com/in/henrypendleton",
    ],
    worksFor: {
      "@type": "Organization",
      name: resume.professionalExperience[0].company,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Charleston",
        addressRegion: "SC",
        addressCountry: "US",
      },
    },
    alumniOf: resume.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: edu.location.split(", ")[0],
        addressRegion: edu.location.split(", ")[1],
        addressCountry: "US",
      },
    })),
    knowsAbout: [
      ...resume.technicalSkills.languages,
      ...resume.technicalSkills.webDevelopment,
      ...resume.technicalSkills.databases,
      ...resume.technicalSkills.martech,
    ],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@id": "https://henrypendleton.com/resume#person",
    },
    dateModified: new Date().toISOString().split("T")[0],
    description: `Professional resume for ${resume.name}, ${resume.title}`,
  };

  return [personSchema, profilePageSchema];
};

export default function ResumePage() {
  const structuredData = generateStructuredData();

  return (
    <>
      <Helmet>
        <title>Resume - Henry Pendleton</title>
        <meta
          name="description"
          content="Henry Pendleton's resume. MarTech Software Engineer building web and marketing technology solutions at Maymoth Homes."
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main id="main" className="flex-1 pt-24 pb-8 px-4">
        <Resume />
      </main>
    </>
  );
}
