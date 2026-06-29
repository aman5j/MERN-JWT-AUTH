import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'
import { success, error } from '../../utils/toast'
import { adminLogin } from '../../api/userApi'
import "./AdminLogin.css";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await adminLogin({ email, password });
        console.log("Full Login Response Data:", res.data);

        if (res.data && res.data.token) {
            // Write strictly to the admin storage channels
            localStorage.setItem("adminToken", res.data.token);
            localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

            success("Admin Authorization Confirmed");
            
            // Using setTimeout(..., 0) pushes navigation to the end of the execution queue,
            // allowing localStorage writes to completely finish first.
            setTimeout(() => {
                navigate("/admin");
            }, 50);
        } else {
            error("Invalid server response format.");
        }

    } catch (err) {
        console.error("Login component caught error:", err);
        error(err.response?.data?.message || "Admin validation parameters rejected.");
    }
};

//     const handleAdminLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await adminLogin({ email, password });
        
//         // ⚠️ CRITICAL: These MUST happen BEFORE navigate("/admin")
//         localStorage.setItem("adminToken", res.data.token);
//         localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

//         success("Admin Authorization Confirmed");
        
//         // Now it is safe to navigate
//         navigate("/admin"); 

//     } catch (err) {
//         console.error("Login failed:", err);
//         error(err.response?.data?.message || "Admin validation parameters rejected.");
//     }
// };

//     const handleAdminLogin = async (e) => {
//     e.preventDefault();

//     try {

//         // Now passing the object properly to the corrected API helper
//         const res = await adminLogin({ email, password });
//         console.log("Server response received:", res.data);

//         // UNCOMMENT THESE: Save token and data to local storage
//         localStorage.setItem("adminToken", res.data.token);
//         localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

//         success("Admin Authorization Confirmed");
//         navigate("/admin");
        
//         //FIX: Match the combined backend path (/api + /auth/ + admin/admin-login)
//         // const res = await API.post("/auth/admin/admin-login", { email, password });
//         // const res = await adminLogin({email, password});
//         // console.log(res);


//         // console.log("Server response received:", res.data);

//         // localStorage.setItem("adminToken", res.data.token);
//         // localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

//         success("Admin Authorization Confirmed");
//         navigate("/admin"); 

//     } catch (err) {
//         console.error("Login failed:", err);
//         error(err.response?.data?.message || "Admin validation parameters rejected.");
//     }
// }

    // 1. Make sure to accept 'e' as an argument here
// const handleAdminLogin = async (e) => {
//     e.preventDefault();

//     try {
//         console.log("handleAdminLogin called successfully!");
        
//         // 2. Updated endpoint to match your backend route structure (/auth/admin/admin-login)
//         const res = await API.post("/auth/admin/admin-login", { email, password });

//         console.log("Server response received:", res.data);

//         // Isolate context persistence from consumer level states
//         localStorage.setItem("adminToken", res.data.token);
//         localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

//         success("Admin Authorization Confirmed");
//         navigate("/admin"); // Redirects directly into the admin sub-tree index dashboard

//     } catch (err) { // 3. Changed this variable name to 'err' to match your catch block statement below
//         console.error("Login Error details:", err);
//         error(err.response?.data?.message || "Admin validation parameters rejected.");
//     }
// }

    // const handleAdminLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         console.log("handleAdminLogin called")
    //         const res = await API.post("/auth/admin-login", {email, password});

    //         // Isolate context persistence from consumer level states
    //         localStorage.setItem("adminToken", res.data.token);
    //         localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

    //         success("Admin Authorization Confirmed");
    //         navigate("/admin"); // Redirects directly into the admin sub-tree index dashboard

    //     } catch (err) {
    //         error(err.response?.data?.message || "Admin validation parameters rejected.");
    //     }
    // }

  return (
    <div className="admin-login-wrapper">
        <form onSubmit={handleAdminLogin} className="admin-login-card">
            <div className="admin-lock-banner">🛡️ SECURE ADMIN CONSOLE</div>
            <h2 className="admin-login-heading">Management Portal</h2>

            <input
                type="email"
                placeholder="Admin Identity Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-field"
                required
            />

            <input
                type="password"
                placeholder="Security Key Access Token"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-field"
                required
            />

            <button type="submit" className="admin-login-submit-btn">
                Verify System Clearance
            </button>
        </form>
    </div>
  )
}
