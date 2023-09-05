import { OpenStreetMapProvider } from 'leaflet-geosearch';

class NigeriaGeoSearchProvider extends OpenStreetMapProvider {
  search(options:any) {
    // Add a bounding box that covers Nigeria
    options = {
      ...options,
      bbox: [3.52, 4.26, 14.68, 13.89], // Adjust these coordinates to fit Nigeria's bounding box
    };

    return super.search(options);
  }
}

export default NigeriaGeoSearchProvider;