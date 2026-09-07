import React from 'react';
import { useSelector } from 'react-redux';
import { Layers, Flame, CheckCircle2, AlertCircle } from 'lucide-react';

const TaskStatsCards = () => {
  const { stats } = useSelector((state) => state.tasks);

  const cards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Layers,
      color: '#6366f1',
      bgGlow: 'rgba(99, 102, 241, 0.12)',
      border: 'rgba(99, 102, 241, 0.3)'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Flame,
      color: '#06b6d4',
      bgGlow: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.3)'
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: AlertCircle,
      color: '#f43f5e',
      bgGlow: 'rgba(244, 63, 94, 0.12)',
      border: 'rgba(244, 63, 94, 0.3)'
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {cards.map((c, index) => {
        const Icon = c.icon;
        return (
          <div
            key={index}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: c.bgGlow,
              borderColor: c.border
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {c.title}
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
                {c.value}
              </h3>
            </div>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: c.color
            }}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskStatsCards;
