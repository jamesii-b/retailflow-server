const axios = require("axios")
const express = require("express")
async function mostSellingProduct(req, res) {

    allproductResponse = await axios.get("http://localhost:5000/products")
    allProducts = allproductResponse.data["products"]

    allProductsConvertedDatum = []


    for (const element of allProducts) {
        const currentID = element["pID"]

        individualTurnover = await axios.get("http://localhost:5000/turnover/sales/pID=" + currentID)
        allProductsConvertedDatum.push([individualTurnover.data["turnover"], element["pName"]])
    }
    allProductsConvertedDatum.sort(function (a, b) {
        return a[0] - b[0];
    });
    allProductsConvertedDatum.reverse()

    totalTurnoverrequest = await axios.get("http://localhost:5000/turnover/sales")
    totalTurnvoer = totalTurnoverrequest.data["turnover"]

    for (const element of allProductsConvertedDatum) {
        console.log(element[0])
        const percentage = (element[0] / totalTurnvoer) * 100
        if (percentage < 0.01) {
            const indexToRemove = allProductsConvertedDatum.indexOf(element);
            allProductsConvertedDatum.splice(indexToRemove, 1);
        } else {

            element.push(percentage.toFixed(2))
        }
    }




    res.status(200).send(allProductsConvertedDatum)

    console.log(allProductsConvertedDatum)

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
        console.log(element[0])
        const percentage = (element[0] / totalTurnvoer) * 100
        element.push(percentage.toFixed(2))
    }




    res.status(200).send(allCategoryConvertedDatum)

    console.log(allCategoryConvertedDatum)


}

module.exports = { mostSellingProduct, mostSellingCategory }