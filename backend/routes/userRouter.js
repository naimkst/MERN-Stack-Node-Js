const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logOut, fogetPassword } = require('../controller/userController');


router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logOut);
router.route('/forget-password').post(fogetPassword);

router.route('/reset-password/:token').post(fogetPassword);

module.exports = router;