const express = require("express");
const router = express.Router();
const getAllSalesData = require("../controller/allSalesData");
const specificSalesData = require("../controller/specificSalesData");
const getAllTurnoverData = require("../controller/allSalesTurnover")
const getSpecificSalesTurnover = require("../controller/specificSalesTurnover");

router.get("/sales", getAllSalesData);
router.get("/sales/:division", specificSalesData);
router.get("/sales/turnover", getAllTurnoverData)
router.get("/sales/turnover/:division", getSpecificSalesTurnover)


module.exports = router;
