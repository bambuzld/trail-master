export const actions = {
    "ADD_NOTIFICATION": "ADD_NOTIFICATION",
    "REMOVE_NOTIFICATION": "REMOVE_NOTIFICATION"
}

export default function reducer(state, { type, payload }) {
    switch (type) {
      case "ADD_NOTIFICATION":
        return {
          ...state,
          notifications: [...state.notifications,payload]
        };
      case "REMOVE_NOTIFICATION":
        return {
          ...state,
          notifications: state.notifications.filter(notification=>notification.id !== payload)
        };
      
  
      default:
        return state;
    }
  }
  

export const key="notifications"