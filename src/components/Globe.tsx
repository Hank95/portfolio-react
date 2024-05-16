// src/components/Globe.tsx
import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { supabase } from "@/lib/supabaseClient";
import PinModal from "./PinModal";

interface Pin {
  lat: number;
  lng: number;
  name: string;
  message: string;
  color: string;
}

interface GlobeClickProps {
  lat: number;
  lng: number;
}

const GlobeComponent: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchPins = async () => {
      const { data, error } = await supabase.from("pins").select("*");
      if (error) {
        console.error("Error fetching pins:", error);
      } else {
        setPins(data);
      }
    };

    fetchPins();
  }, []);

  const handleGlobeClick = (event: GlobeClickProps) => {
    const { lat, lng } = event;
    setSelectedLocation({ lat, lng });
    setModalOpen(true);
  };

  const handleSavePin = async (pin: Pin) => {
    setPins([...pins, pin]);
    await supabase.from("pins").insert([pin]);
  };

  return (
    <div className="w-full h-full">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        onGlobeClick={handleGlobeClick}
        pointsData={pins}
        pointLat={(d: object) => (d as Pin).lat} // Specify the type of the object as Pin
        pointLng={(d: object) => (d as Pin).lng} // Specify the type of the object as Pin
        // pointLabel={(d: Pin) => `<b>${d.name}</b>: ${d.message}`} // Specify the type of the object as Pin
        pointAltitude={0.05}
        pointRadius={0.2}
        pointColor={(d: object) => (d as Pin).color} // Specify the type of the object as Pin
        width={
          window.innerWidth > 768 ? window.innerWidth / 2 : window.innerWidth
        }
        height={window.innerHeight}
      />
      {selectedLocation && (
        <PinModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSavePin}
          lat={selectedLocation.lat}
          lng={selectedLocation.lng}
        />
      )}
    </div>
  );
};

export default GlobeComponent;
