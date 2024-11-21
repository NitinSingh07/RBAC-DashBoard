const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('roleId');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Create user
router.post("/", async (req, res) => {
  try {
    console.log('Received user data:', req.body);
    const { username, email, password, roleId, isActive } = req.body;

    // Validation
    if (!username || !email || !password || !roleId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username or email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      roleId,
      isActive: isActive ?? true
    });

    const savedUser = await user.save();
    
    // Return user without password
    const userResponse = await User.findById(savedUser._id)
      .select('-password')
      .populate('roleId');

    res.status(201).json(userResponse);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ 
      message: 'Error creating user',
      error: err.message 
    });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { username, email, password, roleId, isActive } = req.body;
    const updateData = { username, email, roleId, isActive };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .select("-password")
      .populate("roleId");

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
