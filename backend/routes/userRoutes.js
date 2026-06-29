const express = require("express");
const router = express.Router();

const protectRoute = require("../middleware/authMiddleware");

const { profile, getMe } = require("../controllers/userController");

router.get("/profile", protectRoute, profile);

router.get("/me", protectRoute, getMe);

module.exports = router;


