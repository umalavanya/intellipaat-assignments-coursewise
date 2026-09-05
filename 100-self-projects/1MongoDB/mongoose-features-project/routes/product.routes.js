const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.patch('/:id/stock', productController.updateProductStock);
// Add more product routes as needed

module.exports = router;