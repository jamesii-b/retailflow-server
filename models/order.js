const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderID:{
    type: String,
  },
  pName: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size:{
    type:Number,
    required:true
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
