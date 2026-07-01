import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { getAllCategories, updateCategory } from '../../../api/categoryApi'
import { getAllBrands, updateBrand } from '../../../api/brandApi'
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
    const fetchBrandsDetails = async () => {
      try {
        const res = await getAllBrands()
        const targetBrand = res.data.find((brand) => brand._id === id)
        
        if (targetBrand) {
          setForm({ name: targetBrand.name })
        } else {
          toastError("Target Category not found")
          navigate("/admin/brands")
        }
        setLoading(false)
      } catch (err) {
        toastError("Failed to load category information")
        navigate("/admin/brands")
      }
    }
    fetchBrandsDetails()
  }, [id, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitUpdateHandler = async (e) => {
    e.preventDefault()
    try {
      await updateBrand(id, { name: form.name })
      success("Brand updated successfully")
      navigate("/admin/brands")
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to modify structural entry changes")
    }
  }

  if (loading) return <h2 className="edit-loading-indicator">Fetching Brand...</h2>

  return (
    <div className="edit-product-page">
      <form onSubmit={submitUpdateHandler} className="edit-product-form">
        <h2 className="form-header">Modify Brand Attributes</h2>

        <div className="input-group">
          <label className="input-label">Brand Name</label>
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
            onClick={() => navigate("/admin/brands")}
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