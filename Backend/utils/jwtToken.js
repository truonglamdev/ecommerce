const sendToken = (statusCode, user, res) => {
    const token = user.getJWTToken();
    const options = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        maxAge: 24 * 3600 * 1,
        httpOnly: false,
        secure: false,
    };


    return res.cookie('token', token, options).status(statusCode).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
