const Product = require("../models/productModel");
//const { param } = require("../routes/productRoute");
const ErrorHandler = require("../utils/errorhander");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const e = require("express");

// Create Product
exports.createProduct = async (req, res, next) => {

  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products

exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);


    const products = await apiFeature.query; //  using modified query

    res.status(200).json({
      success: true,
      products,
      productCount: productsCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Update Product

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    );

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Product

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.deleteOne(); // Or use: await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//Get Product Details
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // You must send the product here
    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    // Invalid ObjectId goes here
    return res.status(500).json({
      success: false,
      message: "Invalid ID or internal server error",
      error: error.message
    });
  }
};


// review and reating product

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),  //  Ensure it's always a number
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }


  //  Check if user already reviewed the product
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update existing review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating),
          (rev.comment = comment);
    });
  } else {
    //  Add new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.ratings = product.reviews.forEach(rev => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;



  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added/updated successfully",
  });
});

//Get all  review
exports.getAllReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }


  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});




//Deletr review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, id: reviewId } = req.query;

  console.log(" Received productId:", productId);
  console.log(" Received reviewId:", reviewId);

  if (!productId || !reviewId) {
    return next(new ErrorHandler("Product ID and Review ID are required", 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    console.log(" Product not found in DB.");
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== reviewId.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.reviews = reviews;
  product.ratings = reviews.length > 0 ? avg / reviews.length : 0;
  product.numOfReviews = reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
}); 
