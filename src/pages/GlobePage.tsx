// src/pages/GlobePage.tsx
import React, { useState, useEffect } from "react";
import GlobeComponent from "@/components/Globe";
import WelcomeModal from "@/components/WelcomeModal";
import { Helmet } from "react-helmet-async";

const GlobePage: React.FC = () => {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  useEffect(() => {
    // Automatically close the modal after 10 seconds (optional)
    const timer = setTimeout(() => {
      setIsWelcomeModalOpen(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Pin Globe - Henry Pendleton</title>
        <meta
          name="description"
          content="Explore Henry Pendleton's interactive pin globe and see his global impact."
        />
        <meta
          name="keywords"
          content="Henry Pendleton, pin globe, interactive map, global impact, portfolio"
        />
        <meta name="author" content="Henry Pendleton" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Pin Globe - Henry Pendleton" />
        <meta
          property="og:description"
          content="Explore Henry Pendleton's interactive pin globe and see his global impact."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://henrypendleton.netlify.app/pin-globe"
        />
        <meta property="og:image" content="URL to your image" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pin Globe - Henry Pendleton" />
        <meta
          name="twitter:description"
          content="Explore Henry Pendleton's interactive pin globe and see his global impact."
        />
        <meta name="twitter:image" content="URL to your image" />
      </Helmet>
      <GlobeComponent />
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={handleCloseWelcomeModal}
      />
    </div>
  );
};

export default GlobePage;
