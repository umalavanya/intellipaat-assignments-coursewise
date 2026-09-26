import React, { use, useState } from 'react' ;
import { Link, useActionData, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
    const navigate = useNavigate() ;
    const {register} = useAuth() ;
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password:''
    }) ;
    const [error, setError] = useState('') ;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value }) ;
    
    }
   

    const handleSubmit = async (e) =>{
        e.preventDefault() ;
        const res = await register(formData.username, formData.email, formData.password) ;
        if(res.success){
            navigate('/dashboard') ;  
        } else {
            setError(res.message) ;
        }
    }

  return (
    <div className="auth-conatiner">
        <h2>Register</h2>
        <form className="auth-box" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input 
                type="text" 
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                required />
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
            <button className='auth-btn' type="submit">Register</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login" replace>Login</Link></p>

    </div>
  )
}

export default Register ;
