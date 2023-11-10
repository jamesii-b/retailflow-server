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
    console.log(startDate)
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



async function specificSalesData(req, res) {
  let dBQ
  if (!req.query.t) {
    const [division, value] = req.params.division.split('=')
    console.log("division, value \n \n")
    console.log(division,value)
    dBQ = [
      {
        $unwind: "$products"
      },
      {
        $lookup: {
          from: "products",
          localField: "products.pID",
          foreignField: "pID",
          as: "productDetails"
        },
      },
      {
        $match: {
          [`productDetails.${division}`]: value
        }
      },
      {
        $project: {
          orderID: 1,
          orderDate: 1,
          products: 1
        }
      }
    ];
  }
  else {

    const query = req.query.t
    dateArr = await returnDate(query)
    startDate = dateArr[0]
    endDate = dateArr[1]
    const [division, value] = req.params.division.split('=')
    const dateQuery = {
      orderDate: startDate > endDate ? { $gte: endDate, $lte: startDate } : { $gte: startDate, $lte: endDate },
    };
    dBQ = [
      {
        $match: dateQuery // Match based on the date range
      },
      {
        $unwind: "$products"
      },
      {
        $match: {
          [`products.${division}`]: value // Additional product filtering
        }
      },
      {
        $project: {
          orderID: 1,
          orderDate: 1,
          products: 1
        }
      }
    ];
  };
  try {
    console.log(dBQ)
    const salesData = await Order.aggregate(dBQ);
    console.log(salesData)
    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = { getAllSalesData, specificSalesData };