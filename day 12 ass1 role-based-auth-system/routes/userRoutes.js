const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all users (admins only)
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

// Get a specific user by ID (admins only)
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getUserById);

// Update user details (admins only)
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateUser);

// Delete a user (admins only)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

module.exports = router;
