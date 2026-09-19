import {createContext, useContext, useState, useEffect} from 'react' ;
const AuthContext = createContext() ;

export function AuthProvider({children}){
    const [user, setUser] = useState(null) ;
    const [tasks, setTasks] = useState([]) ;


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('tm_users')) ;
        if(savedUser) setUser(savedUser) ;

        const savedTasks = JSON.parse(localStorage.getItem('tm_tasks')) ;
        if(savedTasks) setUser(savedTasks) ;
    },[]) ;


    useEffect (() => {
        localStorage.setItem('tm_tasks', JSON.stringify(tasks))
    }, [tasks]) ;


    const register = (username, email, password) => {
        const users = JSON.parse(localStorage.getItem('tm_users' || [] )) ;
        if(users.find((u) => u.email === email )){
            return {success: false,message: 'Email already exists'}
        }
        users.push({username, email, password}) ;
        localStorage.setItem('tm_users', JSON.stringify(users)) ;
        setUser({username, email}) ;
        localStorage.setItem('tm_user', JSON.stringify({username, email})) ;
        return {success: true }
    }

    const login = (email, password) => {

       const users = JSON.parse(localStorage.getItem('tm_users' || [])) ;
       const found = users.find((u) => u.email === email && u.password === password);
       if(!found){
        return {siccess: false, message: 'Invalid email or password'} ;
       }
       const loggedUser = {username: found.username, email: found.email } ;
       setUser(loggedUser) ;
       localStorage.setItem('tm_users', JSON.stringify(loggedUser)) ;

       return {success: true} ;
    }

    const logout = () => {
        setUser(null) ;
        localStorage.removeItem('tm_user') ;
    }




    return(
        <AuthContext.Provider value ={{user, tasks, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    ) ;

}

export function useAuth(){
    return useContext(AuthContext) ;
}