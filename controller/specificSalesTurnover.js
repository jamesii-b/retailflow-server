const axios = require('axios')
async function getSpecificSalesTurnover(req, res) {
    const query = req.query.t
    const parameter = req.params.division
    if (!query) {
        salesData = await axios.get("http://localhost:5000/sales/" + parameter)
    } else {
        salesData = await axios.get("http://localhost:5000/sales/" + parameter + "?t=" + query)
    }
    salesData = salesData.data
    // console.log(salesData)
    if (Array.isArray(salesData)) {
        let turnover = 0;

        salesData.forEach(element => {
            console.log(element.products.priceRate)
            turnover += element.products.priceRate;
        });

        res.json({ turnover: turnover });
    } else {
        res.status(400).json({ error: "Invalid or empty sales data" });
    }
}

module.exports = getSpecificSalesTurnover