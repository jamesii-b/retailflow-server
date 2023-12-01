const express = require("express");
const Order = require("../models/order");
const router = express.Router();


// default all time
router.get("/order", async (req, res) => {
    const convertedOrders = [];

    const allOrders = await Order.find();

    // res.json(allOrders);

    for (const element of allOrders) {
        convertedOrders.push([element["orderDate"], element["orderID"], element["totalAmount"]])

    }
    convertedOrders.sort(function (a, b) {
        return new Date(a[0]) - new Date(b[0]);
    });
    res.json(convertedOrders)

})



module.exports = router;
