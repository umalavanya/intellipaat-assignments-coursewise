const mongoose = require('mongoose') ;

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        trim: true ,
        minlength: [1, 'Title cannot be empty'] ,
    },
    description: {
        type: String,
        trim: true ,
        default: '',

    },
    status: {
        tyep: String,
        enum: ['Pending', 'Completed'],
        default: '',
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
}) ;

// Create end export the model
const Task = mongoose.model('Task', taskSchema) ;
module.export = Task ;