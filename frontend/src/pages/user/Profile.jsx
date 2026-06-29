// src/components/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/profileApi';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user);
      } catch (err) {
        setError('Failed to load profile details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    // 1. Clear the token from localStorage
    localStorage.removeItem("token");
    
    // 2. Redirect back to the login page or homepage
    navigate("/login");
    
    // Optional: If you use a custom AuthContext state, clear it here as well
    // e.g., logoutUserContext(); 
  };

  if (loading) return <div className="profile-status">Loading profile...</div>;
  if (error) return <div className="profile-status error">{error}</div>;

  return (
    <div className="profile-card">
      <h2>User Profile</h2>
      <hr />
      {user ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add any other user fields like role, phone, etc. */}
          
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}