import React, { useState, useRef, useEffect } from 'react';
import Svg from 'components/Svg';
import axios from 'axios';
import { useFetch , useFocus, usePosition} from 'utils/Hooks';
import Transition from 'react-transition-group/Transition';

import {KeyCodes} from 'constants/keyCodes'

import ElementLoader from 'components/ElementLoader';

import './LocationAutocomplete.scss';

const acces_token =
'pk.eyJ1IjoiaXZvc2lza28iLCJhIjoiY2s1d3U4bThrMWlpZzNubG90cHU0aWxlaCJ9.YD76pxTHCas9GFDFsYv0dw';

//TODO: Code quality, code split & cleanup
//TODO: x icon to clear the location text input

const LocationAutocomplete = () => {
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inside, setInside] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [suggestionRef, setFocus] = useFocus();
  const [val, setVal] = useState('');

  useEffect(() => {
    handleFocusChange();   
    if(inputRef){
      inputRef.current.focus()
    }// change location using arrow keys  
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    setInside(false)
    
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  const handleEscapeKey = e => {
    if (e.keyCode === KeyCodes.ESCAPE) {
      setSuggestions([]);
      setVal('')
    }
  };

  const handleFocusFirstSuggestion = e => {
    if (e.keyCode === KeyCodes.ARROW_DOWN && inside===false) {
      setInside(true)
      setFocus();
    }
  };
  //navigate trough list with arrow keys
  const handleFocusChange = () => {
    if (suggestionsRef !== null) {
      suggestionsRef.current.addEventListener('keydown', e => {
        const active = document.activeElement;
        if (e.keyCode === KeyCodes.ARROW_DOWN && active.nextSibling) {
          active.nextSibling.focus();
        }
        if (e.keyCode === KeyCodes.ARROW_UP && active.previousSibling) {
          active.previousSibling.focus();
        }
      });
    }
  };

  const handleChange = async value => {
    setVal(value.target.value);
    const searchString = value.target.value;
    try {
      const results = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=pk.eyJ1IjoiaXZvc2lza28iLCJhIjoiY2s1d3U4bThrMWlpZzNubG90cHU0aWxlaCJ9.YD76pxTHCas9GFDFsYv0dw`
      );
      console.log('result', results);
      setSuggestions(results.data.features);
    } catch (error) {
      setSuggestions([]);
      console.error(error);
    }
    // setCoordinates(latLng);
  };

  const handleClearAll = () => {
    setVal('');
  };

  const handleLocation = index => {
    const chosenLocation = suggestions[index];
    setCoordinates({
      lat: chosenLocation.center[0],
      lng: chosenLocation.center[1]
    });
  };
  const { latitude, longitude, error } = usePosition(true);

  const handleUserLocation = () => {};

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
          onKeyDown={handleEscapeKey}
        />
        {loading ? (
          <ElementLoader />
        ) : val === '' ? (
          <Svg
            className="location-autocomplete__location-icon"
            icon="gps"
            onClick={() => handleUserLocation}
          />
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
                ref={index === 0 && suggestionRef}
                onKeyDown={handleEscapeKey}
              >
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
