const axios = require('axios')
const { json } = require('express')
async function getAllTurnoverData(req, res) {
    const query = req.query.t
    if (query) {
        salesData = await axios.get("http://localhost:5000/sales?t=" + query)

    } else {
        salesData = await axios.get("http://localhost:5000/sales")

    }
    salesData = salesData.data
    if (Array.isArray(salesData)) {
        let turnover = 0;

        salesData.forEach(element => {
            turnover += element.totalAmount;
        });

        res.json({ turnover: turnover });
    } else {
        res.status(400).json({ error: "Invalid or empty sales data" });
    }
}

async function getSpecificTypeSalesTurnover(req, res) {
    const query = req.query.t
    const parameter = req.params.division
    if (!query) {
        salesData = await axios.get("http://localhost:5000/sales/" + parameter)
    } else {
        salesData = await axios.get("http://localhost:5000/sales/" + parameter + "?t=" + query)
    }
    salesData = salesData.data
    // console.log(salesData)
    if (Array.isArray(salesData)) {
        let turnover = 0;

        salesData.forEach(element => {
            // console.log(element.products.priceRate)
            turnover += element.products.priceRate;
        });

        res.json({ turnover: turnover });
    } else {
        res.status(400).json({ error: "Invalid or empty sales data" });
    }
}
async function getSpecificTimeSalesTurnover(req, res) {
    const query = req.query.t
    const timeDiv = req.params.timedivision
    const otherDiv = req.params.division
    if (!otherDiv) {

        salesData = await axios.get("http://localhost:5000/special/sales/" + timeDiv)
        salesData = await salesData.data
        // console.log(salesData)
        if (!Array.isArray(salesData) || salesData.length === 0) {
            // Check if salesData is not an array or is an empty array
            res.json({ turnover: 0 });
        } else {

            let totalAmount = 0;

            await salesData.forEach(element => {
                element.products.forEach(product => {
                    totalAmount += product.priceRate;
                });
            });
            res.status(200).json({ turnover: totalAmount });
        }
    } else {
        salesData = await axios.get("http://localhost:5000/special/sales/" + timeDiv + "/" + otherDiv)
        salesData = await salesData.data
        // console.log(salesData)
        if (!Array.isArray(salesData) || salesData.length === 0) {
            // Check if salesData is not an array or is an empty array
            res.json({ turnover: 0 });
        } else {
            let totalAmount = 0;

            await salesData.forEach(element => {
                // console.log(element.products["priceRate"]);
                totalAmount += parseInt(element.products["priceRate"]);
            });
            res.status(200).json({ turnover: totalAmount });
        }
    }


}
module.exports = { getAllTurnoverData, getSpecificTypeSalesTurnover, getSpecificTimeSalesTurnover }