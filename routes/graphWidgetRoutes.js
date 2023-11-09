const express = require("express");

const router = express.Router();

const getTopSellingProductData = require("../controller/topSellingProduct");
const { salesGraphData, specificSalesGraphData } = require("../controller/salesGraphData")

router.get("/graph/sales/:timeframe", salesGraphData);
router.get("/product/graph/sales/:division/:timeframe", specificSalesGraphData);

router.get("/graph/topselling", getTopSellingProductData)
module.exports = router;
