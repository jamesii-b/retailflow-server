const { returnDate, parseDate } = require("../utils/parseDate");
const Order = require("../models/order");

async function specificSalesData(req, res) {
    const query = req.query.t
    dateArr = await returnDate(query)
    startDate = dateArr[0]
    endDate = dateArr[1]
    const [division, value] = req.params.division.split('=')
    const dateQuery = {
        orderDate: startDate > endDate ? { $gte: endDate, $lte: startDate } : { $gte: startDate, $lte: endDate },
    };
    const dBQ = {
        ...dateQuery,
      "products": {
                "$elemMatch": {
                    [division]: value
                }
            }

    };
    console.log(dBQ)
    try {
        const salesData = await Order.find({ ...dBQ });
        res.json(salesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = specificSalesData;