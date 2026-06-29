const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
// const bcrypt = require("bcryptjs");

exports.adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Look up credentials strictly within the Admin collection
        const admin = await Admin.findOne({email})
        if(!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: "Invalid Administration Access Credentials." });
        }

        // Embed identity and explicit admin role parameters inside JWT payload
        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: "admin"
            }
        });

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}