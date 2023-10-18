const mongoose = require("mongoose");
const moment = require("moment-timezone");

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
  },
  pName: {
    type: String,
  },
  priceRate: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    // required: true,
  },
  orderDate: {
    type: Date,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
