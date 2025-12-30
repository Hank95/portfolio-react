export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  status: 'live' | 'building' | 'professional';
  techStack: string[];
  featured: boolean;
  image?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  links: {
    live?: string;
    github?: string;
    appStore?: string;
    website?: string;
  };
  caseStudy?: {
    overview: string;
    problem?: string;
    whatIBuilt: string[];
    keyDecisions?: string;
    results?: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'apex146',
    title: 'Apex146 Racing Platform',
    subtitle: 'Data visualization for professional racing teams',
    status: 'professional',
    featured: true,
    techStack: ['React', 'TypeScript', 'D3', 'AWS'],
    links: {},
    caseStudy: {
      overview: `A white-label analytics platform used by MotoGP and F1 teams to track racer performance. I led frontend development, building interactive charts, custom track visualizations, and real-time dashboards.`,
      problem: `Racing teams needed a way to analyze performance data—lap times, sector splits, race positioning—without drowning in spreadsheets. Media partners needed broadcast-ready graphics.`,
      whatIBuilt: [
        'Interactive heat maps and scatterplots for comparing racer statistics',
        'Custom SVG track graphics with sector-by-sector performance overlays',
        'Bump charts showing position changes throughout races',
        'Responsive dashboard consumed by teams, analysts, and broadcasters',
      ],
      keyDecisions: `The biggest challenge was rendering complex visualizations without killing performance on lower-end devices. I chose D3 for the heavy charting but kept the component layer in React for maintainability. Custom SVG tracks were hand-drawn to match exact course layouts.`,
      results: `Platform improved data accessibility for partner teams. UI bug reports dropped 40% after implementing a component library with consistent patterns.`,
    },
  },
  {
    slug: 'strava-local',
    title: 'Strava Local',
    subtitle: 'Local-first fitness analytics—your data stays on your machine',
    status: 'live',
    featured: true,
    techStack: ['Python', 'Flask', 'SQLite', 'Leaflet'],
    images: [
      {
        src: '/strava-local/dashboard.png',
        alt: 'Strava Local dashboard showing activity overview and statistics',
        caption: 'Dashboard with activity breakdowns and weekly trends',
      },
      {
        src: '/strava-local/heatmap.png',
        alt: 'Heatmap visualization of all running and cycling routes',
        caption: 'Route heatmap built with Leaflet—every run and ride visualized',
      },
      {
        src: '/strava-local/metrics.png',
        alt: 'Training metrics showing fitness and fatigue curves',
        caption: 'Training load calculations: TSS, fitness/fatigue balance',
      },
    ],
    links: {
      github: 'https://github.com/Hank95/strava-local',
    },
    caseStudy: {
      overview: `A privacy-focused analytics tool for athletes who want to own their data. Import your Strava export, get insights without uploading anything to the cloud.`,
      problem: `Strava's analytics are limited unless you pay, and even then, your data lives on their servers. Athletes training seriously want deeper metrics (TSS, CTL/ATL, form curves) without privacy tradeoffs.`,
      whatIBuilt: [
        'CSV + FIT file parser that ingests years of activity data',
        'SQLite database for fast local queries',
        'Dashboard with activity breakdowns, trends, and heatmaps',
        'Route explorer using Leaflet for mapping every run and ride',
        'Training load calculations: TSS, fitness/fatigue balance, HR zones',
      ],
      keyDecisions: `Chose SQLite over a heavier database because the entire point is local-first simplicity. Flask keeps the backend minimal. Leaflet over Mapbox because no API keys = true offline capability.`,
    },
  },
  {
    slug: 'f1-dashboard',
    title: 'F1 Data Dashboard',
    subtitle: 'Real-time championship standings and race analytics',
    status: 'live',
    featured: true,
    techStack: ['React 19', 'TypeScript', 'TanStack Router', 'Tailwind'],
    links: {
      live: 'https://f1.henrypendleton.com',
      github: 'https://github.com/hank95/f1-data-visualization',
    },
    caseStudy: {
      overview: `A personal project to explore React 19 and modern data fetching patterns. Pulls live F1 data and presents championship standings, race results, and driver statistics.`,
      whatIBuilt: [
        'Real-time standings and race result tables',
        'Driver/constructor statistics with historical comparison',
        'Responsive design optimized for checking results on mobile',
        'Clean data layer using TanStack Query',
      ],
      keyDecisions: `Used TanStack Router over React Router to explore file-based routing patterns. Kept the UI minimal—this is a reference app, not a redesign of F1's official site.`,
    },
  },
  {
    slug: 'listlive',
    title: 'ListLive',
    subtitle: 'Collaborative grocery lists with real-time sync',
    status: 'live',
    featured: true,
    techStack: ['SwiftUI', 'CloudKit', 'Core Data'],
    links: {
      appStore: 'https://apps.apple.com/app/listlive/id6747406731',
      website: 'https://listliveapp.com/',
    },
    caseStudy: {
      overview: `A grocery app that actually predicts what you need. Smart categorization, real-time sync with family, and a shopping mode that makes the store trip faster.`,
      problem: `Shared grocery apps are either too simple (just a checklist) or too complicated (meal planning features nobody uses). I wanted something in between—smart enough to help, simple enough to not get in the way.`,
      whatIBuilt: [
        'Smart shopping mode with progress tracking',
        'Auto-categorization that learns your items',
        'CloudKit sharing for real-time family sync',
        'Haptic feedback and celebration effects',
        'Full undo system because mistakes happen',
      ],
      keyDecisions: `MVVM architecture kept the codebase manageable as features grew. CloudKit over Firebase because native sync just works better on iOS, and there's no monthly bill.`,
      results: `Shipped to the App Store. Used weekly by my household.`,
    },
  },
  {
    slug: 'cribscore',
    title: 'CribScore',
    subtitle: 'iOS scoring app for cribbage games',
    status: 'live',
    featured: false,
    techStack: ['SwiftUI', 'Core Data'],
    links: {
      appStore: 'https://apps.apple.com/us/app/cribscore/id6747778251',
      website: 'https://cribscoreapp.henrypendleton.com/',
    },
    caseStudy: {
      overview: `A focused iOS app for keeping score in cribbage games. Features a custom dial interface for quick point entry and tracks game history with statistics.`,
      whatIBuilt: [
        'Custom circular dial for intuitive score selection (1-29 range)',
        'Dual player support with customizable names and colors',
        'Game history with persistent storage',
        'Player statistics tracking wins, losses, and averages',
        'Multiple background themes and haptic feedback',
      ],
    },
  },
  {
    slug: 'wedding-website',
    title: 'Wedding Website',
    subtitle: 'RSVP system with interactive Charleston map',
    status: 'live',
    featured: false,
    techStack: ['React', 'Supabase', 'Tailwind', 'Leaflet'],
    links: {
      live: 'https://nobskaandhenry.com',
      github: 'https://github.com/Hank95/wedding-site',
    },
    caseStudy: {
      overview: `A personal wedding website with full RSVP management, interactive maps, and automated email notifications.`,
      whatIBuilt: [
        'Complete RSVP system with Supabase backend',
        'Interactive Charleston activities map using Leaflet',
        'Automated email notifications via Supabase Edge Functions',
        'Photo gallery with lazy loading',
        'Responsive design achieving 95+ Lighthouse score',
      ],
    },
  },
  {
    slug: 'treasuremap',
    title: 'TreasureMap',
    subtitle: 'Community treasure hunt mobile app',
    status: 'building',
    featured: false,
    techStack: ['React Native', 'Expo', 'Supabase'],
    links: {},
    caseStudy: {
      overview: `A React Native app for community-driven treasure hunts with real-time tracking and map visualization.`,
      whatIBuilt: [
        'Real-time location tracking and game state persistence',
        'Map-based hunt visualization',
        'Companion web app for creating and browsing hunts',
      ],
    },
  },
];

// Helper functions
export const selectedProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
