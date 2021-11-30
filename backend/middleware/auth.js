const asyncValidations = require("../helpers/asyncValidations");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthUser = asyncValidations(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Please login you are not authorize user!",
    });
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);
  next();
});

exports.userRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(500).json({
        success: false,
        message: `Role: ${req.user.role} is not permission to access this!`,
      });
    }
    next();
  };
};
