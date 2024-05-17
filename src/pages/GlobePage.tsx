// src/pages/GlobePage.tsx
import React, { useState, useEffect } from "react";
import GlobeComponent from "@/components/Globe";
import WelcomeModal from "@/components/WelcomeModal";

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
      <GlobeComponent />
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={handleCloseWelcomeModal}
      />
    </div>
  );
};

export default GlobePage;
