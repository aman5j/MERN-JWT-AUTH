const express = require("express");
const router = express.Router();
const { submitOrder, getAllOrders, getRevenueStats } = require("../controllers/orderController");
const protectRoute  = require("../middleware/authMiddleware"); // Replace with your actual auth middleware file path

// Protect ensures req.user is populated before hitting controller methods
router.post("/userinterface/order_submit", protectRoute,  submitOrder);

// Fetch all orders for management dashboard
// router.get("/orders", protectRoute, getAllOrders);
router.get("/orders", getAllOrders);

// router.get("/orders/revenue", protectRoute, getRevenueStats);
router.get("/orders/revenue", getRevenueStats);

module.exports = router;