import React from 'react'
import {Link} from 'react-router-dom' ;
import { useTheme } from '../context/ThemeContext';

function Navbar() {
    const {theme, toggleTheme} = useTheme() ;
  return (
    <nav className="navbar">
        <div className="nav-brand">Forecast Insights</div>
        <ul className="nav-links">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/insights'>Insights</Link></li>
            <li><Link to='/about'>About</Link></li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    </nav>
  )
}

export default Navbar ;
