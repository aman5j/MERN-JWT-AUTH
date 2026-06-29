import React from 'react'

export default function ErrorMessage({message}) {
  return (
    <div
        className='
            bg-red-100
            text-red-600
            p-3
            rounded
        '
    >
        {message}
    </div>
  )
}
