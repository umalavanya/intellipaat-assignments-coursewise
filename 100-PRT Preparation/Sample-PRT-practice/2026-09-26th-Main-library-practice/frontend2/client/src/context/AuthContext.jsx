import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext() ;


export function AuthProvider({children}){

    const [user, setUser] = useState(null) ;
    const [tasks, setTasks] = useState([]) ;

    useEffect(() =>  {
        const savedUser = localStorage.getItem('prt_user') ;
        if(savedUser) setUser(JSON.parse(savedUser)) ;

        const savedTasks = localStorage.getItem('prt_tasks') ;
        if(savedTasks) setTasks(JSON.parse(savedTasks)) ;

    },[])

     const register = (username, email,password) => {
        const users = JSON.parse(localStorage.getItem('prt_users') || '[]') ;
        const found = users.find((u) => u.email === email) ;
        if(found) return {success: false, message: 'Email already exists'} ;
        const newUser = {username, email, password} ;
        users.push(newUser) ;
        setUser({username, email}) ;
        localStorage.setItem('prt_users', JSON.stringify(users)) ;
        localStorage.setItem('prt_user', JSON.stringify({username, email})) ;
        return {success: true } ;
    }

    const login = (email,password) => {
        const users = JSON.parse(localStorage.getItem('prt_users') || '[]') ;
        const found = users.find((u) => u.email === email && u.password === password) ;
        if(!found) return {success: false, message: 'Invalid email or password'} ;
        const loggedInuser = {username: found.username, email: found.email } ;
        setUser(loggedInuser) ;
        localStorage.setItem('prt_user', JSON.stringify(loggedInuser)) ;
        return {success: true } ;
    }

    const addTask = () => {

    } ;

    const toggleTask =() => {

    } ;
    const deleteTask = () => {}

    return(
        <AuthContext.Provider value={{user, tasks, login, register, addTask, toggleTask, deleteTask}}>
            {children}
        </AuthContext.Provider>
    ) ;
} ;

export function useAuth(){
    return useContext(AuthContext) ;
}