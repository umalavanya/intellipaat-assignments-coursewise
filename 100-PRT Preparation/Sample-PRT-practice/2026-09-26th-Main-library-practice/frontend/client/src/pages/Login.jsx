import React, { useState } from 'react' ;
import { Link, useActionData, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate() ;
    const {login} = useAuth() ;
    const [formData, setFormData] = useState({
        email:'',
        password:''
    }) ;
    const [error, setError] = useState('') ;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value }) ;
    
    }
    

    const handleSubmit = async (e) =>{
        e.preventDefault() ;
        const res = await login(formData.email, formData.password) ;
        if(res.success){
            navigate('/dashboard') ;  
        } else {
            setError(res.message) ;
        }
    }

  return (
    <div className="auth-conatiner">
        <h2>Login</h2>
        <form  className="auth-box" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input 
                type="email" 
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required />
            <input 
                type="password" 
                name="password"
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
                required />  
            <button className='auth-btn' type="submit">Login</button>
        </form>

        <p className="auth-switch">Don't have an account? <Link to="/register" replace>Register</Link></p>

    </div>
  )
}

export default Login ;
