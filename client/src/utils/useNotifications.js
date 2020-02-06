import React, { useContext, useState, useEffect, useCallback } from 'react';

import { MainContext } from 'containers/mainContext';

export const useNotification = () => {
  const { notifications: {notifications}, dispatch } = useContext(MainContext);
  const [payload, setPayload] = useState(null);
  const addNotification = useCallback(pl => {
    setPayload(pl);
  },[payload]);

  useEffect(() => {
    if (payload!==null) {
      const updatedPayload = {
        id: `${payload.status}${payload.text}`,
        ...payload
      };
      if (payload !== null) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: updatedPayload
        });
      }
      if (notifications.length > 0) {
        setTimeout(() => {
          const id = `${payload.status}${payload.text}`;
          dispatch({ type: 'REMOVE_NOTIFICATION', id });
        }, payload.duration);
      }
    }
  }, [payload]);

  return [payload, addNotification];
};
