const express = require("express");
const router = express.Router();
const getSalesData = require("../controller/sales");
const salesTurnover = require("../controller/salesTurnover");

router.get("/sales", getSalesData);
router.get("/sales/turnover", salesTurnover)


module.exports = router;
