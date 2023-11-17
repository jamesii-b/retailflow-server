const express = require("express");
const axios = require("axios");

const moment = require("moment");



const router = express.Router();
const { salesGraphData, specificSalesGraphData } = require("../controller/graphSalesData");
const getTopSellingProductData = require("../controller/topSellingProduct");
const { mostSellingCategory, mostSellingProduct } = require("../controller/widgets");
const ProductItem = require("../models/productItem");
router.get("/graph/sales/:timeframe?", salesGraphData);
router.get("/graph/product/sales/:division/:timeframe?", specificSalesGraphData);

router.get("/graph/topselling/product", mostSellingProduct)
router.get("/graph/topselling/category", mostSellingCategory)

router.get("/graph/ttr", async (req, res) => {

    allProducts = await axios.get("http://localhost:5000/products")
    allProducts = allProducts.data["products"]

    const storage = [];
    for (const product of allProducts) {
        pID = product["pID"]
        allOrders = await axios.get("http://localhost:5000/sales/pID=" + pID)
        allOrders = allOrders.data
        let minutesDifference = 0;
        for (const iOrders of allOrders) {
            orderDate = moment(iOrders["orderDate"])
            addedDate = moment(iOrders["products"]["productAdded"])
            const duration = moment.duration(orderDate.diff(addedDate));
            const days = duration.asDays();
            const months = duration.asMonths();
            const years = duration.asYears();
            const hours = duration.asHours();
            minutes = duration.asMinutes();
            minutesDifference += minutes
        }
        storage.push({ pName: product["pName"], minutesDifference: minutesDifference })
    }

    const allConvertedDatum = []

    let totalMinutesDifference = 0;
    for (const element of storage) {
        totalMinutesDifference += element["minutesDifference"]
    }

    for (const element of storage) {
        const percentage = (element["minutesDifference"] / totalMinutesDifference) * 100
        if (percentage > 0.01) {
            allConvertedDatum.push([element["pName"], percentage.toFixed(2)])
        }
    }

    res.json(allConvertedDatum)

})


router.get("/graph/inventory", async (req, res) => {

    allProducts = await axios.get("http://localhost:5000/products")
    allProducts = allProducts.data["products"]

    const storage = [];
    for (const product of allProducts) {
        pID = product["pID"]
        id = product["_id"]

        totalQuantity = await ProductItem.find({ productFamily: id }).count()



        storage.push({ pName: product["pName"], totalQuantity: totalQuantity })




    }
    const allConvertedDatum = [];

    let netQuantity = 0;
    for (const element of storage) {
        netQuantity += element["totalQuantity"]
    }
    for (const element of storage) {

        let percentage = (element["totalQuantity"] / netQuantity) * 100
        console.log(percentage)
        let count = 0;
        allConvertedDatum.forEach((item) => {

            if (element["pName"] === item[0]) {
                count++;
                item[1] = (parseInt(item[1]) + parseFloat(percentage.toFixed(2))).toString();

            }


        })
        if (count == 0) {
            allConvertedDatum.push([element["pName"], percentage.toFixed(2)])
        }

    }

    res.json(allConvertedDatum)

})


module.exports = router;
