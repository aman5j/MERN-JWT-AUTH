import React from 'react'
import './Button.css'

export default function Button({
    children,
    type="button",
    onClick,
    disabled
    }) 
{
  return (
    <button
        type={type}
        onClick={onclick}
        disabled={disabled}

        className='custom-button'
    >
        {children}
    </button>
  )
}
