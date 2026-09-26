import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom' ;
import { useAuth } from '../context/AuthContext';

function Register() {
    const {register} = useAuth() ;
    const navigate = useNavigate() ;
    const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: ''
        })
    const [error, setError] = useState('')

    const handleChange = (e) => {
            setFormData({...formData, [e.target.name] : e.target.value }) ;
        }

    const handleSubmit = (e) => {
        e.preventDefault() ;
        const res = register(formData.username, formData.email, formData.password ) ;
        if(res.success){
            navigate('/dashboard') ; 
        } else {
            setError(res.message) ;
        }
    }
  return (
    <div className='auth-main'>
        <div className="auth-container">
            <h2>Register</h2>
            {error && <p className='error'>{error}</p>}
            <form action="" className="auth-box" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username"
                    placeholder="User Name"
                    onChange={handleChange}
                    required
                     />
                 <input 
                    type="email" 
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                     />


                <input 
                    type="password" 
                    name="password"
                    placeholder="**********"
                    onChange={handleChange}
                    required
                     />

                <button className='auth-btn' type="submit">Register</button>

            </form>
            <div className="auth-switch">Already have an account? <Link to="/login">Login</Link> </div>
        </div>
      
    </div>
  )
}

export default Register
