import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const {login} = useAuth() ;
    const navigate = useNavigate() ;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }) ;
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value }) ;
    } ;
    

    const handleSubmit = (e) => {
        e.preventDefault() ;
        const res = login(formData.email, formData.password ) ;
        if(res){
            navigate('/dashboard') ; 
        } else {
            setError('res.message') ;
        }
    }
  return (
    <div className='auth-main'>
        <div className="auth-container">
            <h2>Login</h2>
            <form action="" className="auth-box" onSubmit={handleSubmit}>
                {error && <div>{error}</div>}
                <input 
                    type="email" 
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    required
                     />
                <input 
                    type="password" 
                    name="password"
                    placeholder="*****"
                    onChange={handleChange}
                    required
                     />

                <button className='auth-btn' type="submit">Login</button>

            </form>
            <div className="auth-switch">Don't have an account? <Link to="/register">Register</Link> </div>
        </div>
      
    </div>
  )
}

export default Login
