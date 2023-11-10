const express = require("express");
const router = express.Router();
const { getAllSalesData, specificSalesData } = require("../controller/salesData");
const { getSpecificTypeSalesTurnover, getAllTurnoverData, getSpecificTimeSalesTurnover } = require("../controller/salesTurnover")
const specialRequests = require("../controller/specialrequests");


// includes timequery range ?t=xxxToxxx
router.get("/sales", getAllSalesData);
router.get("/sales/:division", specificSalesData);
router.get("/turnover/sales", getAllTurnoverData)
router.get("/turnover/sales/:division", getSpecificTypeSalesTurnover)
router.get("/turnover/special/sales/:timedivision/:division?", getSpecificTimeSalesTurnover)

// such as 1day, 1 week, 1 month, 1 year
router.get("/special/sales/:timedivision/:division?", specialRequests)

module.exports = router;
