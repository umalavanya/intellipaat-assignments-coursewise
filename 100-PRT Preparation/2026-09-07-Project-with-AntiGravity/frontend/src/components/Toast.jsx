import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../store/slices/uiSlice';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="text-emerald-400" size={20} style={{ color: '#34d399' }} />;
      case 'error':
        return <AlertCircle className="text-rose-400" size={20} style={{ color: '#fb7185' }} />;
      default:
        return <Info className="text-cyan-400" size={20} style={{ color: '#38bdf8' }} />;
    }
  };

  return (
    <div className="toast-container">
      <div className="toast">
        {getIcon()}
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
        <button onClick={() => dispatch(hideToast())} className="btn-icon" style={{ marginLeft: 'auto' }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
