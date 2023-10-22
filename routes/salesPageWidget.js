const express = require("express");

const Router = express.Router();

const { salesPageWidgetData } = require("../controller/graphData");

Router.get("/saleswidget", salesPageWidgetData);

module.exports = Router;