const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDatabase;
