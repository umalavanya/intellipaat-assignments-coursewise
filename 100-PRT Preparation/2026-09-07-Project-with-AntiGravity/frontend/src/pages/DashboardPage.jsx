import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, fetchTaskStats } from '../store/slices/taskSlice';
import { openCreateTaskModal } from '../store/slices/uiSlice';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskStatsCards from '../components/TaskStatsCards';
import TaskFilters from '../components/TaskFilters';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import { Plus, CheckSquare, Sparkles, Inbox } from 'lucide-react';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const {
    items,
    statusFilter,
    priorityFilter,
    searchQuery,
    sortBy,
    viewMode,
    isLoading
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchTasks({
        status: statusFilter,
        priority: priorityFilter,
        search: searchQuery,
        sortBy
      })
    );
  }, [dispatch, statusFilter, priorityFilter, searchQuery, sortBy]);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="page-wrapper">
          
          {/* Dashboard Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Task Overview</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Track progress, manage priorities, and complete your objectives.
              </p>
            </div>
            <button
              onClick={() => dispatch(openCreateTaskModal())}
              className="btn btn-primary"
            >
              <Plus size={18} />
              <span>Add Task</span>
            </button>
          </div>

          {/* Stats Overview */}
          <TaskStatsCards />

          {/* Filters & View Switcher */}
          <TaskFilters />

          {/* Task Grid / List View */}
          {isLoading ? (
            <div className="task-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="glass-card"
                  style={{
                    height: '180px',
                    animation: 'pulse 1.5s infinite ease-in-out',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', marginTop: '20px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#818cf8',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Inbox size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>No Tasks Found</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 20px' }}>
                {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? 'No tasks match your current filter or search criteria. Try resetting filters.'
                  : 'Your task list is empty! Click below to create your first task.'}
              </p>
              <button onClick={() => dispatch(openCreateTaskModal())} className="btn btn-primary">
                <Plus size={18} />
                <span>Create First Task</span>
              </button>
            </div>
          ) : (
            <div className={viewMode === 'list' ? 'task-list' : 'task-grid'}>
              {items.map((task) => (
                <TaskCard key={task._id} task={task} viewMode={viewMode} />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Task Modal */}
      <TaskFormModal />
    </div>
  );
};

export default DashboardPage;
