const mongoose = require("mongoose") ;

const connectDB = async () => {

    try{

        const mongoURI= process.env.MONGODB_URI || "mongodb://127.0.0.27017/eventMdb" ;
        await mongoose.connect(mongoURI) ;
        console.log("MongoDB connected successfully via mongoose") ;

    } catch(err){
        console.log("MongoDb Connection error: ",err.message) ;
        if (err.message.includes("requires authentication")){
            console.error("Please update the MONGODB_URI in .env file")
        }

    }

}

module.exports = connectDB ;