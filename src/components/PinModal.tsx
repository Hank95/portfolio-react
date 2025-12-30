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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-bg-subtle border border-border p-6 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4 text-text font-semibold">Add a Pin</h2>
        <div className="mb-3">
          <label className="block mb-1 text-text-muted text-sm">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-border bg-bg text-text rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-text-muted text-sm">Message</label>
          <input
            type="text"
            className="w-full p-2 border border-border bg-bg text-text rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-text-muted text-sm">Color</label>
          <input
            type="color"
            className="w-full p-2 border border-border rounded-md cursor-pointer"
            style={{ backgroundColor: color }}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-bg-muted text-text px-4 py-2 rounded-md hover:bg-border transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-muted transition-colors"
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
