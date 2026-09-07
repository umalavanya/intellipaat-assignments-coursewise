const mongoose = require('mongoose') ;
const dotenv = require('dotenv') ;

const connectDB = async function(){
    try{
        await mongoose.connect(process.env.MONGODB_URI) ;
        console.log('MongoDB connected') ;
    } catch (error){
        console.error('MongoDB is not connected!!') ;
        process.env.exit(1) ;
    }
}
module.exports = connectDB ;