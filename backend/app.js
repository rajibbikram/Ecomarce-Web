const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cookieParser  = require("cookie-parser");
const order = require("./routes/orderRoute");
const bodyParser = require ("body-parser");
const fileUpload = require ("express-fileupload"); 

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(fileUpload());
//product
app.use("/api/v1",product);

//User Register
app.use("/api/v1", user);

//Middleware for error
app.use(errorMiddleware);

//for order
app.use("/api/v1", order);

module.exports = app