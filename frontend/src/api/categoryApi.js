import API from "./axios";

// Get all categories
export const getAllCategories = () => API.get("/categories");

// Create a new category
export const createCategory = (data) => API.post("/categories", data);

// Update an existing category
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);

// Delete a category
export const deleteCategory = (id) => API.delete(`/categories/${id}`);