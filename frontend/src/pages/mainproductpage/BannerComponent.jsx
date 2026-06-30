import React, { useState } from 'react';
import './BannerComponent.css';

// Added your full list of fallbacks here
const DEFAULT_BANNERS = [
  { 
    imageUrl: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600&auto=format&fit=crop&q=80", 
    title: "Upgrade Your Everyday Setup.", 
    subtitle: "Explore premium tech additions, lifestyle gear, and minimalist essentials curated just for you.", 
    badge: "Summer Collection 2026" 
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80", 
    title: "Fresh Looks, Premium Comfort.", 
    subtitle: "Discover high-performance gear tailored for your active lifestyle.", 
    badge: "Summer Collection 2026" 
  }
];

export default function BannerComponent({ banners = [], serverUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeBanners = banners.length > 0 ? banners : DEFAULT_BANNERS;

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];
  
  // Base URL image check
  const finalImgUrl = currentBanner.imageUrl.startsWith("/uploads")
    ? `${serverUrl}${currentBanner.imageUrl}`
    : currentBanner.imageUrl;

  return (
    <div className="hero-banner">
      <img src={finalImgUrl} alt={currentBanner.title} className="banner-img" />
      <div className="banner-overlay">
        <span className="badge">{currentBanner.badge || "Exclusive Deal"}</span>
        <h1 className="banner-title">{currentBanner.title}</h1>
        <p className="banner-subtitle">{currentBanner.subtitle}</p>
        <button className="banner-btn">Shop Deals Now</button>
      </div>
      
      {activeBanners.length > 1 && (
        <div className="banner-controls">
          {activeBanners.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`control-dot ${currentIndex === idx ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}