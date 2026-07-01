import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCategory } from '../../../api/categoryApi'
// import { success, error as toastError } from '../../../utils/toast'
import { success, error as toastError } from '../../../utils/toast'
import "../AddProduct.css" // Reusing your stylized workspace input layout templates

export default function AddCategory() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await createCategory({ name: form.name })
      success("Category Added Successfully!")
      setForm({ name: "" })
      navigate("/admin/categories")
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to add category")
    }
  }

  return (
    <form onSubmit={submitHandler} className="add-product-form">
      <h2 className="form-header">Add New Category</h2>

      <div className="input-group" style={{ marginBottom: '20px' }}>
        <input
          name="name"
          value={form.name}
          placeholder="Category name (e.g. Electronics)"
          onChange={handleChange}
          className="form-field"
          required
        />
      </div>

      <button type="submit" className="submit-product-btn">
        Create Category
      </button>
    </form>
  )
}