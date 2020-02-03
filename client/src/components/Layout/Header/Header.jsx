import React, { useContext, useState } from 'react';
import './Header.scss';
import logo from 'assets/images/logo.svg';
import Button from 'components/Button';

import {
  Flex,
  Box,
  Image,
  IconButton,
  Link,
  Text
} from '@chakra-ui/core';

import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';

import { MainContext } from 'containers/mainContext';
import { ME_QUERY } from 'graphql/queries';
import { useWindowDimensions } from 'utils/Hooks';
import { set } from 'utils/localStorage';
import LocationAutocomplete from 'components/LocationAutocomplete';
import Svg from 'components/Svg';

const Header = ({ hasTitle, hasAutocomplete, onBack }) => {
  const { dispatch } = useContext(MainContext);
  const { width } = useWindowDimensions();
const [isOpen, setOpen] = useState(false);
  
  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      });
      const me = await client.request(ME_QUERY);
      dispatch({ type: 'LOGIN_USER', payload: me });
      dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
      set('currentUser', me);
    } catch (error) {
      console.error(error);
    }
  };
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
        <Box onClick={onBack} mt="-1rem" mr="1rem">
          <IconButton
            icon="arrow-back"
            size="lg"
            fontSize="2.5rem"
            aria-label="back-to-dashboard"
            variantColor="white"
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
                <Flex 
                  justify="space-between"
                  w="100%"
                  mb="16"
                >
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
                  <GoogleLogin
                    clientId="325129789199-aeblq0vopuh6dc62sen30c3q6mqli0kq.apps.googleusercontent.com"
                    buttonText="Sign in"
                    onSuccess={onSuccess}
                    onFailure={error => console.error(error)}
                    render={props => (
                      <Button label="Sign in" onClick={props.onClick} />
                    )}
                  />
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
            <GoogleLogin
              clientId="325129789199-aeblq0vopuh6dc62sen30c3q6mqli0kq.apps.googleusercontent.com"
              buttonText="Sign in"
              onSuccess={onSuccess}
              onFailure={error => console.error(error)}
              render={props => (
                <Button label="Sign in" onClick={props.onClick} />
              )}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
