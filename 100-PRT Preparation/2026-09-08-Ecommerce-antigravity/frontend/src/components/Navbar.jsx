import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { ShoppingBag, User, LogOut, PackageCheck, Store } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <Store className="brand-icon" size={28} />
          <span>AuraStore</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Products</Link>
          
          {userInfo && (
            <Link to="/orders" className="nav-link flex-center">
              <PackageCheck size={18} className="icon-mr" />
              My Orders
            </Link>
          )}

          <Link to="/cart" className="cart-btn">
            <ShoppingBag size={20} />
            <span className="cart-text">Cart</span>
            {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
          </Link>

          {userInfo ? (
            <div className="user-menu">
              <span className="user-greeting">
                <User size={16} /> {userInfo.name}
              </span>
              <button onClick={handleLogout} className="btn btn-logout" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
