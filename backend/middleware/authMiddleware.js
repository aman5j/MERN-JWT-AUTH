const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectRoute = async(req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        // Now decoded becomes like this 
        // {
        //     id:"65abc",
        //     role:"admin",
        //     iat:123456,
        //     exp:123999
        // }

        req.user = await User.findById(decoded.id)
        .select("-password");

        next();

    } catch(error) {
        return res.status(401).json({
            message: "Not authorized"
        });
    }
};

//Gate 2: Verify role privileges
// exports.isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === "admin") {
//         next(); // Authorization approved, move forward to controller logic
//     } else {
//         res.status(403).json({ message: "Access Denied. Admin privileges required." });
//     }
// };

module.exports = protectRoute;
// module.exports = {
//     protectRoute
// };