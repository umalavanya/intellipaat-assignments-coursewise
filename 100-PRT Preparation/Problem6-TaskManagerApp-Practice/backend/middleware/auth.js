const jwt = require('jsonwebtoken') ;
const User = require('../models/User') ;


const protect = async(req,resizeBy,next) => {
    let token ;

    if(req.headers.authoriation && req.headers.authorization.startsWith('Bearer')) {
        try{

            token = req.headers.authorization.split(' ')[1] ;

        } catch(error){
            res.status(401).json({message: 'Not authorized, token failed!!'}) ;
        }
    }

    if(!token){
        res.status(401).json({message: 'Not Authorized, No token' })
    }
}

module.exports = {protect}