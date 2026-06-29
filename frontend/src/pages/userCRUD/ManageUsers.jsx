import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers, updateUser, deleteUser as removeUser } from '../../api/userApi'
import UserTable from '../../components/userCRUD/UserTable'
import DeleteModal from '../../components/admin/DeleteModal'
import { success, error } from '../../utils/toast'
import "./ManageUsers.css"

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Modal Control tracking hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      console.log(res.data)
      setUsers(res.data);
    } catch (err) {
      error("Failed to load users");
      setError(err.response?.data?.message || "Failed to fetch users orders.");
    } finally {
      setLoading(false);
    }
  };

  const triggerModalOpen = (user) => {
    setActiveUser(user);
    setModalOpen(true);
  };

  const confirmDeletionHandler = async () => {
    if (!activeUser) return;
    try {
      await removeUser(activeUser._id);
      success("User removed successfully");
      setModalOpen(false);
      setActiveUser(null);
      loadUsers();
    } catch (err) {
      error("Delete operation failed");
    }
  };

  if (loading) return <div className="admin-loading">Loading Users...</div>;
  if (error) return <div className="admin-error-banner">{error}</div>;

  return (
    <div className="manage-products-wrapper">
      <div className="manage-products-header">
        <h1 className="manage-products-title">Manage Users</h1>
        {/* <button 
          className="add-product-btn" 
          onClick={() => navigate("/admin/products/add")}
        >
          Add Product
        </button> */}
      </div>

      <UserTable
        users={users}
        openDeleteModal={triggerModalOpen}
      />

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeletionHandler}
        itemTitle={activeUser?.title}
      />
    </div>
  )
}