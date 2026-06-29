import React, { useState } from 'react'
import './Input.css'
import { EyeOff, Eye } from 'lucide-react';

export default function Input({
    label,
    name,
    type="text",
    value,
    onChange,
    placeholder,
    error
}) {

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";


  return (
    <div className='input-group'>
        <label  className='input-label'>
            {label}
        </label>

    <div className="input-wrapper">
        <input
            name={name}
            type={isPassword && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}

            className={`form-input ${error ? 'input-error-border' : ''} ${isPassword ? 'password-padding' : ''}`}
        />

        {
            isPassword && (
                <button
                    type='button'
                    onClick={()=> setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                >
                    {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className="w-5 h-5" />}
                </button>
            )
        }
        </div>
        {
            error && 
            <p className="input-error-text">
                {error}
            </p>
        }
    </div>
  )
}
