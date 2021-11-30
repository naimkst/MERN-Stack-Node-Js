const Products = require("../models/productModel");
const asyncValidation = require("../helpers/asyncValidations");
const ApiFeatures = require("../helpers/apiFeatures");

//Create Product
exports.createProduct = asyncValidation(async(req, res) => {
    const product = await Products.create(req.body);
    res.status(200).json({
        success: true,
        product,
    });
});

//Get Product
exports.getAllProducts = asyncValidation(async(req, res) => {
    const resultPerPage = 1;
    const apiFeatures = new ApiFeatures(Products.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const product = await apiFeatures.query;
    res.status(200).json({
        success: true,
        product,
    });
});
//Updare Product
exports.editProduct = asyncValidation(async(req, res) => {
    let product = await Products.findById(req.params.id);

    console.log(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found!",
        });
    } else {
        product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    }

    res.status(200).json({
        success: true,
        product,
    });
});

//Remove Product
exports.removeProduct = asyncValidation(async(req, res, next) => {
    const productExist = await Products.findById(req.params.id);
    console.log(productExist);
    if (!productExist) {
        res.status(404).json({
            success: false,
            message: "Oppss something is wrong!",
        });
    } else {
        const product = await productExist.remove();
        res.status(200).json({
            success: true,
            message: "Delete Success Complete!",
        });
    }
});

//Product Details
exports.productDetails = asyncValidation(async(req, res, next) => {
    const product = await Products.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found!",
        });
    } else {
        res.status(200).json({
            success: true,
            product,
        });
    }
});