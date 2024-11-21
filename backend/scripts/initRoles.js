const mongoose = require('mongoose');
const Role = require('../models/Role');
require('dotenv').config();

const defaultRoles = [
  {
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: ['create', 'read', 'update', 'delete']
  },
  {
    name: 'Admin',
    description: 'Administrative access with limited permissions',
    permissions: ['create', 'read', 'update']
  },
  {
    name: 'Manager',
    description: 'Management level access',
    permissions: ['read', 'update']
  },
  {
    name: 'Editor',
    description: 'Content management access',
    permissions: ['read', 'update']
  },
  {
    name: 'Viewer',
    description: 'Read-only access',
    permissions: ['read']
  }
];

async function initializeRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create roles if they don't exist
    for (const role of defaultRoles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        await Role.create(role);
        console.log(`Created role: ${role.name}`);
      } else {
        console.log(`Role already exists: ${role.name}`);
      }
    }

    console.log('Roles initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing roles:', error);
    process.exit(1);
  }
}

initializeRoles(); 