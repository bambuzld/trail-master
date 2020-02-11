import React, { useState } from 'react';
import logo from 'assets/images/logo.svg';
import Login from 'components/Auth/Login';
import Logout from 'components/Auth/Logout';

import { Flex, Box, Image, IconButton, Link, Text } from '@chakra-ui/core';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/core';

import { useWindowDimensions, useAuth } from 'utils/Hooks';
import LocationAutocomplete from 'components/LocationAutocomplete';
import Svg from 'components/Svg';

const Header = ({ hasTitle, hasAutocomplete, onBack }) => {
  const { width } = useWindowDimensions();
  const [isOpen, setOpen] = useState(false);
  const [isAuth, user] = useAuth();
  console.log('isAuth', isAuth);
  console.log('user', user);

  if (hasAutocomplete) {
    return (
      <Flex
        align="center"
        justify="space-between"
        paddingX={['0', '8', '24', '40']}
        position="absolute"
        w="100vw"
        zIndex="222"
        mt="4"
      >
        <Box onClick={onBack} mt="1rem" mr="1rem"  >
          <IconButton
           backgroundColor="rgba(167,167,167,0.3)"
            icon="arrow-back"
            size="lg"
            fontSize="2.5rem"
            aria-label="back-to-dashboard"
            variantColor="white"
            text="md"
            boxShadow="lg"
            borderRadius="2.5rem"
          />
        </Box>
        <Box>
          <LocationAutocomplete />
        </Box>
        <Box></Box>
      </Flex>
    );
  }
  return (
    <Flex
      align="center"
      justify="space-between"
      paddingX={['6', '8', '24', '40']}
      position="absolute"
      w="100vw"
    >
      <Box>
        <Image src={logo} alt="trail master" objectFit="fit" size="100px" />
      </Box>
      <Flex justify="space-between" align="center">
        {width < 600 ? (
          <>
            {!isOpen ? (
              <Box w="icon" h="icon" onClick={() => setOpen(true)}>
                <Svg icon="menu" />
              </Box>
            ) : (
              <Flex
                position="absolute"
                bg="white"
                h="100vh"
                w="100vw"
                top="0"
                left="0"
                zIndex="1000"
                // justify="flex-start"
                align="center"
                direction="column"
                paddingX="8"
              >
                <Flex justify="space-between" w="100%" mb="16">
                  <Box>
                    <Image
                      src={logo}
                      alt="trail master"
                      objectFit="fit"
                      size="100px"
                    />
                  </Box>
                  <Box onClick={() => setOpen(false)}>
                    <Svg icon="close" />
                  </Box>
                </Flex>
                <Box mb="8">
                  <Text
                    fontSize="2xl"
                    color="darkGrey"
                    fontWeight="bold"
                    textDecoration="none"
                  >
                    Profile
                  </Text>
                </Box>
                <Box mb="8">
                  <Text
                    fontSize="2xl"
                    color="darkGrey"
                    fontWeight="bold"
                    textDecoration="none"
                  >
                    All trails
                  </Text>
                </Box>
                <Box>
                  lolo
                  <Login />
                </Box>
              </Flex>
            )}
          </>
        ) : (
          <>
            <Box mr="24">
              <Link mr="8" color="white" fontWeight="bold">
                Profile
              </Link>
              <Link color="white" fontWeight="bold">
                All trails
              </Link>
            </Box>
            {!isAuth ? (
              <Login />
            ) : (
              <Menu>
                <MenuButton>
                  <Flex
                    cursor="pointer"
                    fontWeight="bold"
                    justify="center"
                    align="center"
                    background="rgba(167,167,167,0.5)"
                    padding="2"
                    borderRadius="1rem"
                  >
                    <Box w="5" h="5">
                      <Svg icon="user" />
                    </Box>
                    <Box display="flex" direction="row" color="white">
                      <Text color="white" fontWeight="bold" ml="1">
                        {user && user.name}
                      </Text>
                    </Box>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Logout />
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
