const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  pID: {
    type: String,
    unique: true,
  },
  threshold: {
    type: Number,
    default: 0,
  },
  pName: {
    type: String,
  },
  category: {
    default: "null",
    type: String,
  },
  subCategory: {
    type: String,
    default: "null",
  },
  selfLocation: {
    type: String,
    default: "null",
  },
  image: {
    type: String,
    default: "null",
  },
  otherAttribute: {
    type: String,
    default: "null",
  },
  size: {
    type: String,
    default: "null",
  },
  productAdded: {
    type: Date,
    default: Date.now(),
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
