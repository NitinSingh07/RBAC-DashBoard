const router = require("express").Router();
const Role = require("../models/Role");

// Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    console.log('Fetched roles:', roles);
    res.json(roles);
  } catch (err) {
    console.error('Error fetching roles:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create role
router.post("/", async (req, res) => {
  try {
    const role = new Role({
      name: req.body.name,
      description: req.body.description,
      permissions: req.body.permissions,
    });

    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update role
router.put("/:id", async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions,
      },
      { new: true }
    );
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete role
router.delete("/:id", async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
