const express = require('express');
const router = express.Router();

// Import all route files
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');

// Mount routes with their base paths
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

// Root route with API information
router.get('/', (req, res) => {
  res.json({
    name: 'Mongoose Features API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders'
    },
    features: [
      'CRUD Operations',
      'Query Helpers',
      'Virtual Properties',
      'Middleware (pre/post)',
      'Instance & Static Methods',
      'Population',
      'Aggregation Pipeline',
      'Transactions',
      'Geospatial Queries',
      'Text Search',
      'Bulk Operations',
      'Validation',
      'Indexes',
      'Lean Queries',
      'Distinct Values',
      'Counting',
      'Pagination',
      'Sorting',
      'Filtering',
      'Projection'
    ]
  });
});

module.exports = router;