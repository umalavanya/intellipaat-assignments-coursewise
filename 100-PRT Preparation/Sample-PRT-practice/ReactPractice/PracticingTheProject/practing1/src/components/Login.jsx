import {useState} from 'react' ;
import {useNavigate} from 'react-router-dom' ;
function Login(){

    const navigate = useNavigate() ;
    const [formData, setFormData] = useState({
        email:'',
        password:''
    }) ;


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault() ;
        // Check if a user was previously created in LocalStorage
        let existingUser = JSON.parse(localStorage.getItem('chatUser')) ;

        if (!existingUser){
            alert(`You don't have an account!! Create one`) ;
            return navigate('/register') ;
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

            <form className="auth-form" onSubmit={handleLogin}>
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
                    
                    <button type="submit" className="auth-btn">Login</button>       
            </form>

            <div className="auth-switch" onClick={() => navigate('/register')}>
                Don't have an account? click here
            </div>

        </div>
        </>
    )
} ;

export default Login ;