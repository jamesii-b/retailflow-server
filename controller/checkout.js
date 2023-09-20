const mongoose = require("mongoose");
const axios = require("axios");

const Order = require("../models/order");
const Product = require("../models/product");
const checkout = async (req, res) => {
  try {
    const pId = req.body.pid;
    console.log(pId);
    const Response = await axios.get(`http://localhost:5000/product/${pId}`);

    const productResponse = Response.data.product;

    if (!productResponse) {
      // Handle the case where the product is not found
      return res.status(404).json({ msg: "Product not found" });
    }
    const product = productResponse[0];
    const orderCreate = new Order({
      orderID: Date.now().toString(),
      pName: product.pName,
      price: product.price,
      pID: req.body.pid,
      quantity: req.body.quantity,
      size:product.size,
    });
    await orderCreate.save();

    // Update the quantity of the product
    await Product.findOneAndUpdate(
      { pID: req.body.pid },
      { $inc: { quantity: -req.body.quantity } } // Subtract the quantity
    );

    res.status(201).json({ msg: "Checkout success" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = checkout;
