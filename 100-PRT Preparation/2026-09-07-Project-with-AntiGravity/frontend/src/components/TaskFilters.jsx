import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  setViewMode
} from '../store/slices/taskSlice';
import { LayoutGrid, List, ArrowUpDown, Filter } from 'lucide-react';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { statusFilter, priorityFilter, sortBy, viewMode } = useSelector(
    (state) => state.tasks
  );

  const statuses = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div
      className="glass-panel"
      style={{
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '20px'
      }}
    >
      {/* Status Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {statuses.map((s) => {
          const isActive = statusFilter === s.key;
          return (
            <button
              key={s.key}
              onClick={() => dispatch(setStatusFilter(s.key))}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                fontSize: '0.84rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#fff' : 'var(--text-muted)',
                background: isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                border: isActive ? '1px solid var(--accent-primary-hover)' : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'var(--transition-fast)'
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Controls: Priority, Sort By, View Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        
        {/* Priority Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={16} style={{ color: 'var(--text-subdued)' }} />
          <select
            value={priorityFilter}
            onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
            className="input-field"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
          >
            <option value="all" style={{ background: '#1e293b' }}>All Priorities</option>
            <option value="high" style={{ background: '#1e293b' }}>High Priority</option>
            <option value="medium" style={{ background: '#1e293b' }}>Medium Priority</option>
            <option value="low" style={{ background: '#1e293b' }}>Low Priority</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowUpDown size={16} style={{ color: 'var(--text-subdued)' }} />
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="input-field"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
          >
            <option value="createdAt" style={{ background: '#1e293b' }}>Newest First</option>
            <option value="dueDate" style={{ background: '#1e293b' }}>Due Date</option>
            <option value="priority" style={{ background: '#1e293b' }}>Highest Priority</option>
            <option value="title" style={{ background: '#1e293b' }}>Alphabetical</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '2px', border: '1px solid var(--bg-glass-border)' }}>
          <button
            onClick={() => dispatch(setViewMode('grid'))}
            className="btn-icon"
            style={{
              background: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
              padding: '6px'
            }}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => dispatch(setViewMode('list'))}
            className="btn-icon"
            style={{
              background: viewMode === 'list' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'list' ? '#fff' : 'var(--text-muted)',
              padding: '6px'
            }}
          >
            <List size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaskFilters;
