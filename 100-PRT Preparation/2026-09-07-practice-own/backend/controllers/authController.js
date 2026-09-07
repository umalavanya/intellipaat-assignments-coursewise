const jwt = require('jsonwebtoken') ;
const User = require('../models/User')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '15d'}) ;
}

// Register User

const registerUser = async (req,res) => {
    try{
        console.log("Registration request recieved!")
        const {userName, email,password} = req.body ;
        console.log({userName, email,password})

        if(!userName || !email || !password){
            return res.status(400).json({message:"Please fill all the fields!!"})
        }
        // check if user exists
        const userExist = await User.findOne({email}) ;
        console.log('User exists check:', userExist); // LOGGING
    
    
        if(userExist){
            console.log('User already exists') ;
            return res.status(400).json({message:'User already exists'}) ;
        }
        // creating a user
        console.log('creating user')
        const user = await User.create({userName, email, password}) ;
        // create a token
        if(user){
            const token = generateToken(user.id) ;
            console.log('Token created') ;
            res.status(200).json({
                _id:user.id,
                userName:user.userName,
                email:user.email,
                token:token
            }) ; 
            console.log(`User Created ${user.userName}`)  ;  
        } else {
            res.status(400).json({message:"Invalid User!!"})
        }
    } catch(error){
        res.status(500).json({
            message:error.message,
            stack:error.stack
        })
    }
    
}

// Login user

const loginUser = async (req,res) => {
    try{
        console.log("Login request recieved!")
        const {email, password} = req.body ;
        console.log({email,password})

        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields!!"})
        }
        // check if user exists
        const user = await User.findOne({email}) ;
        console.log(user ? 'User found':'User not found'); // LOGGING
    
        // create a token
        if(user && await user.matchPassword(password)){
            const token = generateToken(user.id) ;
            console.log('Token created') ;
            res.status(200).json({
                _id:user.id,
                userName:user.userName,
                email:user.email,
                token:token
            }) ; 
            console.log(`Logged in successful`)  ;  
        } else {
            res.status(400).json({message:"Invalid User!!"})
        }
    } catch(error){
        res.status(500).json({
            message:error.message,
            stack:error.stack
        })
    }
    
}

module.exports = {registerUser, loginUser} ;