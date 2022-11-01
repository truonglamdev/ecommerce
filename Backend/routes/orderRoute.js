const express = require('express');

const router = express.Router();

const {
    createOrder,
    getMyOrder,
    getSingleOrder,
    getAllOrders,
    updateStatusOrder,
    deleteOrder,
} = require('../controller/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser, createOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/order/me').get(isAuthenticatedUser, getMyOrder);
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateStatusOrder);
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
module.exports = router;
