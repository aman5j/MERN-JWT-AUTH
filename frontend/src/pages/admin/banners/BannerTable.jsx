import React from 'react'
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/axios'; // Adjust this path to point to your axios instance file
import "../../../components/admin/ProductTable.css"

export default function BannerTable({ banners, openDeleteModal }) {
  const navigate = useNavigate();

  // Strip trailing '/api' from the base URL to construct the absolute image directory route
  const hostUrl = API_BASE_URL.replace("/api", "");

//   // Base URL image check
//   const finalImgUrl = banners.imageUrl.startsWith("/uploads")
//     ? `${hostUrl}${banners.imageUrl}`
//     : banners.imageUrl;


  return (
    <div className="table-responsive">
      <table className="product-admin-table">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Badge</th>
            <th>Link Target</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner._id}>
              <td>
                {banner.imageUrl ? (
                  <img 
                    // src={`${hostUrl}${banner.imageUrl}`} 
                    // src={`${banner.imageUrl.startsWith("/uploads") ? hostUrl : ""}${banner.imageUrl}`} 
                    // src={banner.imageUrl} 
                    src={`${banner.imageUrl.startsWith("/uploads") ? `${hostUrl}${banner.imageUrl}` : banner.imageUrl}`} 
                    alt={banner.title || "Banner"} 
                    style={{ 
                      width: "80px", 
                      height: "40px", 
                      objectFit: "cover", 
                      borderRadius: "4px",
                      border: "1px solid #eaeaea",
                      display: "block"
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "12px", color: "#888" }}>No Image</span>
                )}
              </td>
              <td>{banner.title || "—"}</td>
              <td>{banner.subtitle || "—"}</td>
              <td>{banner.badge || "—"}</td>
              <td>
                <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#666" }}>
                  {banner.link || "—"}
                </span>
              </td>
              <td>
                <div className="table-actions-cell">
                  <button 
                    onClick={() => navigate(`/admin/banners/edit/${banner._id}`)} 
                    className="edit-action-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(banner)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}