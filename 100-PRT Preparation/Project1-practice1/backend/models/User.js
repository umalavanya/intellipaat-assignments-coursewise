const mongoose = require('mongoose') ;

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        reuiored: true
    },
    password:{
        type: String,
        required: true
    }
},{}) ;


UserSchema.pre('save', async function() {
    if(!this.isModified('password')){
        return next ;
    } ;

    const salt= bcrypt.genSalt(10) ;
    this.password = bcrypt.hash(this.password, salt) ;
}) ;


UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPasswors, this.password) ;
} ;

module.exports = mongoose.model('User', UserSchema) ;
