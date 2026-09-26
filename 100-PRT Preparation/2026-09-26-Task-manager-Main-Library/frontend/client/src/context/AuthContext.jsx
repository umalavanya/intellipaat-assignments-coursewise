import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext() ;

export function AuthProvider({children}){
    const [user, setUser] = useState(null) ; 
    const  [tasks, setTasks] =  useState([]) ;


    useEffect(() => {
        const savedUser = localStorage.getItem('tm_users') ;
        if(savedUser) setUser(JSON.parse(savedUser)) ;
        const savedTasks = localStorage.getItem('tm_tasks') ;
        if(savedTasks) setTasks(JSON.parse(savedTasks)) ;
    },[]) ;

    useEffect(() => {
        localStorage.setItem('tm_tasks', JSON.stringify(tasks)) ;
    },[tasks])

    const register = (username, email, password) => {
        const users = JSON.parse(localStorage.getItem('tm_users') || '[]') ?? [];
        if(users.find((u) => u.email === email) ){
            return {
                success: false,
                message: 'Email already exists!!' 
            }
        }
        users.push({username, email, password}) ;
        localStorage.setItem('tm_users', JSON.stringify(users)) ;
        const newUser = {username, email} ;
        setUser(newUser) ;
        localStorage.setItem('tm_user', JSON.stringify(newUser)) ; 
        return {success: true}
    }

    const login = (username, email, password) => {
        const users = JSON.parse(localStorage.getItem('tm_users') || '[]') ?? [] ;
        const found = users.find((u) => u.email === email) ;
        if(!found){
            return {
                success: false ,
                message: "Email not found, please register!!!"
            }
        }
        const loggedInUser = {
            username: found.name,
            email: found.email
        } ;
        setUser(loggedInUser) ;
        localStorage.setItem('tm_user', JSON.stringify(loggedInUser)) ;
        return {success: true} ;

    }

    const logout = () =>{
        setUser(null);
        localStorage.removeItem('tm_user') ;

    } ;

    return(
        <AuthContext.Provider value={{user, tasks, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    ) ;   
} ;

export function useAuth(){
    return useContext(AuthContext) ;
}