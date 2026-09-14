import React from 'react' ;
import {Link} from 'react-router-dom' ;

function Register() {

  return (
    <>
    <div className="auth-container">
      <div className="auth-title">Register</div>
      <div className="auth-picture"></div>
      <div className="auth-form-container">
        <form className="auth-form">
          <input 
            type="text" 
            name="username"
            className="input-item"
            placeholder="User Name"
            required
            />
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
            <input 
            type="password" 
            name="confirmPassword"
            className="input-item"
            placeholder="Confirm Password"
            required
            />
            <button  className="submit-btn">Submit</button>        
        </form> 
        <div className="auth-switch">
          <div className="auth-switch-tag">Already have an account?</div>
            <Link className="auth-switch-link" 
                to='/login' 
                replace>Login
            </Link>
          </div> 
      </div>
    </div>
    </>
  )
}

export default Register ;
