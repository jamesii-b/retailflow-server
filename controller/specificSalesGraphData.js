const axios = require('axios');
const calculateData = require("../function/salesGraph.js")
async function getSpecificSalesGraphData(req, res) {
    try {
        console.log(req.params.division)
        if (!req.query.t) {
            resSales = await axios.get("http://localhost:5000/sales/" + req.params.division)
        } else {
            resSales = await axios.get("http://localhost:5000/sales/" + req.params.division + "?t=" + req.query.t)
        }
        console.log("\n \n \n \n \n \n \n ")
        console.log(resSales.data)
        var calculatedData = await calculateData(resSales.data)
        console.log(calculatedData)
        res.json(calculatedData);
    } catch (err) {
        console.log(err)
        res.json("Internal Server Error")
    }

}
module.exports = getSpecificSalesGraphData