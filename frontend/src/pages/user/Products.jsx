import React, { useEffect, useState } from "react";
import ProductGrid from "../../components/product/ProductGrid";
import { getProducts } from "../../api/productApi";
import Loader from "../../components/common/Loader";
import "./Products.css";
import ProductSearch from "../../components/product/ProductSearch";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
    console.log(products);
  }, []);

  const filteredProducts = products.filter((product) =>
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

  // if(loading) return <Loader />
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <h2>Loading...</h2>
      </div>
    );
  }
  
  return (
    <div className="products-page-container">
      <ProductSearch search={search} setSearch={setSearch} />

      <h1 className="products-page-title">{/* Products */}</h1>

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
