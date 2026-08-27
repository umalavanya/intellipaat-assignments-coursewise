const mongoose =  require('mongoose') ;

const TaskSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },

    description :{
        type: String,
        enum:['pending', 'completed'],
        default: 'pending'

    }
},{
    timestamps: true,
}) ;

module.exports = mongoose.model('Task', TaskSchema) ;