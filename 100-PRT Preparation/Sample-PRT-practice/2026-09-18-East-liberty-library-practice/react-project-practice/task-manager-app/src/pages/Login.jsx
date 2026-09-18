import React, { useState } from 'react' ;
import {User, Mail, Phone, Lock} from 'lucide-react' ;
import {Link} from 'react-router-dom'
import '../styles/Auth.css'

function Login() {
  const [formData, setFormData] = useState({
    username : '',
    email: '',
    phone: '',
    password : '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value}) ;
  }

  const handleSubmit = (e) => {
    
  }
  return (
    <>
    <div className="auth-container">
      <div className="auth-header">Login</div>
      <div className="auth-wrapper">

        <div className="form-section">
          <form onSubmit={handleSubmit}>

             {/* Email */}

             <div className="input-group">
              <div className="input-icon"><Mail/></div>
              <input 
                type="email" 
                name="email" 
                required
                className="input-item"
                placeholder="Email"
                onChange={handleChange} />
             </div>

             {/* Password */}
             <div className="input-group">
              <div className="input-icon"><Lock/></div>
              <input 
                type="password" 
                name="password" 
                required
                className="input-item"
                placeholder="***********"
                onChange={handleChange} />
             </div>

             <button className="btn-primary">Login</button>

             <p>Don't have an account? <Link to="/register"> Register</Link></p>

          </form>
          
        </div>

        <div className="illustration-section">
          <img src="https://placehold.co/300x300" alt="Sign in Illustration" />
        </div>

      </div>

    </div>
    </>
  )
}

export default Login
