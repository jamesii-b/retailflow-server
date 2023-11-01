const express = require("express");

const router = express.Router();

// const allSalesGraphData = require("../controller/allGraphData");
// const getTopSellingProductData = require("../controller/topSellingProduct");
// const graphData = require("../controller/bargraphdata");
const salesGraphData = require("../controller/salesgraphdata");

// router.get("/salesgraph", allSalesGraphData);
// router.get("/salesgraph/:timeframe", graphData);
// router.get("/topsellinggraph", getTopSellingProductData)

router.get("/graph/sales",salesGraphData)

module.exports = router;
