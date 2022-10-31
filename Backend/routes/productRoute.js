const express = require('express');
const {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
} = require('../controller/productController');
const isAuthenticatedUser = require('../middleware/auth');

const router = express.Router();
router.route('/products').get(isAuthenticatedUser, getAllProduct);
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').get(getDetailsProduct);

module.exports = router;
