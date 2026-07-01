import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllBanners, updateBanner } from '../../../api/bannerApi'; // Adjust this path to match your banner API file
import { success, error } from '../../../utils/toast'
import {API_BASE_URL} from '../../../api/axios'; // Adjust this path to match your axios instance file
import '../EditProduct.css';

export default function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    badge: "",
    link: ""
  });

  // State to store and display the single existing image URL path saved on the server
  const [existingImage, setExistingImage] = useState("");

  // Separate state to handle new file data uploads
  const [selectedImage, setSelectedImage] = useState(null);

  // Cleanly extract the base asset URL host string
  const hostUrl = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchBannerDetails = async () => {
      try {
        const res = await getAllBanners();
        // Locate the matching banner item in the collection array
        const bannerList = res.data.banners || res.data;
        const b = bannerList.find(item => item._id === id);

        if (!b) {
          error("Banner not found");
          return navigate("/admin/banners");
        }

        setForm({
          title: b.title || "",
          subtitle: b.subtitle || "",
          badge: b.badge || "",
          link: b.link || ""
        });

        setExistingImage(b.imageUrl || "");
        setLoading(false);
      } catch (err) {
        error("Failed to load banner metadata information");
        navigate("/admin/banners");
      }
    };
    fetchBannerDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("badge", form.badge);
      formData.append("link", form.link);

      // Append new image only if the user picked a new file to override the old one
      if (selectedImage) {
        formData.append("image", selectedImage); // matches upload.single("image") in backend
      }
      
      await updateBanner(id, formData);
      success("Banner updated successfully");
      navigate("/admin/banners");
    } catch (err) {
      error(err.response?.data?.message || "Failed to modify configuration changes");
    }
  };

  if (loading) return <h2 className="edit-loading-indicator">Fetching Banner...</h2>;

  return (
    <div className="edit-product-page">
      <form onSubmit={submitUpdateHandler} className="edit-product-form" encType="multipart/form-data">
        <h2 className="form-header">Modify Banner Attributes</h2>

        <div className="input-group">
          <label className="input-label">Banner Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-field"
          />
        </div>

        <div className="form-row">
          <div className="input-group flex-1">
            <label className="input-label">Subtitle</label>
            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              className="form-field"
            />
          </div>

          <div className="input-group flex-1">
            <label className="input-label">Badge Text</label>
            <input
              name="badge"
              value={form.badge}
              onChange={handleChange}
              className="form-field"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Link Target URL</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            className="form-field"
            required
          />
        </div>

        {/* Displays thumbnail preview of current asset loaded from server */}
        {existingImage && (
          <div className="existing-images-wrapper">
            <label className="input-label">Current Banner Image</label>
            <div className="image-preview-grid">
              <div className="preview-image-container">
                <img 
                  //   src={`${hostUrl}${existingImage}`}
                  src={`${existingImage.startsWith("/uploads") ? `${hostUrl}${existingImage}` : existingImage}`} 
                  alt="Banner preview" 
                  className="preview-thumbnail" 
                  style={{ width: "160px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="file-input-wrapper">
          <label className="file-input-label">Upload New Banner Image (Optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="form-field file-field"
          />
          {selectedImage && (
            <p className="file-count-preview">
              Selected file: {selectedImage.name} (Will overwrite old asset on save)
            </p>
          )}
        </div>

        <div className="edit-form-actions">
          <button 
            type="button" 
            className="cancel-edit-btn" 
            onClick={() => navigate("/admin/banners")}
          >
            Cancel
          </button>
          <button type="submit" className="save-edit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}