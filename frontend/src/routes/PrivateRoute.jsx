// import { Navigate } from "react-router-dom"

// import { useContext } from "react"

// import { AuthContext } from "../context/AuthContext"

// function PrivateRoute({children}) {

//     const { user, loading } = useContext(AuthContext);

//     if(loading) {
//         return <h2>Loading...</h2>
//     }

//     if(!user) {
//         <Navigate to="/login" />
//     }

//     return children;
// }

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Regular users use "token", not "adminToken"
    const token = localStorage.getItem("token"); 

    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;