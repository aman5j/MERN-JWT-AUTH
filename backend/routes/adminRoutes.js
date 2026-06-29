const express = require("express");
const router = express.Router();

const protectRoute = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const { getUsers } = require("../controllers/adminController");

router.get("/users", protectRoute, authorizeRoles("admin"), getUsers);

module.exports = router;