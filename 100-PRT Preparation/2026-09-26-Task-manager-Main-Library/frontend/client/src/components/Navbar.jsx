import { useNavigate } from "react-router-dom";
import { useAuth  } from "../context/AuthContext"


function Navbar() {
    const {user, logout} = useAuth() ;
    const navigate = useNavigate
    const handleLogout = () =>{
      logout() ;
      navigate("/login") ;
    }

  return (
    <nav className="navbar">
        <h1>Task Manager</h1>
        {user && (
          <div >
            <span>Hi, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
    </nav>
  )
}

export default Navbar
