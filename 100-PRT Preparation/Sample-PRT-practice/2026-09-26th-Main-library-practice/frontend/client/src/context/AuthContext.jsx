import {createContext, useContext, useState, useEffect, Navigate} from 'react' ;

const AuthContext = createContext() ;

export function AuthProvider({children}){
    const [user, setUser] = useState(null) ;
    const [tasks, setTasks] = useState([]) ;

    useEffect(() => {

        const savedUser = localStorage.getItem('prt_users') ;
        if(savedUser) setUser(JSON.parse(savedUser)) ;

        const savedTasks = localStorage.getItem('prt_tasks');
        if(savedTasks) settasks(JSON.parse(savedTasks)) ;

    },[]) ;


    useEffect(() => {
        localStorage.setItem('prt_tasks', JSON.stringify(tasks))
    },[tasks]) ;

    // register function

     const register = (username, email, password) => {
        const users = JSON.parse(localStorage.getItem('prt_users') || '[]');
        const foundUser = users.find((u) => u.email === email ) ;
        if(foundUser){
            return {success: false, message: 'Email already exists!!'} ;
        }
        users.push({username, email, password}) ;
        localStorage.setItem('prt_users',JSON.stringify(users) ) ;
        setUser({username,email}) ;
        localStorage.setItem('prt_user',JSON.stringify({username,email}) ) ;
        return {success: true} ;
    }

    // login function

     const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('prt_users') || '[]');
        const found = users.find((u) => u.email === email && u.password === password) ;
        if(!found){
            return {success: false, message: 'Invalid email or password!!'} ;
        }
        const loggedInUser = {username: found.username,email: found.email}

        setUser(loggedInUser) ;
        localStorage.setItem('prt_user',JSON.stringify(loggedInUser) ) ;
        return {success: true} ;
    }


    // logout

    const logout = () => {
        setUser(null) ;
        localStorage.removeItem('prt_user') ;

    }


    // addTask


    // toggleTask

    

    return(
        <AuthContext.Provider value={{user, tasks, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

} ;

export function useAuth(){
    return useContext(AuthContext) ;
}