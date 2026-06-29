import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./ProductTable.css"

export default function ProductTable({ products, openDeleteModal }) {
  const navigate = useNavigate();

  return (
    <div className="table-responsive">
      <table className="product-admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <div className="table-actions-cell">
                  <button 
                    onClick={() => navigate(`/admin/products/edit/${product._id}`)} 
                    className="edit-action-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}