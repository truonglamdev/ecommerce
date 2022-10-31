const User = require('../models/userModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/jwtToken');

//Create a new user
const register = catchAsyncErrors(async (req, res) => {
    const { name, password, email } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'sample public id',
            url: 'example',
        },
    });

    const token = user.getJWTToken();
    sendToken(201, user, res);
});

// Login a user
const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email Or Password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid Email Or Password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email Or Password', 401));
    }

    sendToken(200, user, res);
});

//Logout user

const logout = catchAsyncErrors(async (req,res,next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged Out',
    });
})

module.exports = {
    register,
    login,
    logout,
};
