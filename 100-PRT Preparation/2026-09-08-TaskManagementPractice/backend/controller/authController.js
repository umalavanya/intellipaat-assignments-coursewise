const jwt = require('jsonwebtoken') ;
const User = require('../models/User') ;

const generateToken = (id) => {
    return jwt.sign({id}, process.env.MONGODB_URI, {expiresIn:'15d'}) 
}

// Register User
const registerUser = async (req,res) => {
    try{
        const {userName, email,password} = req.body ;
        if(!userName || !email || !password){
            return res.status(400).json({message:'Please fill all the fields!!'})
        }
        console.log({userName, email, password}) ;

        const userExist = await User.find({email}) ;
        console.log(`user Exists: ${userExists} and ${email}`) ;
        if(userExist){
            return res.status(400).json({message:'User already exists'}) ;
        }

        const user = user.create({userName, email, password}) ;
        if(user){
            const token = generateToken(user.id) ;
            res.status(201).json({
                _id:user.id,
                userName:user.userName,
                email:user.email,
                token:token

            }) ;
            console.log('User created!!')
        } else {
            console.log('User is not created!!')
            return res.status(400).json('Registration failed!!')
        }

    }catch(error){
        res.status(500).json({message:'Registration failed!!'}) ;
        console.log({
            message:error.message,
            stack:error.stack
        })
    }
} ;


// Login User
const loginUser = async (req,res) => {
    try{
        const { email,password} = req.body ;
        if(!email || !password){
            return res.status(400).json({message:'Please fill all the fields!!'})
        }
        console.log({email, password}) ;

        const user = await User.find({email}) ;
        
        if(user && await user.matchPassword(password)){

            const token = generateToken(user.id) ;
            res.status(201).json({
                _id:user.id,
                userName:user.userName,
                email:user.email,
                token:token

            }) ;
            console.log('User found')
        } else {
            console.log('User is not created!!')
            return res.status(400).json('Login failed!!')
        }

    }catch(error){
        res.status(500).json({message:'Login failed!!'}) ;
        console.log({
            message:error.message,
            stack:error.stack
        })
    }
} ;

module.exports = {registerUser, loginUser} ;