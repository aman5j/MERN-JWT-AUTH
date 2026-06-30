import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import API, {API_BASE_URL} from '../../api/axios';
import './ProductCartItemComponent.css';

export default function ProductCartItemComponent({ product }) {
  const { cart, addToCart, removeToCart } = useAuth();

  // Check if item is already in the cart
  const cartItem = cart.find((item) => item._id === product._id);

  // Compute root server address by stripping out '/api'
  const SERVER_ROOT_URL = API_BASE_URL.replace("/api", "");

  // Dynamic path mapping based on storage source
  const imagePathFigure = product.images[0]?.startsWith("/uploads/images")
    ? `${SERVER_ROOT_URL}${product.images[0]}`
    : product.images[0];



  return (
    <Link 
      to={`/products/${product._id}`} 
      className="product-card-link" 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
    <div className="product-card group">
      <div>
        <div className="card-image-wrapper">
          <img 
            // src={product.images[0]} 
            src={imagePathFigure} 
            alt={product.title} 
            className="product-img"
          />
          {product.stock === 0 && (
            <span className="out-of-stock-badge">OUT OF STOCK</span>
          )}
        </div>

        <div className="card-info">
          <div className="meta-info-row">
            <span>{product.category}</span>
            <span className="brand-label">{product.brand}</span>
          </div>
          <h4 className="card-title">{product.title}</h4>
          
          <div className="rating-stock-row">
            <div className="star-rating-badge">★ {product.rating}</div>
            <span className="stock-left">({product.stock} left)</span>
          </div>
        </div>
      </div>

      <div className="card-footer-row">
        <span className="product-price">₹{product.price}</span>


        {cartItem ? (
            <button 
              className="add-to-cart-btn remove-btn" 
              onClick={(e) => {
                e.preventDefault();  // Prevents Link routing navigation
                e.stopPropagation(); // Blocks parent bubbling click event
                removeToCart(product._id);
              }}
            >
              <ShoppingCart size={14}/>
              <span>Remove</span>
            </button>
          ) : (
            <button 
              disabled={product.stock === 0}
              className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
              onClick={(e) => {
                e.preventDefault();  // Prevents Link routing navigation
                e.stopPropagation(); // Blocks parent bubbling click event
                addToCart(product);
              }}
            >
              <ShoppingCart size={14}/>
              <span>Add</span>
            </button>
          )}
          
        {/* <button 
          disabled={product.stock === 0}
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
        >
          Add
        </button> */}


      </div>
    </div>
    </Link>
  );
}