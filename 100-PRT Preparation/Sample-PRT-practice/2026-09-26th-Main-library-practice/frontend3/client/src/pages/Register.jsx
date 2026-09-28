import {useState} from 'react' ;
import {Link} from 'react-router-dom' ;

function Register() {
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
        <h2>Register</h2>
        <form className='auth-box'>
            <input type="email"
                   name="email"
                   placeholder="Email"
                   value={authForm.email}
                   onChange={handleChange}
                   required />
        </form>

        <p className="auth-switch">Already have an Account? <Link to="/login">Login</Link></p>


      
    </div>
  )
}

export default Register
