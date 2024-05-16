// import DeployButton from "../components/DeployButton";
// import AuthButton from "../components/AuthButton";
// import { createClient } from "@/utils/supabase/server";
// import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
// import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
// import Header from "@/components/Header.tsx";
// import Footer from "@/components/Footer.tsx";
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
import headShot from "/head_shot.png";
// import Globe from "@/components/globe";

export default function Home() {
  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient();
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  // const isSupabaseConnected = canInitSupabaseClient();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] ">
      <main className="flex-1 justify-center items-center">
        {/* globe section */}
        {/* <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="globe"
        >
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e]">
                My Travels
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore the places I've visited around the world.
              </p>
            </div>
            <Globe />
          </div>
        </section> */}
        <section
          className="w-full py-12 md:py-24 lg:py-32  px-12 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="about"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-[#4d6e5e]">
                  Henry Pendleton
                </h1>
                <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
                  Full-Stack Web Developer
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  I'm a passionate web developer with over 5 years of experience
                  building modern, responsive, and scalable web applications.
                  Proficient in both front-end and back-end technologies, I
                  specialize in creating intuitive user experiences and
                  implementing robust, efficient solutions.
                </p>
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
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="experience"
        >
          <div className=" px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e]">
                Work Experience
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Take a look at my professional journey and the projects I've
                worked on.
              </p>
            </div>
            <div className="mt-8 grid gap-6">
              <Card
                className="border-[#4d6e5e] shadow-lg opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e]">
                    Lead Frontend Developer
                  </CardTitle>
                  <CardDescription>Acme Inc. | 2022 - Present</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    As a Senior Web Developer at Acme Inc., I've been
                    responsible for leading the development of several
                    high-profile web applications. I've worked closely with
                    cross-functional teams to design and implement scalable,
                    maintainable, and user-friendly solutions.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Key Achievements:
                      </span>
                      Spearheaded the migration of the company's legacy web
                      application to a modern, cloud-based architecture,
                      resulting in a 30% improvement in performance and a 50%
                      reduction in maintenance costs.
                    </li>
                    <li>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Technologies Used:
                      </span>
                      React, Next.js, Node.js, Express, MongoDB, AWS
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card
                className="border-[#4d6e5e] shadow-lg opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e]">
                    Web Developer
                  </CardTitle>
                  <CardDescription>Acme Corp. | 2017 - 2020</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    As a Web Developer at Acme Corp., I was responsible for
                    building and maintaining a variety of web applications for
                    the company's clients. I worked closely with designers and
                    project managers to deliver high-quality, responsive, and
                    user-friendly solutions.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Key Achievements:
                      </span>
                      Developed a custom content management system that enabled
                      the client to easily update and manage their website,
                      resulting in a 50% reduction in maintenance costs.
                    </li>
                    <li>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Technologies Used:
                      </span>
                      HTML, CSS, JavaScript, WordPress, PHP, MySQL
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e]">
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
                <ComponentIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">
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
                <NetworkIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">
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
                <DatabaseIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">
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
                <CloudIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">AWS</h3>
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
                <WindIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">
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
                <GitGraphIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">Git</h3>
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
                <TypeIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">
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
                <ArrowRightIcon className="h-12 w-12 text-[#4d6e5e]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e]">
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
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="education"
        >
          <div className="px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e]">
                Education
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out my academic and professional certifications.
              </p>
            </div>
            <div className="mt-8 grid gap-6">
              <Card
                className="border-[#4d6e5e] shadow-lg opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e]">
                    Full Stack Web Development
                  </CardTitle>
                  <CardDescription>Flatiron School | 2021</CardDescription>
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
                className="border-[#4d6e5e] shadow-lg opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e]">
                    Bachelor of Art in Business Economics
                  </CardTitle>
                  <CardDescription>
                    St. Lawrence University | 2014 - 2018
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
