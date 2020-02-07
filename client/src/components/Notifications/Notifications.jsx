import React, { useContext } from 'react';
import Notification from 'components/Notification';

import { MainContext } from 'containers/mainContext';

const Notifications = () => {
  const { notifications: {notifications} } = useContext(MainContext);
  return (
    <>
      {notifications.length > 0 && notifications.map(notification => (
        <Notification key={notification.id} status={notification.status} text={notification.text} />
      ))}
    </>
  );
};

export default Notifications
