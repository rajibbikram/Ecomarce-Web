const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander"); 
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create New Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems, 
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});


//get single order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


//Get logged  user order list  order
exports.myOrder = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});



//Get all user order --- admin 
exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });


    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

//update order status ----admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Delivered") {
    for (const item of order.orderItems) {
      await updateStock(item.product, item.quantity); // ✅ fixed field
    }
    order.deliveredAt = Date.now();
  }

  order.orderStatus = req.body.status;

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});


async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    
    if (!product) {
        throw new ErrorHandler("Product not found while updating stock", 404);
    }

    product.Stock = Math.max(product.Stock - quantity, 0); // Prevents negative stock

    await product.save({ validateBeforeSave: false });
}



// Delete order -- admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne(); 

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
