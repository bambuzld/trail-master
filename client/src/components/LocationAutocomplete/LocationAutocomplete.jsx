import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext
} from 'react';
import axios from 'axios';
import Transition from 'react-transition-group/Transition';
import gps from 'assets/images/gps_orange.svg';

import { MainContext } from 'containers/mainContext';

import { KeyCodes } from 'constants/keyCodes';
import { usePosition } from 'utils/Hooks';

import Svg from 'components/Svg';

import './LocationAutocomplete.scss';

import { Flex, Box, Text, Input, PseudoBox, Icon } from '@chakra-ui/core';

const LocationAutocomplete = () => {
  const {
    dispatch,
    map: { chosenLocationData }
  } = useContext(MainContext);
  const [suggestions, setSuggestions] = useState(null);
  const [val, setVal] = useState('');
  const suggestionRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const { latitude, longitude, error } = usePosition(true);
  const [chosenIndex, setChosenIndex] = useState(null);

  const handleClickOutside = useCallback(event => {
    setSuggestions(null);
  }, []);

  const handleEscapeOrEnterKey = (e, index) => {
    if (e.keyCode === KeyCodes.ESCAPE) {
      setSuggestions(null);
      setVal('');
    }
  };

  const handleFocusFirstSuggestion = e => {
    if (e.keyCode === KeyCodes.ARROW_DOWN) {
      suggestionsRef.current.children[0].focus();
    }
  };
  //navigate trough list with arrow keys
  const handleFocusChange = useCallback(() => {
    if (suggestionsRef !== null) {
      suggestionsRef.current.addEventListener('keydown', e => {
        let active = document.activeElement;
        if (e.keyCode === KeyCodes.ARROW_DOWN && active.nextSibling) {
          active.nextSibling.focus();
        }
        if (e.keyCode === KeyCodes.ARROW_UP && active.previousSibling) {
          active.previousSibling.focus();
        }
        if (e.keyCode === KeyCodes.ENTER) {
          const suggestionIndex = parseInt(active.getAttribute('data-key'), 10);
          setChosenIndex(suggestionIndex);
          setSuggestions(null);
        }
        active = document.activeElement;
      });
    }
  }, [suggestionsRef, chosenIndex]);

  const handleClearAll = () => {
    setVal('');
    setSuggestions(null);
    dispatch({ type: 'SET_CHOSEN_LOCATION_DATA', payload: null });
  };

  const handleChange = async value => {
    setVal(value.target.value);
    const searchString = value.target.value;
    try {
      const results = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      setSuggestions(results.data.features);
    } catch (error) {
      setSuggestions(null);
      console.error(error);
    }
  };

  const handleLocation = useCallback(
    index => {
      const chosenLocation = suggestions[index];
      dispatch({
        type: 'SET_CHOSEN_POSITION',
        payload: {
          latitude: chosenLocation.center[1],
          longitude: chosenLocation.center[0]
        }
      });
      dispatch({
        type: 'SET_USER_POSITION',
        payload: null
      });
    },
    [dispatch, suggestions]
  );

  const handleUserLocation = useCallback(() => {
    dispatch({
      type: 'SET_USER_POSITION',
      payload: { latitude: latitude, longitude: longitude }
    });
    dispatch({
      type: 'SET_CHOSEN_POSITION',
      payload: null
    });
  }, [dispatch, latitude, longitude]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    handleFocusChange();
    if (chosenLocationData) {
      setVal(chosenLocationData.place_name);
    }
    document.addEventListener('keydown', handleEscapeOrEnterKey, false);
    document.addEventListener('click', handleClickOutside, false);
    if (inputRef) {
      inputRef.current.focus();
    }

    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('keydown', handleEscapeOrEnterKey, false);
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    if (suggestions) {
      setVal(suggestions[chosenIndex].place_name);
      handleLocation(chosenIndex);
      dispatch({
        type: 'SET_CHOSEN_LOCATION_DATA',
        payload: suggestions[chosenIndex]
      });
    }
  }, [chosenIndex]);

  return (
    <>
      <Flex
        justify="center"
        align="center"
        w={['20rem', '25rem', '30rem', '35rem']}
        h="3.5rem"
        background="white"
        roundedTop="2rem"
        roundedBottom={!suggestions && '2rem'}
        p="6"
      >
        <Input
          placeholder="start typing"
          size="lg"
          fontSize={['xl', 'xl']}
          fontWeight="bold"
          h="3rem"
          onChange={handleChange}
          value={val}
          ref={inputRef}
          onKeyDown={handleFocusFirstSuggestion}
        />
        <Box
          onClick={!val ? handleUserLocation : handleClearAll}
          transition="all 0.2s ease-in-out"
          _hover={{
            resize: '105%'
          }}
          cursor="pointer"
          h="icon"
          w="icon"
        >
          {!val ? <Svg icon="gps" /> : <Svg icon="close" />}
        </Box>
      </Flex>

      <Transition in={suggestions} timeout={2000}>
        {state => (
          <Flex
            direction="column"
            maxW={['20rem', '25rem', '30rem', '35rem']}
            ref={suggestionsRef}
            mt="-1rem"
            roundedBottom="2rem"
          >
            {suggestions &&
              suggestions.map((suggestion, index) => (
                <PseudoBox
                  key={`${suggestion}${index}`}
                  background="white"
                  onClick={() => handleLocation(index)}
                  data-key={index}
                  tabIndex={index}
                  // zIndex="999"
                  ref={suggestionRef}
                  roundedBottom={index === suggestions.length - 1 && '2rem'}
                  _hover={{ bg: 'lighterGrey' }}
                  _focus={{ bg: 'lighterGrey' }}
                >
                  <Text
                    mb={index === suggestions.length - 1 && '4'}
                    color="lightGrey"
                    cursor="pointer"
                    pt="2"
                    px="10"
                    fontSize="lg"
                    fontWeight="bold"
                    isTruncated
                  >
                    {suggestion.place_name}
                  </Text>
                </PseudoBox>
              ))}
          </Flex>
        )}
      </Transition>
    </>
  );
};

export default LocationAutocomplete;
