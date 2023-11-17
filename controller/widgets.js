const axios = require("axios")
const express = require("express")
async function mostSellingProduct(req, res) {

    allproductResponse = await axios.get("http://localhost:5000/products")
    allProducts = allproductResponse.data["products"]

    allProductsConvertedDatum = []
    storage = []

    for (const element of allProducts) {
        const currentID = element["pID"]

        individualTurnover = await axios.get("http://localhost:5000/turnover/sales/pID=" + currentID)
        storage.push({ turnover: individualTurnover.data["turnover"], pName: element["pName"] })
    }
    // console.log(storage)
    // console.log("storage \n \n")

    totalTurnoverrequest = await axios.get("http://localhost:5000/turnover/sales")
    totalTurnvoer = totalTurnoverrequest.data["turnover"]

    for (const element of storage) {
        const percentage = (element["turnover"] / totalTurnvoer) * 100
        if (percentage > 0.01) {
            // console.log("pusihing")
            allProductsConvertedDatum.push([element["pName"], percentage.toFixed(2),])
        }
    }

    res.status(200).send(allProductsConvertedDatum)


}

async function mostSellingCategory(req, res) {

    allproductResponse = await axios.get("http://localhost:5000/products")
    allProducts = allproductResponse.data["products"]

    allCategoryConvertedDatum = []


    for (const element of allProducts) {
        const currentCategory = element["category"]

        individualTurnover = await axios.get("http://localhost:5000/turnover/sales/category=" + currentCategory)
        allCategoryConvertedDatum.push([individualTurnover.data["turnover"], element["category"]])
    }
    allCategoryConvertedDatum.sort(function (a, b) {
        return a[0] - b[0];
    });
    allCategoryConvertedDatum.reverse()

    totalTurnoverrequest = await axios.get("http://localhost:5000/turnover/sales")
    totalTurnvoer = totalTurnoverrequest.data["turnover"]

    for (const element of allCategoryConvertedDatum) {
        // console.log(element[0])
        const percentage = (element[0] / totalTurnvoer) * 100
        element.push(percentage.toFixed(2))
    }




    res.status(200).send(allCategoryConvertedDatum)

    // console.log(allCategoryConvertedDatum)


}

module.exports = { mostSellingProduct, mostSellingCategory }