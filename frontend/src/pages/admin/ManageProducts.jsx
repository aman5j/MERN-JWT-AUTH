import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, deleteProduct as removeProduct } from '../../api/productApi'
import ProductTable from '../../components/admin/ProductTable'
import DeleteModal from '../../components/admin/DeleteModal'
import { success, error } from '../../utils/toast'
import "./ManageProducts.css"
import ProductSearch from '../../components/product/ProductSearch'

export default function ManageProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Modal Control tracking hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [search, setSearch] = useState("");

    const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    loadProducts();
  }, [])

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products);
      
    } catch (err) {
      error("Failed to load products");
      setError(err.response?.data?.message || "Failed to fetch products details.");
    } finally {
      setLoading(false);
    }
  };

  const triggerModalOpen = (product) => {
    setActiveProduct(product);
    setModalOpen(true);
  };

  const confirmDeletionHandler = async () => {
    if (!activeProduct) return;
    try {
      await removeProduct(activeProduct._id);
      success("Product removed successfully");
      setModalOpen(false);
      setActiveProduct(null);
      loadProducts();
    } catch (err) {
      error("Delete operation failed");
    }
  };

  if (loading) return <div className="admin-loading">Loading products data...</div>;
  if (error) return <div className="admin-error-banner">{error}</div>;

  return (
    <div className="manage-products-wrapper">
      <div className="manage-products-header">
        <h1 className="manage-products-title">Manage Products</h1>
        <button 
          className="add-product-btn" 
          onClick={() => navigate("/admin/products/add")}
        >
          Add Product
        </button>
      </div>

      <ProductSearch search={search} setSearch={setSearch} />
      <h1 className="products-page-title">{/* Products */}</h1>

      <ProductTable
        // products={products}
        products={filteredProducts}
        openDeleteModal={triggerModalOpen}
      />

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeletionHandler}
        itemTitle={activeProduct?.title}
      />
    </div>
  )
}