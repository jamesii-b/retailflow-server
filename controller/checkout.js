const mongoose = require("mongoose");
const axios = require("axios");

const Order = require("../models/order");
const Product = require("../models/product");
const ProductItem = require("../models/productItem");
const checkout = async (req, res) => {
  try {
    console.log("req.body")
    console.log(req.body)
    // if (!Array.isArray(req.body)) {
    //   return res.status(400).json({ msg: "Request body should be an array" });
    // }

    const itemsToSave = []
    var totalPrice = 0;
    // console.log(req.body)
    // console.log("req.body.orderDate", req.body.orderDate)
    for (const element of (req.body["checkoutIDs"])) {
      // console.log(element);
      const Response = await axios.get(`http://localhost:5000/product/${element}`);

      if (!Response.data.productItem) {
        return res.status(404).json({ msg: "Product not found" });
      }
      const productFamily = Response.data.productItem[0].productFamily;
      const productItem = Response.data.productItem[0];

      try {

        const orderCreate = {
          pID: productFamily.pID,
          priceRate: productItem.priceRate,
          ID: Date.now().toString(),
          supplier: productItem.supplier,
          expireDate: productItem.expireDate,
          productAdded: productItem.productAdded,
        };
        totalPrice += parseInt(productItem.priceRate);
        await itemsToSave.push(orderCreate);
        await ProductItem.findOneAndDelete({ ID: element }).then((result) => {
          // console.log("deleted");
        });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    }


    const newOrder = new Order({
      orderID: req.body["billID"],
      totalAmount: parseInt(totalPrice),
      products: itemsToSave,
      orderDate: Date.now(),
    })

    await newOrder.save();

    res.json({ msg: "Order placed successfully" });
  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = checkout;
