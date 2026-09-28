import axios from 'axios' ;

const API = axios.create({baseURL: 'http://localhost:4320/api/books'}) ;

// fetchBooks
export const fetchBooks = (params) => {
    API.get('/', {params} ) ;
}

// fetch Stats
export const fetchStats = () => {
    API.get('/' ) ;
}

// to create a book
export const createBook = (data) => {
    API.post('/', data ) ;
} ;

// to update a book
export const updateBook = (id, data) => {
    API.put(`/${id}`, data ) ;
}


// to delete a book
export const deleteBook = (id) => {
    API.delete(`/${id}`, {params} ) ;
}
