import { Card } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ambulanceIcon from "../../../assets/ambulance.svg"
import L from "leaflet";

const AmbulanceIcon = L.icon({
  iconUrl: ambulanceIcon,
  iconSize: [40, 40],
  iconAnchor: [12, 12],
  popupAnchor: [0, 0],
});
interface IMap {
  newAmbulances?:any
}
 const AmbulanceMap:FC<IMap> = ({newAmbulances}) => {
    const [ambulances, setAmbulances] = useState<any>(newAmbulances);
    useEffect(() => {
        // Simulated real-time data
        // Replace this with your real data source (WebSocket, API, etc.)
        const interval = setInterval(() => {
         
          setAmbulances(newAmbulances);
        }, 2000);
    
        return () => clearInterval(interval);
      }, []);
  return (
    <Card>
      <MapContainer center={[9.0820, 8.6753]} zoom={7} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ambulances.map((ambulance:any) => (
        <Marker icon={AmbulanceIcon} key={ambulance.id} position={[ambulance.lat, ambulance.lng]}>
          <Popup>{ambulance.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
    </Card>
  );
}

export default AmbulanceMap