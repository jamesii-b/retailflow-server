async function getSpecificSalesGraphData(req, res) {
    try {
        console.log(req.params.division)
        if (!req.query.t) {
            resSales = await axios.get("http://localhost:5000/sales/" + req.params.division)
        } else {
            resSales = await axios.get("http://localhost:5000/sales/" + req.params.division + "?t=" + req.query.t)
        }
        console.log("\n \n \n \n \n \n \n ")
        console.log(resData.data)
        var calculatedData = await calculateData(resSales.data)
        res.json(calculatedData);
    } catch (err) {
        res.json("Internal Server Error")
    }

}
module.exports = getSpecificSalesGraphData