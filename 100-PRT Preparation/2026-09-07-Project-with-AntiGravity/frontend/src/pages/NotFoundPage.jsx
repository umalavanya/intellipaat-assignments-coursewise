import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div className="glass-panel" style={{ padding: '48px', maxWidth: '440px', borderRadius: '24px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(244, 63, 94, 0.15)',
          color: '#fb7185',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <AlertCircle size={32} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900 }} className="gradient-text">404</h1>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '8px 0 16px' }}>Page Not Found</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ width: '100%' }}>
          <ArrowLeft size={18} />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
