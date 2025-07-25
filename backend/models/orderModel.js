const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: String, required: true },
        phoneNo: { type: Number, required: true },
    },

    orderItems: [ //  Renamed from orderItem to orderItems
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
            quantity: { type: Number, required: true }, //  Changed to Number
            image: { type: String, required: true },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
    },

    paidAt: { type: Date, required: true },

    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    orderStatus: { type: String, required: true, default: "Processing" },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now }, //  Changed type from String to Date
});

module.exports = mongoose.model("Order", orderSchema);
