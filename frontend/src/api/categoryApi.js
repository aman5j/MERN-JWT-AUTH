import API from "./axios";

export const getAllCategories = () => {
    return API.get("/categories")
}