import API from "./axios";

// Read: Get all brands
export const getAllBrands = () => {
  return API.get("/brands");
};

// Create: Add a new brand
// `brandData` should be an object, e.g., { name: "New Brand" }
export const createBrand = (brandData) => {
  return API.post("/brands", brandData);
};

// Update: Edit an existing brand by ID
// `id` is the string ID, `updatedData` is the object, e.g., { name: "Updated Name" }
export const updateBrand = (id, updatedData) => {
  return API.put(`/brands/${id}`, updatedData);
};

// Delete: Remove a brand by ID
export const deleteBrand = (id) => {
  return API.delete(`/brands/${id}`);
};