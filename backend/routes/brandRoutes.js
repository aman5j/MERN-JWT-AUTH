const express = require("express");
const router = express.Router();
const { getBrands, createBrand } = require("../controllers/brandController");

router.get("/", getBrands);
router.post("/", createBrand);

module.exports = router;