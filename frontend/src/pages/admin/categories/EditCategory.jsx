import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllCategories, updateCategory } from '../../../api/categoryApi'
import { success, error as toastError } from '../../../utils/toast'
import '../EditProduct.css' // Reusing modification panel styles

export default function EditCategory() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: ""
  })

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const res = await getAllCategories()
        const targetCategory = res.data.find((cat) => cat._id === id)
        
        if (targetCategory) {
          setForm({ name: targetCategory.name })
        } else {
          toastError("Target Category not found")
          navigate("/admin/categories")
        }
        setLoading(false)
      } catch (err) {
        toastError("Failed to load category information")
        navigate("/admin/categories")
      }
    }
    fetchCategoryDetails()
  }, [id, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitUpdateHandler = async (e) => {
    e.preventDefault()
    try {
      await updateCategory(id, { name: form.name })
      success("Category updated successfully")
      navigate("/admin/categories")
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to modify structural entry changes")
    }
  }

  if (loading) return <h2 className="edit-loading-indicator">Fetching Category...</h2>

  return (
    <div className="edit-product-page">
      <form onSubmit={submitUpdateHandler} className="edit-product-form">
        <h2 className="form-header">Modify Category Attributes</h2>

        <div className="input-group">
          <label className="input-label">Category Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-field"
            required
          />
        </div>

        <div className="edit-form-actions">
          <button 
            type="button" 
            className="cancel-edit-btn" 
            onClick={() => navigate("/admin/categories")}
          >
            Cancel
          </button>
          <button type="submit" className="save-edit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}