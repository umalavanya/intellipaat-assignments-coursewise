const mongoose = require('mongoose') ;

const TaskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:user, required:true },
    title:{type:String, required: true, trim:true},
    description:{type:String, required:true},
    status:{type:String, enum:['Pending', 'Completed'], default:'Pending'},
},{
    timestamps:true,
}) ;

module.exports = mongoose.model('Task',TaskSchema) ;