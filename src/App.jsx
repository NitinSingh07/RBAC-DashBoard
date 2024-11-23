import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UsersView } from './views/UsersView';
import { RolesView } from './views/RolesView';
import { useAuth } from './context/AuthContext';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<UsersView />} />
                  <Route path="roles" element={<RolesView />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
