// import React from "react";
// import { Navigate } from "react-router-dom";

// // import { useAuth } from "../hooks/useAuth";

// function AdminRoute({children}) {

//     // const { user, loading } = useAuth();

//     // Read separated distinct storage identifiers
//     const adminToken = localStorage.getItem("adminToken");
//     const adminUser = JSON.parse(localStorage.getItem("adminUser"));

//     if(!adminToken || !adminUser || adminUser.role !== "admin") {
//         // Drop unauthorized entities straight into the distinct admin console authentication block
//         return <Navigate to="/admin/login" replace />;
//     }

//     return children;

// }

// export default AdminRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const AdminRoute = ({ children }) => {
//     const adminToken = localStorage.getItem("adminToken");
//     const adminUser = localStorage.getItem("adminUser");
//     const parsedUser = adminUser ? JSON.parse(adminUser) : null;

//     // 🔍 DEBUG LOGS
//     console.log("--- ADMIN ROUTE SHIELD CHECK ---");
//     console.log("Token Found:", adminToken);
//     console.log("User Object:", parsedUser);
//     console.log("User Role:", parsedUser?.role);

//     if (adminToken && parsedUser?.role === 'admin') {
//         console.log("Access Granted! Proceeding to Admin Dashboard.");
//         return children;
//     }

//     console.warn("Access Denied! Redirecting to /admin/login");
//     return <Navigate to="/admin/login" replace />;
// };

// export default AdminRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const adminToken = localStorage.getItem("adminToken");
    const adminUserStr = localStorage.getItem("adminUser");
    
    let parsedUser = null;
    try {
        parsedUser = adminUserStr ? JSON.parse(adminUserStr) : null;
    } catch (e) {
        console.error("Failed to parse admin user from localStorage:", e);
    }

    // 🔍 TESTING LIVE STATE
    console.log("--- SHIELD CHECKING ACCESS ---");
    console.log("Token Exists:", !!adminToken);
    console.log("User Data:", parsedUser);
    console.log("Role:", parsedUser?.role);

    // Loosened checking criteria to catch matches reliably
    if (adminToken && (parsedUser?.role === 'admin' || parsedUser?.role === 'ADMIN')) {
        console.log("ACCESS GRANTED.");
        return children;
    }

    console.warn("ACCESS DENIED. Bouncing to /admin/login");
    return <Navigate to="/admin/login" replace />;
};

export default AdminRoute;