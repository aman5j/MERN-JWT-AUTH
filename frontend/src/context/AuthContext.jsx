import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Unified to use `_id` and `quantity`
  const addToCart = (product, selectedQty = 1) => {
    setCart((prevCart) => {
      // Find matching item using _id
      const isExist = prevCart.find((item) => item._id === product._id);

      if (isExist) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + selectedQty }
            : item
        );
      }
      // Add new product with chosen starting quantity
      return [...prevCart, { ...product, quantity: selectedQty }];
    });
    console.log(cart)
  };

  const removeToCart = (productId) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item._id !== productId);
    });
  };

  const quantityChangeFunction = (productId, exactQty) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity: exactQty }; // Immutable state update
        }
        return item;
      });
    });
  };

  // Synchronized to read `item.quantity` safely
  const totalProductCount = cart.reduce((tcount, item) => {
    return tcount + (item.quantity || 0);
  }, 0);

  const totalPrice = cart.reduce((tprice, item) => {
    return tprice + item.price * (item.quantity || 0);
  }, 0);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await API.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const globalObject = {
    user,
    setUser,
    loading,
    logout,
    cart,
    addToCart,
    removeToCart,
    quantityChangeFunction,
    totalProductCount,
    totalPrice,
  };

  return (
    <AuthContext.Provider value={globalObject}>
      {children}
    </AuthContext.Provider>
  );
};