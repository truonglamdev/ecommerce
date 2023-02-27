const express = require('express');
const {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    createProductReview,
    getAllProductReviews,
    deleteProductReview,
    getAdminProducts,
} = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();
router.route('/products').get(getAllProduct);
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/product/:id').get(getDetailsProduct);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getAllProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
