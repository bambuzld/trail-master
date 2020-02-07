import React, { useContext } from 'react';

import { MainContext } from 'containers/mainContext';

import './Dashboard.scss';
import Header from 'components/Layout/Header';
import Map from 'components/Map';
import LocationAutocomplete from 'components/LocationAutocomplete';

import { Text, Box } from '@chakra-ui/core';


const Dashboard = () => {
  const {
    dispatch,
    map: { userPosition, chosenPosition }
  } = useContext(MainContext);

  const handleGoBack = () => {
    dispatch({
      type: 'SET_CHOSEN_POSITION',
      payload: null
    });
    dispatch({
      type: 'SET_USER_POSITION',
      payload: null
    });
  };

  return (
    <>
      <Header hasTitle={false} />
      {!userPosition && !chosenPosition ? (
        <div className="dashboard">
          <>
            <Box>
              <Text
                fontSize={['2xl', '3xl', '4xl', '6xl']}
                fontWeight="bolder"
                color="white"
              >
                TRAIL MASTER
              </Text>
            </Box>
            <Box>
              <Text
                fontSize={['lg', 'lg', 'xl', '2xl']}
                fontWeight="bold"
                color="brandOrange"
              >
                Explore the trails nearby...
              </Text>
            </Box>
            <Box mt="4">
              <LocationAutocomplete />
            </Box>
          </>
        </div>
      ) : (
        <>
          <Header
            hasTitle={false}
            hasAutocomplete={true}
            onBack={handleGoBack}
          />
          <div className="dashboard">
            <Map />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
