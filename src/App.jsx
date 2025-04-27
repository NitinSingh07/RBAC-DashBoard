import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UsersView from "./views/UsersView";
import RolesView from "./views/RolesView";
import BlogView from "./views/BlogView";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

// Simple Dashboard component
const Dashboard = () => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
      Dashboard
    </h1>
    <p className="text-gray-600 dark:text-gray-300">
      Welcome to the RBAC Admin Dashboard
    </p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <UsersView />
                </ProtectedRoute>
              }
            />
            <Route
              path="roles"
              element={
                <ProtectedRoute>
                  <RolesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="blog"
              element={
                <ProtectedRoute>
                  <BlogView />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
