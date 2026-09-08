import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { Search, Loader2, Sparkles } from 'lucide-react';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-badge">
          <Sparkles size={14} /> New Collection 2026
        </div>
        <h1>Elevate Your Everyday Style & Electronics</h1>
        <p>Curated premium tech, apparel, and lifestyle accessories delivered fast.</p>
        
        {/* Search & Filter */}
        <div className="search-filter-wrapper">
          <div className="search-input-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="products-section">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={36} />
            <p>Loading catalog...</p>
          </div>
        ) : error ? (
          <div className="error-alert">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try searching for something else or clear your filters.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
