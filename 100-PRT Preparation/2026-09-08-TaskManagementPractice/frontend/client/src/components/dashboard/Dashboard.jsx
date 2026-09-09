import { useAuth } from '../../context/AuthContext'
import Navbar from '../common/Navbar'
import { Home, Users, Settings, BarChart } from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    { icon: BarChart, label: 'Total Users', value: '2,847', color: '#667eea' },
    { icon: Users, label: 'Active Sessions', value: '1,234', color: '#48bb78' },
    { icon: Home, label: 'Visits', value: '8,921', color: '#ed8936' },
    { icon: Settings, label: 'Settings', value: '24', color: '#9f7aea' },
  ]

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
          <p>Here's what's happening with your account today.</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ background: stat.color }}>
                <stat.icon size={24} color="white" />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Recent Activity</h2>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div>
                <p className="activity-title">User login</p>
                <p className="activity-time">2 minutes ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div>
                <p className="activity-title">Profile updated</p>
                <p className="activity-time">1 hour ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div>
                <p className="activity-title">New message</p>
                <p className="activity-time">3 hours ago</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="quick-action-btn">View Profile</button>
              <button className="quick-action-btn">Edit Settings</button>
              <button className="quick-action-btn">View Reports</button>
              <button className="quick-action-btn">Help Center</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard