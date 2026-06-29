import React from 'react'
import { useState } from 'react'
import API from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { success, error } from '../../utils/toast';
import './Register.css';

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        if(form.password !== form.confirmPassword) {
            error(
                "Passwords do not match"
            );
            return;
        }

        try {

            setLoading(true);

            const response = await API.post("/auth/register", form);
            console.log(response.data)

            success(
                "Account created successfully"
            )

            navigate("/login");

        } catch(err) {
            
            error(
                err.response?.data?.message ||
                "Registration failed"
            )
            
        } finally {
            setLoading(false);
        }

    }


  return (
    <AuthLayout>
        <h1 className='register-title'>
            Create Account
        </h1>

        <form onSubmit={submitHandler} className='register-form'>
            <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
            />

            <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
            />

            <Input
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
            />

            <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
            />

            <Button
                type='submit'
                disabled={loading}
            >

                {
                    loading
                    ?
                    "Creating..."
                    :
                    "Register"
                }

            </Button>
        </form>
        <div className="register-footer">
            <span>Already have an account?</span>
            <Link to="/login" className="login-link">Login</Link>
        </div>
    </AuthLayout>
    // <form onSubmit={submitHandler}>
    //     <input 
    //         name='name'
    //         onChange={handleChange}
    //     />

    //     <input
    //         name='email'
    //         onChange={handleChange}
    //     />

    //     <input
    //         name='password'
    //         type='password'
    //         onChange={handleChange}
    //     />

    //     <button>Register</button>
    // </form>
  )
}
