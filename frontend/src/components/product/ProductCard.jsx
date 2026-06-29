import React from 'react';
import { ShoppingCart, Star } from "lucide-react";
import { Link } from 'react-router-dom';
import "./ProductCard.css";
import { useAuth } from '../../hooks/useAuth';

export default function ProductCard({ product }) {
  const { cart, addToCart, removeToCart } = useAuth();

  const cartItem = cart.find((item) => item._id === product._id);

  const imagePathFigure = 
  product.images[0].startsWith("/uploads/images") ? 
  `http://localhost:5000${product.images[0]}` :
  product.images[0]


  return (
    // Wrap the card in Link, but add standard block styling
    <Link to={`/products/${product._id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        
        <div className="product-image-box">
          <img src={imagePathFigure} alt={product.title} className="product-image" />
          {/* <img src={`http://localhost:5000${product.images[0]}`} alt={product.title} className="product-image" /> */}
        </div>

        <div className="product-details">
          <p className="product-category">{product.category}</p>
          <h2 className="product-title">{product.title}</h2>

          <div className="rating-box">
            <div className="rating">
              <Star size={15} fill="white"/>
              <span>{product.rating}</span>
            </div>
            <span className="reviews">({product.stock} stocks)</span>
          </div>

          <div className="product-footer">
            <p className="price">₹{product.price}</p>

        {cartItem ?(
             <button 
              className="cart-btn remove-btn" 
              onClick={(e) => {
                e.preventDefault();  // Stop Link navigation
                e.stopPropagation(); // Stop click from bubbling up
                removeToCart(product._id);
              }}
            >
              <ShoppingCart size={18}/>
              <span>Remove</span>
            </button>
        ):(
             <button 
              className="cart-btn" 
              onClick={(e) => {
                e.preventDefault();  // Stop Link navigation
                e.stopPropagation(); // Stop click from bubbling up
                addToCart(product);
              }}
            >
              <ShoppingCart size={18}/>
              <span>Add</span>
            </button>
        )}
            {/* <button 
              className="cart-btn" 
              onClick={(e) => {
                e.preventDefault();  // Stop Link navigation
                e.stopPropagation(); // Stop click from bubbling up
                addToCart(product);
              }}
            >
              <ShoppingCart size={18}/>
              <span>Add</span>
            </button> */}


          </div>

        </div>
      </div>
    </Link>
  );
}