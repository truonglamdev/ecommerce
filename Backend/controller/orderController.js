const Order = require('../models/orderModel.js');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');
const Product = require('../models/productModel.js');

//Create new order
const createOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        order,
    });
});

//Get my order
const getMyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

//Get single order
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});

//Get all orders [admin]
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order) => (totalAmount += order.totalPrice));
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

//Update order status [admin]
const updateStatusOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this Id ${req.params.id}`, 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    if (req.body.status === 'Shipped') {
        order.orderItems.forEach(async (item) => {
            await UpdateStock(item.product, item.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'update successfully',
    });
});

async function UpdateStock(id, quantity) {
    const product = await Product.findById(id);
    if (product.Stock >= quantity) {
        product.Stock -= quantity;
    } else {
        product.Stock = 0;
    }

    await product.save({ validateBeforeSave: false });
}

//Delete order [admin]
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this Id ${req.params.id}`, 404));
    }

    await order.remove();
    res.status(200).json({
        success: true,
        message: 'Delete order successfully',
    });
});

module.exports = { createOrder, getMyOrders, getSingleOrder, getAllOrders, updateStatusOrder, deleteOrder };
