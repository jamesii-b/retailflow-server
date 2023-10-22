const axios = require('axios')
async function getSpecificSalesTurnover(req, res) {
    const query = req.query.t
    const parameter = req.params.division
    salesData = await axios.get("http://localhost:5000/sales/" + parameter + "?t=" + query)
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

module.exports = getSpecificSalesTurnover