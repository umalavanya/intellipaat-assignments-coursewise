const mongoose= require('mongoose') ;
const dotenv = require('dotenv') ;

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase") ;
        console.log("MongoDB is connected!!")
    } catch(error){
        console.error("MongoDB is not connected: ", error.message)
    }
}

module.exports = connectDB ;