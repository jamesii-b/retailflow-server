const express = require("express");

const router = express.Router();

const allSalesGraphData = require("../controller/allGraphData");
const getTopSellingProductData = require("../controller/topSellingProduct");
const getSpecificSalesGraphData = require("../controller/specificSalesGraphData");

router.get("/salesgraph", allSalesGraphData);
router.get("/salesgraph/:division", getSpecificSalesGraphData);
router.get("/topsellinggraph", getTopSellingProductData)

module.exports = router;