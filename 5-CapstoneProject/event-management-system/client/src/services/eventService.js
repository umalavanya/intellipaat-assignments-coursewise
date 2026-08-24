const API_URL = "http://localhost:4000/events" ;

export const getEvents = async (email) => {
    const res = await fetch(`${API_URL}/${email}`) ;
    return await res.json() ;
}

export const createEvent = async (payload) => {
    return fetch(API_URL, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(payload)
    }) ;
} ;


export const updateEvent = async (id , payload) => {
    return fetch(`${API_URI}/${id}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
    }) ;
} ;

export const deleteEvent = async (id) => {
    return fetch(`${API_URL}/${id}`,{
        method: "DELETE"
    }) ;
} ;