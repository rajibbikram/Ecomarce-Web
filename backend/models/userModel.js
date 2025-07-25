const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should have more than 8 characters"],
        select: false,
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },

    role: {
        type: String,
        default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//password incript
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {

    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Setting token expiry to 15 minutes from now
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};


module.exports = mongoose.model("User", userSchema);
