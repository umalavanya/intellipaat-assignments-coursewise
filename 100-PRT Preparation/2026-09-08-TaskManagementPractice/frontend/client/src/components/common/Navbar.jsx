import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  User,
  Home
} from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: LayoutDashboard, label: 'Projects', path: '/projects' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <LayoutDashboard size={28} className="brand-icon" />
          <span className="brand-name">MyApp</span>
        </div>

        <div className="navbar-links">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path} 
              className="nav-link"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || <User size={18} />}
            </div>
            <span className="user-name">{user?.name || 'User'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar