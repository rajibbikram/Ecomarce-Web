const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgetPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Route to register user
router.route("/register").post(registerUser);

// route to login
router.route("/login").post(loginUser);

//route forrget password
router.route("/password/forgot").post(forgetPassword);

//reset password
router.route("/password/reset/:token").put(resetPassword);

// route  logout
router.route("/logout").get(logout);

//User Detail
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//update password 
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//update Profile
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//Admin  user control
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);



module.exports = router;
