const axios = require("axios");
// const { start } = require("repl");
const calculateData = require("../function/salesGraph.js")

async function allSalesGraphData(req, res) {

    const query = req.query.t
    try {

        resSales = await axios.get("http://localhost:5000/sales?t=" + query)
        var calculatedData = await calculateData(resSales.data)
        res.json(calculatedData);
    } catch (err) {
        res.json("Internal Server Error")
    }

}



module.exports = allSalesGraphData;