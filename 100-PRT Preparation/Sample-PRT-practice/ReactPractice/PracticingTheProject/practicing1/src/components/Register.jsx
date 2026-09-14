import {useState} from 'react' ;
import {useNavigate} from 'react-router-dom' ;
function Register(){
    const navigate = useNavigate() ;
    const [formData, setFormData] = useState({
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
    }) ;


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleRegister = (e) => {
        e.preventDefault() ;
        if (formData.password !== formData.confirmPassword){
            alert('Password do not match!!') ;
            return
        }

        localStorage.setItem('chatUser', JSON.stringify({
            userName:formData.userName || 'User'
        }))
        navigate('/chat') ;
    }

    return(
        <>
        <div className="auth-wrapper">
            <div className="logo-container"><img src="https://placehold.co/200x200"/>
            </div>

            <form className="auth-form" onSubmit={handleRegister}>
                <input 
                    type="text"
                    name="userName"
                    placeholder="Username" 
                    className="auth-input"
                    onChange={handleChange}
                    required/>

                <input 
                    type="email"
                    name="email"
                    placeholder="Email" 
                    className="auth-input"
                    onChange={handleChange}
                    required/>

                <input 
                    type="password"
                    name="password"
                    placeholder="Passwrod" 
                    className="auth-input"
                    onChange={handleChange}
                    required/>

                <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password" 
                    className="auth-input"
                    onChange={handleChange}
                    required/>

                <button type="submit" className="auth-btn">Create user</button>         
            </form>

            <div className="auth-switch" onClick={() => navigate('/login')}>
                Already Have an account? click here
            </div>

        </div>
        </>
    )
} ;

export default Register ;
