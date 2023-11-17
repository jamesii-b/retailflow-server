const Order = require("../models/order");

async function maxandmindate(query) {
    if (query == "max") {
        /* calculate oldest date*/
        await Order.find({}).select('orderDate').sort('orderDate').limit(1).then((data) => {
            newdate = data[0].orderDate;
            // console.log(data[0].orderDate);
        }).catch((err) => {
            console.log(err);
        })
    } else if (query == "min") {


        /* calculate newest date */
        await Order.find({}).select('orderDate').sort('-orderDate').limit(1).then((data) => {
            olddate = data[0].orderDate;
            // console.log(data[0].orderDate);
        }).catch((err) => {
            console.log(err);
        })
    }
}
module.exports = maxandmindate;