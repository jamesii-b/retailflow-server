const axios = require("axios");
const salesGraphCoordinate = require("../function/salesGraphCalculation.js");
const express = require('express')
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
    } else if (req.params.timeframe) {
        timeFrame = req.params.timeframe
        resSales = await axios.get("http://localhost:5000/special/sales/" + timeFrame)
        console.log(resSales.data)
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
    const Division = req.params.division;
    const timeFrame = req.params.timeframe
    if (Division && timeFrame) {
        try {
            let coordinates = [];
            const resSales = await axios.get("http://localhost:5000/special/sales/" + timeFrame + "/" + Division);
            console.log("printing the resSales data \n \n \n")
            // synchronousSales = JSON.stringify(resSales.data)
            resSales.data.forEach(element => {
                var x = new Date(element.orderDate)
                let sum = 0;
                sum = element.orders.reduce((sum, item) => {
                    return sum + item.products.priceRate
                }, 0)

                var object = [x, sum];

                coordinates.push(object)

            });
            coordinates.sort((a, b) => a[0] - b[0]);
            console.log(coordinates)
            console.log("coordinates")
            res.json(coordinates)
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    } else {
        res.status(400).json("hello world");
    }
}

module.exports = { specificSalesGraphData, salesGraphData };


async function selectedOrderCalculation() {


}