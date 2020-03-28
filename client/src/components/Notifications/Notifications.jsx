import React from 'react';
import Notification from 'components/Notification';

import { useMainContext } from 'containers/mainContext';

const Notifications = () => {
  const { notifications: {notifications} } = useMainContext();
  return (
    <>
      {notifications.length > 0 && notifications.map(notification => (
        <Notification key={notification.id} status={notification.status} text={notification.text} />
      ))}
    </>
  );
};

export default Notifications
