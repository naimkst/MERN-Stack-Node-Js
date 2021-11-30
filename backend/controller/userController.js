const express = require('express');
const mongoose = require('mongoose');
const Products = require("../models/productModel");
const asyncValidation = require("../helpers/asyncValidations");
const ApiFeatures = require("../helpers/apiFeatures");
const User = require("../models/userModels");
const sendToken = require('../helpers/jwtToken');

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
    token
  });

});

//Login User
exports.loginUser = asyncValidation( async ( req, res, next ) => {
    const { email, password } = req.body;

    //Check the password and email is valid or not!
    if(!email || !password){
        res.status(200).json({
            success: false,
            message: 'Please enter your email and password!',
        });
    }
    const user = await User.findOne({
        email: email,
    }).select('+password');

    if(!user){
        res.status(500).json({
            success: false,
            message: 'User not find!'
        });
    }
    const isPasswordMatech = await user.comparePassword(password);

    if(!isPasswordMatech){
        res.status(401).json({
            success: false,
            message: 'Email and Password not match!'
        });
    }

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token
    // });

    sendToken( user, 200, res);

});

//User Logout
exports.logOut = asyncValidation( async(req, res, next) => {
    res.cookie( 'token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logout Sucessfull!'
    });
});