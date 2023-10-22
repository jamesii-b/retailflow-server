const axios = require('axios')
async function salesTurnover(req, res) {
    const query = req.query.t
    salesData = await axios.get("http://localhost:5000/sales?t=" + query)
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

module.exports = salesTurnover