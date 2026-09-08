import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import API from '../services/api';
import { Trash2, ShoppingBag, ArrowLeft, CheckCircle2, Loader2, MapPin } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');

  const [loadingOrder, setLoadingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 || itemsPrice === 0 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (product, newQty) => {
    dispatch(updateQuantity({ product, qty: Number(newQty) }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/login?redirect=/cart');
      return;
    }

    if (!address || !city || !postalCode || !country) {
      setOrderError('Please fill in all shipping address fields');
      return;
    }

    try {
      setLoadingOrder(true);
      setOrderError(null);

      const orderData = {
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        totalPrice,
      };

      await API.post('/orders', orderData);

      dispatch(clearCart());
      setOrderSuccess(true);
      setLoadingOrder(false);
    } catch (err) {
      setLoadingOrder(false);
      setOrderError(err.response?.data?.message || 'Failed to place order');
    }
  };

  if (orderSuccess) {
    return (
      <div className="page-container flex-column flex-center text-center">
        <div className="success-card">
          <CheckCircle2 size={64} className="text-success mb-4" />
          <h2>Order Placed Successfully!</h2>
          <p className="mt-2 text-muted">Thank you for your purchase. Your order has been recorded.</p>
          <div className="flex-gap mt-6">
            <Link to="/orders" className="btn btn-primary">
              View Order History
            </Link>
            <Link to="/" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} /> Continue Shopping
      </Link>

      <h1 className="page-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={64} className="text-muted mb-4" />
          <h3>Your cart is empty</h3>
          <p>Explore our wide collection and add items to your cart.</p>
          <Link to="/" className="btn btn-primary mt-4">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-column">
            {cartItems.map((item) => (
              <div key={item.product} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="cart-item-info">
                  <Link to={`/product/${item.product}`} className="cart-item-title">
                    {item.name}
                  </Link>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>

                <div className="cart-item-qty">
                  <label>Qty:</label>
                  <select
                    value={item.qty}
                    onChange={(e) => handleQuantityChange(item.product, e.target.value)}
                  >
                    {[...Array(Math.min(item.countInStock || 10, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cart-item-subtotal">
                  ${(item.price * item.qty).toFixed(2)}
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.product)}
                  className="btn btn-delete"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout & Order Summary Column */}
          <div className="cart-summary-column">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <hr className="divider" />

              <h4>
                <MapPin size={16} className="icon-mr" /> Shipping Details
              </h4>

              {orderError && <div className="error-alert mt-2 mb-2">{orderError}</div>}

              <form onSubmit={handlePlaceOrder} className="shipping-form">
                <div className="form-group">
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    required
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingOrder}
                  className="btn btn-primary btn-block btn-large mt-4"
                >
                  {loadingOrder ? (
                    <Loader2 className="spinner" size={18} />
                  ) : !userInfo ? (
                    'Login to Place Order'
                  ) : (
                    'Place Order'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
