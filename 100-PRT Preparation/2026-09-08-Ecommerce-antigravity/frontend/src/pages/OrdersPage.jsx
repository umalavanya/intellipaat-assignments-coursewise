import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { PackageCheck, Loader2, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <Loader2 className="spinner" size={36} />
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">
        <PackageCheck className="title-icon" size={32} /> My Orders
      </h1>

      {error ? (
        <div className="error-alert">{error}</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <h3>No past orders found</h3>
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="btn btn-primary mt-4">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <strong>Order ID:</strong> #{order._id}
                </div>
                <div className="order-date">
                  <Calendar size={14} className="icon-mr" />
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="order-status-badge">
                  <CheckCircle size={14} /> Paid & Confirmed
                </div>
              </div>

              <div className="order-body">
                <div className="order-items-grid">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-item-details">
                        <span className="name">{item.name}</span>
                        <span className="qty-price">
                          {item.qty} x ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="shipping-info">
                    <MapPin size={14} className="icon-mr" />
                    <span>
                      {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.country}
                    </span>
                  </div>
                  <div className="order-total">
                    Total: <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
