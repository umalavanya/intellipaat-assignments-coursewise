import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { setSearchQuery } from '../store/slices/taskSlice';
import { openCreateTaskModal, toggleSidebar, showToast } from '../store/slices/uiSlice';
import {
  CheckSquare,
  Search,
  Plus,
  LogOut,
  Menu,
  User,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.tasks);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ type: 'info', message: 'Logged out successfully' }));
  };

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '14px 28px', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        
        {/* Left Branding & Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => dispatch(toggleSidebar())} className="btn-icon">
            <Menu size={22} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
            }}>
              <CheckSquare size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1.1 }} className="gradient-text">
                TaskPulse
              </h1>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-subdued)', fontWeight: 600, letterSpacing: '0.05em' }}>
                FULLSTACK MANAGER
              </span>
            </div>
          </div>
        </div>

        {/* Center Search Input */}
        <div style={{ flex: 1, maxWidth: '420px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subdued)' }} />
          <input
            type="text"
            placeholder="Search tasks, descriptions, tags..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="input-field"
            style={{ paddingLeft: '42px', height: '40px', fontSize: '0.88rem' }}
          />
        </div>

        {/* Right User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => dispatch(openCreateTaskModal())}
            className="btn btn-primary"
            style={{ height: '40px', padding: '0 16px', fontSize: '0.85rem' }}
          >
            <Plus size={18} />
            <span>New Task</span>
          </button>

          <div style={{ height: '24px', width: '1px', background: 'var(--bg-glass-border)' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
              fontWeight: 700
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div style={{ display: 'none', flexDirection: 'column', mdDisplay: 'flex' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{user?.name || 'User'}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{user?.email}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-icon" title="Logout" style={{ color: '#fb7185' }}>
            <LogOut size={20} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
