import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./UserTable.css"

export default function UserTable({ users, openDeleteModal }) {
  const navigate = useNavigate();

  return (
    <div className="table-responsive">
      <table className="product-admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Role</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.role}</td> */}
              <td>
                <div className="table-actions-cell">
                  <button 
                    onClick={() => navigate(`/admin/users/edit/${user._id}`)} 
                    className="edit-action-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
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