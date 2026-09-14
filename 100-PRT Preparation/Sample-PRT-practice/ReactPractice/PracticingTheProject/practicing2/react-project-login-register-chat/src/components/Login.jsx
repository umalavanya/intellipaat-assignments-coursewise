import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
    <div className="auth-container">
      <div className="auth-title">Login</div>
      <div className="auth-picture"></div>
      <div className="auth-form-container">
        <form className="auth-form">
            <input 
            type="email" 
            name="email"
            className="input-item"
            placeholder="Email"
            required
            />

            <input 
            type="password" 
            name="password"
            className="input-item"
            placeholder="********"
            required
            />

            <button  className="submit-btn">Submit</button>
        
        </form>

        <div className="auth-switch">
            <div className="auth-switch-tag">Don't have an account?</div>
            <Link className="auth-switch-link" 
                  to='/register' 
                  replace>Create Account
            </Link>
        </div> 


      </div>
    </div>
    </>
  )
}

export default Login ;
