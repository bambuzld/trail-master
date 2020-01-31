import React, { useContext } from 'react';
import './Header.scss';
import logo from 'assets/images/logo.svg';
import Button from 'components/Button';
import Svg from 'components/Svg';

import { Flex, Box, Image, Icon } from '@chakra-ui/core';

import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';

import { MainContext } from 'containers/mainContext';
import { ME_QUERY } from 'graphql/queries';

import { set } from 'utils/localStorage';
import LocationAutocomplete from 'components/LocationAutocomplete';

const Header = ({ hasTitle, hasAutocomplete, onBack }) => {
  const { dispatch } = useContext(MainContext);
  //TODO: onsuccess method. onfailure method, figure out context and reducer design
  const onSuccess = async googleUser => {
    console.log('click');
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
      <header className="header">
        <Flex align="center" justify="space-between">
          <Flex align="center" onClick={onBack} className="header__back-icon">
            <Icon name="arrow-back" size="3rem" color="white"/>
          </Flex>
          <Box>
            <LocationAutocomplete />
          </Box>
          <Box></Box>
        </Flex>
      </header>
    );
  }
  return (
    <header className="header">
      <Flex align="center" justify="space-between">
        <Box>
          <Image src={logo} alt="trail master" objectFit="fit" size="100px" />
        </Box>
        {/* <Box>
          TRAIL MASTER
        </Box> */}
        <Flex justify="center" align="center">
          <ul className="header__nav">
            <li p={0}>Profile</li>
            <li>All Trails</li>
          </ul>
          <GoogleLogin
            clientId="325129789199-aeblq0vopuh6dc62sen30c3q6mqli0kq.apps.googleusercontent.com"
            buttonText="Sign in"
            onSuccess={onSuccess}
            onFailure={error => console.error(error)}
            render={props => <Button label="Sign in" onClick={props.onClick} />}
          />
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
