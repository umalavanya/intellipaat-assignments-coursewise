const mongoose = require('mongoose');
require('dotenv').config();

class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      console.log('Database already connected');
      return;
    }

    const options = {
      // Connection options
      autoIndex: true, // Build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      // Additional options
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 30000,
      retryWrites: true,
      retryReads: true,
      // Write concern
      writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
      }
    };

    try {
      const connection = await mongoose.connect(process.env.MONGODB_URI, options);
      this.isConnected = true;
      
      console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
      console.log(`📊 Database: ${connection.connection.name}`);
      console.log(`🔗 Connection State: ${mongoose.connection.readyState}`);
      
      this.setupEventListeners();
      
      return connection;
    } catch (error) {
      console.error('❌ MongoDB Connection Error:', error.message);
      process.exit(1);
    }
  }

  setupEventListeners() {
    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 Mongoose disconnected from MongoDB');
      this.isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Mongoose reconnected to MongoDB');
      this.isConnected = true;
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  async disconnect() {
    if (!this.isConnected) {
      return;
    }
    
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('📴 MongoDB disconnected gracefully');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }

  // Helper method to check connection status
  getConnectionStatus() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized'
    };
    return states[mongoose.connection.readyState] || 'unknown';
  }

  // Get the native MongoDB driver instance
  getNativeDriver() {
    return mongoose.connection.getClient();
  }
}

module.exports = new Database();