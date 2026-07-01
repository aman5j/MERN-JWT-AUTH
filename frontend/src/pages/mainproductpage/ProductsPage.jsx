import React, { useState, useEffect } from 'react';
import API, {API_BASE_URL} from '../../api/axios';
import { dummyProducts } from './DummyData';

import { getProducts } from '../../api/productApi';
import { getAllBanners } from '../../api/bannerApi';
import { getAllBrands } from '../../api/brandApi';
import { getAllCategories } from '../../api/categoryApi';

import BannerComponent from './BannerComponent';
import CategoryComponent from './CategoryComponent';
import BrandsComponent from './BrandsComponent';
import ProductsGrid from './ProductsGrid';
import './ProductsPage.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [brands, setBrands] = useState(["ALL Brands"]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");

  // Parse root addresses exactly like the custom card asset handles it
  const SERVER_ROOT_URL = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        // const [prodRes, bannerRes, catRes, brandRes] = await Promise.all([
        //   API.get('/products'), // Adjust to your actual products path endpoint if different
        //   API.get('/banners'),
        //   API.get('/categories'),
        //   API.get('/brands')
        // ]);

        const bannerRes = await getAllBanners();
        const catRes = await getAllCategories();
        const brandRes = await getAllBrands();

        // console.log(bannerRes.data)
        // console.log(catRes.data)
        // console.log(brandRes.data)

        // setProducts(prodRes.data);
        setBanners(bannerRes.data);
        
        // Transform incoming model list entries back to primitive lookup string arrays
        setCategories(["All", ...catRes.data.map(c => c.name)]);
        setBrands(["All Brands", ...brandRes.data.map(b => b.name)]);
      } catch (error) {
        console.error("Error retrieving metadata arrays from server:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);


   useEffect(() => {
      loadProducts();
      console.log(products);
    }, []);
  
    const filteredProductsbysearchbar = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
  
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  


  // Dynamic Filtering Logic
//   const filteredProducts = dummyProducts.filter(product => {
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All Brands" || product.brand === selectedBrand;
    const matchesTitle = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesBrand && matchesTitle;
  });

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All Brands");
  };

//   if (loading) {
//     return <div className="loading-state" style={{ padding: '4rem', textAlign: 'center' }}>Loading Marketplace Assets...</div>;
//   }

  return (
    <div className="store-page-container">
      <BannerComponent banners={banners} serverUrl={SERVER_ROOT_URL} />

      <div className="main-content-wrapper">
        <CategoryComponent 
          categories={categories}
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        <div className="layout-split">
          <BrandsComponent 
            brands={brands}
            selectedBrand={selectedBrand} 
            onSelectBrand={setSelectedBrand} 
          />
          
          <ProductsGrid 
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            // onClearFilters={handleClearFilters}
            onClearFilters={() => { setSelectedCategory("All"); setSelectedBrand("All Brands"); }}
            loading={loading}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
    </div>
  );
}