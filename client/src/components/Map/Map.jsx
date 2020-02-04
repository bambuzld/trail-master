import React, { useState, useEffect, useContext, useCallback } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';

import { MainContext } from 'containers/mainContext';

import PageLoader from 'components/PageLoader/PageLoader';
import Svg from 'components/Svg';
import Popover from 'components/Popover';

import { Box, Text } from '@chakra-ui/core';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 46,
    longitude: 15,
    zoom: 12
  });
  const [loading, setLoading] = useState(true);
  const [pop, setPop] = useState(false);
  const {
    map: { userPosition, chosenPosition, draftPin },
    dispatch
  } = useContext(MainContext);

  const handleMapClick = useCallback(
    ({ lngLat, leftButton }) => {
      console.log('leftButton', leftButton);
      console.log('lngLat', lngLat);
      if (!leftButton) return;
      const [longitude, latitude] = lngLat;
      dispatch({
        type: 'UPDATE_DRAFT_PIN',
        payload: {
          longitude,
          latitude
        }
      });
    },
    [dispatch]
  );

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
    return () => {};
  }, [userPosition, chosenPosition]);

  return (
    <>
      {loading && <PageLoader />}
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width="100vw"
        height="100vh"
        // mapStyle="mapbox://styles/mapbox/satellite-streets-v11" //satellite and streets view
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        {...viewport}
        onLoad={() => setLoading(false)}
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
      >
        <div style={{ position: 'absolute', bottom: 32, right: 100 }}>
          <NavigationControl />
        </div>
        {(userPosition || chosenPosition) && !loading && (
          <Marker
            latitude={
              userPosition ? userPosition.latitude : chosenPosition.latitude
            }
            longitude={
              userPosition ? userPosition.longitude : chosenPosition.longitude
            }
            offsetLeft={-19}
            offsetTop={-37}
          >
            <Box w="1.5rem" h="1.5rem">
              <Svg icon="location" />
            </Box>
          </Marker>
        )}
        {/* {draftPin && (
          <Marker
            latitude={draftPin.latitude}
            longitude={draftPin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <Box w="1.5rem" h="1.5rem">
              <Svg icon="addLocation" />
            </Box>
          </Marker>
        )} */}
        {draftPin && (
          <Marker
            latitude={draftPin.latitude}
            longitude={draftPin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <Popover
            width="64"
              popoverTrigger={
                <Box w="1.5rem" h="1.5rem">
                  <Svg icon="addLocation" />
                </Box>
              }
              popoverBody={<Box><Text>sada</Text></Box>}
              headerText="Helo maj frend"
            />
          </Marker>
        )}
      </ReactMapGL>
    </>
  );
};

export default Map;
