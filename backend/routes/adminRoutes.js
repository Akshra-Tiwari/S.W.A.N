const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");

const {
  getAllUsers,
  updateUserRole,
  getAdminStats,
  getAllReports,
  deleteUser
} = require("../controllers/adminController");

// Get all users
router.get(
  "/users",
  authMiddleware,
  requireRole("admin"),
  getAllUsers
);

// Get admin stats
router.get(
  "/stats",
  authMiddleware,
  requireRole("admin"),
  getAdminStats
);

// Get all reports
router.get(
  "/reports",
  authMiddleware,
  requireRole("admin"),
  getAllReports
);

// Delete user
router.delete(
  "/users/:id",
  authMiddleware,
  requireRole("admin"),
  deleteUser
);

// Update user role
router.put(
  "/users/:id/role",
  authMiddleware,
  requireRole("admin"),
  updateUserRole
);

module.exports = router;