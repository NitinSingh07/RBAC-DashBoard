import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../hooks/useDarkMode";
import { useNotifications } from "../context/NotificationContext";
import { NotificationPanel } from "./NotificationPanel";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: ChartBarIcon,
    badge: { text: "New", color: "bg-green-100 text-green-800" },
  },
  {
    name: "Users",
    path: "/users",
    icon: UserIcon,
  },
  {
    name: "Roles",
    path: "/roles",
    icon: ShieldCheckIcon,
  },
];

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const location = useLocation();
  const { 
    unreadCount, 
    isNotificationPanelOpen, 
    setIsNotificationPanelOpen 
  } = useNotifications();
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false);
  const { addNotification } = useNotifications();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const NotificationButton = () => (
    <div className="relative">
      <button
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                   transition-colors duration-200"
        onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
      >
        <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>
      <NotificationPanel />
    </div>
  );

  const SidebarNotificationButton = () => (
    <button
      className="flex flex-col items-center justify-center p-2 rounded-xl
                 hover:bg-white/80 dark:hover:bg-gray-800/80
                 transition-all duration-300 ease-in-out
                 hover:shadow-md dark:hover:shadow-indigo-500/10"
      onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
    >
      <div className="relative">
        <BellIcon className="h-5 w-5 text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>
      <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Notifications {unreadCount > 0 && `(${unreadCount})`}
      </span>
    </button>
  );

  const SendNotificationModal = () => {
    const [notificationData, setNotificationData] = useState({
      title: '',
      message: '',
      type: 'info'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      addNotification(notificationData);
      setIsSendNotificationOpen(false);
      // Clear form
      setNotificationData({ title: '', message: '', type: 'info' });
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
            Send Notification
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                         dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 
                         focus:ring-indigo-500"
                value={notificationData.type}
                onChange={(e) => setNotificationData({ 
                  ...notificationData, 
                  type: e.target.value 
                })}
              >
                <option value="info">Information</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                         dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 
                         focus:ring-indigo-500"
                value={notificationData.title}
                onChange={(e) => setNotificationData({ 
                  ...notificationData, 
                  title: e.target.value 
                })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                         dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 
                         focus:ring-indigo-500"
                value={notificationData.message}
                onChange={(e) => setNotificationData({ 
                  ...notificationData, 
                  message: e.target.value 
                })}
                rows="3"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                         bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                         rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-indigo-500"
                onClick={() => setIsSendNotificationOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 
                         hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const SendNotificationButton = () => (
    <button
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-colors duration-200"
      onClick={() => setIsSendNotificationOpen(true)}
      title="Send Notification"
    >
      <PaperAirplaneIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
    </button>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ease-in-out ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      {/* Mobile sidebar backdrop - improved blur */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/70 backdrop-blur-md z-40 lg:hidden
                     transition-all duration-300 ease-in-out animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - enhanced gradients and shadows */}
      <div
        className={`
        fixed top-0 left-0 bottom-0 w-72 
        bg-white dark:bg-gray-900/95
        shadow-2xl dark:shadow-indigo-500/10
        z-50 transform transition-all duration-300 ease-in-out
        lg:translate-x-0 backdrop-blur-lg
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        border-r border-gray-200/50 dark:border-gray-700/50
      `}
      >
        {/* Sidebar header - improved gradient */}
        <div
          className="h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
                      dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900
                      bg-[length:200%_100%] animate-gradient
                      flex items-center justify-between px-6"
        >
          <div className="flex items-center space-x-3">
            <div
              className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center
                          backdrop-blur-md shadow-lg shadow-black/10"
            >
              <ShieldCheckIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              RBAC
            </span>
          </div>
          <button
            className="lg:hidden p-1 rounded-md hover:bg-white/20 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Search bar - improved styling */}
        <div className="px-4 py-3">
          <div className="relative group">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2
                                        group-focus-within:text-indigo-500 transition-colors duration-200"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200/50
                       dark:border-gray-700/50 dark:bg-gray-800/50
                       dark:text-gray-300 dark:placeholder-gray-500
                       focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent
                       transition-all duration-200 backdrop-blur-sm
                       hover:bg-gray-50 dark:hover:bg-gray-800/70"
            />
          </div>
        </div>

        {/* Navigation - improved active states and hover effects */}
        <nav className="p-4 space-y-1.5">
          {navigation.map((item) => {
            const active = isActivePath(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group flex items-center justify-between px-4 py-3 text-sm font-medium
                  rounded-xl transition-all duration-300 ease-in-out
                  hover:shadow-md dark:hover:shadow-indigo-500/10
                  ${
                    active
                      ? "bg-gradient-to-r from-indigo-50/90 to-purple-50/90 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-indigo-400 shadow-lg dark:shadow-indigo-500/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50/90 dark:hover:bg-gray-800/90"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`
                    h-5 w-5 mr-3 transition-colors duration-200
                    ${
                      active
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                    }
                  `}
                  />
                  {item.name}
                </div>
                {item.badge && (
                  <span
                    className={`
                    px-2.5 py-0.5 text-xs font-medium rounded-full
                    ${item.badge.color}
                  `}
                  >
                    {item.badge.text}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section - improved card effect */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 dark:border-gray-700/50
                      bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-md"
        >
          <div
            className="flex items-center px-4 py-3 rounded-xl 
                        hover:bg-white/80 dark:hover:bg-gray-800/80
                        transition-all duration-300 ease-in-out cursor-pointer
                        hover:shadow-lg dark:hover:shadow-indigo-500/10"
          >
            <div className="relative">
              <UserCircleIcon className="h-10 w-10 text-gray-400" />
              <div
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 
                            ring-2 ring-white dark:ring-gray-900"
              ></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@example.com
              </p>
            </div>
          </div>
          {/* Quick actions - improved hover effects */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              className="flex flex-col items-center justify-center p-2 rounded-xl
                           hover:bg-white/80 dark:hover:bg-gray-800/80
                           transition-all duration-300 ease-in-out
                           hover:shadow-md dark:hover:shadow-indigo-500/10"
            >
              <CogIcon className="h-5 w-5 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Settings
              </span>
            </button>
            <SidebarNotificationButton />
            <button
              className="flex flex-col items-center justify-center p-2 rounded-xl
                           hover:bg-white/80 dark:hover:bg-gray-800/80
                           transition-all duration-300 ease-in-out
                           hover:shadow-md dark:hover:shadow-indigo-500/10"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-72 transition-all duration-300 ease-in-out">
        {/* Top bar - improved blur effect */}
        <header
          className={`
          fixed top-0 right-0 left-0 lg:left-72 z-30
          transition-all duration-300 ease-in-out
          ${
            scrolled
              ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg dark:shadow-indigo-500/10"
              : "bg-white dark:bg-gray-900"
          }
        `}
        >
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden
                         transition-colors duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Breadcrumb */}
              <nav className="hidden sm:flex items-center space-x-2 ml-4">
                <span className="text-gray-500 dark:text-gray-400">Admin</span>
                <span className="text-gray-400 dark:text-gray-600">/</span>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {navigation.find((item) => isActivePath(item.path))?.name ||
                    "Dashboard"}
                </span>
              </nav>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              <SendNotificationButton />
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                         transition-colors duration-200"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              <NotificationButton />

              {/* Profile dropdown */}
              <button
                className="hidden sm:flex items-center px-3 py-2 rounded-lg
                              hover:bg-gray-100 dark:hover:bg-gray-800
                              transition-colors duration-200"
              >
                <UserCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Main content - improved background */}
        <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
        </main>

        {/* Footer - improved styling */}
        <footer
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                        border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 RBAC Admin. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200
                                   transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200
                                   transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {isSendNotificationOpen && <SendNotificationModal />}
    </div>
  );
}
