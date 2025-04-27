import React from "react";
import { Fragment } from "react";
import { format } from "date-fns";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNotification } from "../context/NotificationContext";

const notificationIcons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationCircleIcon,
};

function NotificationPanel() {
  const {
    notifications,
    unreadCount,
    isNotificationPanelOpen,
    setIsNotificationPanelOpen,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotification();

  if (!isNotificationPanelOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg
                    ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Notifications
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={markAllAsRead}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              Mark all as read
            </button>
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type] || BellIcon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                    ${notification.isRead ? "opacity-75" : ""}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon
                        className={`h-6 w-6 ${
                          notification.isRead
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-indigo-600 dark:text-indigo-400"
                        }`}
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {notification.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex space-x-4">
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 
                                   hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          Mark as read
                        </button>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {format(
                            new Date(notification.timestamp),
                            "MMM d, h:mm a"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="rounded hover:bg-gray-100 dark:hover:bg-gray-700 p-1"
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationPanel;
