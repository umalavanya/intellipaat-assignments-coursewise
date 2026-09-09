const jwt = require('jsonwebtoken') ;
const User = require('../models/User')

const protect = async (req,res, next) => {
    try{
        let token ;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1] ;
            console.log(token);
            if(!token){
                 res.status(401).json({message:'Not authorized, No Token'})
            }
            const decoded = await jwt.verify(token, process.env.JWT_SECRET) ;
            console.log(decoded) ;
            req.user = await User.findById(decoded.id).select('-password') ;
            console.log(req.user) ;

            next() ;
        }

    } catch(error){

        res.status(401).json({message:'Not Authorized, token failed'})

    }

    
}

module.exports = {protect}

