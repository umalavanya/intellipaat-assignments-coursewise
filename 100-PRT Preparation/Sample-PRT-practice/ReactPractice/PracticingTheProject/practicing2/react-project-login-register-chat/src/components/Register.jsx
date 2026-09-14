import React, { useState } from 'react' ;
import {Link} from 'react-router-dom' ;

function Register() {

  const [formData, setFormData] = useState({
    username : "",
    email : "",
    password : "",
    confirmPassword : ""

  }) ;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.type}) ;
  } ;

  const handleSubmit = (e) => {

    if(e.target.password !== e.target.confirmPassword){
      alert('Password do not match')
    }

  } ;
  return (
    <>
    <div className="auth-container">
      <div className="auth-title">Register</div>
      <div className="auth-picture"></div>
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={() => handleSubmit(e)}>
          <input 
            type="text" 
            name="username"
            className="input-item"
            placeholder="User Name"
            required
            onClick={() => handleChange(e)}
            />
            <input 
            type="email" 
            name="email"
            className="input-item"
            placeholder="Email"
            required
            onClick={() => handleChange(e)}
            />
            <input 
            type="password" 
            name="password"
            className="input-item"
            placeholder="********"
            required
            onClick={() => handleChange(e)}
            />
            <input 
            type="password" 
            name="confirmPassword"
            className="input-item"
            placeholder="Confirm Password"
            required
            onClick={() => handleChange(e)}
            />
            <button  className="submit-btn" >Submit</button>        
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
