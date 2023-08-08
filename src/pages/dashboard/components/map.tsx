import { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';


interface IMapSelector {
    setSelectedLongitude:any;
    setSelectedLatitude:any;
    selectedLatitude:any;
    selectedLongitude:any;
}

const LocationMarker:FC<IMapSelector> = ({setSelectedLatitude,setSelectedLongitude,selectedLatitude,selectedLongitude}) => {
  
    const handleMapClick = (e: { latlng: { lat: any; lng: any; }; }) => {
        const { lat, lng } = e.latlng;
       setSelectedLatitude(lat);
       setSelectedLongitude(lng);
     };
       
     useMapEvents({
      click(e) {
        handleMapClick(e)
      },
    })

    return (
        <>
         {selectedLatitude !== null && selectedLongitude !== null && (
        <Marker position={[selectedLatitude, selectedLongitude]}>
          <Popup>
            Latitude: {selectedLatitude}, Longitude: {selectedLongitude}
          </Popup>
        </Marker>
      )}
        </>
    )
   
  }


const MapSelector:FC<IMapSelector> = ({setSelectedLatitude,setSelectedLongitude,selectedLatitude,selectedLongitude}) => {


  const nigeriaBounds = new LatLngBounds(
    [4.27, 3.59], // Southwestern corner
    [13.89, 14.68] // Northeastern corner
  );

//   });
  return (
    <MapContainer
        center={[9.08, 8.67]} // Center of Nigeria
        zoom={10} // Zoom level for an appropriate view
        style={{ height: '500px', width: '100%' }}
        bounds={nigeriaBounds}
        maxBoundsViscosity={1.0}
        maxZoom={18} // Maximum zoom level
        minZoom={6} // Minimum zoom level
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker 
      setSelectedLatitude={setSelectedLatitude} 
      setSelectedLongitude={setSelectedLongitude} 
      selectedLatitude={selectedLatitude} 
      selectedLongitude={selectedLongitude} />
    </MapContainer>
  );
};

export default MapSelector;
