import API from "./axios";

// Get all users (Read)
export const getUsers = () => {
    return API.get("/auth");
};

// Update a user by ID (Update)
export const updateUser = (id, data) => {
    return API.put(`/auth/${id}`, data);
};

// Delete a user by ID (Delete)
export const deleteUser = (id) => {
    return API.delete(`/auth/${id}`);
};

//Admin Login API
export const adminLogin = (credentials) => {
    return API.post(`/auth/admin/admin-login`, credentials);
}