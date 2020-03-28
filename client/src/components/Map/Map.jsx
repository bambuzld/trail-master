import React, { useState, useEffect, useCallback } from 'react';

import MapGL, { NavigationControl, Marker, Source, Layer } from '@urbica/react-map-gl';
import Draw from '@urbica/react-map-gl-draw';

import { useMainContext } from 'containers/mainContext';
import { GET_TRAILS_QUERY } from 'graphql/queries';

import PageLoader from 'components/PageLoader/PageLoader';
import Svg from 'components/Svg';
import Popover from 'components/Popover';
import Login from 'components/Auth/Login';
import NewPinDrawer from 'screens/Dashboard/components/NewPinDrawer';
import { Box, Button } from '@chakra-ui/core';

import { useNotification } from 'utils/useNotifications';
import { useClient, useAuth } from 'utils/Hooks';

const DEFAULT_VIEWPORT = {
  longitude: 46,
  latitude: 15,
  zoom: 12
};

const Map = () => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [addNotification] = useNotification();
  const [loading, setLoading] = useState(true);
  const [pop, setPop] = useState(false);
  const [trailInfoPopup, setTrailInfoPopup] = useState({});
  const [showDrawer, setDrawer] = useState(false);
  const [user, isAuth] = useAuth();
  // const [selectedMode, setSelectedMode] = useState(EditorModes.READ_ONLY);
  const [trailPath, setTrailPath] = useState(null);
  const [data, setData] = useState(null);

  const [draw, setDraw] = useState(false);

  const client = useClient();

  const {
    map: { userPosition, chosenPosition, draftPin, trails },
    dispatch
  } = useMainContext();

  console.log('trails', trails);
  const onTrailPathFinish = e => {
    dispatch({ type: 'SET_TRAIL', payload: e });
    setDrawer(true);

    // setTrailPath(newCoordinates);
  };

  const handleStartDrawing = () => {
    setPop(false);
    setDraw(true);
  };

  const handleMapClick = useCallback(
    ({ lngLat }) => {
      setPop(true);
      const { lng: longitude, lat: latitude } = lngLat;
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

  const getTrails = useCallback(async () => {
    try {
      const payload = await client.request(GET_TRAILS_QUERY);
      dispatch({ type: 'GET_TRAILS', payload: payload.getTrails });
    } catch {
      addNotification({
        status: 'error',
        text: 'Server error, couldnt get the Trails',
        duration: 3000
      });
    }
  }, []);

  useEffect(() => {
    getTrails();

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
  }, [userPosition, chosenPosition, trailPath]);

  return (
    <>
      {loading && <PageLoader />}
      <MapGL
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11" //satellite and streets view
        // mapStyle="mapbox://styles/mapbox/outdoors-v11"
        // mapStyle="mapbox://styles/mapbox/light-v9"
        {...viewport}
        onLoad={() => setLoading(false)}
        onViewportChange={newViewport => setViewport(newViewport)}
        onDblclick={handleMapClick}
        doubleClickZoom={false}
        //disable map when draft pin is present to prevent setting pin whereever user clicks on popover
      >
        {/* <Editor
          style={{ width: '100%', height: '100%' }}
          clickRadius={12}
          mode={selectedMode}
          onSelect={e => console.log(e)}
          onUpdate={onTrailPathUpdate}
        /> */}

        {/* {_renderToolbar()} */}
        <div style={{ position: 'absolute', bottom: 32, right: 100 }}>
          <NavigationControl />
        </div>
        {(userPosition || chosenPosition) && !loading && (
          <Marker
            draggable={false}
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

        {draftPin && !showDrawer && (
          <Marker
            latitude={draftPin.latitude}
            longitude={draftPin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            {isAuth ? (
              <Popover
                boxShadow="0"
                isOpen={pop}
                onClose={() => setPop(false)}
                width="64"
                popoverTrigger={
                  <Box w="1.5rem" h="1.5rem" onClick={() => setPop(true)}>
                    <Svg icon="addLocation" />
                  </Box>
                }
                popoverBody={
                  <Box>
                    <Button
                      mt={4}
                      type="submit"
                      color="brandOrange"
                      mr={4}
                      onClick={handleStartDrawing}
                    >
                      Yes
                    </Button>
                    <Button
                      mt={4}
                      color="darkGrey"
                      onClick={() => {
                        setPop(false);
                        setDraw(false);
                        setTrailPath(null);
                      }}
                    >
                      No
                    </Button>
                  </Box>
                }
                headerText="Add new trail?"
              />
            ) : (
              <Popover
                boxShadow="0"
                isOpen={pop}
                onClose={() => setPop(false)}
                width="64"
                popoverTrigger={
                  <Box w="1.5rem" h="1.5rem" onClick={() => setPop(true)}>
                    <Svg icon="addLocation" />
                  </Box>
                }
                popoverBody={
                  <Box>
                    <Login inPopup />
                    <Button
                      mt={4}
                      ml={2}
                      color="darkGrey"
                      onClick={() => setPop(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                }
                headerText="You have to be logged in to add new Pin"
              />
            )}
          </Marker>
        )}

        {draw && (
          <Draw
            data={trailPath}
            onChange={trailPath => onTrailPathFinish(trailPath)}
            position="bottom-right"
          />
        )}

        {trails && trails.length > 0 && trails.map(trail=>(
          <>
            <Source id={`trail-${trail.name}`} type="geojson" data={trail.geoJson} />
            <Layer
              id={`trail-${trail.name}`}
              type="line"
              source={`trail-${trail.name}`}
              paint={{
                "line-color": "#eb6b2a",
                "line-width": 3,
              }}
              line-cap="butt"
              
              
            />
          </>
        )) }

        <NewPinDrawer
          isOpen={showDrawer}
          onClose={() => setDrawer(false)}
          trailPath={trailPath}
        />
      </MapGL>
    </>
  );
};

const aloha = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-67.13734351262877, 45.137451890638886],
        [-66.96466, 44.8097],
        [-68.03252, 44.3252],
        [-69.06, 43.98],
        [-70.11617, 43.68405],
        [-70.64573401557249, 43.090083319667144],
        [-70.75102474636725, 43.08003225358635],
        [-70.79761105007827, 43.21973948828747],
        [-70.98176001655037, 43.36789581966826],
        [-70.94416541205806, 43.46633942318431],
        [-71.08482, 45.3052400000002],
        [-70.6600225491012, 45.46022288673396],
        [-70.30495378282376, 45.914794623389355],
        [-70.00014034695016, 46.69317088478567],
        [-69.23708614772835, 47.44777598732787],
        [-68.90478084987546, 47.184794623394396],
        [-68.23430497910454, 47.35462921812177],
        [-67.79035274928509, 47.066248887716995],
        [-67.79141211614706, 45.702585354182816],
        [-67.13734351262877, 45.137451890638886]
      ]
    ]
  }
};
export default Map;
