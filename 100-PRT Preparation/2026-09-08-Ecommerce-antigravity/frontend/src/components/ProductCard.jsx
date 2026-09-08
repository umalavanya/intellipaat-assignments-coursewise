import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      })
    );
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-img-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-category">{product.category}</span>
      </Link>

      <div className="product-content">
        <div className="product-rating">
          <Star size={14} className="star-icon" fill="currentColor" />
          <span>{product.rating || 4.5}</span>
        </div>

        <Link to={`/product/${product._id}`} className="product-title">
          {product.name}
        </Link>

        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button onClick={handleAddToCart} className="btn btn-add-cart">
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
