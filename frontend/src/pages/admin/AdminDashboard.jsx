import React from 'react'
import "./AdminDashboard.css"
import { getAllAdminOrders, getAdminRevenue } from '../../api/orderApi';

import { getUsers } from '../../api/userApi'
import { getProducts } from '../../api/productApi'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
    const [usersCount, setUsersCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState([]);
    const [revenue, setRevenue] = useState(0);

    const getCountOfUser_and_Products = async () => {
        try {
            const usersRes = await getUsers();
            setUsersCount(usersRes.data.length);

            const productsRes = await getProducts();
            setProductsCount(productsRes.data.products.length);

            const res = await getAllAdminOrders();
            setOrdersCount(res.data.orders.length)

            // Fetch dynamic database aggregation for financial metrics
            const revenueRes = await getAdminRevenue();
            if (revenueRes.data.success) {
                setRevenue(revenueRes.data.totalRevenue);
            }

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    }


    useEffect(()=>{
        getCountOfUser_and_Products();
    },[])

  return (
    <div className="admin-dashboard-wrapper">
        <h1 className="admin-dashboard-title">
            Dashboard
        </h1>

        <div className="admin-dashboard-grid">
            <Card title="Products" value={productsCount} /> 
            <Card title="Users" value={usersCount} /> 
            <Card title="Orders" value={ordersCount} />
            {/* Dynamically display localized value */}
            <Card title="Revenue" value={`₹${revenue.toLocaleString('en-IN')}`} isRevenue={true} />
        </div>
    </div>
  )
}

function Card({title, value, isRevenue}) {
    return (
        <div className={`admin-stat-card ${isRevenue ? 'revenue-card' : ''}`}>
            <h2 className="admin-card-label">{title}</h2>
            <p className="admin-card-value">{value}</p>
        </div>
    )
}
