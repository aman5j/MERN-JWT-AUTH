import API from "./axios";

export const submitOrderAPI = (orderData) => {
    return API.post("/userinterface/order_submit", orderData);
};

export const getAllAdminOrders = () => {
    return API.get("/orders");
};

export const getAdminRevenue = () => {
    return API.get("/orders/revenue"); // adjust your base path "/admin" or "/order" based on your setup
};