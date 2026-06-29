// src/services/userService.js (or wherever you manage API calls)
import API from "./axios";

export const getUserProfile = async () => {
  const response = await API.get("/user/profile"); // or "/profile", both return req.user
  return response.data;
};