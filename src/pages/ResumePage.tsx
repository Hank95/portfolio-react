import { Helmet } from "react-helmet-async";
import Resume from "@/components/Resume";

export default function ResumePage() {
  return (
    <>
      <Helmet>
        <title>Resume - Henry Pendleton</title>
        <meta
          name="description"
          content="Henry Pendleton's resume. Full Stack Engineer building web apps, native iOS apps, and data tools."
        />
      </Helmet>

      <main id="main" className="flex-1 pt-24 pb-8 px-4">
        <Resume />
      </main>
    </>
  );
}
