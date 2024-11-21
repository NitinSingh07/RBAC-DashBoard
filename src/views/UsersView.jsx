import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useNotifications } from "../context/NotificationContext";

export function UsersView() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users'),
        axios.get('http://localhost:5000/api/roles')
      ]);
      console.log('Users:', usersRes.data);
      console.log('Roles:', rolesRes.data);
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      console.log('Saving user data:', userData);
      if (selectedUser) {
        const response = await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, userData);
        console.log('Updated user:', response.data);
      } else {
        const response = await axios.post('http://localhost:5000/api/users', userData);
        console.log('Created user:', response.data);
      }
      await loadData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save user:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to save user. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        await loadData();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Users</h2>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
          >
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.roleId?.name || 'No Role'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(user._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UserModal 
          user={selectedUser}
          roles={roles}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}

function UserModal({ user, roles, onClose, onSave }) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '', // Required for new users
    roleId: user?.roleId?._id || roles[0]?._id || '',
    isActive: user?.isActive ?? true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">
          {user ? 'Edit User' : 'Add User'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {!user && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!user}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.roleId}
              onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
              required
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
