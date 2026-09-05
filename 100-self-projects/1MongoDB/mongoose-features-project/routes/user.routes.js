const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Basic CRUD routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/search', userController.searchUsers); // Text search
router.get('/analytics', userController.getUserAnalytics); // Aggregation
router.get('/counts', userController.getUserCounts); // Count documents
router.get('/distinct/:field', userController.getDistinctValues); // Distinct values
router.get('/nearby', userController.getNearbyUsers); // Geospatial
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Advanced operations
router.post('/bulk', userController.bulkOperations);
router.post('/transaction', userController.transactionExample);

module.exports = router;