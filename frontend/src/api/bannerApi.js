import API from "./axios";

export const getAllBanners = () => {
    return API.get("/banners");
};