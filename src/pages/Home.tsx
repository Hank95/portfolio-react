import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  ComponentIcon,
  NetworkIcon,
  DatabaseIcon,
  CloudIcon,
  WindIcon,
  GitGraphIcon,
  TypeIcon,
  ArrowRightIcon,
} from "@/components/Icons.tsx";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import headShot from "/head_shot@0.5x.webp";
import { Link } from "react-router-dom";
import ContactForm from "@/components/ContactsForm";
import { Helmet } from "react-helmet-async";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      //   disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] ">
      <Helmet>
        <title>Home - Henry Pendleton</title>
        <meta
          name="description"
          content="Welcome to Henry Pendleton's portfolio. Discover his projects and skills as a full-stack software engineer."
        />
        <meta
          name="keywords"
          content="Henry Pendleton, portfolio, full-stack software engineer, React, Next.js, web developer"
        />
        <meta name="author" content="Henry Pendleton" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Home - Henry Pendleton" />
        <meta
          property="og:description"
          content="Welcome to Henry Pendleton's portfolio. Discover his projects and skills as a full-stack software engineer."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://henrypendleton.netlify.app/" />
        <meta property="og:image" content="URL to your image" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - Henry Pendleton" />
        <meta
          name="twitter:description"
          content="Welcome to Henry Pendleton's portfolio. Discover his projects and skills as a full-stack software engineer."
        />
        <meta name="twitter:image" content="URL to your image" />
      </Helmet>

      <main className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-800">
        {/* <div className="relative h-screen flex justify-center bg-gray-900 text-white w-100%">
          <div className="flex items-center  w-full max-w-7xl p-4 md:p-8">
            <div className="relative z-10 text-left md:w-1/3 p-4 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Greetings from Charleston, SC!
              </h1>
              <p className="text-lg md:text-2xl mb-4">
                Please feel free to put a pin in the globe where you call home.
              </p>
            </div>
            <div className="relative z-10 md:w-2/3 h-fulln w-full">
              <GlobeComponent />
            </div>
          </div>
        </div> */}
        <section
          className="w-full py-12 md:py-24 lg:py-32  px-12 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="about"
        >
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col space-y-4 justify-center ">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-[#4d6e5e] dark:text-[#a8d5ba]">
                  Henry Pendleton
                </h1>
                <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
                  Full-Stack Web Developer
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  I'm a passionate web developer with 2 solid years of
                  experience building modern, responsive, and scalable web
                  applications. Proficient in both front-end and back-end
                  technologies, I specialize in creating intuitive user
                  experiences and implementing robust, efficient solutions.
                </p>
                {/* a button to contact me */}
                <Link className="w-full" to="/contact">
                  <div className="inline-flex h-10 items-center justify-center rounded bg-[#4d6e5e] dark:bg-[#a8d5ba] px-8 text-xl font-medium text-gray-50 dark:text-gray-500 shadow transition-colors hover:bg-[#4d6e5e]/90 pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-8">
                    Reach out!
                  </div>
                </Link>
              </div>
              <img
                alt="Henry Pendleton"
                className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-left"
                height="550"
                src={headShot}
                width="550"
              />
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="experience"
        >
          <div className="px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
                Work Experience
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Take a look at my professional journey and the projects I've
                worked on.
              </p>
            </div>
            <div className="mt-8 grid gap-6">
              <Card
                className="border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Lead Frontend Developer
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Apex 146 | 2022 - Present
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    White Label Action Sports Data Visualization Platform
                  </h4>
                  <ul className="list-disc list-inside m-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="text-gray-800 dark:text-gray-300">
                      Developed a comprehensive data visualization application
                      for MotoGP and F1 racer statistics, featuring interactive
                      heat maps, scatterplots, and bump charts
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Designed custom SVG graphics of racecourses to analyze
                      racer performance on specific track sections.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Enabled teams to track and analyze racer performance over
                      time, improving strategic decision-making.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Created intuitive and visually appealing graphics for
                      media outlets to enhance their coverage.
                    </li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    SprintGP.com
                  </h4>
                  <ul className="list-disc list-inside m-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="text-gray-800 dark:text-gray-300">
                      Collaborated with the backend team to create an action
                      sports betting and gaming web platform.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Leveraged backend data through API to create an attractive
                      and intuitive user interface using React.JS.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      The project is a Web3 application hosted with the Ethereum
                      blockchain and leveraging Metamask integration.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="skills"
        >
          <div className="px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
                Skills
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore the technologies and tools I'm proficient in.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              <div
                className="flex flex-col items-center space-y-2 opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
              >
                <ComponentIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    React
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Front-end Library
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center space-y-2 opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <NetworkIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Node.js
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Runtime Environment
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center space-y-2 opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <DatabaseIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    PostgreSQL
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SQL Database
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center space-y-2 opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <CloudIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    AWS
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cloud Platform
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center space-y-2 opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <WindIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Tailwind CSS
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    CSS Framework
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center space-y-2 opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <GitGraphIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Git
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Version Control
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center space-y-2 opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <TypeIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    TypeScript
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Superset of JavaScript
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center space-y-2 opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <ArrowRightIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Next.js
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    React Framework
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="education"
        >
          <div className="px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
                Education
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out my academic and professional certifications.
              </p>
            </div>
            <div className="mt-8 grid gap-6">
              <Card
                className="border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Full Stack Web Development
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Flatiron School | 2021
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Completed an intensive program focused on Full Stack Web
                    Development using Ruby on Rails and JavaScript/React. Gained
                    hands-on experience building robust web applications from
                    scratch, mastering both backend and frontend development.
                    Developed proficiency in creating dynamic user experiences,
                    working with APIs, and managing databases. The program
                    emphasized best practices in software engineering,
                    collaborative workflows, and agile methodologies.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Bachelor of Art in Business Economics
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    St. Lawrence University | 2014 - 2018
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="contact"
        >
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
