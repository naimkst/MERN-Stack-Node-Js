const express = require("express");
const mongoose = require("mongoose");
const Products = require("../models/productModel");
const asyncValidation = require("../helpers/asyncValidations");
const ApiFeatures = require("../helpers/apiFeatures");
const User = require("../models/userModels");
const sendToken = require("../helpers/jwtToken");
const sendEmail = require('../helpers/sendEmail');

//User Register
exports.registerUser = asyncValidation(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample id",
      url: "prfilepictureurl",
    },
  });

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    user,
    token,
  });
});

//Login User
exports.loginUser = asyncValidation(async (req, res, next) => {
  const { email, password } = req.body;

  //Check the password and email is valid or not!
  if (!email || !password) {
    res.status(200).json({
      success: false,
      message: "Please enter your email and password!",
    });
  }
  const user = await User.findOne({
    email: email,
  }).select("+password");

  if (!user) {
    res.status(500).json({
      success: false,
      message: "User not find!",
    });
  }
  const isPasswordMatech = await user.comparePassword(password);

  if (!isPasswordMatech) {
    res.status(401).json({
      success: false,
      message: "Email and Password not match!",
    });
  }

  // const token = user.getJWTToken();

  // res.status(200).json({
  //     success: true,
  //     token
  // });

  sendToken(user, 200, res);
});

//User Logout
exports.logOut = asyncValidation(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout Sucessfull!",
  });
});

// User Forget Password
exports.fogetPassword = asyncValidation( async (req, res, next) => {
  //Find User
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  // Get User password token

  const restToken = await user.getResetPassword();
  console.log(restToken);
  await user.save({
    validateBeforeSave: false,
  });

  //Email Link Send To User
  const resetPaaswordLInk = `${req.protocol}://${req.get('host')}/api/reset-password/${restToken}`;

  const sendMessage = `Your password reset token is :- \n \n ${resetPaaswordLInk} \n\n If you have not requestied this email then just ignore it thanks!`;

  try{

    await sendEmail({
        email: user.email,
        subject: `Ecommerce Password recovery`,
        message: sendMessage,
    });

    res.status(200).json({
        success: true,
        message: `Email send to ${user.email} successfully!`
    });
      
  }catch(error){
    user.getResetPassword =  undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
        validateBeforeSave: false
    });

    res.status(500).json({
        success: false,
        message: error.message
    });

  }
});
