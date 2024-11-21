const mongoose = require('mongoose');
const Role = require('./models/Role');
require('dotenv').config();

const defaultRoles = [
  {
    name: 'Admin',
    description: 'Full system access',
    permissions: ['create', 'read', 'update', 'delete']
  },
  {
    name: 'User',
    description: 'Basic user access',
    permissions: ['read']
  },
  {
    name: 'Manager',
    description: 'Management access',
    permissions: ['create', 'read', 'update']
  }
];

async function initRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const roleData of defaultRoles) {
      const existingRole = await Role.findOne({ name: roleData.name });
      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Created role: ${roleData.name}`);
      } else {
        console.log(`Role already exists: ${roleData.name}`);
      }
    }

    console.log('Roles initialization completed');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

initRoles(); 