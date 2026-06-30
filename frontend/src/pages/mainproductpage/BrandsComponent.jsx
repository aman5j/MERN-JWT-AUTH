import React from 'react';
import './BrandsComponent.css';

const BRANDS = ["All Brands", "LogiTech", "NordicPack", "AuraSound", "HydroPeak", "Quantum", "ClickMaster", "Hide & Stitch", "BrewAura", "Polaris", "AeroStep", "Vanguard"];

export default function BrandsComponent({ brands, selectedBrand, onSelectBrand }) {
  return (
    <aside className="sidebar-brand">
      <h3 className="sidebar-title">Filter By Brand</h3>
      <div className="brand-list-container">
        {brands.map((br) => (
          <button
            key={br}
            onClick={() => onSelectBrand(br)}
            className={`brand-item-btn ${selectedBrand === br ? 'active' : ''}`}
          >
            <span>{br}</span>
            {selectedBrand === br && <span className="active-indicator" />}
          </button>
        ))}
      </div>
    </aside>
  );
}