require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/roles', require('./routes/roles'));

// You can add this to your backend/server.js temporarily to create a default role
const Role = require('./models/Role');

async function createDefaultRole() {
  try {
    const existingRole = await Role.findOne({ name: 'User' });
    if (!existingRole) {
      await Role.create({
        name: 'User',
        description: 'Default user role',
        permissions: ['read']
      });
      console.log('Default role created');
    }
  } catch (error) {
    console.error('Error creating default role:', error);
  }
}

// Call this after MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    createDefaultRole();
  })
  .catch(err => console.error('Could not connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 