const axios = require("axios");
const salesGraphCoordinate = require("../function/salesGraph.js");
// const express = require('express')
async function salesGraphData(req, res) {

    const timeQuery = req.query.t
    let resSales;
    if (timeQuery) {
        try {
            resSales = await axios.get("http://localhost:5000/sales?t=" + timeQuery)
            var calculatedData = await salesGraphCoordinate(resSales.data)
            res.json(calculatedData);
        } catch (err) {
            res.status(500).json("Internal Server Error")
        }
    } else if (req.query.timeframe) {
        timeFrame = req.query.timeframe

        resSales = await axios.get("http://localhost:5000/sales/special/" + timeFrame)

        var calculatedData = await salesGraphCoordinate(resSales.data)
        res.json(calculatedData);

    }
    else {
        try {

            resSales = await axios.get("http://localhost:5000/sales")
            var calculatedData = await salesGraphCoordinate(resSales.data)
            res.status(200).send(calculatedData);
        } catch (err) {
            res.status(500).json("Internal Server Error")
        }
    }

}

async function specificSalesGraphData(req, res) {
    const Division = req.params.division
    const timeFrame = req.params.division
    if(Division){
        axios.get("http://localhost:5000/sales/"+Division)
    }
res.status(200).json("hello world")
}

module.exports = { salesGraphData, specificSalesGraphData }
