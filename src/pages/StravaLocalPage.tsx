import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon, DatabaseIcon } from "@/components/Icons";
import { useFadeUp } from "@/hooks/useScrollAnimation";

export default function StravaLocalPage() {
  const heroRef = useFadeUp();
  const featuresRef = useFadeUp();
  const screenshotsRef = useFadeUp();
  const architectureRef = useFadeUp();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Helmet>
        <title>Strava Local - Henry Pendleton</title>
        <meta
          name="description"
          content="Strava Local: A privacy-focused local analytics platform for Strava activity data. Ingest your data, compute training metrics, and visualize your fitness journey."
        />
        <meta
          name="keywords"
          content="Strava, fitness analytics, training metrics, CTL ATL TSB, local-first, privacy, Python, Flask, SQLite"
        />
      </Helmet>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#4d6e5e] dark:text-gray-400 dark:hover:text-[#a8d5ba] mb-6 transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Back to Projects
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba] text-sm font-medium">
                <DatabaseIcon className="w-4 h-4" />
                Local-First Analytics
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Strava Local
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                A privacy-focused ingestion and analysis tool for your Strava
                activity data. Your runs, rides, and training metrics stay on
                your machine—never uploaded anywhere.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/Hank95/strava-local"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-[#4d6e5e] text-white hover:bg-[#4d6e5e]/90 dark:bg-[#a8d5ba] dark:text-gray-900 dark:hover:bg-[#a8d5ba]/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="w-full lg:flex-1 lg:max-w-xl">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                <img
                  src="/strava-local/dashboard.png"
                  alt="Strava Local Dashboard showing activity statistics and charts"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="w-full py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8 sm:mb-12 text-[#4d6e5e] dark:text-[#a8d5ba]">
            Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-[#4d6e5e]/20 dark:border-[#a8d5ba]/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#4d6e5e]/10 dark:bg-[#a8d5ba]/10 flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5 text-[#4d6e5e] dark:text-[#a8d5ba]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                  Dashboard
                </CardTitle>
                <CardDescription>
                  Summary statistics, activity breakdown charts, and recent
                  activities at a glance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#4d6e5e]/20 dark:border-[#a8d5ba]/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#4d6e5e]/10 dark:bg-[#a8d5ba]/10 flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5 text-[#4d6e5e] dark:text-[#a8d5ba]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                  Interactive Maps
                </CardTitle>
                <CardDescription>
                  Heatmap visualization and route explorer with filtering by
                  activity type and date range.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#4d6e5e]/20 dark:border-[#a8d5ba]/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#4d6e5e]/10 dark:bg-[#a8d5ba]/10 flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5 text-[#4d6e5e] dark:text-[#a8d5ba]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                  Training Metrics
                </CardTitle>
                <CardDescription>
                  TSS, CTL/ATL/TSB (fitness/fatigue/form), heart rate zones, and
                  TRIMP calculations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#4d6e5e]/20 dark:border-[#a8d5ba]/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#4d6e5e]/10 dark:bg-[#a8d5ba]/10 flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5 text-[#4d6e5e] dark:text-[#a8d5ba]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                  Heart Rate Analysis
                </CardTitle>
                <CardDescription>
                  Zone distribution, time in each zone, and personalized
                  thresholds based on your profile.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#4d6e5e]/20 dark:border-[#a8d5ba]/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#4d6e5e]/10 dark:bg-[#a8d5ba]/10 flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5 text-[#4d6e5e] dark:text-[#a8d5ba]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                  Privacy First
                </CardTitle>
                <CardDescription>
                  All data stays local on your machine. No cloud uploads, no
                  third-party access.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#4d6e5e]/20 dark:border-[#a8d5ba]/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#4d6e5e]/10 dark:bg-[#a8d5ba]/10 flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5 text-[#4d6e5e] dark:text-[#a8d5ba]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <CardTitle className="text-[#4d6e5e] dark:text-[#a8d5ba]">
                  Activity Browser
                </CardTitle>
                <CardDescription>
                  Searchable, filterable table with detailed activity pages and
                  personal records.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section
        ref={screenshotsRef}
        className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8 sm:mb-12 text-[#4d6e5e] dark:text-[#a8d5ba]">
            Screenshots
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Heatmap Screenshot */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <img
                  src="/strava-local/heatmap.png"
                  alt="Strava Local Heatmap showing GPS tracks overlaid on a map"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Activity Heatmap
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize all your GPS tracks overlaid on an interactive map.
                Filter by activity type, date range, or specific routes.
              </p>
            </div>

            {/* Training Metrics Screenshot */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <img
                  src="/strava-local/metrics.png"
                  alt="Strava Local CTL/ATL/TSB training metrics chart"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                CTL/ATL/TSB Chart
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your fitness (CTL), fatigue (ATL), and form (TSB) over
                time. Understand your training load and optimize recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section
        ref={architectureRef}
        className="w-full py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8 sm:mb-12 text-[#4d6e5e] dark:text-[#a8d5ba]">
            Tech Stack & Architecture
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="border-[#4d6e5e]/20 dark:border-[#a8d5ba]/20">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Backend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Python 3.10+", "Flask", "SQLAlchemy", "SQLite"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Frontend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Jinja2", "Leaflet.js", "Chart.js", "Tailwind CSS"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Data Processing
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["FIT File Parser", "CSV Ingestion", "GPS Downsampling"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Metrics Engine
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["TSS", "TRIMP", "HR Zones", "Rolling Averages"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-[#4d6e5e]/10 text-[#4d6e5e] dark:bg-[#a8d5ba]/10 dark:text-[#a8d5ba]"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Database Schema
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {[
                      "activities",
                      "fit_files",
                      "streams",
                      "activity_metrics",
                      "rolling_averages",
                    ].map((table) => (
                      <div
                        key={table}
                        className="px-3 py-2 text-xs font-mono rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-center"
                      >
                        {table}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-[#4d6e5e] dark:bg-[#a8d5ba]">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-gray-900 mb-4">
            Ready to own your fitness data?
          </h2>
          <p className="text-white/80 dark:text-gray-800 mb-8 max-w-xl mx-auto">
            Clone the repo, run the setup script, and start analyzing your
            Strava data in minutes.
          </p>
          <a
            href="https://github.com/Hank95/strava-local"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-white text-[#4d6e5e] hover:bg-gray-100 dark:bg-gray-900 dark:text-[#a8d5ba] dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
