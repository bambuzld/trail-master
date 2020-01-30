import React, { useState, useContext, useEffect } from 'react';

import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { MainContext } from 'containers/mainContext';

import './Dashboard.scss';
import Header from 'components/Layout/Header';
import PageContent from 'components/Layout/PageContent';
import Button from 'components/Button';
import Map from 'components/Map';

import LocationAutocomplete from 'components/LocationAutocomplete';
import PageLoader from 'components/PageLoader';

const Dashboard = () => {
  const {dispatch,
    map: { userPosition, chosenPosition }
  } = useContext(MainContext);
  const [viewport, setViewport] = useState({
    latitude: 46,
    longitude: 15,
    zoom: 12
  });

  const [loading, setLoading] = useState(true);

  const handleGoBack = () => {
    dispatch({
      type: 'SET_CHOSEN_POSITION',
      payload: null
    });
    dispatch({
      type: 'SET_USER_POSITION',
      payload: null
    });
  }

  console.log('viewport', viewport);
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
    <div className="dashboard">
      {!userPosition && !chosenPosition ? (
        <>
          <Header hasTitle={false} />
          <PageContent>
            <div className="dashboard__title">
              <span>TRAIL MASTER</span>
            </div>
            <div className="dashboard__subtitle">
              <span>Explore the trails nearby...</span>
            </div>
            <LocationAutocomplete />
          </PageContent>
        </>
      ) : (
        <>
          <Header hasTitle={false} hasAutocomplete={true} onBack={handleGoBack}/>
          {loading && <PageLoader />}
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            width="100vw"
            height="100vh"
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            {...viewport}
            onLoad={() => setLoading(false)}
            onViewportChange={newViewport => setViewport(newViewport)}
          >
            <div style={{position: 'absolute', bottom: 40, right: 40}}>
            <NavigationControl />
            </div>
          </ReactMapGL>
        </>
      )}
    </div>
  );
};

export default Dashboard;
