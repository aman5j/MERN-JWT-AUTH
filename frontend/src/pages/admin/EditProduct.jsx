import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProducts } from '../../api/productApi';
import { success, error } from '../../utils/toast';
import { getAllCategories } from '../../api/categoryApi'
import { getAllBrands } from '../../api/brandApi'

import './EditProduct.css';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    rating: "" // ADDED: rating state field
  });

  // State arrays to house drop-down records from the database
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

   // Fetch drop-down collections from the database on component load
      useEffect(() => {
          const fetchDropdownData = async () => {
              try {
                  const categoriesResponse = await getAllCategories();    
                  const brandsResponse = await getAllBrands();
                  setCategories(categoriesResponse.data.categories || categoriesResponse.data);
                  setBrands(brandsResponse.data.brands || brandsResponse.data);
                  // console.log("Fetched categories:", categoriesResponse.data);
                  // console.log("Fetched brands:", brandsResponse.data);    
              } catch(err) {
                  error("Failed to fetch categories or brands");
              }
          }
          fetchDropdownData();
      },[])


  // NEW: State to store and display existing images already saved on the server
  const [existingImages, setExistingImages] = useState([]);

  // ADDED: Separate state to handle new file updates
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await getProductById(id);
        const p = res.data.product;
        setForm({
          title: p.title || "",
          description: p.description || "",
          price: p.price || "",
          category: p.category || "",
          brand: p.brand || "",
          stock: p.stock || "",
          rating: p.rating || "",
        });

        // UPDATED: Assuming your backend schema stores an array of image URLs/paths in p.images
        setExistingImages(p.images || []);

        setLoading(false);
      } catch (err) {
        error("Failed to load product metadata information");
        navigate("/admin/products");
      }
    };
    fetchProductDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADDED: Handle image selector shifts
  const handleFileChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      // const updatedData = {
      //   ...form,
      //   price: Number(form.price),
      //   stock: Number(form.stock),
      //   rating: Number(form.rating)
      // };

      // CHANGED: Use FormData to properly transport images alongside textual fields
      const formData = new FormData();
      
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", Number(form.price));
      formData.append("category", form.category);
      formData.append("brand", form.brand);
      formData.append("stock", Number(form.stock));
      formData.append("rating", Number(form.rating));

      // Append files only if user picked new pictures to upload
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
      
      // await updateProducts(id, updatedData);
      await updateProducts(id, formData);
      success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      error(err.response?.data?.message || "Failed to modify configuration changes");
    }
  };

  if (loading) return <h2 className="edit-loading-indicator">Fetching Product...</h2>;

  return (
    <div className="edit-product-page">
      {/* ADDED: encType="multipart/form-data" safely handles structural binary attachments */}
      <form onSubmit={submitUpdateHandler} className="edit-product-form" encType="multipart/form-data">
        <h2 className="form-header">Modify Product Attributes</h2>

        <div className="input-group">
          <label className="input-label">Product Name</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-field"
            required
          />
        </div>

        <div className="form-row">
          <div className="input-group flex-1">
            <label className="input-label">Brand</label>
            <select
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="form-field"
              required
            >
              <option value="" disabled>Select Brand</option>
              {brands.map((b) => (
                <option key={b._id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            {/* <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="form-field"
              required
            /> */}
          </div>

          <div className="input-group flex-1">
            <label className="input-label">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-field"
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {/* <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-field"
              required
            /> */}
          </div>
        </div>

        {/* UPDATED: Structured into a 3-column layout matching the AddProduct configuration layout */}
        <div className="form-row">
          <div className="input-group flex-1">
            <label className="input-label">Price (₹)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="form-field"
              required
            />
          </div>

          <div className="input-group flex-1">
            <label className="input-label">Stock Units</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="form-field"
              required
            />
          </div>

          {/* ADDED: Rating edit input layout matching validation specifications */}
          <div className="input-group flex-1">
            <label className="input-label">Rating (0 - 5)</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={handleChange}
              className="form-field"
              required
            />
          </div>

        </div>

        {/* NEW: Displays a gallery of current active backend pictures */}
        {existingImages.length > 0 && (
          <div className="existing-images-wrapper">
            <label className="input-label">Current Product Images</label>
            <div className="image-preview-grid">
              {existingImages.map((imgUrl, index) => (
                <div key={index} className="preview-image-container">
                  <img 
                    // src={imgUrl} 
                    src={imgUrl.startsWith("/uploads/images") ? `http://localhost:5000${imgUrl}` : imgUrl}
                    alt={`Product preview ${index + 1}`} 
                    className="preview-thumbnail" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="file-input-wrapper">
          <label className="file-input-label">Upload New Images (Will replace existing pictures)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="form-field file-field"
          />
          {selectedImages.length > 0 && (
            <p className="file-count-preview">
              {selectedImages.length} new file(s) selected for override replacement
            </p>
          )}
        </div>

        {/* ADDED: File picker interface for replacing/updating images */}
        {/* <div className="file-input-wrapper">
          <label className="file-input-label">Update Product Images (Optional)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="form-field file-field"
          />
          {selectedImages.length > 0 && (
            <p className="file-count-preview">
              {selectedImages.length} new file(s) selected for override replacement
            </p>
          )}
        </div> */}


        <div className="input-group">
          <label className="input-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-field textarea-field"
            required
          />
        </div>

        <div className="edit-form-actions">
          <button 
            type="button" 
            className="cancel-edit-btn" 
            onClick={() => navigate("/admin/products")}
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