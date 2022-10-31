const Product = require('../models/productModel.js');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');
const ApiFeatures = require('../utils/apifeatures');

const createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

const getAllProduct = catchAsyncErrors(async (req, res) => {
    const resultsPerPage = 5;
    const countProduct = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
    const products = await apiFeature.query;

    return res.status(200).json({
        success: true,
        products,
        countProduct,
    });
});

// Update a product -- admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    let product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    return res.status(200).json({
        success: true,
        product,
    });
});

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product.remove();
    return res.status(200).json({
        success: true,
        message: 'Product delete successfully',
    });
});

const getDetailsProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    return res.status(200).json({
        success: true,
        product,
    });
});
module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
};
