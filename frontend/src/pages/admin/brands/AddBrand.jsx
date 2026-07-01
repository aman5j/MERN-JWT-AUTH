import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBrand } from '../../../api/brandApi'
// import { success, error as toastError } from '../../../utils/toast'
import { success, error as toastError } from '../../../utils/toast'
import "../AddProduct.css" // Reusing your stylized workspace input layout templates

export default function AddBrand() {
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
      await createBrand({ name: form.name })
      success("Brand Added Successfully!")
      setForm({ name: "" })
      navigate("/admin/brands")
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to add brand")
    }
  }

  return (
    <form onSubmit={submitHandler} className="add-product-form">
      <h2 className="form-header">Add New Brand</h2>

      <div className="input-group" style={{ marginBottom: '20px' }}>
        <input
          name="name"
          value={form.name}
          placeholder="Brand name (e.g. LogiTech)"
          onChange={handleChange}
          className="form-field"
          required
        />
      </div>

      <button type="submit" className="submit-product-btn">
        Create Brand
      </button>
    </form>
  )
}