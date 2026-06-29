import React from 'react'
import ProductCard from './ProductCard'
import "./ProductGrid.css"

export default function ProductGrid({products}) {

console.log(products)
  return (
    <div className='products-grid-layout'>
        {products.map(product => (
            <ProductCard
                key={product.id}
                product={product}
            />
        ))}
    </div>
  )
}
