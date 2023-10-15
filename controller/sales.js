// controllers/salesController.js
const Order = require("../models/order");

async function getAllSales(req, res) {
  try {
    const salesData = await Order.find();
    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getAllSales;
