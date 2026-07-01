import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../../components/admin/ProductTable.css" // Reusing your shared global responsive administrative table layout css

export default function BrandTable({ brands, openDeleteModal }) {
  const navigate = useNavigate()

  return (
    <div className="table-responsive">
      <table className="product-admin-table">
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand._id}>
              <td>{brand.name}</td>
              <td>{new Date(brand.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="table-actions-cell">
                  <button 
                    onClick={() => navigate(`/admin/brands/edit/${brand._id}`)} 
                    className="edit-action-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(brand)}
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