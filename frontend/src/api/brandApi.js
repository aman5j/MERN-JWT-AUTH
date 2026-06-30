import API from "./axios";

export const getAllBrands = () => {
    return API.get("/brands")
}