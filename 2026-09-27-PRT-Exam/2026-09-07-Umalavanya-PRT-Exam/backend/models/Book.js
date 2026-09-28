// Model schema for Book
const mongoose = require('mongoose') ;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn:{
        type: String,
        required: true,
        match:[/^[0-9A-Za-z-]{10,17}$/, 'Invalid ISBN format'],
        trim: true,
        
    },
    category:{
        type: String,
        required: true,
        enum: ['Programming', 'Data Science', 'Database', 'Web Developement']
    },
    status:{
        type: String,
        required: true,
        enum: ['Available', 'Issued', 'Reserved'],
        default: 'Available'
    },
},{
    timestamps: true  // here, the Date will be added --> 
}) ;

module.exports = mongoose.model('Book', bookSchema) ;