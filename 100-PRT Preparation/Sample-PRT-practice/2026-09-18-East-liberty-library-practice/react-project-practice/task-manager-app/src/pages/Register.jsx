import React, { useState } from 'react' ;
import {User, Mail, Phone, Lock} from 'lucide-react' ;
import {Link} from 'react-router-dom'
import '../styles/Auth.css'

function Register() {
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

    if(e.target.password !== e.target.confirmPassword){
      return null ;
    }

  }
  return (
    <>
    <div className="auth-container">
      <div className="auth-header">Login</div>
      <div className="auth-wrapper">

        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {/* User Full Name */}
             <div className="input-group">
              <div className="input-icon"><User/></div>
              <input 
                type="text" 
                name="fullname" 
                required
                className="input-item"
                placeholder="Full Name"
                onChange={handleChange} />
             </div>

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

             {/* Phone */}
             <div className="input-group">
              <div className="input-icon"><Phone/></div>
              <input 
                type="tel" 
                name="phone" 
                required
                className="input-item"
                placeholder="Phone Number"
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


             {/* Confirm Password */}
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

             <button className="btn-primary">Register</button>

             <p>Already have an account?  <Link to="/login">Login</Link></p>

          </form>
          
        </div>

        <div className="illustration-section">
          <img src="https://placehold.co/300x300" alt="Sign up Illustration" />
        </div>

      </div>

    </div>
    </>
  )
}

export default Register ;
