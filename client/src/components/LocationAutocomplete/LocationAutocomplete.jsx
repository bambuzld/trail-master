import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext
} from 'react';
import axios from 'axios';
import Transition from 'react-transition-group/Transition';

import { MainContext } from 'containers/mainContext';

import { KeyCodes } from 'constants/keyCodes';
import { useFetch, useFocus, usePosition } from 'utils/Hooks';

import Svg from 'components/Svg';
import ElementLoader from 'components/ElementLoader';

import './LocationAutocomplete.scss';

import { Flex, Box, Text, Input, PseudoBox } from '@chakra-ui/core';

//TODO: Code quality, code split & cleanup
//TODO: x icon to clear the location text input

const LocationAutocomplete = () => {
  const { dispatch } = useContext(MainContext);
  const [suggestions, setSuggestions] = useState([]);
  console.log('suggestions', suggestions);
  const [loading, setLoading] = useState(false);
  const [inside, setInside] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  console.log('coordinates', coordinates);
  const [val, setVal] = useState('');

  const [suggestionRef, setFocus] = useFocus();
  // const [activeSuggestionRef, setActiveSuggestionFocus] = useFocus();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const { latitude, longitude, error } = usePosition(true);
  console.log('longitude', longitude);
  console.log('latitude', latitude);
  const [chosenIndex, setChosenIndex] = useState(null);
  console.log('render');
  useEffect(() => {
    handleFocusChange();
    if (inputRef) {
      inputRef.current.focus();
    }
    if (chosenIndex) {
      setVal(suggestions[chosenIndex].place_name);
      handleLocation(chosenIndex);
    }
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [chosenIndex]);

  //input handlers
  const handleClickOutside = event => {
    setInside(false);

    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  const handleEscapeOrEnterKey = (e, index) => {
    if (e.keyCode === KeyCodes.ESCAPE) {
      setSuggestions([]);
      setVal('');
    }
  };

  const handleFocusFirstSuggestion = e => {
    if (e.keyCode === KeyCodes.ARROW_DOWN && inside === false) {
      setInside(true);
      setFocus();
    }
  };
  //navigate trough list with arrow keys
  const handleFocusChange = () => {
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
          console.log('suggestionIndex', suggestionIndex);
          setChosenIndex(suggestionIndex);
          // setVal(suggestions[parseInt(suggestionIndex,10)] &&suggestions[parseInt(suggestionIndex,10)].place_name)
        }
        active = document.activeElement;
      });
    }
  };

  const handleClearAll = () => {
    setVal('');
  };

  const handleChange = async value => {
    setVal(value.target.value);
    setLoading(true)
    const searchString = value.target.value;
    try {
      const results = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      console.log('result', results);
      setSuggestions(results.data.features);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setSuggestions([]);
      console.error(error);
    }
  };

  const handleLocation = index => {
    console.log('index', index);
    const chosenLocation = suggestions[index];
    console.log('chosenLocation', chosenLocation);
    setCoordinates({
      latitude: chosenLocation.center[1],
      longitude: chosenLocation.center[0]
    });
    console.log('ovo btj', coordinates);
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
  };

  const handleUserLocation = () => {
    setCoordinates({ latitude: latitude, longitude: longitude });
    dispatch({
      type: 'SET_USER_POSITION',
      payload: { latitude: latitude, longitude: longitude }
    });
    dispatch({
      type: 'SET_CHOSEN_POSITION',
      payload: null
    });
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        w="35rem"
        h="3.5rem"
        background="white"
        roundedTop="2rem"
        roundedBottom={!suggestions.length && "2rem"}
        p="6"
      >
        <Input
          placeholder="start typing"
          size="lg"
          fontSize="2xl"
          fontWeight="bold"
          h="3rem"
          onChange={handleChange}
          value={val}
          ref={inputRef}
          onKeyDown={handleEscapeOrEnterKey}
        />
        <Box>
          {!val ? (
            <span onClick={handleUserLocation}>
              <Svg
                className="location-autocomplete__location-icon"
                icon="gps"
              />
            </span>
          ) : (
            <span onClick={handleClearAll}>
              <Svg
                className="location-autocomplete__location-icon"
                icon="close"
              />
            </span>
          )}
        </Box>
      </Flex>

      <Transition in={suggestions.length > 0} timeout={2000}>
        {state => (
          <Flex
            direction="column"
            maxW="35rem"
            ref={suggestionsRef}
            mt="-1rem"
            roundedBottom="2rem"

          >
            {suggestions.map((suggestion, index) => (
              <PseudoBox
                key={`${suggestion}${index}`}
                background="white"
                onClick={() => handleLocation(index)}
                data-key={index}
                tabIndex={index}
                ref={index === 0 && suggestionRef}
                onKeyDown={e => handleEscapeOrEnterKey(e, index)}
                roundedBottom={index === suggestions.length -1 && "2rem"}
                _hover={{bg: "lighterGrey"}}
                
              >
                {console.log('index', index)}
                <Text color="lightGrey" cursor="pointer" pt="2" px="10" fontSize="lg" fontWeight="bold" >{suggestion.place_name}</Text>
              </PseudoBox>
            ))}
          </Flex>
        )}
      </Transition>
    </>
  );
};

export default LocationAutocomplete;
