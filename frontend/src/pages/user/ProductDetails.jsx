import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { getProductById } from "../../api/productApi";
import { useAuth } from '../../hooks/useAuth';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeToCart,  cart, quantityChangeFunction } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const cartItem = cart.find((item) => item._id === id)


  useEffect(() => {
    fetchProduct();
  }, [id]); // Triggers fetch if id changes

  useEffect(()=> {
    if(cartItem) {
        setQuantity(cartItem.quantity);
    }
  },[cartItem])

  // Check if this item is already sitting in the cart global state

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductById(id);
      const fetchedProduct = response.data.product;
      setProduct(fetchedProduct);
      // Fallback if image array is empty
      setActiveImage(fetchedProduct.images?.[0] || ""); 
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    let netQty = quantity;

    if (type === "decrease" && quantity > 1) {
      netQty = quantity - 1 
    } else if (type === "increase" && quantity < product.stock) {
      netQty = quantity + 1
    }

    setQuantity(netQty)

    if(cartItem) {
        quantityChangeFunction(product._id, netQty);
    }
  };

  const handleAddToCart = () => {
    // Pass product along with the selected quantity payload if your context supports it
    addToCart({ ...product, quantity });
  };

  if (loading) return <h2 className="details-loading">Loading item details...</h2>;
  if (!product) return <h2 className="details-error">Product not found.</h2>;

  return (
    <div className="details-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="details-grid">
        {/* Left Side: Images */}
        <div className="details-media-section">
          <div className="main-image-wrapper">
            <img src={activeImage.startsWith("/uploads/images") ? `http://localhost:5000${activeImage}` : activeImage} alt={product.title} className="details-image" />
          </div>
          {/* Thumbnails list if there are multiple images */}
          {product.images && product.images.length > 1 && (
            <div className="thumbnails-container">
              {product.images.map((img, idx) => (
                <img 
                  key={idx}
                  // src={img} 
  
                  src={img.startsWith("/uploads/images") ? 
                    `http://localhost:5000${img}` :
                     img}
                 

                  alt="thumbnail" 
                  className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Info Panel */}
        <div className="details-info">
          <span className="info-brand">{product.brand || "Generic"}</span>
          <h1 className="details-title">{product.title}</h1>
          <span className="info-category">{product.category}</span>

          {/* Ratings & Stock Status */}
          <div className="info-meta-row">
            <div className="info-rating">
              <Star size={16} fill="#ffc107" stroke="#ffc107" />
              <span>{product.rating}</span>
            </div>
            <span className="info-divider">|</span>
            <span className={`info-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `${product.stock} units available` : "Out of Stock"}
            </span>
          </div>

          <hr className="details-divider-line" />

          {/* Pricing Display */}
          <div className="price-container">
            <h2 className="details-price">₹{product.price.toLocaleString('en-IN')}</h2>
            <p className="tax-inclusive">Inclusive of all taxes</p>
          </div>

          <p className="details-description">{product.description}</p>

          <hr className="details-divider-line" />

          {/* Actions Section */}
          {product.stock > 0 && (
            <div className="purchase-actions">
              {/* Quantity Selector */}
              {cartItem &&
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange("decrease")}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange("increase")}>+</button>
              </div>
              }

              {/* Add to Cart Button */}
              {cartItem ? (
                <button className="details-btn remove-btn" onClick={() => removeToCart(product._id)}>
                    <ShoppingCart size={18} />
                    <span>Remove From Cart</span>
                </button>
                ) : (
                <button className="details-btn" onClick={handleAddToCart}>
                    <ShoppingCart size={18} />
                    <span>Add To Cart</span>
                </button>
                )}
            </div>
            
          )}

          {/* Value Propositions */}
          <div className="trust-badges">
            <div className="badge-item">
              <Truck size={20} />
              <span>Free Express Delivery</span>
            </div>
            <div className="badge-item">
              <ShieldCheck size={20} />
              <span>1 Year Brand Warranty</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}