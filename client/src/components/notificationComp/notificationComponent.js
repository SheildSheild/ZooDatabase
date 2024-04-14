import React, { useEffect, useState } from 'react';

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch('/api/notifications', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Check if response is ok
        }
        const data = await response.json();
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        // Handle errors here, e.g., set error message state and display in UI
      }
    }

    fetchNotifications();
  }, []);

  return (
    <div className="notification-dropdown">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">
          {notification.message}
        </div>
      ))}
    </div>
  );
}

export default NotificationComponent;
