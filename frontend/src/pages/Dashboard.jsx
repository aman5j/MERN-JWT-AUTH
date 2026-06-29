import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutfunction = () => {
        logout();
        navigate("/login");
    }

  return (<>
    <h1>User Dashboard</h1>

    <button onClick={logoutfunction}>
        logout
    </button>
    </>
  )
}
