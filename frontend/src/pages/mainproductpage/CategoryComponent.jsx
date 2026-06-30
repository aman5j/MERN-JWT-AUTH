import React from 'react';
import './CategoryComponent.css';

const CATEGORIES = ["All", "Electronics", "Accessories", "Home & Kitchen", "Fitness", "Apparel"];

export default function CategoryComponent({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="categories-section">
      <h2 className="section-label">Browse by Category</h2>
      <div className="categories-chips-container">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}