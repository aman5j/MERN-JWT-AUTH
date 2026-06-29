import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

// function Layout({children}) {
function Layout() {
  return (
    <div>
        <Navbar/>

        <main>
            {/* This Outlet rendering tells React Router where to swap in the child components */}
            <Outlet/>
        </main>

        <Footer/>
    </div>
  )
}

export default Layout;