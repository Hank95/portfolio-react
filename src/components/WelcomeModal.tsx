// src/components/WelcomeModal.tsx
import React from "react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-[#4d6e5e] p-4 rounded max-w-sm mx-auto text-gray-200 justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Greetings form Charleston🌴</h2>
        <p className="mb-4">
          If you feel like it, place a pin where you call home.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
