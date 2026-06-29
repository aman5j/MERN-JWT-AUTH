import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout-container">
      <AdminSidebar />

      <main className="admin-main-content">
        <Outlet />
      </main>
      
    </div>
  );
}