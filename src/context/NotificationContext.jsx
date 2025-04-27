import React, { createContext, useContext, useState, useCallback } from "react";

// Create the context
const NotificationContext = createContext(undefined);

// Create the provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        timestamp: new Date(),
        isRead: false,
        ...notification,
      },
      ...prev,
    ]);
  }, []);

  const markAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  }, []);

  const deleteNotification = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const hideNotification = () => {
    setNotification({ message: "", type: "" });
  };

  const value = {
    notifications,
    unreadCount,
    isNotificationPanelOpen,
    setIsNotificationPanelOpen,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    notification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Create the custom hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export default NotificationProvider;
