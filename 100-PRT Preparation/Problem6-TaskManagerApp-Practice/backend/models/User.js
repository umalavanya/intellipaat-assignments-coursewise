const mongoose = require('mongoose') ;
const bcrypt = require('bcryptjs') ;

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
}) ;


// Password hashing - middleware

UserSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return next() ;
    }
    try{
        const salt = await bcrypt.genSalt(10) ;
        this.password = await bcrypt.hash(this.password, salt) ;
        next() ;
    } catch (error) {
        next(error) ;
    }
    
}) ;


// Method to compare password
UserSchema.methods.matchPassword = async function(enteredPassword){
    if(!this.password){
        throw new Error('Password field not selected in database query') ;
    }

    return await bcrypt.compare(enteredPassword, this.password) ;

}

module.exports = mongoose.model('User', UserSchema) ;