import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userApi = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
    return true;
  },
};

export const roleApi = {
  getRoles: async () => {
    const response = await api.get('/roles');
    return response.data;
  },

  createRole: async (roleData) => {
    const response = await api.post('/roles', roleData);
    return response.data;
  },

  updateRole: async (id, roleData) => {
    const response = await api.put(`/roles/${id}`, roleData);
    return response.data;
  },

  deleteRole: async (id) => {
    await api.delete(`/roles/${id}`);
    return true;
  },
}; 