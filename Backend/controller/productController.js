const Product = require('../models/productModel.js');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');

const createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

const getAllProduct = catchAsyncErrors(async (req, res, next) => {
    const resultsPerPage = 9;
    const countProducts = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
    const products = await apiFeature.query;
    const filteredProductsCount = products.length;

    return res.status(200).json({
        success: true,
        products,
        countProducts,
        resultsPerPage,
        filteredProductsCount,
    });
});

// Update a product -- admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    let product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    return res.status(200).json({
        success: true,
        product,
    });
});

//Delete product [admin]

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    //Delete images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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

// create review product

const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => rev.user.id.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.id.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => (avg += rev.rating));
    product.ratings = avg / product.reviews.length;

    product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

//Get all  product review
const getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
    const productId = req.query.id;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    return res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete review
const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev) => (avg += rev.rating));

    const numOfReviews = reviews.length;
    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        },
    );
    return res.status(200).json({
        success: true,
    });
});

const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    createProductReview,
    getAllProductReviews,
    deleteProductReview,
    getAdminProducts,
};
