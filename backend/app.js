const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cookieParser  = require("cookie-parser");
const order = require("./routes/orderRoute");


app.use(express.json());
app.use(cookieParser());
//product
app.use("/api/v1",product);

//User Register
app.use("/api/v1", user);

//Middleware for error
app.use(errorMiddleware);

//for order
app.use("/api/v1", order);

module.exports = app