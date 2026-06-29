import { toast } from "react-toastify"

export const success = (message) => {
    toast.success(message);
}

export const error = (message) => {
    toast.error(message);
}