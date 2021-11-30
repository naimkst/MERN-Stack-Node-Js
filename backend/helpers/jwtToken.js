const { options } = require("../routes/userRouter");

const sendToken = (user, statusCode, res) =>{
    const token = user.getJWTToken();

    //Send token to server cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });

}

module.exports = sendToken;