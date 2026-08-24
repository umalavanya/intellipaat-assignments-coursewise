export const getLoggedInUser = () =>{
    return localStorage.getItem('loggedinUser') ;
}

export const saveLoggedInUser = (email)=> {

    localStorage.setItem('loggedinUser', email) ;
} ;

export const clearLoggedInUser = () => {
    localStorage.removeItem('loggedinuser') ;
} ;