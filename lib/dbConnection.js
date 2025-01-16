
const mongoose = require("mongoose");

module.exports = function () {
  return mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((conn) => {
      console.log("MongoDB connected successfully");
      return conn; // Return the connection object
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      throw error; // Throw the error to be caught by the caller
    });
};