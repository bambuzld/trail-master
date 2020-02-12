
export const actions = {
    "SET_USER_POSITION": "SET_USER_POSITION",
    "SET_CHOSEN_POSITION": "SET_CHOSEN_POSITION",
    "SET_CHOSEN_LOCATION_DATA": "SET_CHOSEN_LOCATION_DATA",
    "UPDATE_DRAFT_PINT": "UPDATE_DRAFT_PINT",
    "GET_PINS": "GET_PINS",
    "SET_TRAIL_PATH": "SET_TRAIL_PATH",
}


export default function reducer(state, { type, payload }) {
    switch (type) {
      case "SET_USER_POSITION":
        return {
          ...state,
          userPosition: payload
        };
      case "SET_CHOSEN_POSITION":
        return {
          ...state,
          chosenPosition: payload
        };
      case "SET_CHOSEN_LOCATION_DATA":
        return {
          ...state,
          chosenLocationData: payload
        };
        
      case "UPDATE_DRAFT_PIN":
        return {
          ...state,
          draftPin: payload
        };
      case "SET_TRAIL_PATH":
        return {
          ...state,
          trailPath: payload
        };
      case "GET_PINS":
        return {
          ...state,
          pins: payload 
        };
        
      default:
        return state;
    }
  }
  

export const key="map"