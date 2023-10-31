const axios = require("axios")
const Order = require("../models/order")
const { areDatesEqual, getymd, areHourEqual } = require("../utils/date")
const { returnDaySum, returnHourSum } = require("../function/orderDateCalculations")


async function graphData(req, res) {
    timeframe = req.params.timeframe
    console.log(getymd())
    // console.log(new Date(Date.now()))

    let newdate;
    let olddate;
    const resSales = await axios.get("http://localhost:5000/sales")
    if (timeframe == "all") {
        // console.log(resSales.data)

        /* calculate oldest date */
        await Order.find({}).select('orderDate').sort('orderDate').limit(1).then((data) => {
            newdate = data[0].orderDate;
            console.log(data[0].orderDate);
        }).catch((err) => {
            console.log(err);
        })

        /* calculate newest date */
        await Order.find({}).select('orderDate').sort('-orderDate').limit(1).then((data) => {
            olddate = data[0].orderDate;
            console.log(data[0].orderDate);
        }).catch((err) => {
            console.log(err);
        })
        const allData = axios.get("http://localhost:5000/sales")

        const timestamp1 = '2023-10-30T08:06:37.579Z';
        const timestamp2 = '2023-10-31T15:30:00.000Z';

        if (areDatesEqual(timestamp1, timestamp2)) {
            console.log("Both timestamps are on the same date.");
        } else {
            console.log("Timestamps are on different dates.");
        }

    }
    else if (timeframe == "day") {

        hourBasisData = await returnHourSum(resSales.data)
        console.log(hourBasisData)
        res.json(hourBasisData)
    }

    // 1st iteration ma afnai garyo

    else if (timeframe == "week") {
        dayBasisData = await returnDaySum(resSales.data)
        res.json(dayBasisData)
    }
    // res.json("ok")
}

module.exports = graphData;
