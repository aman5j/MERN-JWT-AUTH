import React from 'react'
import { useState, useContext } from 'react';
import API from '../../api/axios';
import { Eye, EyeOff } from "lucide-react"

import { AuthContext } from '../../context/AuthContext';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import AuthLayout from '../../components/layout/AuthLayout';

import { success, error } from '../../utils/toast'; 
// import { useAuth } from '../../hooks/useAuth';
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext)
    // const { user } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange= (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const validate = () => {
        let err = {};

        if(!form.email) {
            err.email="Email required";
        }

        if(!form.password) {
            err.password="Password required"
        }

        setErrors(err);

        return Object.keys(err).length===0;
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        if(!validate())
        return;

        try {
            setLoading(true);


            const response = await API.post("/auth/login", form);
            const token = response.data.token;

            localStorage.setItem("token", token);

            success("Login Successfull");

            navigate("/products");

            // const userResponse = await API.get("/user/me");
            // setUser(userResponse.data.user);

            // setUser(response.data.user);
            // navigate("/dashboard");

        } catch(err) {
            // console.log(err)
            error(
                err.response?.data?.message ||
                "Login failed"
            );
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <AuthLayout>
        <h1 className="login-title">
            Welcome Back
        </h1>

        <form onSubmit={submitHandler} className="login-form">
            <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                error={errors.email}
            />

            <Input
                label="Password"
                name="password"
                type='password'
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                error={errors.password}
            />

            <Button
                type='submit'
                disabled={loading}
            >
                {loading ? "logging in..." : "Login"}
            </Button>

            <p className="login-footer">
                Don't have account?
                <Link to="/register" className="register-link">
                    Register
                </Link>
            </p>
        </form>
    </AuthLayout>
    // <form onSubmit={submitHandler}>
    //     <input
    //         name='email'
    //         // value={form.email}
    //         // placeholder='Email'
    //         onChange={handleChange}
    //     />

    //     {/* <input 
    //         name='password'
    //         type='password'
    //         // value={form.password}
    //         // placeholder='Password'
    //         onChange={handleChange}
    //     /> */}

    //     <div className='relative'>
    //         <Input
    //             type={
    //                 showPassword
    //                 ?
    //                 "text"
    //                 :
    //                 "password"
    //             }

    //             label="password"
    //         />

    //         <button
    //             type='button'

    //             onClick={()=> setShowPassword(!showPassword)}

    //             className='
    //                 absolute
    //                 right-3
    //                 top-10
    //             '
    //         >
    //             {
    //                 showPassword
    //                 ?
    //                 <EyeOff/>
    //                 :
    //                 <Eye/>
    //             }
    //         </button>
    //     </div>

    //     <button type='submit'>Login</button>
    // </form>
  )
}

export default Login;