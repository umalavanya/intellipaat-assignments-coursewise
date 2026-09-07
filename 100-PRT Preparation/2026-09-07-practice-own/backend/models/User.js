const mongoose = require('mongoose') ;
const bcrypt = require('bcryptjs') ;

// User schema
const UserSchema = new mongoose.Schema({
    userName:{type:String, required: true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true} 
},{
    timestamps: true
}) ;

// Password hashing
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next() 
    }
    const salt = await bcrypt.genSalt(10) ;
    this.password = await bcrypt.hash(this.password, salt) ; 
});

// Matching password
UserSchema.methods.matchPassword =  async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema) ;