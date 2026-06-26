import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet default icon fix for bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface WeatherMapProps {
  clima: {
    name: string;
    coord: { lon: number; lat: number };
    weather: [{ icon: string; description: string }];
  } | null;
}

// Updates map center with smooth animation when city changes
const MapUpdater = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 11, { duration: 1.5 });
  }, [map, position]);
  return null;
};

const WeatherMap = ({ clima }: WeatherMapProps) => {
  if (!clima?.coord) return null;

  const position: LatLngExpression = [clima.coord.lat, clima.coord.lon];

  return (
    <motion.div
      className="w-full max-w-2xl mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="glass overflow-hidden" style={{ height: '220px' }}>
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Mapa</span>
          <span className="text-white/40 text-xs">— {clima.name}</span>
        </div>
        <MapContainer
          center={position}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: '180px', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapUpdater position={position} />
          <Marker position={position}>
            <Popup>
              <div className="flex items-center gap-2 p-1">
                <img
                  src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}.png`}
                  alt={clima.weather[0].description}
                  className="w-8 h-8"
                />
                <span className="text-sm font-semibold">{clima.name}</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default WeatherMap;
