const mongoose = require('mongoose') ;
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Task title is required'],
        trim:true,
        maxlength:[100,'Title cannot be more tha 100 characters']
    },
    description:{
        type:String,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date
    },
    category:{
        type:String,
        enum:['Work', 'Personal','Urgent', 'General'],
        default:'General'
    },
    createdAT:{
        type:Date,
        default: Date.now
    }
}) ;

module.exports = mongoose.model('Task', taskSchema) ;