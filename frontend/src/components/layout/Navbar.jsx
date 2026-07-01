import React  from 'react'
import { useState } from 'react'
import {ShoppingCart, User } from "lucide-react"
import ProfileOverlay from '../../pages/user/ProfileOverlay'

import { Link } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
    const { cart, totalProductCount } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
  return (
    <>
    <nav className='navbar'>
      <Link to="/" className="nav-link">
        <h1 className='navbar-logo'>
            MERN Store
        </h1>
      </Link>

        {/* <h1 className='navbar-logo'>
            MERN Store
        </h1> */}

        <div className='navbar-links'>
            {/* <Link to="/" className="nav-link">
                Home
            </Link> */}

            <Link to="/products" className="nav-link">
                Products
            </Link>

            <Link to="/cart" className="nav-link icon-link">
                <ShoppingCart /> ({cart.length})
            </Link>

            {/* <Link to="/profile" className="nav-link icon-link">
                <User/>
            </Link> */}

            {/* Change Link to a button/div for opening the modal */}
          <button 
            onClick={() => setIsProfileOpen(true)} 
            className="nav-link icon-link navbar-profile-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <User/>
          </button>

        </div>
    </nav>

    {/* Render the Overlay Modal if state is open */}
      {isProfileOpen && (
        <ProfileOverlay onClose={() => setIsProfileOpen(false)} />
      )}
      
    </>
  )
}
