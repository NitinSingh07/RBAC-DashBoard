import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (login(email, password)) {
        navigate('/');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900 bg-[size:20px_20px] opacity-5"></div>
      
      <div className="relative sm:max-w-xl mx-auto w-full px-4">
        {/* Login Container */}
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
            <div className="relative flex flex-col items-center">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <ShieldCheckIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign in to access your dashboard
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-4">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <p className="text-sm text-center text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           dark:text-white text-sm transition-colors duration-200"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           dark:text-white text-sm transition-colors duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 
                         rounded-lg hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 
                         focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-medium">
                Demo Credentials
              </p>
              <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                <p>Email: nitinthakur4406@gmail.com</p>
                <p>Password: nitin@123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 RBAC Admin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
} 