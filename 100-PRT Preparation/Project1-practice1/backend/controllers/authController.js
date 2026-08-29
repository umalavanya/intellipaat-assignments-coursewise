const jwt = require('jsonwebtoken') ;
const User = require('../models/User') ;

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d',
    }) ;
} ;

const registerser = async (req, res) => {
    console.log('Registration request recieved:', req.body) ; //Logging

    try {
        const {name, email, password} = req.body ;

        // Validation
        if(!name || !email || !password){
            console.log('Missing fields: ', {name, email, password}) ; //Logging
            return res.status(400).json({message: 'Please fill all fields'}) ;
        }

        //Check if user exists
        
    } catch (error) {
        res.status(500).json({message: "Registration failed!"})
    }
}