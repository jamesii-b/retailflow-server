const Order = require("../models/order");

/*
1day, 1week, 1month, 1year
*/

async function individualRequests(req, res, currentTimestamp, previousTimeStamp) {
    const dateQuery = {
        orderDate: currentTimestamp > previousTimeStamp ? { $gte: previousTimeStamp, $lte: currentTimestamp } : { $gte: currentTimestamp, $lte: previousTimeStamp },
    };
    if (!req.params.division) {

        try {
            const resData = await Order.find({ ...dateQuery }).sort({ orderDate: -1 }).exec();
            res.json(resData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }

    } else {
        const [division, value] = req.params.division.split('=')

        dBQ = [
            {
                $match: dateQuery // Match based on the date range
            },
            {
                $unwind: "$products"
            },
            {
                $match: {
                    [`products.${division}`]: value // Additional product filtering
                }
            },
            {
                $project: {
                    orderID: 1,
                    orderDate: 1,
                    products: 1
                }
            }
        ];
        try {
            const salesData = await Order.aggregate(dBQ);
            res.json(salesData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }

    }
}

async function specialRequests(req, res) {
    console.log("inside Special requests")
    if (req.params.timedivision == "1day") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp);
        currentTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 1);
        console.log(currentTimestamp);
        console.log(previousTimeStamp);
        individualRequests(req, res, currentTimestamp, previousTimeStamp);


    } else if (req.params.timedivision == "1week") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp)
        currentTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 7)
        console.log(currentTimestamp);
        console.log(previousTimeStamp);
        individualRequests(req, res, currentTimestamp, previousTimeStamp);

    }
    else if (req.params.timedivision == "1month") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp)
        currentTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 30)
        console.log(currentTimestamp)
        console.log(previousTimeStamp)
        individualRequests(req, res, currentTimestamp, previousTimeStamp);



    } else if (req.params.timedivision == "1year") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp)
        previousTimeStamp.setUTCMonth(currentTimestamp.getUTCMonth() - 12)
        console.log(currentTimestamp)
        console.log(previousTimeStamp)
        individualRequests(req, res, currentTimestamp, previousTimeStamp);

    } else if (req.params.timedivision == "thisday") {
        const currentTimestamp = new Date();
        currentNepaliDate = new Date(currentTimestamp.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
        console.log("currentNepaliDate \n \n")
        console.log(currentNepaliDate)
        currentNepaliDate.setHours(0, 0, 0, 0);
        previousTimeStamp = new Date(currentNepaliDate.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }));
        console.log(currentNepaliDate.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }));
        console.log("currentNepaliDate \n \n")
        console.log(previousTimeStamp)
        individualRequests(req, res, currentTimestamp, previousTimeStamp);

    }
    else {
        const resData = await Order.find({}).sort({ orderDate: -1 }).exec();
        res.json(resData);
    }

}

module.exports = specialRequests 