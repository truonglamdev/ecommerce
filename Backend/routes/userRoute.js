const express = require('express');
const { register, login, logout } = require('../controller/userController');

const router = express.Router();
router.route('/auth/register').post(register);
router.route('/auth/login').post(login);
router.route('/auth/logout').post(logout);

module.exports = router;
