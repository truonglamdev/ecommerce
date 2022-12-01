const express = require('express');
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateUser,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require('../controller/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();
router.route('/auth/register').post(register);
router.route('/login').post(login);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/auth/logout').post(logout);

router.route('/auth/me').get(isAuthenticatedUser, getUserDetails);


router.route('/auth/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/auth/me/update').put(isAuthenticatedUser, updateUser);

router.route('/auth/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

router.route('/auth/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser);
router.route('/auth/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);
router.route('/auth/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
