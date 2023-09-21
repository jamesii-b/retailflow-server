const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  pID: {
    type: String,
  },
  pName: {
    type: String,
    // required: true,
    // unique: true,
  },
  expireDate: {
    type: Date,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  quantity: {
    type: Number,
    // required: true,
  },
  category: {
    // required: true,
    type: String,
  },
  subCategory: {
    type: String,
  },
  threshold: {
    type: String,
  },
  size: {
    type: String,
  },
  sName: {
    type: String,
  },
  selfLocation: {
    // required: true,
    type: String,
  },
  image: {
    type: String,
  },
  otherAttribute: {
    type: String,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
