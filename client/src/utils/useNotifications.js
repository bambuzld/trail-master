import React, { useContext, useState, useEffect } from 'react';

import { MainContext } from 'containers/mainContext';

export const useNotification = () => {
  const { notifications: {notifications}, dispatch } = useContext(MainContext);
  const [payload, setPayload] = useState(null);
  console.log('payload', payload);
  const addNotification = pl => {
    console.log(pl);
    setPayload(pl);
  };

  useEffect(() => {
    if (payload) {
      console.log('payload', payload);
      console.log('uslo');
      const updatedPayload = {
        id: `${payload.status}${payload.text}`,
        ...payload
      };
      console.log('updatedPayload', updatedPayload);
      dispatch({ type: 'ADD_NOTIFICATION', payload: updatedPayload });
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
