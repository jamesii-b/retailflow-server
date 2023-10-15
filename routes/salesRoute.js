const express = require("express");
const router = express.Router();
const getAllSales  = require("../controller/sales");

router.get("/sales", getAllSales);

module.exports = router;
