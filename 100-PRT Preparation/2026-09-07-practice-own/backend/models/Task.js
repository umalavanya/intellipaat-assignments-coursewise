const mongoose = require('mongoose') ;

// User schema
const TaskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, 
        ref: 'User',  
        required: true},
    title:{type:String, required:true},
    description:{type:String, required:true},
    status:{type:String, enum:['pending','completed'],default:'pending'
    } 
},{
    timestamps: true
}) ;



module.exports = mongoose.model('Task', TaskSchema) ;