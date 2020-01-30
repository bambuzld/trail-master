import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import Transition from 'react-transition-group/Transition';

import { KeyCodes } from 'constants/keyCodes';
import { useFetch, useFocus, usePosition } from 'utils/Hooks';

import Svg from 'components/Svg';
import ElementLoader from 'components/ElementLoader';

import './LocationAutocomplete.scss';

//TODO: Code quality, code split & cleanup
//TODO: x icon to clear the location text input

const LocationAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  console.log('suggestions', suggestions);
  const [loading, setLoading] = useState(false);
  const [inside, setInside] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [val, setVal] = useState('');

  const [suggestionRef, setFocus] = useFocus();
  // const [activeSuggestionRef, setActiveSuggestionFocus] = useFocus();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const { latitude, longitude, error } = usePosition(true);
  const [chosenIndex,setChosenIndex] = useState(null)
  console.log('render')
  useEffect(() => {
    handleFocusChange()
    if (inputRef) {
      inputRef.current.focus();
    } 
    if(chosenIndex){
      setVal(suggestions[chosenIndex].place_name)
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

  const handleEscapeOrEnterKey = (e,index) => {
    if (e.keyCode === KeyCodes.ESCAPE) {
      setSuggestions([]);
      setVal('');
    }
    // if (e.keyCode === KeyCodes.ENTER) {
    //   const latlng = {
    //     lng: suggestions[0].center[0],
    //     lat: suggestions[0].center[1]
    //   };
    //   setCoordinates(latlng);
    //   setVal(suggestions[0].place_name);
    //   setSuggestions([])

    //   //TODO: handle choosing selected element from the list when pressing enter, currently it only works if user press enter while inside the input
    // }
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
          setChosenIndex(suggestionIndex)
          // setVal(suggestions[parseInt(suggestionIndex,10)] &&suggestions[parseInt(suggestionIndex,10)].place_name)
        }
        active = document.activeElement;
      });
    }
  }


  const handleClearAll = () => {
    setVal('');
  };

  const handleChange = async value => {
    setVal(value.target.value);
    const searchString = value.target.value;
    try {
      const results = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      console.log('result', results);
      setSuggestions(results.data.features);
    } catch (error) {
      setSuggestions([]);
      console.error(error);
    }
    // setCoordinates(latLng);
  };

  const handleLocation = index => {
    console.log('index', index);
    const chosenLocation = suggestions[index];
    setCoordinates({
      lat: chosenLocation.center[0],
      lng: chosenLocation.center[1]
    });
  };

  const handleUserLocation = () => {
    setCoordinates({ lat: latitude, lng: longitude });
  };

  return (
    <>
      <div
        className={`location-autocomplete${
          suggestions.length > 0 ? '__suggestions-opened' : ''
        }`}
        onKeyDown={e => handleFocusFirstSuggestion(e)}
      >
        <input
          placeholder="start typing"
          onChange={handleChange}
          value={val}
          ref={inputRef}
          onKeyDown={handleEscapeOrEnterKey}
        />
        {loading ? (
          <ElementLoader />
        ) : val === '' ? (
          <span onClick={handleUserLocation}>
            <Svg className="location-autocomplete__location-icon" icon="gps" />
          </span>
        ) : (
          <span onClick={handleClearAll}>
            <Svg
              className="location-autocomplete__location-icon"
              icon="close"
            />
          </span>
        )}
      </div>

      <Transition in={suggestions.length > 0} timeout={2000}>
        {state => (
          <div
            className={`location-autocomplete__suggestions`}
            ref={suggestionsRef}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion}${index}`}
                className="location-autocomplete__suggestions__suggestion"
                onClick={() => handleLocation(index)}
                data-key={index}
                tabIndex={index}
                ref={index === 0 && suggestionRef }
                onKeyDown={e=>handleEscapeOrEnterKey(e,index)}
              >
              {console.log('index', index)}
                {suggestion.place_name}
              </div>
            ))}
          </div>
        )}
      </Transition>
    </>
  );
};

export default LocationAutocomplete;
