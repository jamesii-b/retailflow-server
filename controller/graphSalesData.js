const axios = require("axios");
const salesGraphCoordinate = require("../function/salesGraphCalculation.js");
const express = require('express');
const entireOrderCalculation = require("../function/salesGraphCalculation.js");
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
        var calculatedData = await entireOrderCalculation(resSales.data)
        res.json(calculatedData);

    }
    else {
        try {
            resSales = await axios.get("http://localhost:5000/sales")
            var calculatedData = await entireOrderCalculation(resSales.data)
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
            const orderDateTotals = {};
            resSales.data.forEach(element => {
                const orderDate = element.orderDate;
                const totalPrice = element.products.priceRate;

                // Check if order date already exists in the object
                if (orderDateTotals[orderDate]) {
                    // If it exists, add the totalPrice to the existing total
                    orderDateTotals[orderDate] += totalPrice;
                } else {
                    // If it doesn't exist, create a new entry with the totalPrice
                    orderDateTotals[orderDate] = totalPrice;
                }
            });
            coordinates = Object.entries(orderDateTotals).map(([orderDate, totalPrice]) => [
                new Date(orderDate),
                totalPrice
            ]);
            coordinates.sort((a, b) => a[0] - b[0]);
            // console.log(coordinates)
            // console.log("coordinates")
            res.json(coordinates)
        } catch (err) {
            console.log(err)
            res.status(500).json("Internal Server Error");
        }
    } else if (!timeFrame && Division) {
        try {
            let coordinates = [];
            const resSales = await axios.get("http://localhost:5000/sales/" + Division);

            
            const orderDateTotals = {};
            resSales.data.forEach(element => {
                const orderDate = element.orderDate;
                const totalPrice = element.products.priceRate;

                // Check if order date already exists in the object
                if (orderDateTotals[orderDate]) {
                    // If it exists, add the totalPrice to the existing total
                    orderDateTotals[orderDate] += totalPrice;
                } else {
                    // If it doesn't exist, create a new entry with the totalPrice
                    orderDateTotals[orderDate] = totalPrice;
                }
            });
            coordinates = Object.entries(orderDateTotals).map(([orderDate, totalPrice]) => [
                new Date(orderDate),
                totalPrice
            ]);
            coordinates.sort((a, b) => a[0] - b[0]);
            // console.log(coordinates)
            // console.log("coordinates")
            res.json(coordinates)
        } catch (err) {
            console.log(err)
            res.status(500).json("Internal Server Error");
        }
    }else{
        res.status(404).json("Not Found")
    }
}

module.exports = { specificSalesGraphData, salesGraphData };

