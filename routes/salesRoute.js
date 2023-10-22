const express = require("express");
const router = express.Router();
const getAllSalesData = require("../controller/sales");
const salesTurnover = require("../controller/salesTurnover");
const specificSalesData = require("../controller/specificSalesData");

router.get("/sales", getAllSalesData);
router.get("/sales/:division", specificSalesData);
router.get("/sales/turnover", salesTurnover)
router.get("/sales/turnover/:division", salesTurnover)


module.exports = router;
