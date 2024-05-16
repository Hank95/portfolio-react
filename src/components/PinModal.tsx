// src/components/PinModal.tsx
import React, { useState, useEffect } from "react";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pin: {
    lat: number;
    lng: number;
    name: string;
    message: string;
    color: string;
  }) => void;
  lat: number;
  lng: number;
}

const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  onSave,
  lat,
  lng,
}) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setMessage("");
      setColor("#ff0000");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSave({ lat, lng, name, message, color });
    setName("");
    setMessage("");
    setColor("#ff0000");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg text-black">
        <h2 className="text-xl mb-4">Add a Pin</h2>
        <div className="mb-2">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Message</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Color</label>
          <input
            type="color"
            className="w-full p-2 border"
            style={{ backgroundColor: color, cursor: "pointer" }}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
