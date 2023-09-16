// @ts-nocheck

import  { useState, useEffect, FC } from 'react';
import { MapContainer, TileLayer, Marker, Polyline , Popup,useMapEvents} from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import SearchControl from './SearchControl';
import NigeriaGeoSearchProvider from './CustomGeoSearch';

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
          {/* Latitude: {selectedLatitude}, Longitude: {selectedLongitude} */}
        </Popup>
      </Marker>
    )}
      </>
  )
 
}

const  MapWithSearchAndDraw:FC<IMapSelector> = ({setSelectedLatitude,setSelectedLongitude,defaultMapLocations})  => {
  const [userLocation, setUserLocation] = useState<any>(null);
  const [_selectedLocation, setSelectedLocation] = useState<any>(defaultMapLocations);
  const [polylinePoints, setPolylinePoints] = useState<[number, number][]>([]);

  const handleSearchSelect = (result: any) => {
    setSelectedLocation(result);
    setSelectedLatitude(result?.y)
    setSelectedLongitude(result?.x)
    setPolylinePoints(userLocation ? [userLocation, [result.y, result.x]] : []);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            setUserLocation([position.coords.latitude,position.coords.longitude])
      
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

const prov = new OpenStreetMapProvider();
  return (
    <MapContainer center={[9.0820, 8.6753]} zoom={7} style={{ height: '400px' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
        {userLocation && <Marker position={userLocation}>
        <Popup  autoPan={true} keepInView={true}>Current Location</Popup>
            </Marker>}
            {polylinePoints.length > 0 && <Polyline positions={polylinePoints} color="blue" />}
            <SearchControl
            provider={new NigeriaGeoSearchProvider()}
            showMarker={true}
            showPopup={false}
            popupFormat={({ query, result }:any) => {
                let val ={
                    x: query?.data?.x,
                    y: query?.data?.y
                }
                handleSearchSelect(val)
                return result.label
            }}
            maxMarkers={3}
            retainZoomLevel={false}
            animateZoom={true}
            autoClose={false}
            searchLabel={"Enter address, please"}
            keepResult={true}
            />
             <LocationMarker 
      setSelectedLatitude={setSelectedLatitude} 
      setSelectedLongitude={setSelectedLongitude} 
      selectedLatitude={defaultMapLocations.y} 
      selectedLongitude={defaultMapLocations.x}
       />
        </MapContainer>
        );
}

export default MapWithSearchAndDraw;
