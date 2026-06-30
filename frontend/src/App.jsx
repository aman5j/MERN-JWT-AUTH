// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// // Public & Main Application Client Views
// import Login from './pages/auth/Login'
// import Register from './pages/auth/Register'
// import PrivateRoute from './routes/PrivateRoute'
// import Layout from './components/layout/Layout'
// import Dashboard from './pages/user/Dashboard'
// import Products from './pages/user/Products'
// import ProductDetails from './pages/user/ProductDetails'
// import CartPage from './pages/user/CartPage'

// // Isolated Administrative Workspace Engine System Components
// import AdminLogin from './pages/admin/AdminLogin'  // New separate admin page
// import AdminRoute from './routes/AdminRoute'  // Updated separate route shield
// import AdminLayout from './components/layout/AdminLayout'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import ManageProducts from './pages/admin/ManageProducts'
// import AddProduct from './pages/admin/AddProduct'
// import EditProduct from './pages/admin/EditProduct'


// function App() {
//   const [count, setCount] = useState(0)

//   const router = createBrowserRouter([
//     // Client Side Consumer Authentication Channels
//     { path: "/login", element: <Login /> },
//     { path: "/register", element: <Register /> },

//     // Dedicated Independent Administrative Access Channel
//     { path: "/admin/login", element: <AdminLogin /> },


//     // Regular User/Buyer View Routing Ecosystem
//     {
//       path: "/",
//       element: <Layout/>,
//       children: [
//         {
//           index: true, // This handles the base "/" path
//           element: (
//             <PrivateRoute>
//               <Dashboard/>
//             </PrivateRoute>
//           )
//         },

//         {
//           path: "products",
//           element: <Products/>, // Note: paths in children are relative, no leading slash needed
//         },
//         {
//           path: "products/:id",
//           element: <ProductDetails/>
//         },
//         {
//           path: "cart",
//           element: <CartPage/>
//         },

//       ]
//     },


//     // New Admin Routes Define here 
//     {
//       path: "/admin",
//       element: (
//               <AdminRoute>
//                 <AdminLayout/>
//               </AdminRoute>
//             ),

//       children: [
//         {
//           index: true,
//           element: <AdminDashboard/>,
//         },
//         {
//           path: "products",
//           element: <ManageProducts/>
//         },
//         {
//           path: "products/add",
//           element: <AddProduct/>
//         },
//         {
//           path: "products/edit/:id",
//           element: <EditProduct />
//         }
//       ]
//     }
//   ]);

//   return (
//     <>
    
//     <RouterProvider router={router}/>


//     </>
//   )
// }

// export default App

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Public & Main Application Client Views
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PrivateRoute from './routes/PrivateRoute'
import Layout from './components/layout/Layout'
import Dashboard from './pages/user/Dashboard'
import Products from './pages/user/Products'
import ProductDetails from './pages/user/ProductDetails'
import CartPage from './pages/user/CartPage'

// Isolated Administrative Workspace Engine System Components
import AdminLogin from './pages/admin/AdminLogin' // New separate admin page
import AdminRoute from './routes/AdminRoute'      // Updated separate route shield
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageProducts from './pages/admin/ManageProducts'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import Profile from './pages/user/Profile'
import ManageUsers from './pages/userCRUD/ManageUsers'
import EditUser from './pages/userCRUD/EditUser'
import ManageOrders from './pages/orders/ManageOrders'
import ProductsPage from './pages/mainproductpage/ProductsPage'

function App() {
  const router = createBrowserRouter([
    // Client Side Consumer Authentication Channels
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile", element: <Profile /> },

    // Dedicated Independent Administrative Access Channel
    { path: "/admin/login", element: <AdminLogin /> },

    // Regular User/Buyer View Routing Ecosystem
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        },
        { path: "products", element: <Products /> },
        { path: "productspage", element: <ProductsPage /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "cart", element: <CartPage /> }
      ]
    },

    // Completely Separated Admin View Routing Ecosystem (Using Relative Child Offsets)
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <AdminLayout />
         </AdminRoute>
      ),
      children: [
        {
          index: true, // Resolves to: /admin
          element: <AdminDashboard />
        },
        {
          path: "products", // Resolves to: /admin/products
          element: <ManageProducts />
        },
        {
          path: "products/add", // Resolves to: /admin/products/add
          element: <AddProduct />
        },
        {
          path: "products/edit/:id", // Resolves to: /admin/products/edit/:id
          element: <EditProduct />
        },
        {
          path: "users",   // Resolves to: /admin/users
          element: <ManageUsers/>
        },
        {
          path: "users/edit/:id", // Resolves to: /admin/users/edit/:id
          element: <EditUser />
        },
        {
          path: "orders",
          element: <ManageOrders/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;