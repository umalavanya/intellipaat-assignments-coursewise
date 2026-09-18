import React from 'react' ;
import {Link, Outlet} from 'react-router-dom' ;
import '../styles/Navbar.css'
 

function Navbar() {
  return (
    <>
    <nav className="nav-bar">
        <div className="nav-left">
            <div className="nav-logo"><img src="https://placehold.co/50X50"/></div>
            <div className="nav-title">TaskApp</div>
        </div>
        <div className="nav-right">
            <Link to="/login">Login</Link>
        </div>
    </nav>

    
    </>
  )
}

export default Navbar
