// controllers/salesController.js
const Order = require("../models/order");
const { returnDate, parseDate } = require("../utils/parseDate");

async function getAllSalesData(req, res) {
  if (!req.query.t) {
    try {
      const salesData = await Order.find();
      res.json(salesData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    const query = req.query.t
    dateArr = await returnDate(query)
    console.log("date arr is", dateArr)
    startDate = dateArr[0]
    endDate = dateArr[1]
    const dateQuery = {
      orderDate: startDate > endDate ? { $gte: endDate, $lte: startDate } : { $gte: startDate, $lte: endDate },
    };
    try {
      const salesData = await Order.find({ ...dateQuery });
      res.json(salesData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

}




module.exports = getAllSalesData;
