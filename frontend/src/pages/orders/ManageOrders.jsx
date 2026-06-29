import React, { useState, useEffect } from 'react';
import { getAllAdminOrders } from '../../api/orderApi';
import { Search, Eye, ShoppingCart, DollarSign, Calendar } from 'lucide-react';
import './ManageOrders.css'; // Add styling here to polish the table presentation

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllAdminOrders();
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch customer orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Multi-column search filter matching against User Profile, Razorpay IDs, or Product titles
  const filteredOrders = orders.filter(order => {
    const matchesUser = order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRazorpay = order.razorpayPaymentId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProduct = order.items?.some(item => 
      item.product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesUser || matchesRazorpay || matchesProduct;
  });

  if (loading) return <div className="admin-loading">Loading order book data...</div>;
  if (error) return <div className="admin-error-banner">{error}</div>;

  return (
    <div className="manage-orders-container">
      <div className="admin-header-row">
        <h2>Customer Order Book</h2>
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by customer, product title, or Razorpay ID..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Customer Details</th>
              <th>Purchased Items</th>
              <th>Transaction Value</th>
              <th>Gateway Ref (Razorpay)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-records">No transaction records found matching your query criteria.</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  {/* Date formatting */}
                  <td>
                    <div className="date-cell">
                      <Calendar size={14} />
                      <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </td>
                  
                  {/* Customer context */}
                  <td>
                    <div className="customer-info-cell">
                      <strong>{order.user?.name || "Guest User"}</strong>
                      <span className="subtext">{order.user?.email || "N/A"}</span>
                    </div>
                  </td>
                  
                  {/* Item breakdown list */}
                  <td>
                    <div className="ordered-products-list">
                      {order.items.map((item, index) => (
                        <div key={index} className="product-summary-badge">
                          <ShoppingCart size={12} />
                          <span>{item.product?.title || "Deleted Product"} <strong>(x{item.quantity})</strong></span>
                        </div>
                      ))}
                    </div>
                  </td>
                  
                  {/* Monetary Total */}
                  <td>
                    <strong className="amount-text">₹{order.totalAmount.toLocaleString('en-IN')}</strong>
                  </td>
                  
                  {/* Payment Reference Identifier */}
                  <td>
                    <span className="mono-text">{order.razorpayPaymentId}</span>
                  </td>
                  
                  {/* Operational Status Tag */}
                  <td>
                    <span className={`status-pill ${order.paymentStatus?.toLowerCase()}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}