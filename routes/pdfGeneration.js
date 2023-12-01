const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require("axios")

const Order = require("../models/order");
const Product = require("../models/product");
const ProductItem = require("../models/productItem");
const path = require("path");
const puppeteer = require('puppeteer');



router.get("/pdfgen/:division", async (req, res) => {


    try {
        res.setHeader('Content-Type', 'application/pdf');
        const today = await new Date().toString();


        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        if (req.params.division == "orders") {

            await page.goto(`${req.protocol}://${req.get('host')}/statement`, { waitUntil: 'networkidle0' },);
        }



        await page.setViewport({ width: 1920, height: 1080 });
        const pdfBuffer = await page.pdf({
            // path: `${path.join(__dirname, `../public/pdf`, `${today}.pdf`)}`,
            printBackground: true,
            format: 'A4',


        })
        const filename = `${today}.pdf`
        await browser.close()
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        res.send(pdfBuffer)
    } catch (error) {
        console.log(error);
    }

})


router.get("/temp", async (req, res) => {

    orders = await Order.find();

    res.json(orders);
})


router.get("/statement", async (req, res) => {

    var ordersI = await axios.get("http://localhost:5000/report/order")
    ordersI = ordersI.data;
    fromDate = new Date(ordersI[0][0]);
    console.log(ordersI[0][1]);
    console.log("from date is", fromDate)
    toDate = Date.now()

    convertedOrders = []

    let total = 0;
    for (const element of ordersI) {
        convertedOrders.push([element[0], "BillID #" + element[1], '', element[2], total += element[2]])

    }
    // await 
    res.render("index.ejs", {
        title: "Orders",
        currentDate: new Date(),
        fromDate: fromDate,
        toDate: new Date(toDate),
        orders: convertedOrders,


    })
    console.log(" \n \n")
    console.log(convertedOrders)
    // res.send(${path.join(__dirname, `../views`, `index.ejs`)})
});



module.exports = router;


