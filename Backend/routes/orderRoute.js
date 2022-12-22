const express = require('express');

const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateStatusOrder,
    deleteOrder,
} = require('../controller/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser, createOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders);
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateStatusOrder);
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
module.exports = router;
