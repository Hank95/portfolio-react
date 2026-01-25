import { Helmet } from "react-helmet-async";
import Resume from "@/components/Resume";

export default function ResumePage() {
  return (
    <>
      <Helmet>
        <title>Resume - Henry Pendleton</title>
        <meta
          name="description"
          content="Henry Pendleton's resume. MarTech Software Engineer building web and marketing technology solutions at Maymoth Homes."
        />
      </Helmet>

      <main id="main" className="flex-1 pt-24 pb-8 px-4">
        <Resume />
      </main>
    </>
  );
}
