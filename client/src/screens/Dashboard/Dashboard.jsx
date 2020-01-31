import React, { useState, useContext, useEffect } from 'react';

import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { MainContext } from 'containers/mainContext';

import './Dashboard.scss';
import Header from 'components/Layout/Header';
import PageContent from 'components/Layout/PageContent';
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
          <Map/>
        </>
      )}
    </div>
  );
};

export default Dashboard;
