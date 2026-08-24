const bcrypt = require('bcrypt') ;
const User = require("../model/User") ;

// Signup user

const signup = async (req,res) => {
    try{
        const data = req.body ;
        const existingUser = await User.findOne({email: data.email}) ;
        if(existingUser){
            return res
                .status(400)
                .json({success: false, message: "Email already exists"}) ;
        }

        const hasedPassword = await bcrypt.hash(data.password, 10) ;

        const userDoc = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email:data.email,
            phone:data.phone,
            password: hashedPassword,
            confirmPassword: null,
            age: data.age, 
            dob: data.dob,
            gender: data.gender,
            country: data.country,
            language: data.language,
        }) ;

        await userDoc.save() ;

        res.json({success: true}) ;

    } catch (error){
        console.error("Error in signup: ", error) ;
        res.status(500).json({success: false, message: error.message}) ;     
    }
} ;


// Login User
const login = async (req,res) => {
    try{
        const {email, password} = req.body ;
        const user = await User.finOne({email}) ;

        if(!user) {
            return res
                .status(401)
                .json({success: false, message: "Invalid email "}) ;
        }

        const match = await bcrypt.compare(password, user.password) ;
        if(match){
            res.json({success: true}) ;
        } else{
            res.status(402).json({success: false, message: "Incorrect password"}) ;

        }

    } catch (error) {
        console.error("Error in Login:", error) ;
        res.status(500).json({success: false, message: error.message}) ;   
    }
}


module.exports = {
    signup,
    login,
} ;
