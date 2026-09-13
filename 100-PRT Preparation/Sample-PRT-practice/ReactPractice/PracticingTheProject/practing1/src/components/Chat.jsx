import React, {useEffect, useState} from 'react' ;
import {useNavigate} from 'react-router-dom' ;

function Chat(){
    const navigate = useNavigate() ;
    const [currentUser, setCurrentUser] = useState(null) ;


    const mockUsers = [
        {id:1, name:'Shagun '},
        {id:2, name:'Arjun '},
        {id:3, name:'Prince '},
        {id:4, name:'Raghav'}
    ] ;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('chatUser')) ;
        if(!user){
            navigate('/login') ;
        } else {
            setCurrentUser(user) ;
        }
    }, [navigate]) ;

    const handleLogout = () => {
        localStorage.removeItem('chatUser') ;
        navigate('/login') ;
    }

    if(!currentUser) return null ;

    return(
        <>
        <div className="chat-container">
            {/* Top NavBar */}
            <nav className="navbar">
                <button className="logout-btn" onClick={handleLogout} >Logout</button>
            </nav> 
            {/* Main body */}
            <div className="chat-body">
                <aside className="sidebar">
                    {
                        mockUsers.map((user) => (
                            <div key={user.id} className="user-item">
                                <span className="user-name">{user.name}</span>
                            </div>
                        ))
                    }
                    {
                        // Current user at the bottom

                        <div className="user-item active" style={{ marginTop: 'auto', borderTop: '1px solid #2a2a3a' }}>
                          <span className="user-name">{currentUser.userName}</span>  
                        </div>
                    }
                </aside>
        <main className="chat-main">
          <div className="welcome-screen">
            {/* Using a placeholder image for the robot graphic to match the UI */}
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" 
              alt="Robot Avatar" 
              className="robot-avatar"
              style={{ filter: 'hue-rotate(180deg) saturate(1.5)' }} /* Adjusting colors to match the orange/blue theme */
            />
            <h1 className="welcome-text">
              Welcome, <span>{currentUser.userName}!</span>
            </h1>
          </div>
        </main>


        </div>
        </div>
        </>
    )
} ;

export default Chat ;