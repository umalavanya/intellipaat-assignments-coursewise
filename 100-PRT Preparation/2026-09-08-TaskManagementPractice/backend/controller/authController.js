const jwt = require('jsonwebtoken') ;
const User = require('../models/User') ;

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'15d'}) 
}

// Register User
const registerUser = async (req,res) => {
    try{
        const {userName, email,password} = req.body ;
        if(!userName || !email || !password){
            return res.status(400).json({message:'Please fill all the fields!!'})
        }
        const userExist = await User.findOne({email}) ;
        
        if(userExist){
            console.log(`user Exists: ${userExist} and ${email}`) ;
            return res.status(400).json({message:'User already exists'}) ;
        }

        const user = await User.create({userName, email, password}) ;
        if(user){
            const token = generateToken(user.id) ;
            res.status(201).json({
                _id:user.id,
                userName:user.userName,
                email:user.email,
                token:token

            }) ;
            console.log('User created!!')
        }

    }catch(error){
        res.status(500).json({message:error.message,
            stack:error.stack}) ;
        
    }
} ;


// Login User
const loginUser = async (req,res) => {
    try{
        const { email,password} = req.body ;
        if(!email || !password){
            return res.status(400).json({message:'Please fill all the fields!!'})
        }
        const user = await User.findOne({email}) ;

        if(user && (await user.matchPassword(password))){

            const token = generateToken(user.id) ;
            res.json({
                _id:user.id,
                userName:user.userName,
                email:user.email,
                token:token,

            }) ;
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