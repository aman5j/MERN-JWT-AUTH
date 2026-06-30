import axios from "axios";

// export const API_BASE_URL = "https://mern-jwt-auth-zjbj.onrender.com/api";
export const API_BASE_URL = "http://localhost:5000/api";

const API = axios.create({
    // baseURL: "http://localhost:5000/api"
    baseURL: API_BASE_URL
});


// Request Interceptor
// API.interceptors.request.use(

//     (config) => {

//         const token = localStorage.getItem("token");

//         if(token) {
//             config.headers.Authorization = 
//             `Bearer ${token}`;
//         }

//         return config;
//     },

//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Request Interceptor
API.interceptors.request.use(
    (config) => {
        // It checks for "token", but never looks for "adminToken"!
        const token = localStorage.getItem("token");
        const adminToken = localStorage.getItem("adminToken");

        // If it's an admin request, send the admin token!
        if (config.url.includes("/admin") && adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`;
        } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
// API.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Check if the current URL or requested URL contains "admin"
//             const isAdminRoute = window.location.pathname.includes("/admin") || 
//                                  error.config.url.includes("/admin");

//             if (isAdminRoute) {
//                 localStorage.removeItem("adminToken");
//                 localStorage.removeItem("adminUser");
//                 window.location.href = "/admin/login"; // Redirect to admin login panel
//             } else {
//                 localStorage.removeItem("token");
//                 window.location.href = "/login";       // Redirect to consumer login panel
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// Response Interceptor
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const isAdminRoute = window.location.pathname.includes("/admin") || 
                                 error.config.url.includes("/admin");

            console.error("🛑 INTERCEPTOR CAUGHT A 401 ERROR! Details:", {
                isAdminRoute,
                url: error.config.url,
                currentPath: window.location.pathname
            });

            if (isAdminRoute) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");
                // 🛑 COMMENT THIS OUT TEMPORARILY SO LOGS DON'T DISAPPEAR:
                window.location.href = "/admin/login"; 
            } else {
                localStorage.removeItem("token");
                // 🛑 COMMENT THIS OUT TEMPORARILY SO LOGS DON'T DISAPPEAR:
                window.location.href = "/login";       
            }
        }

        return Promise.reject(error);
    }
);

export default API;