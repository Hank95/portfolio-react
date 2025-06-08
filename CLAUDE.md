# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview

# Type checking (included in build)
tsc
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 with TypeScript, built with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Supabase (PostgreSQL database for contact form and globe pins)
- **Routing**: React Router v6 with lazy loading for code splitting
- **Deployment**: Netlify

### Key Architectural Patterns

1. **Route Configuration**: Centralized in `/src/lib/BrowserRouter.tsx` with lazy loading for all pages
2. **Theme Management**: Context API pattern in `/src/context/ThemeContext.tsx` for dark/light mode
3. **Data Organization**: 
   - Static data in `/src/data/` (resume.ts, cities.ts)
   - Supabase client configuration in `/src/lib/supabaseClient.ts`
4. **Component Structure**:
   - shadcn/ui components in `/src/components/ui/`
   - Page components in `/src/pages/`
   - Shared components in `/src/components/`

### Environment Variables

Required for Supabase integration:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Required for Google Analytics GA4:
```
VITE_GA4_MEASUREMENT_ID=your_ga4_measurement_id
```

### Database Schema

The app uses two Supabase tables:
- **contacts**: Stores contact form submissions
- **globe_pins**: Stores user-created pins on the interactive globe

### Import Aliases

The project uses `@/` as an alias for `./src/` directory (configured in tsconfig.json and vite.config.ts).

### Key Features Implementation

1. **Interactive Globe** (`/globe`): Uses react-globe.gl and Three.js, persists pins to Supabase
2. **Contact Form**: Submissions saved to Supabase with error handling
3. **Dark Mode**: System preference detection with manual toggle
4. **Animations**: AOS library for scroll animations
5. **SEO**: react-helmet-async for meta tag management
6. **Analytics**: Google Analytics GA4 integration with custom event tracking