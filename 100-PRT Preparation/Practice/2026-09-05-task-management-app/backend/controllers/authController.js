const jwt = require('jsonwebtiken') ;
const User = require('./models/User') ;

// generate Token
const generateToken = async (id) => {
    return await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'15d'}) ;
}

// Register user 
const register = async (req, res) => {
    try{
        const {userName,email,password} = req.body ;
        if(!userName || !email || !password ){
            res.status(400).json({message:'Please fill all the fields'}) ;
        }

        const userExist = await User.findOne({email}) ;
        if(userExist){
            return res.status(400).json({message:'User already exists'}) ;
        }

        // Create a new user
        const user = await User.create({userName, email, password}) ;
        if(user){
            const token = generateToken(user._id) ;
            res.status(201).json({
                _id:user._id ,
                userName:user.userName,
                email:user.email,
                token:token
            })
        } else {
            return res.status(400).json({message:'Invalid User details'}) ;
        }
        
    } catch (error) {
        return res.status(500).json({message: error.message}) ;
    }
} 

// Login User
