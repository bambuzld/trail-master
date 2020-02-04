import React from 'react';
import NewPinDrawer from 'screens/Dashboard/components/NewPinDrawer'

import {Box } from '@chakra-ui/core'

const ProfilePage = () => {
  return (
    <Box background="black">
      <NewPinDrawer />
    </Box>
  );
};

export default ProfilePage;
