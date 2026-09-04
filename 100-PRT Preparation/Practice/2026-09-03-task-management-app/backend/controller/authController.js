const jwt = require('jsonwebtoken') ;
const User = require('../models/User')

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:'15d'}) ;
}

// Register User
const registerUser =  async (req, res) => {
    try{
        console.log("Registration request recieved!!", req.body) ;
        const {name, email, password} = req.body ;
        if(!name || !email || !password){
            res.status(400).json({message: 'Please fill all the fields!!'}) ;  
        }
        const userExists = await User.findOne({email}) ;
        if(userExists){
            return res.status(400).json({message: 'User already exists!!!'}) ;  
        }

        // Create User
        const user = await User.create({name, email, password}) ;
        console.log('User created') ;

        if(user){
            const token = generateToken(user.id) ;
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token:token
            }) ;
        } else {
            res.status(400).json({message: 'Invalid user details'}) ;  
        }

    } catch (error){
        console.error(error.message) ;
        console.log(error.stack) ;
        res.status(500).json({
            message: error.message,
            stack:error.stack 
        })
    }
} ; 



// Login Details
const loginUser =  async (req, res) => {
    try{
        console.log("Login request recieved!!", req.body) ;
        const {email, password} = req.body ;
        if(!email || !password){
            res.status(400).json({message: 'Please fill all the fields!!'}) ;  
        }
        const user = await User.findOne({email}) ;
    
        if(user && await user.matchPassword(password)){
            const token = generateToken(user.id) ;
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token:token
            }) ;
        } else {
            res.status(401).json({message: 'Invalid Credentials'}) ;  
        }

    } catch (error){
        console.error(error.message) ;
        console.log(error.stack) ;
        res.status(500).json({
            message: error.message,
            stack:error.stack 
        })
    }
} ; 

module.exports = {registerUser, loginUser} ;