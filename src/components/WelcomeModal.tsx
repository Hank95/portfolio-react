// src/components/WelcomeModal.tsx
import React from "react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-bg-subtle border border-border p-6 rounded-lg max-w-sm mx-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-text">Greetings from Charleston</h2>
        <p className="mb-4 text-text-muted">
          If you feel like it, place a pin where you call home.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-muted transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
