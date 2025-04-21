# Henry Pendleton - Full-Stack Software Engineer Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/8d819f61-d9f8-4eec-b21f-43c50b47b8cd/deploy-status)](https://app.netlify.com/sites/henrypendleton/deploys)

**Live Demo:** [https://henrypendleton.com](https://henrypendleton.com)

Welcome to the source code repository for my personal portfolio website! This site showcases my skills, projects, and professional experience as a Full-Stack Software Engineer. It's built using modern web technologies to provide an engaging and informative experience for visitors, including potential employers and collaborators.

![Screenshot of the Portfolio Homepage](URL_TO_YOUR_SCREENSHOT.png) _(Optional: Add a screenshot)_

## Table of Contents

- [Introduction](#henry-pendleton---full-stack-software-engineer-portfolio)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Deployment](#deployment)
- [Contact](#contact)

## Features

- **Interactive Globe**: Visitors can explore an interactive 3D globe and add pins to mark their locations (`/globe`). Data is persisted using Supabase.
- **Detailed Portfolio Sections**: Clear sections for About Me, Work Experience, Skills, Education, and Contact (`/`).
- **Contact Form**: Integrated contact form that saves submissions to a Supabase database (`/contact`).
- **Responsive Design**: Fully responsive layout optimized for various screen sizes using Tailwind CSS.
- **Dark Mode**: User-selectable light/dark/system theme preference (`ThemeToggle.tsx`).
- **Smooth Animations**: Subtle animations on scroll using AOS (Animate On Scroll).
- **SEO Optimized**: Uses `react-helmet-async` for managing page titles and meta tags.

## Technologies Used

- **Frontend**:
  - React (`react`)
  - TypeScript (`typescript`)
  - Vite (`vite`) (Build Tool)
  - React Router DOM (`react-router-dom`) (Routing)
  - Tailwind CSS (`tailwindcss`) (Styling)
  - shadcn/ui (`ui/button.tsx`, `ui/card.tsx`, etc.) (UI Components)
  - React Globe GL (`react-globe.gl`) (3D Globe Visualization)
  - AOS (`aos`) (Scroll Animations)
  - React Helmet Async (`react-helmet-async`) (SEO)
- **Backend**:
  - Supabase (`@supabase/supabase-js`) (Database & Backend Services)
- **Deployment**:
  - Netlify (`netlify.toml`)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later recommended)
- npm (or yarn/pnpm)
- A Supabase account (for database interactions)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Hank95/portfolio-react.git
    cd portfolio-react
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
    You can find these in your Supabase project settings.

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Project Structure

```
/src
├── App.tsx             # Main application component with layout
├── main.tsx            # Entry point of the application
├── index.css           # Global styles
├── App.css             # App-specific styles
├── components/         # Reusable UI components (Header, Footer, Cards, etc.)
│   ├── ui/             # shadcn/ui components
│   └── ...
├── pages/              # Page components (Home, Globe, Contact, etc.)
├── lib/                # Utility functions, Supabase client, Router setup
├── context/            # React context (e.g., ThemeContext)
├── data/               # Static data (e.g., resume info, city coordinates)
└── assets/             # Static assets like images (if any)
```

## Key Components

- `Header.tsx`: Navigation bar with links and theme toggle.
- `Footer.tsx`: Site footer with copyright and links.
- `Globe.tsx`: Implements the interactive 3D globe using `react-globe.gl`.
- `ContactsForm.tsx`: Handles user contact submissions.
- `ThemeToggle.tsx`: Allows users to switch between light, dark, and system themes.
- `BrowserRouter.tsx`: Defines the application's routes using React Router.

## Deployment

This project is deployed on Netlify. The deployment is configured via the `netlify.toml` file, which includes necessary build commands and redirects for client-side routing.

Build command: `npm run build`
Publish directory: `dist`

## Contact

Feel free to reach out if you'd like to collaborate or have any questions!

- **Email**: [hhpendleton@gmail.com](mailto:hhpendleton@gmail.com)
- **LinkedIn**: [linkedin.com/in/henry-pendleton](https://www.linkedin.com/in/henry-pendleton/)
- **GitHub**: [github.com/Hank95](https://github.com/Hank95)

Thank you for checking out my portfolio!
