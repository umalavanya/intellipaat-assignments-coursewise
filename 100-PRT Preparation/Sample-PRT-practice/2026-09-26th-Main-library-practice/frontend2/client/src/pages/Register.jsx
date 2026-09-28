import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Register() {
    const {register} = useAuth() ;
    const navigate = useNavigate() ;
    const [authFormData, setAuthFormData] = useState({
        username:'',
        email: '',
        password:''
    }) ;
    const [error, setError] = useState('') ;


    const handleChange = (e) => {
        setAuthFormData({...authFormData, [e.target.name]: e.target.value}) ;
    }

    const handleSubmit = (e) => {
        e.preventDefault() ;
        const res = register(authFormData.username,authFormData.email,authFormData.password) ;
        if(res.success){
            navigate('/dashboard') ;

        } else {
            setError(res.message) ;
        }
    }


  return (
    <div className='auth-container'>
        <h2>Register</h2>
        {error && <p className='error'>{error}</p>}
        <form className='auth-box' onSubmit={handleSubmit}>

            <input 
                type="text"
                name="username"
                placeholder='User name'
                value={authFormData.username}
                onChange={handleChange}
                required/>
            <input 
                type="email"
                name="email"
                placeholder='Email'
                value={authFormData.email}
                onChange={handleChange}
                required/>

            <input 
                type="password"
                name="password"
                placeholder='**********'
                value={authFormData.password}
                onChange={handleChange}
                required/>
            <button className='auth-btn' type="submit">Register</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      
    </div>
  )
}

export default Register ;
