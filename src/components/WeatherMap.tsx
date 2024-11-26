import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface WeatherMapProps {
  clima?: {
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
  } | null;
}

const WeatherMap = ({ clima }: WeatherMapProps) => {
  if (!clima || !clima.coord) {
    return <p>...</p>;
  }

  const position: LatLngExpression = [clima.coord.lat, clima.coord.lon];

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: 20, width: 20 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default WeatherMap;
