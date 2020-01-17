
export const actions = {
    "LOGIN_USER": "LOGIN_USER",
    "IS_LOGGED_IN": "IS_LOGGED_IN",
    "LOGOUT_USER": "LOGOUT_USER",
}


export default function reducer(state, { type, payload }) {
    switch (type) {
      case "LOGIN_USER":
        return {
          ...state,
          currentUser: payload
        };
      case "IS_LOGGED_IN":
        return {
          ...state,
          isAuth: payload
        };
      case "LOGOUT_USER":
        return {
          ...state,
          currentUser: null,
          isAuth: false
        };
  
      default:
        return state;
    }
  }
  

export const key="user"