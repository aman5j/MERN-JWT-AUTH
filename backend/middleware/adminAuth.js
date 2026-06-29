const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protectAdminRoute = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. Secure admin token missing." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "admin") {
            return res.status(403).json({ message: "Access Forbidden. Not an authorized administrator Account." });
        }

        req.admin = await Admin.findById(decoded.id).select("-password");
        if(!req.admin) {
            return res.status(401).json({ message: "Admin context profile verification missing from records." });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Session expired or admin authorization token invalid." });
    }
}

module.exports = protectAdminRoute;