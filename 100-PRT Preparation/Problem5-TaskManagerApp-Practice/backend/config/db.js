const mongoose = require('mongoose') ;

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase') ;
        console.log("MongoDB Connected!!")
    } catch (error){

        console.error("The mongoDb Connection failed: ", error.message) ;

    }

}

module.exports = connectDB ;