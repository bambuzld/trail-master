import React, { useState } from "react";
import {TraceSpinner} from 'react-spinners-kit'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import './LocationAutocomplete.scss'


const style={
    backgroundColor: 'white'
}

const LocationAutocomplete = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({lat:null,lng:null });
  const handleChange = async value => {
      const result = await geocodeByAddress(value)
      console.log('result', result);
      const latLng = await getLatLng(result[0])
      console.log('latLng', latLng);
      setAddress(value)
      setCoordinates(latLng)
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleChange}
    >
      {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
        <div className="location-autocomplete" >
          <input {...getInputProps({ placeholder: "type me baby" })} />
          {loading && <div className="location-autocomplete__spinner" ><TraceSpinner size={25} frontColor="#A7A7A7" backColor="#EB6B2A"/></div>}
          <div className="location-autocomplete__suggestions">{
              suggestions.map(suggestion=><div className="location-autocomplete__suggestions__suggestion" {...getSuggestionItemProps(suggestion,{style})}>{console.log('suggestion', suggestion)}</div>)
              
          }</div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationAutocomplete;
