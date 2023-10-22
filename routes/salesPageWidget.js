const express = require("express");

const Router = express.Router();

const { salesGraphData } = require("../controller/graphData");

Router.get("/salesgraph", salesGraphData);

module.exports = Router;