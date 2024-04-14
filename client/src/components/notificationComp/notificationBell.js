import React, { useState } from 'react';
import NotificationComponent from './notificationComponent.js';

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div>
      <button onClick={() => setShowNotifications(!showNotifications)}>
        🔔
      </button>
      {showNotifications && <NotificationComponent />}
    </div>
  );
}
