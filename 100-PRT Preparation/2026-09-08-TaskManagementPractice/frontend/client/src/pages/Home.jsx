import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home as HomeIcon, 
  Users, 
  Settings, 
  BarChart,
  Rocket,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import './Home.css'

const Home = () => {
  const { user } = useAuth()

  const features = [
    {
      icon: Rocket,
      title: 'Fast Performance',
      description: 'Built with Vite for lightning-fast development and production builds.'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Protected routes and secure authentication flow with JWT support.'
    },
    {
      icon: Zap,
      title: 'Modern Stack',
      description: 'React 18 with Hooks, Context API, and React Router v6.'
    },
    {
      icon: Star,
      title: 'Beautiful UI',
      description: 'Clean, responsive design with Lucide icons and modern styling.'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    { number: '4.9', label: 'User Rating' }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Now available for everyone
          </div>
          <h1 className="hero-title">
            Build Amazing 
            <span className="gradient-text"> Web Applications</span>
          </h1>
          <p className="hero-description">
            A complete authentication system with login, registration, 
            and protected dashboard. Built with React, Vite, and modern best practices.
          </p>
          <div className="hero-buttons">
            {user ? (
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
                <ArrowRight size={20} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-primary">
                  Get Started
                  <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="btn-secondary">
                  Create Account
                </Link>
              </>
            )}
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">
            <div className="floating-icon icon1">
              <BarChart size={32} />
            </div>
            <div className="floating-icon icon2">
              <Users size={32} />
            </div>
            <div className="floating-icon icon3">
              <Settings size={32} />
            </div>
            <div className="hero-grid">
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Platform</h2>
          <p>Everything you need to build a modern web application</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join thousands of users and start building your application today.</p>
          {user ? (
            <Link to="/dashboard" className="btn-primary btn-large">
              Go to Dashboard
              <ArrowRight size={20} />
            </Link>
          ) : (
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary btn-large">
                Create Free Account
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn-secondary btn-large">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <HomeIcon size={24} className="footer-icon" />
            <span>MyApp</span>
          </div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <p className="footer-copy">
            © 2024 MyApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home