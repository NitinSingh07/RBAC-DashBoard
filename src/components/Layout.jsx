import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  MoonIcon
} from '@heroicons/react/24/outline';
import { useDarkMode } from '../hooks/useDarkMode';

const navigation = [
  { 
    name: 'Dashboard', 
    path: '/', 
    icon: ChartBarIcon,
    badge: { text: 'New', color: 'bg-green-100 text-green-800' }
  },
  { 
    name: 'Users', 
    path: '/users', 
    icon: UserIcon
  },
  { 
    name: 'Roles', 
    path: '/roles', 
    icon: ShieldCheckIcon
  },
];

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden
                     transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-900
        shadow-xl z-50 transform transition-all duration-300 ease-in-out
        lg:translate-x-0 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-gray-200 dark:border-gray-800
      `}>
        {/* Sidebar header with gradient */}
        <div className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600
                      flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
              <ShieldCheckIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">RBAC </span>
          </div>
          <button 
            className="lg:hidden p-1 rounded-md hover:bg-white/20 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 py-3">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const active = isActivePath(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group flex items-center justify-between px-4 py-3 text-sm font-medium
                  rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className={`
                    h-5 w-5 mr-3 transition-colors duration-200
                    ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}
                  `} />
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`
                    px-2.5 py-0.5 text-xs font-medium rounded-full
                    ${item.badge.color}
                  `}>
                    {item.badge.text}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800
                      bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center px-4 py-3 rounded-xl hover:bg-white dark:hover:bg-gray-800
                        transition-colors duration-200 cursor-pointer">
            <div className="relative">
              <UserCircleIcon className="h-10 w-10 text-gray-400" />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 
                            ring-2 ring-white dark:ring-gray-900"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center p-2 rounded-lg
                           hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
              <CogIcon className="h-5 w-5 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Settings</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg
                           hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
              <BellIcon className="h-5 w-5 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Notifications</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg
                           hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className={`
          fixed top-0 right-0 left-0 lg:left-72 z-30
          transition-all duration-200
          ${scrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md' 
            : 'bg-white dark:bg-gray-900'}
        `}>
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
                  {navigation.find(item => isActivePath(item.path))?.name || 'Dashboard'}
                </span>
              </nav>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                         transition-colors duration-200 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                              transition-colors duration-200">
                <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Profile dropdown */}
              <button className="hidden sm:flex items-center px-3 py-2 rounded-lg
                              hover:bg-gray-100 dark:hover:bg-gray-800
                              transition-colors duration-200">
                <UserCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Profile</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 RBAC Admin. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200
                                   transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200
                                   transition-colors duration-200">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}