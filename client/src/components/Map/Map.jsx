import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';

import { MainContext } from 'containers/mainContext';

import './Map.scss';
import PageLoader from 'components/PageLoader/PageLoader';

import { Icon } from '@chakra-ui/core';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 46,
    longitude: 15,
    zoom: 12
  });
  const [loading, setLoading] = useState(true);
  const {
    map: { userPosition, chosenPosition }
  } = useContext(MainContext);


  useEffect(() => {
    if (userPosition) {
      setViewport({
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
        zoom: 12
      });
    }
    if (chosenPosition) {
      setViewport({
        latitude: chosenPosition.latitude,
        longitude: chosenPosition.longitude,
        zoom: 12
      });
    }
    return () => {

    };
  }, [userPosition, chosenPosition]);

  return (
    <>
      {loading && <PageLoader />}
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        {...viewport}
        onLoad={() => setLoading(false)}
        onViewportChange={newViewport => setViewport(newViewport)}
      >
        <div style={{ position: 'absolute', bottom: 32, right: 64 }}>
          <NavigationControl />
        </div>

        {(userPosition || chosenPosition) && !loading && (
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <Icon name="arrow-down" size="2rem" color="#F00" />
          </Marker>
        )}
      </ReactMapGL>
    </>
  );
};

export default Map;
