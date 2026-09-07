const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Graceful fallback logging so backend can run even if MongoDB service isn't currently running locally
    console.warn('Warning: Server running without active MongoDB connection. Ensure MongoDB is running for data persistence.');
  }
};

module.exports = connectDB;
