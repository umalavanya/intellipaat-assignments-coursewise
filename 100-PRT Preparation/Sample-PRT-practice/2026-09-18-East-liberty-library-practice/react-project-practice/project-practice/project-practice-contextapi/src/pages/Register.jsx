import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Register() {
    const {register} = useAuth() ;
    const navigate = useNavigate() ;
    const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: ''
        }) ;
    
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    
     const handleSubmit = (e) => {
        e.preventDefault() ;
        const res = register(formData.username, formData.email, formData.password) ;
            if(res.success){
                navigate('/dashboard') ;
            } else {
                setError(res.message) ;
            }

    }

  return (
    <div className="auth-container">
        <form className="auth-box" onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error }
            <input 
                type="text" 
                name="username" 
                value={formData.username}
                placeholder="User Name"
                onChange={handleChange} 
                required              
            />

            <input 
                type="email" 
                name="email" 
                value={formData.email}
                placeholder="Email"
                onChange={handleChange} 
                required              
            />

            <input 
                type="password" 
                name="password" 
                value={formData.password}
                placeholder="*********"
                onChange={handleChange}
                required               
            />

            <button className="btn-primary" type="submit">Register</button>
            <p className="auth-switch">Dont have an account? <Link to="login"> Login </Link> </p>
        </form>
      
    </div>
  )
}

export default Register
