const mongoose = require("mongoose");
const moment = require("moment-timezone");

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  products: [
    {
      pID: {
        type: String,
      },
      ID: {
        type: String,
        required: true,
      },
      priceRate: {
        type: Number,
      },
      size: {
        type: String,
      },
      supplier:{
        type: String,
      },
      productAdded:{
        type: Date,
      },
      expireDate:{
        type: Date,
      }
    }
  ],

});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
