import React, { useState } from 'react'
import { createBanner } from '../../../api/bannerApi' // Adjust this path to match your banner API file
import { success, error } from '../../../utils/toast' // Adjust this path to match your toast utility file
import "../AddProduct.css"

export default function AddBanner() {
    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        badge: "Summer Collection 2026", // Default value matching your schema
        link: "#"                        // Default value matching your schema
    })

    // State to handle the single uploaded banner file
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        // Capture the single file selected by the administrator
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!selectedImage) {
            return error("Please select a banner image to upload.");
        }

        try {
            const formData = new FormData();

            // Append standard text field attributes
            formData.append("title", form.title);
            formData.append("subtitle", form.subtitle);
            formData.append("badge", form.badge);
            formData.append("link", form.link);

            // Append the single file matching your backend Multer config endpoint string name
            formData.append("image", selectedImage);

            // Forward the multipart payload straight to your Axios wrapper
            await createBanner(formData);

            success("Banner Created Successfully!");

            // Reset form input values back to baseline states
            setForm({ 
                title: "", 
                subtitle: "", 
                badge: "Summer Collection 2026", 
                link: "#" 
            });
            setSelectedImage(null);
            e.target.reset(); // Safely clears the file input label interface natively

        } catch (err) {
            error(err.response?.data?.message || "Failed to add banner");
        }
    }

  return (
    <form onSubmit={submitHandler} className="add-product-form" encType="multipart/form-data">
        <h2 className="form-header">Add New Banner</h2>

        <input
            name="title"
            value={form.title}
            placeholder="Banner Title (Optional)"
            onChange={handleChange}
            className="form-field"
        />

        <div className="form-row">
            <input
                name="subtitle"
                value={form.subtitle}
                placeholder="Subtitle (Optional)"
                onChange={handleChange}
                className="form-field"
            />

            <input
                name="badge"
                value={form.badge}
                placeholder="Badge Text"
                onChange={handleChange}
                className="form-field"
                required
            />
        </div>

        <div className="form-row">
            <input
                name="link"
                value={form.link}
                placeholder="Link URL Target (e.g., /shop or #)"
                onChange={handleChange}
                className="form-field"
                required
            />
        </div>

        <div className="file-input-wrapper">
            <label className="file-input-label">Banner Asset Image</label>
            <input
                type='file'
                name='image'
                accept='image/*'
                onChange={handleFileChange}
                className="form-field file-field"
                required
            />
            {selectedImage && (
                <p className="file-count-preview">
                    File selected: {selectedImage.name}
                </p>
            )}
        </div>

      <button type="submit" className="submit-product-btn">
        Create Banner
      </button>
    </form>
  )
}