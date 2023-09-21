const Order = require("../models/order");

const sales = async (req, res) => {
  try {
    const salesData = await Order.find({}).exec();
    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = sales;
