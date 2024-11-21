import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export function RolesView() {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      console.log('Fetching roles...');
      const response = await axios.get('http://localhost:5000/api/roles');
      console.log('Roles data:', response.data);
      setRoles(response.data);
    } catch (error) {
      console.error('Failed to load roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await axios.delete(`http://localhost:5000/api/roles/${id}`);
        await loadRoles();
      } catch (error) {
        console.error('Failed to delete role:', error);
        alert('Failed to delete role. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (roles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Roles</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add Role
          </button>
        </div>
        <p className="text-gray-500">No roles found. Click "Add Role" to create one.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Roles</h2>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSelectedRole(null);
              setIsModalOpen(true);
            }}
          >
            Add Role
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role._id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {role.name}
                </td>
                <td className="px-6 py-4">
                  {role.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          {
                            create: 'bg-green-100 text-green-800',
                            read: 'bg-blue-100 text-blue-800',
                            update: 'bg-yellow-100 text-yellow-800',
                            delete: 'bg-red-100 text-red-800'
                          }[permission]
                        }`}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => {
                      setSelectedRole(role);
                      setIsModalOpen(true);
                    }}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(role._id)}
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
        <RoleModal 
          role={selectedRole}
          onClose={() => setIsModalOpen(false)}
          onSave={async (roleData) => {
            try {
              if (selectedRole) {
                await axios.put(`http://localhost:5000/api/roles/${selectedRole._id}`, roleData);
              } else {
                await axios.post('http://localhost:5000/api/roles', roleData);
              }
              await loadRoles();
              setIsModalOpen(false);
            } catch (error) {
              console.error('Failed to save role:', error);
              alert('Failed to save role. Please try again.');
            }
          }}
        />
      )}
    </div>
  );
}

function RoleModal({ role, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  });

  const availablePermissions = ['create', 'read', 'update', 'delete'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">
          {role ? 'Edit Role' : 'Add Role'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={formData.permissions.includes(permission)}
                    onChange={(e) => {
                      const newPermissions = e.target.checked
                        ? [...formData.permissions, permission]
                        : formData.permissions.filter(p => p !== permission);
                      setFormData({ ...formData, permissions: newPermissions });
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 