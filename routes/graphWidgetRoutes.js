const express = require("express");

const router = express.Router();
const { salesGraphData, specificSalesGraphData } = require("../controller/graphSalesData");
const getTopSellingProductData = require("../controller/topSellingProduct");
router.get("/graph/sales/:timeframe?", salesGraphData);
router.get("/product/graph/sales/:division/:timeframe", specificSalesGraphData);

router.get("/graph/topselling", getTopSellingProductData)
module.exports = router;
