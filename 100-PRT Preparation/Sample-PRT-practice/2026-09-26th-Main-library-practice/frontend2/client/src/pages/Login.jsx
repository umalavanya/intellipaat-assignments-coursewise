import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate() ;
    const {login} = useAuth() ;
    const [authFormData, setAuthFormData] = useState(
        {
            email: '',
            password: ''
        }
    ) ;
    const [error, setError] = useState('') ;

    // handle change

    const handleChange = (e) => {
        setAuthFormData({...authFormData, [e.target.name]:e.target.value}) ;
    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault() ;
        const res = login(authFormData.email, authFormData.password) ;
        if(res.success) {
            navigate('/dashboard') ;
        } else {
            setError(res.message) ;
        }
    }

  return (
    <div className="auth-container" >
        <h2>Login</h2> 
        <form className='auth-box' onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <input
                type="email"
                name="email"
                placeholder="email"
                value = {authFormData.email}
                onChange={handleChange}
                required
                /> 
            <input
                type="password"
                name="password"
                placeholder="********"
                value = {authFormData.password}
                onChange={handleChange}
                required
                />
            <button className='auth-btn' type="submit">Login</button>      
        </form>
        <p className="auth-switch">Don't have an account: <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login
