import React, { useState, useEffect, useContext, useCallback } from 'react';
import MapGL, { NavigationControl, Marker } from 'react-map-gl';
import { Editor, EditorModes } from 'react-map-gl-draw';


import { MainContext } from 'containers/mainContext';
import { GET_TRAILS_QUERY } from 'graphql/queries';

import PageLoader from 'components/PageLoader/PageLoader';
import Svg from 'components/Svg';
import Popover from 'components/Popover';
import Login from 'components/Auth/Login';
import NewPinDrawer from 'screens/Dashboard/components/NewPinDrawer';
import { Box, Button } from '@chakra-ui/core';

import { useNotification } from 'utils/useNotifications';
import { useClient, useAuth } from 'utils/Hooks';
import { KeyCodes } from 'constants/keyCodes';
import { trailsDto } from 'utils/Dto/trailsDto';

const MODES = [
  { id: EditorModes.EDITING, text: 'Select and Edit Feature' },
  { id: EditorModes.DRAW_POINT, text: 'Draw Point' },
  { id: EditorModes.DRAW_PATH, text: 'Draw Polyline' },
  { id: EditorModes.DRAW_POLYGON, text: 'Draw Polygon' },
  { id: EditorModes.DRAW_RECTANGLE, text: 'Draw Rectangle' }
];

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
  const [selectedMode, setSelectedMode] = useState(EditorModes.READ_ONLY);
  const [trailPath, setTrailPath] = useState([]);

  const client = useClient();

  // const _switchMode = evt => {
  //   const selectedMode = evt.target.id;
  //   setSelectedMode({
  //     selectedMode: selectedMode === selectedMode ? null : selectedMode
  //   });
  // };

  // const  _renderToolbar = () => (
  //   <div style={{ position: 'absolute', top: 0, right: 0, maxWidth: '320px' }}>
  //     <select onChange={_switchMode}>
  //       <option value="">--Please choose a mode--</option>
  //       {MODES.map(mode => (
  //         <option value={mode.id}>{mode.text}</option>
  //       ))}
  //     </select>
  //   </div>
  // );

  const {
    map: { userPosition, chosenPosition, draftPin, trails },
    dispatch
  } = useContext(MainContext);

  const onTrailPathUpdate = e => {
    const newCoordinates = e.data[0].geometry.coordinates;
    setTrailPath(newCoordinates);
  };

  const handleStartDrawing = () => {
    setSelectedMode(EditorModes.DRAW_PATH);
    // setDrawer(true);
    setPop(false);
  };

  const handleMapClick = useCallback(
    ({ lngLat, leftButton }) => {
      setPop(true);
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

  const getPins = useCallback(async () => {
    try {
      const payload = await client.request(GET_TRAILS_QUERY);
      dispatch({ type: 'GET_TRAILS', payload: trailsDto(payload.getTrails) });
    } catch {
      addNotification({
        status: 'error',
        text: 'Server error, couldnt get the Trails',
        duration: 3000
      });
    }
  }, []);

  const handleFinishDrawing = e => {
    if (e.keyCode === KeyCodes.ESCAPE) {
      dispatch({ type: 'SET_TRAIL_PATH', payload: trailPath });
      setSelectedMode(EditorModes.READ_ONLY);
      setDrawer(true);
    }
  };

  useEffect(() => {
    getPins();
    document.addEventListener('keydown', handleFinishDrawing, false);

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
      document.removeEventListener('keydown', handleFinishDrawing, false);
    };
  }, [userPosition, chosenPosition, trailPath]);

  return (
    <>
      {loading && <PageLoader />}
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11" //satellite and streets view
        // mapStyle="mapbox://styles/mapbox/outdoors-v11"
        // mapStyle="mapbox://styles/mapbox/light-v9"
        {...viewport}
        onLoad={() => setLoading(false)}
        onViewportChange={newViewport => {
          setViewport(newViewport);
          console.log('newViewport', newViewport);
        }}
        onDblClick={handleMapClick}
        doubleClickZoom={false}
        //disable map when draft pin is present to prevent setting pin whereever user clicks on popover
      >
        <Editor
          style={{ width: '100%', height: '100%' }}
          clickRadius={12}
          mode={selectedMode}
          onSelect={e => console.log(e)}
          onUpdate={onTrailPathUpdate}
        />

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
                      onClick={() => setPop(false)}
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

        <NewPinDrawer
          isOpen={showDrawer}
          onClose={() => setDrawer(false)}
          trailPath={trailPath}
        />
      </MapGL>
    </>
  );
};

export default Map;
