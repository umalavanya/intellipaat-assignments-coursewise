import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, setPriorityFilter } from '../store/slices/taskSlice';
import {
  LayoutDashboard,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Filter,
  Layers,
  Database
} from 'lucide-react';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const { statusFilter, priorityFilter, stats } = useSelector((state) => state.tasks);

  if (!isSidebarOpen) return null;

  const statusItems = [
    { key: 'all', label: 'All Tasks', icon: LayoutDashboard, count: stats.total, color: '#818cf8' },
    { key: 'pending', label: 'Pending', icon: Clock, count: stats.pending, color: '#fbbf24' },
    { key: 'in-progress', label: 'In Progress', icon: Flame, count: stats.inProgress, color: '#38bdf8' },
    { key: 'completed', label: 'Completed', icon: CheckCircle2, count: stats.completed, color: '#34d399' }
  ];

  const priorityItems = [
    { key: 'all', label: 'All Priorities' },
    { key: 'high', label: 'High Priority', color: '#fb7185' },
    { key: 'medium', label: 'Medium Priority', color: '#818cf8' },
    { key: 'low', label: 'Low Priority', color: '#9ca3af' }
  ];

  return (
    <aside className="glass-panel" style={{
      width: '260px',
      borderRadius: 0,
      borderTop: 0,
      borderLeft: 0,
      borderBottom: 0,
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      flexShrink: 0
    }}>

      {/* Status Nav */}
      <div>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--text-subdued)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          paddingLeft: '12px',
          display: 'block',
          marginBottom: '10px'
        }}>
          Status Filter
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {statusItems.map((item) => {
            const Icon = item.icon;
            const isActive = statusFilter === item.key;
            return (
              <button
                key={item.key}
                onClick={() => dispatch(setStatusFilter(item.key))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  background: isActive ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                  transition: 'var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} style={{ color: item.color }} />
                  <span>{item.label}</span>
                </div>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  background: isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                  color: '#fff'
                }}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--text-subdued)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          paddingLeft: '12px',
          display: 'block',
          marginBottom: '10px'
        }}>
          Priority Level
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {priorityItems.map((p) => {
            const isActive = priorityFilter === p.key;
            return (
              <button
                key={p.key}
                onClick={() => dispatch(setPriorityFilter(p.key))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: p.color || 'var(--text-subdued)'
                }}></div>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Info Footer */}
      <div style={{ marginTop: 'auto', padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--bg-glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Database size={16} className="text-emerald-400" style={{ color: '#34d399' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>MERN Stack Active</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-subdued)' }}>
          MongoDB • Express • React Vite • Node.js • Redux Toolkit
        </p>
      </div>

    </aside>
  );
};

export default Sidebar;
