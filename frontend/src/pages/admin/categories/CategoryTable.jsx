import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../../components/admin/ProductTable.css" // Reusing your shared global responsive administrative table layout css

export default function CategoryTable({ categories, openDeleteModal }) {
  const navigate = useNavigate()

  return (
    <div className="table-responsive">
      <table className="product-admin-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{new Date(category.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="table-actions-cell">
                  <button 
                    onClick={() => navigate(`/admin/categories/edit/${category._id}`)} 
                    className="edit-action-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(category)}
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