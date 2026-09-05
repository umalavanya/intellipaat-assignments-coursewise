const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const database = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (custom)
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url}`);
  next();
});

// Mount API routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      connected: database.isConnected,
      state: database.getConnectionStatus()
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
  
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0]
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
async function startServer() {
  try {
    await database.connect();
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Connection Status: ${database.getConnectionStatus()}`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n🔄 Graceful shutdown initiated...');
  try {
    await database.disconnect();
    console.log('✅ Database disconnected');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});

// Start the application
startServer();

module.exports = app;