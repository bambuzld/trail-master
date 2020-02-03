import React, { useContext } from 'react';
import './Header.scss';
import logo from 'assets/images/logo.svg';
import Button from 'components/Button';

import {
  Flex,
  Box,
  Image,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Icon,
  Text
} from '@chakra-ui/core';

import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';

import { MainContext } from 'containers/mainContext';
import { ME_QUERY } from 'graphql/queries';
import { useWindowDimensions } from 'utils/Hooks';
import { set } from 'utils/localStorage';
import LocationAutocomplete from 'components/LocationAutocomplete';

const Header = ({ hasTitle, hasAutocomplete, onBack }) => {
  const { dispatch } = useContext(MainContext);
  const { width, height } = useWindowDimensions();
  //TODO: onsuccess method. onfailure method, figure out context and reducer design
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
            aria-label="back"
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
      paddingX={['0', '8', '24', '40']}
      position="absolute"
      w="100vw"
    >
      <Box>
        <Image src={logo} alt="trail master" objectFit="fit" size="100px" />
      </Box>
      <Flex justify="space-between" align="center">
        {width < 600 ? (
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              rounded="md"
              // borderWidth="1px"
              _hover={{ bg: 'gray.100' }}
              // _expanded={{ bg: 'red.200' }}
              // _focus={{ outline: 0, boxShadow: 'outline' }}
            >
              <Icon name="chevron-down" />
            </MenuButton>
            <Box>
              <MenuList
                position="absolute"
                h="100vh"
                w="100vw"
                top="0"
                left="0"
                display="flex"
                flexDirection="column"
                // justifyContent="center"
                alignItems="center"
              >
                <Box  display="flex" justifyContent="space-between" alignItems="center" direction="row">
                  <Image
                    src={logo}
                    alt="trail master"
                    objectFit="fit"
                    size="100px"
                  />
                  {/* <Text ml="8" color="black" fontWeight="bold" fontSize="4xl">TRAIL MASTER</Text> */}
                  <Icon name="close" color="lightGrey" size="30px" />
                </Box>
                <MenuDivider color="lightGrey" />
                <MenuItem mb="8">
                  <Text
                    fontSize="2xl"
                    color="darkGrey"
                    fontWeight="bold"
                    textDecoration="none"
                  >
                    Profile
                  </Text>
                </MenuItem>
                <MenuItem mb="8">
                  <Text
                    fontSize="2xl"
                    color="darkGrey"
                    fontWeight="bold"
                    textDecoration="none"
                  >
                    All trails
                  </Text>
                </MenuItem>
                <MenuItem>
                  <GoogleLogin
                    clientId="325129789199-aeblq0vopuh6dc62sen30c3q6mqli0kq.apps.googleusercontent.com"
                    buttonText="Sign in"
                    onSuccess={onSuccess}
                    onFailure={error => console.error(error)}
                    render={props => (
                      <Button
                        label="Sign in"
                        variant="secondary"
                        onClick={props.onClick}
                      />
                    )}
                  />
                </MenuItem>
              </MenuList>
            </Box>
          </Menu>
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
