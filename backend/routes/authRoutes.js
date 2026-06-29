const express = require("express");
const router = express.Router();

const {register, login, getUsers, updateUser, deleteUser} = require("../controllers/authController");
const { adminLogin } = require("../controllers/adminAuthController");

router.post("/register", register);
router.post("/login", login);

// Base CRUD Routes
router.get("/", getUsers);

router.route("/:id")
    .put(updateUser)
    .delete(deleteUser);


router.post("/admin/admin-login", adminLogin);

module.exports = router;