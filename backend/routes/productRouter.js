const express = require('express');
const { getAllProducts, createProduct, editProduct, removeProduct, productDetails } = require('../controller/productController');
const { isAuthUser, userRole } = require('../middleware/auth');
const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/products/new').post( isAuthUser, userRole('admin'), createProduct);
router.route('/products/edit/:id').put( isAuthUser, userRole('admin'), editProduct);
router.route('/products/delete/:id').delete( isAuthUser, userRole('admin'), removeProduct);
router.route('/products/:id').get(productDetails);





module.exports = router;