const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Adjust path to your file
const { getBanners, createBanner } = require("../controllers/bannerController");

router.get("/", getBanners);
router.post("/", upload.single("image"), createBanner); // Using multer middleware

module.exports = router;