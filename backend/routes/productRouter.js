const express = require('express');
const { getAllProducts, createProduct, editProduct, removeProduct, productDetails } = require('../controller/productController');
const { isAuthUser, userRole } = require('../middleware/auth');
const router = express.Router();


router.route('/products').get(isAuthUser, userRole('admin'), getAllProducts);
router.route('/products/new').post( isAuthUser, userRole('admin'), createProduct);
router.route('/products/edit/:id').put( isAuthUser, editProduct);
router.route('/products/delete/:id').delete( isAuthUser, removeProduct);
router.route('/products/:id').get(productDetails);





module.exports = router;