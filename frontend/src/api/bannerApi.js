import API from "./axios";

// Read: Get all banners
export const getAllBanners = () => {
  return API.get("/banners");
};

// Create: Add a new banner (pass a FormData object as `data`)
export const createBanner = (data) => {
  return API.post("/banners", data);
};

// Update: Edit an existing banner by ID (pass a FormData object as `data`)
export const updateBanner = (id, data) => {
  return API.put(`/banners/${id}`, data);
};

// Delete: Remove a banner by ID
export const deleteBanner = (id) => {
  return API.delete(`/banners/${id}`);
};