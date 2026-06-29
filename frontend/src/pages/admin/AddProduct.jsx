import React, { useEffect, useState} from 'react'
import { createProducts } from '../../api/productApi'
import { success, error } from '../../utils/toast'
import "./AddProduct.css"


export default function AddProduct() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",       // Added based on schema
        stock: "",
        rating: "" // ADDED: rating state field
    })


    // Separate state to handle selected files
    const [selectedImages, setSelectedImages] = useState([]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Handle file selection change
    const handleFileChange = (e) => {
        // Convert FileList object into a standard array
        setSelectedImages(Array.from(e.target.files));
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            // Create a FormData object instead of a standard JSON object
            const formData = new FormData();

            // Append regular text fields
            formData.append("title", form.title);
            // console.log(formData);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("brand", form.brand);
            formData.append("stock", form.stock);
            formData.append("rating", form.rating); // ADDED: append rating to FormData

            // Append files. The key "images" must match what your backend Multer expects
            selectedImages.forEach((image) => {
                formData.append("images", image);
            });

            // console.log(formData);

            // Pass the formData object directly to your API handler
            await createProducts(formData);

            success("Product Added Successfully with Images!");

            // Reset form states
            setForm({ title: "", description: "", price: "", category: "", brand: "", stock: "", rating: "" });
            setSelectedImages([]);
            e.target.reset(); // Resets the actual file input UI element


        } catch (err) {
            error(err.response?.data?.message || "Failed to add product");
        }
    }


  return (
    <form onSubmit={submitHandler} className="add-product-form" encType="multipart/form-data">
        <h2 className="form-header">Add New Product</h2>

        <input
            name="title"
            value={form.title}
            placeholder="Product name"
            onChange={handleChange}
            className="form-field"
            required
      />

        <div className="form-row">
            <input
            name="brand"
            value={form.brand}
            placeholder="Brand"
            onChange={handleChange}
            className="form-field"
            required
            />

            <input
            name="category"
            value={form.category}
            placeholder="Category"
            onChange={handleChange}
            className="form-field"
            required
            />
        </div>

        <div className="form-row">
            <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            placeholder="Price (₹)"
            onChange={handleChange}
            className="form-field"
            required
            />

            <input
            name="stock"
            type="number"
            value={form.stock}
            placeholder="Stock Quantity"
            onChange={handleChange}
            className="form-field"
            required
            />

            {/* ADDED: Rating input field */}
            <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={form.rating}
            placeholder="Rating (0 - 5)"
            onChange={handleChange}
            className="form-field"
            required
            />
            
        </div>

        {/* CHANGED: File picker interface */}
        <div className="file-input-wrapper">
            <label className="file-input-label">Product Images</label>
            <input
                type='file'
                name='images'
                accept='image/*'
                multiple // Allows selecting more than one image file at a time
                onChange={handleFileChange}
                className="form-field file-field"
                required
            />
            {selectedImages.length > 0 && (
                <p className="file-count-preview">
                    {selectedImages.length} file(s) selected for upload
                </p>
            )}
        </div>

      <textarea
        name="description"
        value={form.description}
        placeholder="Product Description..."
        onChange={handleChange}
        className="form-field textarea-field"
        required
      />

      <button type="submit" className="submit-product-btn">
        Create Product
      </button>
    </form>
  )
}
