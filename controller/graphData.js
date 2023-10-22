const mongoose = require("mongoose");
const axios = require("axios");
const { start } = require("repl");

async function salesPageWidgetData(req, res) {
    const query = req.query.t
    resSales = await axios.get("http://localhost:5000/sales?t=" + query)
    // console.log("response from sales page",resSales2)
    for (const element of resSales.data) {
        console.log("data", element)
    }
    res.send("hello")

}

async function calculateData() {


}


module.exports = { salesPageWidgetData };