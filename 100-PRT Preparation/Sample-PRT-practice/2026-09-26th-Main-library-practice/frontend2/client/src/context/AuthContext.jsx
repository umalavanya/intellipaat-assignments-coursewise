import { createContext,useContext, useState, useEffect } from "react";

const AuthContext = createContext() ;

export function AuthProvider({children}){

    const [user, setUser] = useState(null) ;
    const [tasks, setTasks] = useState([]) ;

    useEffect(() => {
        const savedUser = localStorage.getItem('sam_user');
        if(savedUser) setUser(JSON.parse(savedUser)) ;
        const savedTasks = localStorage.getItem('sam_tasks');
        if(savedTasks) setTasks(JSON.parse(savedTasks)) ;

    },[]) ;

    useEffect(() => {
        localStorage.setItem('sam_tasks',JSON.stringify(tasks)) ;
    },[tasks]) ;

    // register

    const register = (username,email,password) => {
       const users = JSON.parse(localStorage.getItem('sam_users') || '[]') ;
       const find = users.find((u) => u.email === email) ;
       if(find) return {success: false, message:'Email already exists'}
       const newUser = {username,email,password} ;
       users.push(newUser) ;
       localStorage.setItem('sam_users', JSON.stringify(users)) ;
       localStorage.setItem('sam_user', JSON.stringify({username,email})) ;
       setUser({username, email}) ;
       return {success: true} ;

    }

    // login

    const login = (email,password) => {
       const users = JSON.parse(localStorage.getItem('sam_users') || '[]') ;
       const found = users.find((u) => u.email === email && u.password === password) ;
       if(!found) return {success: false, message:'Invalid credentials'}

       const loggedInUser = {username: found.username, email:found.email} ;
       setUser(loggedInUser) ;
       localStorage.setItem('sam_user', JSON.stringify(loggedInUser)) ;
        return {success: true} ;
    }

    const logout = () => {
        setUser(null) ;
        localStorage.removeItem('sam_user') ;
    }

    const addTask = (text) => {
        setTasks((prev) => [...prev, {
            id: Date.now(),
            text,
            done: false
        }]) ;
    } ;

    const toggleTask = (id) => {
        setTasks((prev) => prev.map((t) => t.id === id ? {...t, done: !t.done} : t)) ;
    } 

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id!==id)) ;
    }

    return(
        <AuthContext.Provider value={{user, tasks, register, login, logout, addTask, toggleTask, deleteTask}}>
            {children}
        </AuthContext.Provider>
    ) ;
} ; 

export function useAuth(){
    return useContext(AuthContext) ;
}