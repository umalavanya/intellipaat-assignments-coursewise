const mongoose = require('mongoose') ;

const eventSchema = new mongoose.Schema({
    title:{type: String, required:true},
    description:{type:String},
    eventStartDate:{type: String},
    eventEndDate:{type:String},
    location:{type: String},
    category:{type: String},
    status:{type:String},
    createdBy:{type: String, required:true}
}, {timestamps: true}) ;

module.exports = mongoose.model("Event",eventSchema) ;