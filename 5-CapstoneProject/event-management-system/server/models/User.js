const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    firstName:{type: String},
    lastName:{type:String},
    email:{type:String, required:true, unique:true},
    phone:{type:String},
    password:{type: String, required: true},
    confirmPassword: {type:String, default: null},
    age:{type: mongoose.Schema.Types.Mixed },
    dob:{type: String},
    gender:{type: String},
    country:{type: String},
    languages:[{type:String}]

}, {timestamps: true}) ;

module.exports = mongoose.model("User", userSchema) ;