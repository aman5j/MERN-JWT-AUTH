import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBanners, deleteBanner as removeBanner } from '../../../api/bannerApi'
import BannerTable from './BannerTable'
import DeleteModal from '../../../components/admin/DeleteModal'
import { success, error } from '../../../utils/toast'
import "../ManageProducts.css"
import ProductSearch from '../../../components/product/ProductSearch'

export default function ManageBanners() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();

  // Modal Control tracking hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBanner, setActiveBanner] = useState(null);
  const [search, setSearch] = useState("");

  const filteredBanners = banners.filter((banner) =>
    banner.title?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    loadBanners();
  }, [])

  const loadBanners = async () => {
    try {
      const res = await getAllBanners();
      // Adjusting to read res.data.banners if your backend wraps it, or res.data if it's a flat array
      setBanners(res.data.banners || res.data);
    } catch (err) {
      error("Failed to load banners");
      setErrorState(err.response?.data?.message || "Failed to fetch banners details.");
    } finally {
      setLoading(false);
    }
  };

  const triggerModalOpen = (banner) => {
    setActiveBanner(banner);
    setModalOpen(true);
  };

  const confirmDeletionHandler = async () => {
    if (!activeBanner) return;
    try {
      await removeBanner(activeBanner._id);
      success("Banner removed successfully");
      setModalOpen(false);
      setActiveBanner(null);
      loadBanners();
    } catch (err) {
      error("Delete operation failed");
    }
  };

  if (loading) return <div className="admin-loading">Loading banners data...</div>;
  if (errorState) return <div className="admin-error-banner">{errorState}</div>;

  return (
    <div className="manage-products-wrapper">
      <div className="manage-products-header">
        <h1 className="manage-products-title">Manage Banners</h1>
        <button 
          className="add-product-btn" 
          onClick={() => navigate("/admin/banners/add")}
        >
          Add Banner
        </button>
      </div>

      <ProductSearch search={search} setSearch={setSearch} />
      <h1 className="products-page-title">{/* Banners */}</h1>

      <BannerTable
        banners={filteredBanners}
        openDeleteModal={triggerModalOpen}
      />

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeletionHandler}
        itemTitle={activeBanner?.title}
      />
    </div>
  )
}