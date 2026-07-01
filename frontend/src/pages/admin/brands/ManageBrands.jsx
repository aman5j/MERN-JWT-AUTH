import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBrands, deleteBrand as removeBrand } from '../../../api/brandApi'
import BrandTable from './BrandTable'
import DeleteModal from '../../../components/admin/DeleteModal'
import { success, error as toastError } from '../../../utils/toast'
import ProductSearch from '../../../components/product/ProductSearch'
import "../ManageProducts.css" // Reusing your global workspace layout styling file

export default function ManageBrands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  const [activeBrand, setActiveBrand] = useState(null)
  const [search, setSearch] = useState("")

  const filteredBrands = brands.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async () => {
    try {
      const res = await getAllBrands()
      // Directly matching standard response arrays
      setBrands(res.data)
    } catch (err) {
      toastError("Failed to load categories")
      setError(err.response?.data?.message || "Failed to fetch categories details.")
    } finally {
      setLoading(false)
    }
  }

  const triggerModalOpen = (brand) => {
    setActiveBrand(brand)
    setModalOpen(true)
  }

  const confirmDeletionHandler = async () => {
    if (!activeBrand) return
    try {
      await removeBrand(activeBrand._id)
      success("Brand removed successfully")
      setModalOpen(false)
      setActiveBrand(null)
      loadBrands()
    } catch (err) {
      toastError("Delete operation failed")
    }
  }

  if (loading) return <div className="admin-loading">Loading categories data...</div>
  if (error) return <div className="admin-error-banner">{error}</div>

  return (
    <div className="manage-products-wrapper">
      <div className="manage-products-header">
        <h1 className="manage-products-title">Manage Brands</h1>
        <button 
          className="add-product-btn" 
          onClick={() => navigate("/admin/brands/add")}
        >
          Add Brand
        </button>
      </div>

      <ProductSearch search={search} setSearch={setSearch} />
      <h1 className="products-page-title"></h1>

      <BrandTable
        brands={filteredBrands}
        openDeleteModal={triggerModalOpen}
      />

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeletionHandler}
        itemTitle={activeBrand?.name}
      />
    </div>
  )
}