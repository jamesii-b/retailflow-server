const mongoose = require("mongoose");
const axios = require("axios");

const Order = require("../models/order");
const Product = require("../models/product");
const ProductItem = require("../models/productItem");
const checkout = async (req, res) => {
  try {
    const ID = req.body.ID
    const Response = await axios.get(`http://localhost:5000/product/${ID}`);

    if (!Response.data.productItem[0]) {
      // Handle the case where the product is not found
      return res.status(404).json({ msg: "Product not found" });
    }
    const productItem = Response.data.productItem[0];

    try {

      const orderCreate = new Order({
        orderID: Date.now().toString(),
        pName: product.pName,
        priceRate: product.priceRate,
        ID: req.body.ID,
        size: product.size,
        totalAmount: product.priceRate * req.body.quantity,
        orderDate: Date.now().toString(),
      });
      await orderCreate.save().then(() => {
        //reduce the quantity on success
        ProductItem.findOneandDelete({ ID: ID })
      })
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
    res.status(201).json({ success: true, order: orderCreate });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = checkout;
