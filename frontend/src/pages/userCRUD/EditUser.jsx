import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../../api/userApi'; // Imported your user API functions
import { success, error } from '../../utils/toast';
import './EditUser.css'; // Make sure to create or rename this CSS file

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simplified form state for user attributes
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "" // Keep blank unless they want to change it
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetching all users or a specific user. 
        // Note: If your userApi has a 'getUserById(id)', use that instead.
        // Otherwise, we can find the specific user from getUsers()
        const res = await getUsers();
        
        // Find the user that matches the ID from the URL params
        const user = res.data.find(u => u._id === id);

        if (!user) {
          error("User not found");
          navigate("/admin/users");
          return;
        }

        setForm({
          name: user.name || "",
          email: user.email || "",
          password: "" // Leave password empty for security; only send if updated
        });

        setLoading(false);
      } catch (err) {
        error("Failed to load user information");
        navigate("/admin/users");
      }
    };
    fetchUserDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      // Build the standard JSON payload
      const dataToUpdate = {
        name: form.name,
        email: form.email,
      };

      // Only include password if the administrator typed something new into it
      if (form.password.trim() !== "") {
        dataToUpdate.password = form.password;
      }

      // Send standard JSON data to your backend controller
      await updateUser(id, dataToUpdate);
      
      success("User updated successfully");
      navigate("/admin/users");
    } catch (err) {
      error(err.response?.data?.message || "Failed to update user configurations");
    }
  };

  if (loading) return <h2 className="edit-loading-indicator">Fetching User Details...</h2>;

  return (
    <div className="edit-user-page">
      {/* Removed encType multipart/form-data since we are sending standard JSON objects now */}
      <form onSubmit={submitUpdateHandler} className="edit-user-form">
        <h2 className="form-header">Modify User Attributes</h2>

        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="form-field"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-field"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">New Password (Leave blank to keep unchanged)</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-field"
            placeholder="Enter new password"
            minLength={6} // Optional: Front-end validation guardrail
          />
        </div>

        <div className="edit-form-actions">
          <button 
            type="button" 
            className="cancel-edit-btn" 
            onClick={() => navigate("/admin/users")}
          >
            Cancel
          </button>
          <button type="submit" className="save-edit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}