'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix missing marker icon issue in Next.js
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const MapComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full h-96 relative rounded-lg overflow-hidden">
      {isClient && (
        <MapContainer center={[14.5995, 120.9842]} zoom={15} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[14.5995, 120.9842]}
            icon={L.icon({
              iconUrl: markerIconPng.src,
              shadowUrl: markerShadowPng.src,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>St. Thomas Diagnostic Medical and Dental Clinic</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
