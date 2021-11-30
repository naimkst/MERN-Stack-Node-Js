const ErrorHandler = require('../helpers/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.meesage = err.meesage || "Internal Server Error!";

    res.status(err.statusCode).json({
        success: false,
        message: err.meesage,
    });
}