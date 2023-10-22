// controllers/salesController.js
const Order = require("../models/order");

async function getSalesData(req, res) {
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
      orderDate: startDate > endDate ? { $gte: endDate, $lte: startDate } : { $gte: startDate, $lte: endDate }
    };
    try {
      const salesData = await Order.find({ ...dateQuery });
      console.log("printing the salesData inside of sales.js", salesData)
      res.json(salesData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

}


async function returnDate(queryTime) {
  const [startDateStr, endDateStr] = queryTime.split('to');
  const startDateComponents = startDateStr.split('_');
  startDate = parseDate(startDateComponents)
  try {

    const endDateComponents = endDateStr.split('_');
    endDate = parseDate(endDateComponents)
  }
  catch (err) {
    endDate = new Date()
  }
  return [startDate, endDate]
}
function parseDate(comp) {
  // 1 reduced as month indexed through 0
  const date = new Date(comp[0], comp[1] - 1, comp[2]);
  return date;
}


module.exports = getSalesData;
