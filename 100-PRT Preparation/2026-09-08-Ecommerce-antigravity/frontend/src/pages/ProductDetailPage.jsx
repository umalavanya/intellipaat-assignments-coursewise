import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, Loader2 } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: Number(qty),
      })
    );
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading-state">
        <Loader2 className="spinner" size={36} />
        <p>Fetching product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container flex-column flex-center">
        <div className="error-alert">{error || 'Product not found'}</div>
        <Link to="/" className="btn btn-outline mt-4">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} /> Back to Products
      </Link>

      <div className="detail-grid">
        <div className="detail-image-box">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="badge-pill">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <Star size={18} fill="currentColor" className="star-icon" />
            <span>{product.rating || 4.5} Rating</span>
            <span className="stock-badge">
              {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
            </span>
          </div>

          <div className="detail-price">${product.price?.toFixed(2)}</div>
          <p className="detail-description">{product.description}</p>

          {product.countInStock > 0 && (
            <div className="qty-selector-group">
              <label>Quantity:</label>
              <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="btn btn-primary btn-large btn-block"
          >
            <ShoppingCart size={20} />
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <div className="value-props">
            <div className="prop-item">
              <Truck size={18} /> Free Express Shipping on orders over $50
            </div>
            <div className="prop-item">
              <ShieldCheck size={18} /> 30-Day Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
