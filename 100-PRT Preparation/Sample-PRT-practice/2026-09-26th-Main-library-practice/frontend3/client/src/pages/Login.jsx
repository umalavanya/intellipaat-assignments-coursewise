import {useState} from 'react' ;
import {Link} from 'react-router-dom' ;

function Login() {
    const [authForm, setAuthForm] = useState({
        email:'',
        password:''
    }) ;
    const [error, setError] = useState('') ;

    const handleChange = (e) => {
        setAuthForm({...authForm, [e.target.name]:e.target.value}) ;
    }
  return (
    <div>
        <h2>Login</h2>
        <form className='auth-box'>
            <input type="email"
                   name="email"
                   placeholder="Email"
                   value={authForm.email}
                   onChange={handleChange}
                   required />
        </form>
        <p className="auth-switch">Don't have an Account? <Link to="/register">Register</Link></p>
      
    </div>
  )
}

export default Login
