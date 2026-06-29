import API from "./axios";

export const getProducts = () => {
    return API.get("/products");
}

export const getProductById = (id) => {
    return API.get(`/products/${id}`)
}

export const createProducts=(data)=>{
    return API.post("/products", data);
}

export const updateProducts=(id, data) => {
    return API.put(`/products/${id}`, data)
}

export const deleteProduct=(id)=>{
    return API.delete(`/products/${id}`)
}

// export const deleteProducts=(id)=>{
//     return API.delete(`/products/${id}`)
// }
