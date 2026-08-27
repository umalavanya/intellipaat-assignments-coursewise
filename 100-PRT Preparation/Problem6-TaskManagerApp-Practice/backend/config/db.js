const mongoose = require('mongoose') ;

const connectDB = async () => {

    try{

        await mongoose.connect(process.env.MONGODB_URI) ;
        console.log("The mongoDB connected!!")

    }catch(error){

        console.error("MongoDB is not connected",error) ;

    }

}

module.exports = connectDB ;