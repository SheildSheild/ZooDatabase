import React, { useState } from 'react';
import NotificationComponent from './notificationComponent.js';

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div>
      <button onClick={() => setShowNotifications(!showNotifications)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'inherit', cursor: 'pointer', fontSize: '24px' }}>
        🔔
      </button>
      {showNotifications && <NotificationComponent />}
    </div>
  );
}
