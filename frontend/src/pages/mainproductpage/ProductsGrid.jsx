import React from 'react';
import ProductCartItemComponent from './ProductCartItemComponent';
import './ProductsGrid.css';

export default function ProductsGrid({ filteredProducts, selectedCategory, selectedBrand, onClearFilters, loading }) {

  if(loading) {
    return <h2>Loading...</h2>
    }

  return (
    <main className="products-main-stage">
      <div className="results-meta-row">
        <p className="results-count">
          Showing <span className="count-highlight">{filteredProducts.length}</span> products
        </p>
        {(selectedCategory !== "All" || selectedBrand !== "All Brands") && (
          <button onClick={onClearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state-card">
          <p className="empty-title">No matching products found.</p>
          <p className="empty-subtitle">Try resetting your category or brand selection.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCartItemComponent key={product._id || product.title} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}