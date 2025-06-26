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
import headShot from "/head_shot@0.5x.webp";
import { Link } from "react-router-dom";
import ContactForm from "@/components/ContactsForm";
import { Helmet } from "react-helmet-async";

export default function Home() {
  useEffect(() => {
    // Dynamically import AOS only when needed
    const initAOS = async () => {
      const AOS = await import('aos');
      await import('aos/dist/aos.css');
      
      AOS.default.init({
        once: true,
        duration: 700,
        easing: "ease-out-cubic",
      });
    };
    
    initAOS();
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
                  Full-Stack Web Developer with 3+ years of experience building
                  modern, responsive, and scalable web applications. Proficient
                  in both front-end and back-end technologies, I specialize in
                  creating intuitive user experiences and implementing robust,
                  efficient solutions.
                </p>
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
                      using React & TypeScript for MotoGP and F1 racer
                      statistics, featuring interactive heat maps, scatterplots,
                      and bump charts, enhancing user insights and data
                      accessibility by approximately 25%.
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
                    <li className="text-gray-800 dark:text-gray-300">
                      Fostered a collaborative, feedback-driven environment,
                      contributing to a 40% reduction in reported UI bugs over
                      time.
                    </li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    SprintGP.com - Web3 Gaming Platform
                  </h4>
                  <ul className="list-disc list-inside m-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="text-gray-800 dark:text-gray-300">
                      Collaborated with the backend team to create an action
                      sports gaming web platform.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Leveraged backend data through API to create an attractive
                      and intuitive user interface using React.JS.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Leveraged AWS for data storage and scalability, resulting
                      in a 3x improvement in data processing speed.
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
                data-aos-delay="250"
              >
                <DatabaseIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    MySQL
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
                className="flex flex-col items-center space-y-2 opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
                data-aos-delay="350"
              >
                <DatabaseIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Supabase
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Backend as a Service
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
              <div
                className="flex flex-col items-center space-y-2 opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
                data-aos-delay="500"
              >
                <ComponentIcon className="h-12 w-12 text-[#4d6e5e] dark:text-[#a8d5ba]" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Docker
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Containerization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 opacity-0 translate-y-10 transition-all duration-700"
          data-aos="fade-up"
          id="projects"
        >
          <div className="px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
                Technical Projects
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Showcasing personal initiative and exploration of new
                technologies.
              </p>
            </div>
            <div className="mt-8 grid gap-6">
              <Card
                className="border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                    ListLive
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    iOS App | Live on App Store
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside m-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="text-gray-800 dark:text-gray-300">
                      Modern iOS grocery shopping app built with SwiftUI that makes shopping smarter, faster, and more collaborative
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Features smart shopping mode with progress tracking, celebration effects, and intelligent auto-categorization of items
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Implements CloudKit sharing for real-time collaboration, allowing family and friends to share and sync lists across devices
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Built with SwiftUI, Core Data, and CloudKit using MVVM architecture for clean separation of concerns
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Includes comprehensive undo system, haptic feedback, item suggestions, and engaging onboarding experience
                    </li>
                  </ul>
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        SwiftUI
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Core Data
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        CloudKit
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        MVVM
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        iOS 17+
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Combine
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://listliveapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#4d6e5e] text-white hover:bg-[#4d6e5e]/90 dark:bg-[#a8d5ba] dark:text-gray-800 dark:hover:bg-[#a8d5ba]/90 transition-colors"
                      >
                        Website
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://apps.apple.com/app/listlive/id6747406731"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[#4d6e5e] text-[#4d6e5e] hover:bg-[#4d6e5e]/10 dark:border-[#a8d5ba] dark:text-[#a8d5ba] dark:hover:bg-[#a8d5ba]/10 transition-colors"
                      >
                        App Store
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                    Wedding Website
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Personal Project | Live Production Site
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside m-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="text-gray-800 dark:text-gray-300">
                      Modern, elegant wedding website with custom sage and ivory color palette and complete RSVP management system
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Built with React 18, TypeScript, and Vite for optimal performance and developer experience
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Integrated Supabase for backend services including RSVP storage and automated email notifications via Edge Functions
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Features interactive Charleston activities map using Leaflet, photo gallery with lazy loading, and calendar integration
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Implemented responsive design with Tailwind CSS v4, accessibility compliance, and SEO optimization achieving 95+ Lighthouse score
                    </li>
                  </ul>
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        React 18
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Vite
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Supabase
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Tailwind CSS v4
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Leaflet
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Shadcn/ui
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://nobskaandhenry.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#4d6e5e] text-white hover:bg-[#4d6e5e]/90 dark:bg-[#a8d5ba] dark:text-gray-800 dark:hover:bg-[#a8d5ba]/90 transition-colors"
                      >
                        Live Demo
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/Hank95/wedding-site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[#4d6e5e] text-[#4d6e5e] hover:bg-[#4d6e5e]/10 dark:border-[#a8d5ba] dark:text-[#a8d5ba] dark:hover:bg-[#a8d5ba]/10 transition-colors"
                      >
                        GitHub
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg opacity-0 -translate-x-10 transition-all duration-700"
                data-aos="fade-left"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                    F1 Data Visualization Dashboard
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Professional Project | Live Production App
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside m-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="text-gray-800 dark:text-gray-300">
                      Real-time Formula 1 championship standings and race analytics using Jolpica API
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Interactive data visualizations with React 19, TypeScript, and TanStack Router
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Live telemetry simulation and advanced performance metrics
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Modern responsive design with Tailwind CSS and professional UX
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Production deployment with automated CI/CD and performance optimization
                    </li>
                  </ul>
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        React 19
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        TanStack Router
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Jolpica API
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Tailwind CSS
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Recharts
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]">
                        Vite
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://f1.henrypendleton.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#4d6e5e] text-white hover:bg-[#4d6e5e]/90 dark:bg-[#a8d5ba] dark:text-gray-800 dark:hover:bg-[#a8d5ba]/90 transition-colors"
                      >
                        Live Demo
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/hank95/f1-data-visualization"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[#4d6e5e] text-[#4d6e5e] hover:bg-[#4d6e5e]/10 dark:border-[#a8d5ba] dark:text-[#a8d5ba] dark:hover:bg-[#a8d5ba]/10 transition-colors"
                      >
                        GitHub
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-[#4d6e5e] dark:border-[#a8d5ba] shadow-lg opacity-0 translate-x-10 transition-all duration-700"
                data-aos="fade-right"
              >
                <CardHeader>
                  <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                    TreasureMap - Community-Based Treasure Hunt App
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Personal Project | In Progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside m-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="text-gray-800 dark:text-gray-300">
                      Building a React Native/Expo app with Supabase backend for
                      community-driven treasure hunts.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Implementing real-time tracking, map visualization, and
                      game state persistence.
                    </li>
                    <li className="text-gray-800 dark:text-gray-300">
                      Creating a companion web app for browsing and creating
                      hunts with a map interface.
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
          id="contact"
        >
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
