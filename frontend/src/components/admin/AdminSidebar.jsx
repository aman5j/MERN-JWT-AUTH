import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./AdminSidebar.css";

export default function AdminSidebar() {
    const navigate = useNavigate();

    // Mock admin data - replace this with your actual auth state/context
    console.log("admin Details in AdminSidebar");
    const admin = JSON.parse(localStorage.getItem("adminUser"));
    // console.log(adminData)

//   const admin = {
//     name: "Aman Prajapati",
//     email: "aman@example.com"
//   };

  const handleLogout = () => {
    // 1. Clear your auth tokens / user data here
    // e.g., localStorage.removeItem('token'); 
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");

    
    // 2. Redirect to login or home page
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
        <div className="sidebar-header">
        <h1 className="sidebar-title-admin">
            Admin Panel
        </h1>
        
        {/* Admin Details Section */}
        <div className="admin-profile">
          <p className="admin-name">{admin.name}</p>
          <p className="admin-email">{admin.email}</p>
        </div>

        </div>

        <nav className="sidebar-nav">
            <Link to="/admin" className="sidebar-link">
                Dashboard
            </Link>
            <Link to="/admin/products" className="sidebar-link">
                Products
            </Link>
            <Link to="/admin/orders" className="sidebar-link">
                Orders
            </Link>
            <Link to="/admin/users" className="sidebar-link">
                Users
            </Link>
        </nav>

        {/* Logout Button Section */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

    </aside>
  )
}
