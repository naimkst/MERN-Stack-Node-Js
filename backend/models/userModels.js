const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter your name"],
        maxlength: [255, "Name can not excuted 255 characters"],
        minlength: [2, "Name should be minimum 2 charecter"],
    },
    email: {
        type: String,
        require: ["true", "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        require: [true, "Please enter your password"],
        minlength: [5, "Password should be minimum 5 charecter"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWt Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JTW_EXPIRE,
    });
};

//Compare password
userSchema.methods.comparePassword = async function (reqPassword) {
    return await bcrypt.compare(reqPassword, this.password);
};

//User Password Reset
userSchema.methods.getResetPassword = async function () {
    //Generate Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;

};
module.exports = mongoose.model("Users", userSchema);
