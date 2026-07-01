const express = require("express");
const router = express.Router();
const { getBrands, createBrand, updateBrand, deleteBrand } = require("../controllers/brandController");

router.get("/", getBrands);
router.post("/", createBrand);
router.put("/:id", updateBrand);  // PUT /api/brands/12345
router.delete("/:id", deleteBrand);  // DELETE /api/brands/12345

module.exports = router;