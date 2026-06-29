const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
// const {isAdmin, protectRoute} = require("../middleware/authMiddleware");

const { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProducts
}  = require("../controllers/productController");

router.route("/")
.get(getProducts)
.post(upload.array("images", 5), createProduct)

router.route("/:id")
.get(getProductById)
.put(upload.array("images", 5), updateProduct)
.delete(deleteProducts)

module.exports = router;