const express = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    createProductReview,
    getAllReview,
    deleteReview,
} = require("../controllers/productController");
const { get } = require("mongoose");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// GET all products
router.route("/products").get(getAllProducts);

// POST a new product
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// Update product or Delete
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// get product details
router.route("/product/:id").get(getProductById);

//user reviews
router.route("/review").put(isAuthenticatedUser, createProductReview);

//routr for review get and delete
router.route("/reviews").get(getAllReview).delete(isAuthenticatedUser, deleteReview);

module.exports = router;
