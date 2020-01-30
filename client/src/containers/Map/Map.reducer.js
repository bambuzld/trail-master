
export const actions = {
    "SET_USER_POSITION": "SET_USER_POSITION",
    "SET_CHOSEN_POSITION": "SET_CHOSEN_POSITION",
}


export default function reducer(state, { type, payload }) {
    console.log('payload', payload);
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
  
      default:
        return state;
    }
  }
  

export const key="map"