// src/components/Profile/ProfileOverlay.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'; // Optional close icon
import { getUserProfile } from '../../api/profileApi'; // Path to your API interceptor
import './ProfileOverlay.css';

export default function ProfileOverlay({ onClose }) {
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
        setError('Failed to load profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose(); // Close the modal
    navigate("/login"); // Redirect
  };

  return (
    // Backdrop dims the rest of the screen
    <div className="overlay-backdrop" onClick={onClose}>
      {/* Prevents click inside the card from closing the modal */}
      <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
        
        <button className="overlay-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>My Profile</h2>
        <hr />

        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && user && (
          <div className="overlay-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}