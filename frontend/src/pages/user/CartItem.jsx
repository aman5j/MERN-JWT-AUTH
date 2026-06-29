import React from 'react';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// 1. IMPORT API_BASE_URL FROM YOUR AXIOS SETUP
import { API_BASE_URL } from '../../api/axios';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const navigate = useNavigate();

  // 2. GET THE DYNAMIC ROOT SERVER URL (strips "/api" off the end)
  const SERVER_ROOT_URL = API_BASE_URL.replace("/api", "");

  const imagePathFigure = 
  item.images[0].startsWith("/uploads/images") ? 
  `${SERVER_ROOT_URL}${item.images[0]}` :
  item.images[0]

  return (
    <div className="cart-item-card">
      {/* Image Block */}
      <div 
        className="cart-item-image-box" 
        onClick={() => navigate(`/products/${item._id}`)}
      >
        {/* <img src={item.images?.[0]} alt={item.title} /> */}
        <img src={imagePathFigure} alt={item.title} />
      </div>

      {/* Product Information Details */}
      <div className="cart-item-details">
        <span className="cart-item-category">{item.category}</span>
        <h3 
          className="cart-item-title" 
          onClick={() => navigate(`/products/${item._id}`)}
        >
          {item.title}
        </h3>
        <p className="cart-item-price-each">₹{item.price.toLocaleString('en-IN')} each</p>
      </div>

      {/* Quantity & Actions Panel */}
      <div className="cart-item-actions">
        <div className="cart-qty-selector">
          <label htmlFor={`qty-${item._id}`}>Qty:</label>
          <select
            id={`qty-${item._id}`}
            value={item.quantity}
            onChange={(e) => onQuantityChange(item._id, Number(e.target.value))}
          >
            {[...Array(item.stock || 10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="cart-item-remove-btn" 
          onClick={() => onRemove(item._id)}
          title="Remove item"
        >
          <Trash2 size={18} />
          <span>Remove</span>
        </button>
      </div>

      {/* Row Subtotal */}
      <div className="cart-item-total-price">
        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}