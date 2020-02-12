import React, { useState } from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Draw from '@urbica/react-map-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';  

const initialState = {
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  },
  data: {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      properties:{
          name: String
      },
      geometry: {
        coordinates: [
          -122.41411987304815,
          37.792209769935084
        ],
      type: "Point"
      }
    }]
  }
};

const MapTest = () => {
  const [viewport, setViewport] = useState(initialState.viewport);
  const [data, setData] = useState(initialState.data);
  return (
    <MapGL
      style={{ width: '100%', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={viewport => setViewport(viewport )}
    >
        <Draw
      data={data}
      onChange={(data) => setData(data)}
      position="bottom-right"
      
    />
    </MapGL>

  );
};

export default MapTest;
