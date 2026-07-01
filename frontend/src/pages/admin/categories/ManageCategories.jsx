import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategories, deleteCategory as removeCategory } from '../../../api/categoryApi'
import CategoryTable from './CategoryTable'
import DeleteModal from '../../../components/admin/DeleteModal'
import { success, error as toastError } from '../../../utils/toast'
import ProductSearch from '../../../components/product/ProductSearch'
import "../ManageProducts.css" // Reusing your global workspace layout styling file

export default function ManageCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [search, setSearch] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const res = await getAllCategories()
      // Directly matching standard response arrays
      setCategories(res.data)
    } catch (err) {
      toastError("Failed to load categories")
      setError(err.response?.data?.message || "Failed to fetch categories details.")
    } finally {
      setLoading(false)
    }
  }

  const triggerModalOpen = (category) => {
    setActiveCategory(category)
    setModalOpen(true)
  }

  const confirmDeletionHandler = async () => {
    if (!activeCategory) return
    try {
      await removeCategory(activeCategory._id)
      success("Category removed successfully")
      setModalOpen(false)
      setActiveCategory(null)
      loadCategories()
    } catch (err) {
      toastError("Delete operation failed")
    }
  }

  if (loading) return <div className="admin-loading">Loading categories data...</div>
  if (error) return <div className="admin-error-banner">{error}</div>

  return (
    <div className="manage-products-wrapper">
      <div className="manage-products-header">
        <h1 className="manage-products-title">Manage Categories</h1>
        <button 
          className="add-product-btn" 
          onClick={() => navigate("/admin/categories/add")}
        >
          Add Category
        </button>
      </div>

      <ProductSearch search={search} setSearch={setSearch} />
      <h1 className="products-page-title"></h1>

      <CategoryTable
        categories={filteredCategories}
        openDeleteModal={triggerModalOpen}
      />

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeletionHandler}
        itemTitle={activeCategory?.name}
      />
    </div>
  )
}