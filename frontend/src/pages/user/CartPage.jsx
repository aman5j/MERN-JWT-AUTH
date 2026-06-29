import React from 'react';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { useRazorpay } from "react-razorpay";
import { submitOrderAPI } from '../../api/orderApi';
import { getUserProfile } from '../../api/profileApi';
import './CartPage.css';

export default function CartPage() {
  const [user, setUser] = useState(null);
  const [userloading, setUserLoading] = useState(true);

  const { 
    cart, 
    removeToCart, 
    quantityChangeFunction, 
    totalProductCount, 
    totalPrice,
    // user
  } = useAuth();
  
  const navigate = useNavigate();
  // Fixed: Desctructured as an object instead of an array
  const { Razorpay } = useRazorpay();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfile();
        console.log(data)
        setUser(data.user);
      } catch (err) {
        // setError('Failed to load profile details.');
        console.error(err);
      } finally {
        setUserLoading(false);
      }
    };

    fetchProfileData();
    console.log(user)
  }, []);

  const handlePayment = async () => {
    console.log(user)
    if (!user) {
      alert("Please login to proceed with your transaction.");
      navigate('/login');
      return;
    }

    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH", 
      amount: Math.round(totalPrice * 100), // Converts INR explicitly to paise
      currency: "INR",
      name: "MERN STORE",
      description: "Checkout Transaction",
      image: "http://localhost:5000/images/logo.png",
      
      handler: async function (response) {
        const body = {
          cart: cart, 
          paymentstatus: response.razorpay_payment_id 
        };

        try {
          const res = await submitOrderAPI(body);
          
          if (res.data.status) {
            // cart: []
            alert("Order placed successfully!");
            navigate('/cart');
          } else {
            alert(res.data.message || "Failed to submit order.");
          }
        } catch (error) {
          console.error("Payment Handler Error:", error);
          alert(error.response?.data?.message || "Error finalizing database records.");
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone || user?.mobileno || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
    });

    rzp1.open();
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <ShoppingBag size={64} className="empty-cart-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button className="shop-now-btn" onClick={() => navigate('/products')}>
          Shop Our Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <button className="cart-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Continue Shopping
      </button>

      <h1 className="cart-page-title">Shopping Cart</h1>

      <div className="cart-layout-grid">
        {/* Left Side: Items List */}
        <div className="cart-items-section">
          {cart.map((item) => (
            <CartItem 
              key={item._id}
              item={item}
              onQuantityChange={quantityChangeFunction}
              onRemove={removeToCart}
            />
          ))}
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="cart-summary-section">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Total Items ({totalProductCount})</span>
              <span>{totalProductCount} units</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="free-delivery">FREE</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <button className="checkout-btn" onClick={handlePayment}>
              <CreditCard size={18} />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}