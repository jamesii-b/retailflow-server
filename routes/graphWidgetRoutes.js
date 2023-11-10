const express = require("express");

const router = express.Router();
const { salesGraphData, specificSalesGraphData } = require("../controller/graphSalesData");
const getTopSellingProductData = require("../controller/topSellingProduct");
const { mostSellingCategory, mostSellingProduct } = require("../controller/widgets")
router.get("/graph/sales/:timeframe?", salesGraphData);
router.get("/product/graph/sales/:division/:timeframe", specificSalesGraphData);

router.get("/graph/topselling/product", mostSellingProduct)
router.get("/graph/topselling/category", mostSellingCategory)
module.exports = router;
