import { Card } from "@mui/material";
import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export default function AmbulanceMap() {
    const [_ambulances, setAmbulances] = useState<any>([]);
    useEffect(() => {
        // Simulated real-time data
        // Replace this with your real data source (WebSocket, API, etc.)
        const interval = setInterval(() => {
          const newAmbulances = [
            { id: 1, lat: 9.0820, lng: 8.6753, name: 'Ambulance 1' }, // Example location within Nigeria (Abuja)
            { id: 2, lat: 6.5244, lng: 3.3792, name: 'Ambulance 2' }, // Example location within Nigeria (Lagos)
            // Add more ambulances here
          ];
          setAmbulances(newAmbulances);
        }, 2000);
    
        return () => clearInterval(interval);
      }, []);
  return (
    <Card>
      {/* <MapContainer center={[9.0820, 8.6753]} zoom={7} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ambulances.map((ambulance: { id: Key | null | undefined; lat: any; lng: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
        <Marker key={ambulance.id} position={[ambulance.lat, ambulance.lng]}>
          <Popup>{ambulance.name}</Popup>
        </Marker>
      ))}
    </MapContainer> */}
    </Card>
  );
}
