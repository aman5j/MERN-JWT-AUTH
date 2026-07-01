import React from 'react'
import "./ProductSearch.css"

export default function ProductSearch({search, setSearch}) {
  return (
    <input
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        placeholder='Search...'
        className='search-input'
    />
  )
}
